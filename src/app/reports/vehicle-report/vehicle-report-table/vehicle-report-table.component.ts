import {Component, OnDestroy, OnInit} from '@angular/core';
import {FleetService} from '../../../service/fleet.service';
import {AutoUnsubscribe} from '../../../utils/auto-unsubscribe';
import * as _ from 'lodash';
import {Constants} from '../../../service/constants';
import {LogbookSummaryService} from '../../../service/logbook-summary.service';
import {Utils} from '../../../utils/utils';
import {ToastMessageService} from '../../../service/toast-message.service';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'cbp-vehicle-report-table',
    templateUrl: './vehicle-report-table.component.html',
    styleUrls: ['./vehicle-report-table.component.scss']
})
@AutoUnsubscribe()
export class VehicleReportTableComponent implements OnInit, OnDestroy {

    fleetService$: any;
    vehicleService$: any;
    translateService$;
    vehicles: any = [];
    loadingVehicles = true;
    fleetView: any;
    ranchi = '6e1a042b-6716-4ee6-b82e-95ee632ce6d2';
    patna = 'fbf40f75-6567-42fa-89c2-f3e53f0cd7d1';
    logbookSummary$: any;
    summary: any = [];
    totalDistance: any = 0;
    totalTrips: any = 0;
    totalDuration: any = 0;
    totalGaps: any = 0;
    totalOverlaps: any = 0;
    fromDate: Date = Utils.getStartOfCurrentYear();
    toDate: Date = Utils.getEndOfCurrentDay();
    cols: any[] = [];

    constructor(private fleetService: FleetService, private toast: ToastMessageService, private translateService: TranslateService, private logbookSummary: LogbookSummaryService,
                private router: Router, private currentRoute: ActivatedRoute) {
        this.getPrintColumns();
        this.translateService$ = this.translateService.onLangChange.subscribe((event) => {
            console.log('current lang', this.translateService.currentLang);
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
            {header: 'Name des Fahrzeugs', field: 'name'},
            {header: 'Gesamtwegstrecke (Kms)', field: 'totalDistance'},
            {header: 'Fahrten, gesamt', field: 'trips'},
            {header: 'Gesamtlenkzeit (Std)', field: 'duration'}
        ] : this.cols = [
            {header: 'Vehicle Name', field: 'name'},
            {header: 'Total Distance in Kms', field: 'totalDistance'},
            {header: 'Total Trips', field: 'trips'},
            {header: 'Total Duration Driven', field: 'duration'}
        ];
        console.log('this.cols', this.cols);
    }

    getSummary() {
        this.loadingVehicles = true;
        this.logbookSummary$ = this.logbookSummary.fetchLogbookSummary(this.fleetService.getFleetId(), null, null, this.fromDate.valueOf(), this.toDate.valueOf(), 'all')
            .subscribe(res => {
                console.log('Logbook summary us', res);
                this.summary = res;
                this.getVehiclesInFleet();
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


    getVehiclesInFleet() {
        this.fleetService$ = this.fleetService.fetchFleet(this.fleetService.getFleetId()).subscribe(res => {
            this.fleetView = res;
            this.vehicles = res['vehicleView'];
            this.prepareVehicleMetrics();
        }, error => {
            this.loadingVehicles = false;
        });
    }

    prepareTotals() {
        this.totalDistance = _.sumBy(this.summary, 'businessKM').toFixed(2) + ' kms';
        this.totalTrips = _.sumBy(this.summary, 'businessTrips');
        this.totalDuration = Utils.displayTime(_.sumBy(this.summary, 'businessDrivenTime'));
        this.totalGaps = _.sumBy(this.summary, 'gaps');
        this.totalOverlaps = _.sumBy(this.summary, 'overlaps');
    }

    prepareVehicleMetrics() {
        console.log('Unique Vehicles ', _(this.summary).groupBy('vehicleId').value());
        const uniqueVehicles = _(this.summary).groupBy('vehicleId').value();
        _.forEach(this.vehicles, vehicle => {
            vehicle.totalDistance = _.sumBy(uniqueVehicles[vehicle.vehicleId], 'businessKM').toFixed(2);
            vehicle.trips = _.sumBy(uniqueVehicles[vehicle.vehicleId], 'businessTrips');
            vehicle.duration = Utils.displayTime(_.sumBy(uniqueVehicles[vehicle.vehicleId], 'businessDrivenTime'));
            vehicle.gaps = _.sumBy(uniqueVehicles[vehicle.vehicleId], 'gaps');
            vehicle.overlaps = _.sumBy(uniqueVehicles[vehicle.vehicleId], 'overlaps');
            vehicle.total = '2750 Kms';
            vehicle.license = vehicle.numberPlate.strLicense;
        });
        console.log('Vehicles', this.vehicles);
        this.loadingVehicles = false;
        this.prepareTotals();
    }

    getVehicleLogo(make) {
        if (make != null && make != undefined) {
            return Constants.GET_VEHICLE_LOGO(make);
        }
    }

    openDetail(data) {
        console.log('Data is', data);
        this.router.navigate(['../detail'], {queryParams: {'vehicle': data.vehicleId}, relativeTo: this.currentRoute});
    }

}
