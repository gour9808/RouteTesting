import {Component, OnDestroy, OnInit} from '@angular/core';
import * as moment from 'moment';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {FleetService} from 'app/service/fleet.service';
import {Constants} from '../../../service/constants';
import {CommunicatorService} from '../../../common/communicator.service';
import {VehicleService} from '../../../service/vehicle.service';
import {ExpenseReportBase} from '../expense-report.base';
import {ToolbarTitleService} from '../../../service/toolbar-title.service';
import * as _ from 'lodash';
import {AutoUnsubscribe} from '../../../utils/auto-unsubscribe';

@Component({
    selector: 'cbp-expense-report-detail',
    templateUrl: './expense-report-detail.component.html',
    styleUrls: ['./expense-report-detail.component.scss']
})

@AutoUnsubscribe()
export class ExpenseReportDetailComponent extends ExpenseReportBase implements OnInit, OnDestroy {
    fleetView$;
    fleetView: any;
    translateService$;
    onlangTranslateService$;
    loadingExpense = true;
    expenseChartData: any[] = [];
    yAxisBar: any;
    locale: any;
    days: any[] = [];
    month: any;
    year: any;
    expensiveVehicle: any;
    colorScheme = {
        domain: ['#50518f', '#8dbfb4', '#8a60bd', '#8b5a69', '#8abee7', '#e35ea0', '#8f92e2', '#82e074', '#78c6ff', '#fdd921', '#fb7066']
    };
    routeSub$: any;
    expenseOptions = {from: null, to: null, costtype: null};
    showMonth: boolean;
    routeParams: any;
    chartLabel: any;

    constructor(private fleetService: FleetService, private vehicleService: VehicleService,
                private comms: CommunicatorService, private currentRoute: ActivatedRoute, private router: Router,
                private translateService: TranslateService, private toolbarTitleService: ToolbarTitleService) {
        super();

        this.routeSub$ = this.currentRoute.queryParams.subscribe(params => {
            this.routeParams = params;
        });
        this.translateService$ = this.translateService.onLangChange.subscribe((event) => {
            this.yAxisBar = event.lang == 'lang-de' ? 'Kosten in' + ' ' + this.locale : 'Expense in' + ' ' + this.locale;
            this.getTranslationTitle();
        });
    }

    ngOnInit() {
        this.fleetDetail();
        if (this.routeParams['month']) {
            this.showMonth = false;
            console.log('Get data for month', this.routeParams['month']);
            this.expenseOptions.from = moment().month(this.routeParams['month']).startOf('month').valueOf();
            this.expenseOptions.to = moment().month(this.routeParams['month']).endOf('month').valueOf();
            console.log('Options are', this.expenseOptions);
        } else if (this.routeParams['type']) {
            this.showMonth = true;
            console.log('Get data for type', this.routeParams['type']);
            this.expenseOptions.costtype = this.routeParams['type'];
        }
        this.getTranslationTitle();
    }

    ngOnDestroy() {
    }

    getTranslationTitle() {
        console.log('params', this.routeParams);
        if (this.routeParams['month']) {
            this.onlangTranslateService$ = this.translateService.get(['EXPENSE_REPORT_FOR', this.routeParams['month']]).subscribe(res => {
                console.log('Multiple translaions', res);
                this.toolbarTitleService.setCurrentTitle(`${res['EXPENSE_REPORT_FOR']} ${res[this.routeParams['month']]}`);
                this.chartLabel = `${res['EXPENSE_REPORT_FOR']} ${res[this.routeParams['month']]}`;
            });
        } else if (this.routeParams['type']) {
            this.onlangTranslateService$ = this.translateService.get(['EXPENSE_REPORT_FOR', this.routeParams['type']]).subscribe(res => {
                console.log('Multiple translaions', res);
                this.toolbarTitleService.setCurrentTitle(`${res['EXPENSE_REPORT_FOR']} ${res[this.routeParams['type']]}`);
                this.chartLabel = `${res['EXPENSE_REPORT_FOR']} ${res[this.routeParams['type']]}`;
            });
        }
    }

    getExpenseForQuery() {
        this.vehicleService.getAccrualsFleet(this.fleetService.getFleetId(), this.expenseOptions)
            .finally(() => this.loadingExpense = false)
            .subscribe(res => {
                console.log('Expense for Fleet', res);
                if (res) {
                    super.setTotalExpenseData(res);
                    super.setExpenseVehicleData(this.fleetView.vehicleView);
                    this.prepareExpenseChart();
                }
            }, error => {
                this.loadingExpense = false;
            });
    }

    fleetDetail() {
        this.fleetView$ = this.fleetService.fetchFleetView(this.fleetService.getFleetId()).subscribe(res => {
            console.log('FleetView view is', res);
            this.fleetView = res;
            this.setCurrencyLocale(res);
            this.getExpenseForQuery();
        });
    }

    setCurrencyLocale(res) {
        if (res.locale == 'en_IN') {
            this.locale = 'INR';
        } else if (res.locale == 'de_DE') {
            this.locale = 'EUR';
        }
        this.yAxisBar = this.translateService.currentLang == 'lang-de' ? 'Kosten in' + ' ' + this.locale : 'Expense in' + ' ' + this.locale;
    }

    prepareExpenseChart() {
        if (this.showMonth) {
            this.formatTypeChart();
        } else {
            this.formatMonthChart();
        }
    }

    formatTypeChart() {
        const fuelGroup = _(this.expenseTotal).groupBy(expense => {
            return moment(expense['paymentDate']).format('MMMM');
        }).value();
        console.log('Fuel Data is', fuelGroup, moment.months());
        moment.months().forEach(month => {
            this.expenseChartData.push({
                name: month,
                value: _.sumBy(fuelGroup[month], 'totalprice')
            });
        });
        this.expenseChartData = [...this.expenseChartData];
        console.log('Type Chart Data is', this.expenseChartData);
    }

    // TODO: Replace this with stacked bar chart. Each bar will have all types for that day.
    formatMonthChart() {
        const dayGroup = _(this.expenseTotal).groupBy(expense => {
            return moment(expense['paymentDate']).format('D');
        }).value();
        console.log('Day group is', dayGroup);
        // TODO: This will always consider current year. Will break for february. Bloody leap month.
        const days = _.range(1, moment().month(this.routeParams['month']).daysInMonth() + 1);
        console.log('Days are', days);
        days.forEach(day => {
            this.expenseChartData.push({
                name: day,
                value: _.sumBy(dayGroup[day], 'totalprice')
            });
        });
        this.expenseChartData = [...this.expenseChartData];
        console.log('Month Chart Data is', this.expenseChartData);
    }


    getVehicleLogo(make) {
        if (make != null && make != undefined) {
            return Constants.GET_VEHICLE_LOGO(make);
        }
    }

    openVehicleExpense(vehicle) {
        this.router.navigate(['/fleet/vehicle/detail/' + vehicle.vehicleId + '/expenses'], {relativeTo: this.currentRoute});
    }
}
