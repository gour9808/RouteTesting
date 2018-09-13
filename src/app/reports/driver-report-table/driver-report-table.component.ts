import {Component, OnDestroy, OnInit} from '@angular/core';
import {FleetService} from '../../service/fleet.service';
import * as _ from 'lodash';
import {AutoUnsubscribe} from "../../utils/auto-unsubscribe";
import {LogbookSummaryService} from "../../service/logbook-summary.service";
import {Utils} from "../../utils/utils";
import {ToastMessageService} from "../../service/toast-message.service";
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'cbp-driver-report-table',
    templateUrl: './driver-report-table.component.html',
    styleUrls: ['./driver-report-table.component.scss']
})
@AutoUnsubscribe()
export class DriverReportTableComponent implements OnInit, OnDestroy {
    totalDuration: any;
    totalTrips: any;
    totalDistance: any;
    fleetService$: any;
    translateService$;
    fleetView: any;
    drivers: any = [];
    userService$: any;
    loadingDrivers: boolean;
    logbookSummary$: any;
    summary: any = [];
    totalGaps: any = 0;
    totalOverlaps: any = 0;
    fromDate: Date = Utils.getStartOfCurrentYear();
    toDate: Date = Utils.getEndOfCurrentDay();
    cols: any[] = [];

    constructor(private fleetService: FleetService, private translateService: TranslateService, private toast: ToastMessageService, private logbookSummary: LogbookSummaryService) {
        this.getPrintColumns();
        this.translateService$ = this.translateService.onLangChange.subscribe((event) => {
            console.log("current lang", this.translateService.currentLang);
            this.getPrintColumns();
        });
    }

    ngOnInit() {
        this.getSummary();
    }

    ngOnDestroy() {
    }

    getPrintColumns() {
        this.translateService.currentLang == 'lang-de' ? this.cols = [
            { header: 'Fahrername', field: 'displayname'},
            { header: 'Gesamtwegstrecke (Kms)', field: 'totalDistance'},
            { header: 'Fahrten, gesamt', field: 'trips' },
            { header: 'Gesamtlenkzeit (Std)', field: 'duration' }
        ] : this.cols = [
            { header: 'Driver Name', field: 'displayname'},
            { header: 'Total Distance in Kms', field: 'totalDistance'},
            { header: 'Total Trips', field: 'trips' },
            { header: 'Total Duration Driven', field: 'duration' }
        ];
        console.log("this.cols", this.cols);
    }

    getSummary() {
        this.loadingDrivers = true;
        this.logbookSummary$ = this.logbookSummary.fetchLogbookSummary(this.fleetService.getFleetId(), null, null, this.fromDate.valueOf(), this.toDate.valueOf(), 'all')
            .subscribe(res => {
                console.log('Logbook summary us', res);
                this.summary = res;
                this.getDriversInFleet();
            })
    }

    fromChange(change) {
        console.log('From Changed', this.fromDate);
        this.fromDate.setHours(0, 0, 0, 0);
        if (this.fromDate > this.toDate) {
            console.log('Date Error');
            this.toast.showError('INVALID_DATE_RANGE', 'FROM_DATE_CANT_BE_GREATER_TO_DATE');
        } else {
            // proceed
            this.getSummary();
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
            this.getSummary();
        }
    }


    getDriversInFleet() {
        this.fleetService$ = this.fleetService.fetchFleetView(this.fleetService.getFleetId()).subscribe(res => {
            console.log('Fleet view is', res);
            this.fleetView = res;
            if (_.has(res, 'userProfile')) {
                this.drivers = _.filter(res['userProfile'], profile => res['driverIdList'].includes(profile.userId));
                this.loadingDrivers = false;
                this.prepareDriverMetrics();
            } else {
                this.drivers = [];
                this.loadingDrivers = false;
            }
        })
    }

    prepareTotals() {
        this.totalDistance = _.sumBy(this.summary, 'businessKM').toFixed(2);
        this.totalTrips = _.sumBy(this.summary, 'businessTrips');
        this.totalDuration = Utils.displayTime(_.sumBy(this.summary, 'businessDrivenTime'));
        this.totalGaps = _.sumBy(this.summary, 'gaps');
        this.totalOverlaps = _.sumBy(this.summary, 'overlaps');
    }


    prepareDriverMetrics() {
        const uniqueDrivers = _(this.summary).groupBy('driverId').value();
        console.log('Unique Drivers ', uniqueDrivers);
        let empty;
        _.forEach(this.drivers, driver => {
            driver.totalDistance = _.sumBy(uniqueDrivers[driver.userId], 'businessKM').toFixed(2);
            driver.trips = _.sumBy(uniqueDrivers[driver.userId], 'businessTrips');
            driver.duration = Utils.displayTime(_.sumBy(uniqueDrivers[driver.userId], 'businessDrivenTime'));
            driver.gaps = _.sumBy(uniqueDrivers[driver.userId], 'gaps');
            driver.overlaps = _.sumBy(uniqueDrivers[driver.userId], 'overlaps');
            empty = {...driver};
        });
        console.log('Drivers ', this.drivers);
        console.log('Empty is', empty);
        uniqueDrivers['null'] ? this.prepareNullDrivers(empty, uniqueDrivers) : '';
        this.prepareTotals();
    }

    prepareNullDrivers(empty, uniqueDrivers) {
        if (uniqueDrivers['null']) {
            Object.keys(empty).forEach(key => {
                empty[key] = '-';
            });
            empty.totalDistance = _.sumBy(uniqueDrivers['null'], 'businessKM').toFixed(2);
            empty.trips = _.sumBy(uniqueDrivers['null'], 'businessTrips');
            empty.duration = Utils.displayTime(_.sumBy(uniqueDrivers['null'], 'businessDrivenTime'));
            empty.gaps = _.sumBy(uniqueDrivers['null'], 'gaps');
            empty.overlaps = _.sumBy(uniqueDrivers['null'], 'overlaps');
        }
        this.drivers = [...this.drivers, empty];
    }
}
