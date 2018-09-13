import { Component, OnInit } from '@angular/core';
import { LogbookSummaryService } from "../../service/logbook-summary.service";
import { ActivatedRoute } from "@angular/router";
import { FleetService } from "../../service/fleet.service";
import { Utils } from "../../utils/utils";
import * as _ from "lodash";
import { Constants } from "../../service/constants";

@Component({
    selector: 'cbp-summary-detail',
    templateUrl: './summary-detail.component.html',
    styleUrls: ['./summary-detail.component.scss']
})
export class SummaryDetailComponent implements OnInit {

    route$: any;
    dateRange: any;
    summary: any;
    metrics: any;
    drivers: any = [];
    vehicles: any = [];
    fleetService$: any;
    fleetView: any;
    loadingDrivers: boolean;
    loadingVehicles: boolean;
    totalDistance: any = 0;
    totalTrips: any = 0;
    totalDuration: any = 0;
    totalGaps: any = 0;
    totalOverlaps: any = 0;

    constructor(private logbookSummaryService: LogbookSummaryService, private route: ActivatedRoute, private fleetService: FleetService) {
        this.metrics = [
            { icon: 'mdi-car', value: 0, label1: 'TOTAL_DURATION_DRIVEN', label2: '' },
            { icon: 'mdi-car', value: 0, label1: 'DISTANCE_COVERED_KMS', label2: '' },
            { icon: 'mdi-car', value: 0, label1: 'NUMBER_OF_TRIPS', label2: '' },
        ];
        this.route$ = this.route
            .queryParams
            .subscribe(params => {
                console.log('Params are', params);
                this.dateRange = params;
                this.getSummary();
            });

    }

    ngOnInit() {
    }

    getSummary() {
        this.logbookSummaryService.fetchLogbookSummary(this.fleetService.getFleetId(), null, null, this.dateRange.from, this.dateRange.to, 'aa')
            .subscribe(res => {
                console.log('Summary is', res);
                this.summary = res;
                this.prepareMetrics();
                this.getFleetView();
            })
    }

    getFleetView() {
        this.fleetService$ = this.fleetService.fetchFleetView(this.fleetService.getFleetId())
            .finally(() => {
                this.loadingDrivers = false;
                this.loadingVehicles = false;
            })
            .subscribe(res => {
                console.log('Fleet view is', res);
                this.fleetView = res;
                if (_.has(res, 'userProfile')) {
                    this.drivers = _.filter(res['userProfile'], profile => res['driverIdList'].includes(profile.userId));
                    this.vehicles = res['vehicleView'];
                    this.prepareDriverMetrics();
                    this.prepareVehicleMetrics();
                    this.prepareTotals();
                } else {
                    this.drivers = [];
                    this.loadingDrivers = false;
                }
            })
    }

    prepareMetrics() {
        const dateGroup = _.groupBy(this.summary, 'sDate');
        _.forEach(dateGroup, (date, id) => {
            this.metrics[0].value = Utils.displayTime(_.sumBy(date, 'businessDrivenTime'));
            this.metrics[1].value = _.sumBy(date, 'businessKM').toFixed(2);
            this.metrics[2].value = _.sumBy(date, 'businessTrips');
        });
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
            empty = { ...driver };
        });
        uniqueDrivers['null'] ? this.prepareNullDrivers(empty, uniqueDrivers) : '';
        console.log('Drivers ', this.drivers);
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
    }

    prepareTotals() {
        this.totalDistance = _.sumBy(this.summary, 'businessKM').toFixed(2);
        this.totalTrips = _.sumBy(this.summary, 'businessTrips');
        this.totalDuration = Utils.displayTime(_.sumBy(this.summary, 'businessDrivenTime'));
        this.totalGaps = _.sumBy(this.summary, 'gaps');
        this.totalOverlaps = _.sumBy(this.summary, 'overlaps');
    }

    getVehicleLogo(make) {
        if (make != null && make != undefined) {
            return Constants.GET_VEHICLE_LOGO(make);
        }
    }

}
