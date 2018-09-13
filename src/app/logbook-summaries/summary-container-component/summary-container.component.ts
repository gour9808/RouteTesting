import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {LogbookSummaryService} from 'app/service/logbook-summary.service';
import {AutoUnsubscribe} from '../../utils/auto-unsubscribe';
import * as _ from 'lodash';
import {FleetService} from '../../service/fleet.service';
import * as moment from 'moment';
import {ToastMessageService} from '../../service/toast-message.service';
import {Utils} from '../../utils/utils';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'summary-container',
    templateUrl: 'summary-container.component.html',
    styleUrls: ['summary-container.component.scss'],
    encapsulation: ViewEncapsulation.None
})
@AutoUnsubscribe()
export class SummaryContainerComponent implements OnInit {
    loadingSummary: boolean;
    loadingSummaryList: boolean;
    view: any[] = [1000, 400];
    colorScheme = {
        domain: ['#F85959', '#111F4D', '#FF895D']
    };
    showXAxis = true;
    showYAxis = true;
    showLegend = true;
    showXAxisLabel = true;
    xAxisLabel = 'Date';
    showYAxisLabel = true;
    yAxisLabel = 'NUMBER_OF_TRIPS';
    barData = [];
    vehicleAreaData = [];
    logSummary$: any;
    logs = [];
    vehicleList: any = [];
    driverList: any = [];
    logSummaryList: any = [];
    fleetView$: any;
    translateService$;
    fromDate: Date = Utils.getStartOfCurrentMonth();
    toDate: Date = Utils.getEndOfCurrentDay();
    totalDistance: any;
    totalTrips: any;
    showGraph = false;
    selectedSummary: any[] = [];
    cols: any[];
    metrics: any;

    constructor(private logbookSummaryService: LogbookSummaryService, private translateService: TranslateService, private toast: ToastMessageService, private fleetService: FleetService, private router: Router, private currentRoute: ActivatedRoute) {
        this.metrics = [
            {icon: 'mdi-car', value: 0, label1: 'TOTAL_DURATION_DRIVEN', label2: ''},
            {icon: 'mdi-car', value: 0, label1: 'DISTANCE_COVERED_KMS', label2: ''},
            {icon: 'mdi-car', value: 0, label1: 'NUMBER_OF_TRIPS', label2: ''}
        ];
    }

    ngOnInit() {
        this.getFleetView();
        console.log('Route is', this.currentRoute);
        this.cols = [
            {header: 'Date', field: 'date'},
            {header: 'Duration', field: 'businessDuration'},
            {header: 'Business Km', field: 'businessKM'},
            {header: 'Trip', field: 'businessTrip'}
        ];
        this.getPrintColumns();
        this.translateService$ = this.translateService.onLangChange.subscribe((event) => {
            console.log('current lang', this.translateService.currentLang);
            this.getPrintColumns();
        });
    }

    getPrintColumns() {
        this.translateService.currentLang == 'lang-de' ? this.cols = [
            {header: 'Datum', field: 'date'},
            {header: 'Gesamtlenkzeit (Std)', field: 'businessDuration'},
            {header: 'zurückgelegte Wegstrecke (Kms)', field: 'businessKM'},
            {header: 'Anzahl der Fahrten', field: 'businessTrip'}
        ] : this.cols = [
            {header: 'Date', field: 'date'},
            {header: 'Total Duration Driven (Hours)', field: 'businessDuration'},
            {header: 'Distance Covered (Kms)', field: 'businessKM'},
            {header: 'Number of Trips', field: 'businessTrip'}
        ];
        console.log('this.cols', this.cols);
    }

    getFleetView() {
        this.fleetView$ = this.fleetService.fetchFleetView(this.fleetService.getFleetId()).subscribe(res => {
            console.log('Fleetview is ', res);
            this.vehicleList = res['vehicleView'];
            this.driverList = _.filter(res['userProfile'], profile => res['driverIdList'].includes(profile.userId));
            this.getLogbookSummary();
        });
    }


