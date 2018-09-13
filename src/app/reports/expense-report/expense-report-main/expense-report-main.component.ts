import {Component, OnInit, ViewChild} from '@angular/core';
import * as _ from 'lodash';
import {FleetService} from '../../../service/fleet.service';
import {VehicleService} from '../../../service/vehicle.service';
import {TranslateService} from '@ngx-translate/core';
import {Constants} from '../../../service/constants';
import {AutoUnsubscribe} from '../../../utils/auto-unsubscribe';
import {ActivatedRoute, Router} from '@angular/router';
import {ToolbarTitleService} from '../../../service/toolbar-title.service';
import * as moment from 'moment';
import {ExpenseReportBase} from '../expense-report.base';
import {OnDestroy} from '@angular/core/src/metadata/lifecycle_hooks';

enum Months {
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
}

interface IOptions {
    label: any;
    value: any;
}

@Component({
    selector: 'cbp-expense-report-main',
    templateUrl: './expense-report-main.component.html',
    styleUrls: ['./expense-report-main.component.scss']
})

@AutoUnsubscribe()
export class ExpenseReportMainComponent extends ExpenseReportBase implements OnInit, OnDestroy {
    fleetView$;
    translateService$;
    groups = [];
    @ViewChild('myTable') table: any;
    expenseYear: IOptions[] = [];
    fleetView: any;
    expenseData: any[] = [];
    loadingExpense = true;
    fuelGraph = false;
    serviceGraph = false;
    locale: any;
    currentYear: any;
    vehicleData: any;
    expensiveCategory: any;
    expensiveVehicle: any;
    metrics: any[] = [];
    yearTotalExpense: any;
    yAxisBar: any;
    cols: any[] = [];
    serviceByYear: any[] = [
        { name: '', series: [] }
    ];
    fuelByYear: any[] = [
        { name: '', series: [] }
    ];
    selectedMonthData: any;
    colorScheme = {
        domain: ['#82e074']
    };
    colorSchemeFuel = {
        domain: ['#8b5a69']
    };
    fuelChartData: any = [];
    serviceChartData: any = []

    constructor(private fleetService: FleetService,
        private vehicleService: VehicleService, private router: Router, private route: ActivatedRoute,
        private translateService: TranslateService, private toolbarTitleService: ToolbarTitleService) {
        super();
        this.metrics = [
            { icon: 'mdi-car', value: 0, label1: 'MOST_EXPENSIVE_VEHICLE', label2: '' },
            { icon: 'mdi-car', value: 0, label1: 'MOST_EXPENSIVE_CATEGORY', label2: '' },
            { icon: 'mdi-car', value: 0, label1: 'TOTAL_EXPENSES', label2: '' },
        ];

        this.translateService$ = this.translateService.onLangChange.subscribe((event) => {
            this.yAxisBar = event.lang == 'lang-de' ?  'Kosten in' + ' ' + this.locale : 'Expense in' + ' ' + this.locale;
            this.translateService.get(['EXPENSE_REPORT_FOR']).subscribe(res => {
                this.toolbarTitleService.setCurrentTitle(`${res['EXPENSE_REPORT_FOR']} ${'2018'}`);
            });
        });
    }

    ngOnInit() {
        this.fleetView$ = this.fleetService.fetchFleetView(this.fleetService.getFleetId()).subscribe(res => {
            console.log('FleetView view is', res);
            this.fleetView = res;
            this.setCurrencyLocale(res);
            this.getExpensesInFleet();
        });
        this.translateService.get(['EXPENSE_REPORT_FOR']).subscribe(res => {
            this.toolbarTitleService.setCurrentTitle(`${res['EXPENSE_REPORT_FOR']} 2018`);
        });
    }

    ngOnDestroy() {
    }

    setCurrencyLocale(res) {
        if (res.locale == 'en_IN') {
            this.locale = 'INR';
        } else if (res.locale == 'de_DE') {
            this.locale = 'EUR';
        }
        this.yAxisBar = this.translateService.currentLang == 'lang-de' ? 'Kosten in' + ' ' + this.locale : 'Expense in' + ' ' + this.locale;
    }

    getExpensesInFleet() {
        this.vehicleService.getAccrualsFleet(this.fleetService.getFleetId())
            .finally(() => this.loadingExpense = false)
            .subscribe(res => {
                console.log('Expense for Fleet', res);
                if (res) {
                    // this.setExpenseData(res);
                    super.setTotalExpenseData(res);
                    super.setExpenseVehicleData(this.fleetView.vehicleView);
                    this.formatFuelChartData();
                    this.formatServiceChartData();
                }
            }, error => {
                this.loadingExpense = false;
            });
    }

    getVehicleLogo(make) {
        if (make != null && make != undefined) {
            return Constants.GET_VEHICLE_LOGO(make);
        }
    }

    formatServiceChartData() {
        const fuelGroup = _(this.expenseTotal).filter({ 'costType': 'GARAGE' }).groupBy(expense => {
            return moment(expense['paymentDate']).format('MMMM');
        }).value();
        console.log('Fuel Data is', fuelGroup, moment.months());
        moment.months().forEach(month => {
            this.serviceChartData.push({
                name: month,
                value: _.sumBy(fuelGroup[month], 'totalprice')
            });
        });
        this.serviceChartData = [...this.serviceChartData];
        console.log('Service Chart Data is', this.serviceChartData);
    }

    formatFuelChartData() {
        const fuelGroup = _(this.expenseTotal).filter({ 'costType': 'FUEL' }).groupBy(expense => {
            return moment(expense['paymentDate']).format('MMMM');
        }).value();
        console.log('Fuel Data is', fuelGroup, moment.months());
        moment.months().forEach(month => {
            this.fuelChartData.push({
                name: month,
                value: _.sumBy(fuelGroup[month], 'totalprice')
            });
        });
        this.fuelChartData = [...this.fuelChartData];
        console.log('Fuel Chart Data is', this.fuelChartData);
    }

    openMonthDetail(month) {
        console.log('expenseData', month);
        this.router.navigate(['../detail'], { queryParams: { month: month }, relativeTo: this.route });
    }

    openTypeDetail(type) {
        console.log('Detail for type', type);
        this.router.navigate(['../detail'], { queryParams: { type: type }, relativeTo: this.route });
    }

    openVehicleExpense(vehicle) {
        this.router.navigate(['/fleet/vehicle/detail/' + vehicle.vehicleId + '/expenses'], { relativeTo: this.route });
    }
}