    getLogbookSummary() {
        this.loadingSummary = true;
        this.logSummary$ = this.logbookSummaryService.fetchLogbookSummary(this.fleetService.getFleetId(), null, null, this.fromDate.valueOf(), this.toDate.valueOf(), 'all')
            .finally(() => this.loadingSummary = false)
            .subscribe(res => {
                this.logs = _.orderBy(res, ['sDate'], ['asc']);
                console.log('Summary is ', _.groupBy(res, 'sDate'));
                console.log('Unique Vehicles ', Object.keys(_(res).filter(object => _.has(object, 'vehicleId')).groupBy('vehicleId').value()));
                console.log('Unique Drivers ', Object.keys(_(res).filter(object => object.driverId != null).groupBy('driverId').value()));
                this.totalDistance = _.sumBy(this.logs, 'businessKM').toFixed(2);
                this.totalTrips = _.sumBy(this.logs, 'businessTrips');
                this.metrics[0].value = Utils.displayTime(_.sumBy(this.logs, 'businessDrivenTime'));
                this.metrics[1].value = this.totalDistance;
                this.metrics[2].value = this.totalTrips;
                this.formatSummaryData();
                this.formatVehicleData();
                this.formatTableData();
            });
    }

    fromChange(change) {
        console.log('From Changed', this.fromDate);
        this.fromDate.setHours(0, 0, 0, 0);
        if (this.fromDate > this.toDate) {
            console.log('Date Error');
            this.toast.showError('INVALID_DATE_RANGE', 'FROM_DATE_CANT_BE_GREATER_TO_DATE');
        } else {
            // proceed
            this.getLogbookSummary();
        }
    }

    toChange(change) {
        console.log('To Changed', this.toDate);
        this.toDate.setHours(23, 59, 59, 59);
        if (this.fromDate > this.toDate) {
            console.log('Date Error');
            this.toast.showError('INVALID_DATE_RANGE', 'TO_DATE_CANT_BE_LESSTHAN_FROM_DATE');
        } else {
            // proceed
            this.getLogbookSummary();
        }
    }


    formatSummaryData() {
        this.barData = [];
        const dateGroup = _.groupBy(this.logs, 'date');
        _.forEach(dateGroup, (date, id: any) => {
            this.barData.push({
                name: moment(new Date().setTime(id)).format('Do MMM'), series: [
                    {name: 'Trips', value: _.sumBy(date, 'businessTrips'), key: 'TRIPS'},
                    {name: 'Gaps', value: _.sumBy(date, 'gaps'), key: 'GAPS'},
                    {name: 'Overlaps', value: _.sumBy(date, 'overlaps'), key: 'OVERLAPS'}
                ]
            });
        });
        this.barData = [...this.barData];
        console.log('Bar data is', this.barData);
    }

    emitedTranslate(event) {
        this.barData = [...event];
    }

    formatVehicleData() {
        this.vehicleAreaData = [{
            name: 'Distance Covered', series: []
        }];
        const dateGroup = _.groupBy(this.logs, 'date');
        _.forEach(dateGroup, (date, id: any) => {
            this.vehicleAreaData[0].series.push({
                name: moment(new Date().setTime(id)).format('MMM Do'), value: _.sumBy(date, 'businessKM').toFixed(2)
            });
        });
        this.vehicleAreaData = [...this.vehicleAreaData];
        this.vehicleAreaData[0].series != 0 ? this.showGraph = true : this.showGraph = false;
        console.log('Vehicle Data is', this.vehicleAreaData);
    }

    formatTableData() {
        this.logSummaryList = [];
        const dateGroup = _.groupBy(this.logs, 'date');
        console.log('Date group', dateGroup);
        _.forEach(dateGroup, (date, id: any) => {
            console.log('Date is', moment(new Date().setTime(id)));
            this.logSummaryList.push({
                date: moment(new Date().setTime(id)).format('MMM Do YYYY'),
                day: moment(new Date().setTime(id)).format('dddd'),
                businessKM: _.sumBy(date, 'businessKM').toFixed(2),
                businessTrip: _.sumBy(date, 'businessTrips'),
                businessDuration: Utils.displayTime(_.sumBy(date, 'businessDrivenTime')),
                gaps: _.sumBy(date, 'gaps'),
                overlaps: _.sumBy(date, 'overlaps'),
                sDate: id,
                log: date
            });
        });
        this.logSummaryList = _.orderBy(this.logSummaryList, 'sDate', 'desc');
    }

    selected(log) {
        console.log('Selected', log);
        this.router.navigate(['../detail'], {queryParams: {from: log.sDate, to: log.sDate}, relativeTo: this.currentRoute});
    }

    exportCSV() {
        const csvData = _.map(this.logSummaryList, (data: any) => {
            return {
                'Date': data.date,
                'Day of Week': data.day,
                'Distance Covered (Kms)': data.businessKM,
                'Number of Trips': data.businessTrip,
                'Total Duration Driven (Hours)': data.businessDuration
            };
        });
        const title = `Logbook Summary(${moment(this.fromDate).format('Do MMM YYYY')}-${moment(this.toDate).format('Do MMM YYYY')})`;
        Utils.downloadCSV(title, csvData);
    }
}
