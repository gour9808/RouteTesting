import {Component, OnDestroy, OnInit} from '@angular/core';
import {Constants} from '../../service/constants';
import {Router} from '@angular/router';
import {VehicleService} from '../../service/vehicle.service';
import * as _ from 'lodash';
import * as cb from '../../models/vehicle';
import {ToastMessageService} from '../../service/toast-message.service';
import {CarbookRoles, UserService} from '../../service/user.service';
import {Observable} from 'rxjs/Observable';
import {AutoUnsubscribe} from '../../utils/auto-unsubscribe';
import {Utils} from '../../utils/utils';
import {LogbookSummaryService} from '../../service/logbook-summary.service';
import {FleetService} from '../../service/fleet.service';
import * as moment from 'moment';

@Component({
    selector: 'cbp-vehicle-info',
    templateUrl: './vehicle-info.component.html',
    styleUrls: ['./vehicle-info.component.scss']
})
@AutoUnsubscribe()
export class VehicleInfoComponent implements OnInit, OnDestroy {
    vehicleSub$;
    vehicleInfo$;
    makemodel$;
    updateVehicle$;
    bookable$;
    userList$;
    resizeListener$;
    fleetDrivers$;
    display: boolean;
    vehicleLocation: any = {};
    vehicle: cb.Carbook.Vehicle = new cb.Carbook.Vehicle();
    results: any;
    brand: any;
    drivers: any[] = [];
    loadingDrivers = true;
    render = true;
    areaData = [{name: 'Utilization', series: []}];
    logbookSummary$: any;
    logbookSummaryList: any = [];
    fleetView$: any;
    vehicleList: any = [];
    driverList: any = [];
    logs: any;
    loadingSummaryList: boolean;
    fromDate: Date = Utils.getStartOfCurrentYear();
    toDate: Date = Utils.getEndOfCurrentDay();
    totalDistance: any;
    totalTrips: any;
    trackingId: any;
    constructor(private vehicleService: VehicleService, private userService: UserService, private router: Router, private toastMsg: ToastMessageService,
                private logbookSummary: LogbookSummaryService, private fleetService: FleetService) {
        this.resizeListener$ = Observable.fromEvent(window, 'resize')
            .debounceTime(1000)
            .subscribe((event) => {
                this.onResize(event);
            });
        this.prepareChartData();
    }

    prepareChartData() {
        Utils.getLast10Days().forEach(day => {
            this.areaData[0].series.push({
                'name': day, 'value': 100
            });
        })
    }

    getFleetView() {
        this.fleetView$ = this.fleetService.fetchFleetView(this.fleetService.getFleetId()).subscribe(res => {
            console.log('Fleetview is ', res);
            this.vehicleList = res['vehicleView'];
            this.driverList = res['userProfile'];
            this.getDriverProfile();
            this.getLogbookSummary();
        })
    }

    getLogbookSummary() {
        this.loadingSummaryList = true;
        this.logbookSummary$ = this.logbookSummary.fetchLogbookSummary(this.fleetService.getFleetId(), this.vehicle.vehicleId, null, this.fromDate.valueOf(), this.toDate.valueOf(), 'all')
            ._finally(() => this.loadingSummaryList = false)
            .subscribe(res => {
                if (res) {
                    console.table(res, ['businessTrips', 'privateTrips']);
                    this.logs = res;
                    this.checkIfDriver();
                    this.totalDistance = _.sumBy(this.logs, 'businessKM').toFixed(2);
                    this.totalTrips = _.sumBy(this.logs, 'businessTrips');
                    this.formatTableData();
                    this.prepareDriverMetrics();
                } else {
                    this.loadingSummaryList = false;
                }
            })
    }

    checkIfDriver() {
        const roles = this.userService.getRole(this.fleetService.getFleetId());
        if (roles.includes(CarbookRoles[CarbookRoles.DRIVER])) {
            console.log("fleet login is driver", this.userService.getUserId(), roles, _.filter(this.logs, ['driverId', this.userService.getUserId()]));
            this.logs = _.filter(this.logs, ['driverId', this.userService.getUserId()]);
        }
    }

    prepareDriverMetrics() {
        const uniqueDrivers = _(this.logs).groupBy('driverId').value();
        _.forEach(this.drivers, driver => {
            const distance = _.sumBy(uniqueDrivers[driver.userId], 'businessKM').toFixed(2);
            const trips = _.sumBy(uniqueDrivers[driver.userId], 'businessTrips');
            // console.log('Metrics ', distance, trips);
            driver.totalDistance = distance;
            driver.trips = trips;
        });
        console.log('Drivers ', this.drivers);
        this.drivers = _.compact(this.drivers);
    }

    fromChange(change) {
        console.log('From Changed', this.fromDate);
        this.fromDate.setHours(0, 0, 0, 0);
        if (this.fromDate > this.toDate) {
            console.log('Date Error');
            this.toastMsg.showError('INVALID_DATE_RANGE', 'FROM_DATE_CANT_BE_GREATER_TO_DATE');
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
            this.toastMsg.showError('INVALID_DATE_RANGE', 'TO_DATE_CANT_BE_LESSTHAN_FROM_DATE');
        } else {
            // proceed
            this.getLogbookSummary();
        }
    }

    formatTableData() {
        this.logbookSummaryList = [];
        this.logbookSummaryList = _.map(this.logs, (log: any) => {
            return {
                date: moment(log.date).format('MMM Do YYYY - ddd'),
                businessKM: log.businessKM.toFixed(2),
                businessTrip: log.businessTrips,
                gaps: log.gaps,
                overlaps: log.overlaps,
                sDate: log.sDate
            }
        });
        this.logbookSummaryList = _.orderBy(this.logbookSummaryList, 'sDate', 'desc');
        console.table(this.logbookSummaryList);
    }

    ngOnInit() {
        console.log('VehicleInfoComponent');
        this.vehicleSub$ = this.vehicleService.getVehicle().subscribe(res => {
            this.vehicle = _.merge(new cb.Carbook.Vehicle(), res);
            this.brand = this.vehicle.make + ' ' + this.vehicle.model + ' ' + this.vehicle.variant;
            console.log('Gift from parent', res);
            res.currentDriver ? this.vehicle.currentDriver = res.currentDriver : null;
            this.getFleetView();
            this.getTrackingMode();
        }, error => {
            this.toastMsg.showError('ERROR', 'ERROR_FETCHING_VEHICLES_FOR_FLEET')
        });
    }

    onResize(event) {
        console.log('Window Resize', event);
        this.render = false;
        setTimeout(() => {
            this.render = true;
        }, 500);
    }

    ngOnDestroy() {
    }

    checkQueryToVehicleDetails() {
        if (_.startsWith(this.router.url, '/fleet')) {
            this.router.navigate(['/fleet/vehicle'], {queryParams: {type: 'fleet'}})
        } else {
            this.router.navigate(['/user/vehicle'], {queryParams: {type: 'user'}})
        }
    }

    getVehicleLogo(make) {
        if (make != null && make !== undefined && make.length > 1) {
            return Constants.GET_VEHICLE_LOGO(make);
        }
    }

    fetchLatest() {
        this.vehicleInfo$ = this.vehicleService.fetchVehicleInfo(this.vehicle.vehicleId).subscribe(res => {
            console.log('Vehicle Info', res);
            this.vehicle = res;
            this.vehicleService.setVehicle(this.vehicle);
            console.log('Vehicle Id', this.vehicle.vehicleId);
            if (_.has(this.vehicle, 'lastKnownPosition')) {
                this.vehicleLocation.lat = this.vehicle.lastKnownPosition.lat;
                this.vehicleLocation.lng = this.vehicle.lastKnownPosition.lon;
            }
        }, error => {
            this.toastMsg.showError('ERROR', 'ERROR_FETCHING_VEHICLE_INFORMATION')
        });
    }

    getTrackingMode() {
        this.vehicleService.fetchTrackingMode(this.vehicle.vehicleId).subscribe(res => {
            const device = _.find(res, ['deviceType', 'OBD']);
            this.trackingId = device ? device['deviceId'] : '';
            console.log('Tracking mode is', this.trackingId);
        })
    }

    searchMakeAndModel(event) {
        this.makemodel$ = this.vehicleService.getMakeAndModel(event.query).subscribe(res => {
            console.log('Autocomplete result', res);
            this.results = res.newResults;
        }, error => {
            this.toastMsg.showError('ERROR', 'NO_MATCH_FOUND')
        })
    }

    selectedBrand(event) {
        console.log('Selected Brand', event);
        this.vehicle.make = event.object.make;
        this.vehicle.model = event.object.model;
        this.vehicle.variant = event.object.variant;
        this.brand = event.name;
    }

    updateVehicle() {
        console.log('vehicle name', this.vehicle.name);
        this.updateVehicle$ = this.vehicleService.updateVehicleInfo(this.vehicle.vehicleId, this.vehicle).subscribe(res => {
            console.log('updated vehicle', res);
            this.fetchLatest();
            this.toastMsg.showSuccess('SUCCESS', 'VEHICLE_DETAIL_UPDATED_SUCCESSFULLY');
        }, error => {
            this.toastMsg.showError('ERROR', 'ERROR_UPDATING_VEHICLE')
        })
    }

    updateTrackingMode() {
        const payload = {
            'deviceId': this.trackingId,
            'userId': this.userService.getUserId(),
            'vehicleId': this.vehicle.vehicleId,
            'active': true,
            'deviceType': 'OBD',
            'mode': 4,
        };
        if (this.trackingId) {
            this.vehicleService.updateTrackingMode(payload).subscribe(res => {
                console.log('Tracking Mode Updated', res);
                this.getTrackingMode();
            })
        }
    }

    deleteImage() {
        this.vehicle.profilePictureUrl = '';
        this.updateVehicle();
    }

    filterActive(event) {
        console.log('bookable', event);
        this.bookable$ = event ? this.vehicleService.makeBookable(this.vehicle.vehicleId) : this.vehicleService.makeNonBookable(this.vehicle.vehicleId);
        this.bookable$.subscribe(res => {
            event ? this.toastMsg.showSuccess('SUCCESS', 'VEHICLE_CAN_BE_BOOKED_FOR_SERVICE') : this.toastMsg.showSuccess('SUCCESS', 'VEHICLE_CANNOT_BE_BOOKED_FOR_SERVICE');
        })
    }

    getDriverProfile() {
        this.drivers = [];
        if (this.vehicle.driverList && this.vehicle.driverList.length) {
            console.log('Found Drivers', this.vehicle.driverList);
            const obsList = [];
            this.vehicle.driverList.forEach((id, index) => {
                const driver = _.find(this.driverList, ['userId', id]);
                this.drivers.push(driver);
            });
        }
        this.drivers = _.compact(this.drivers);
        this.getFleetDrivers();
        this.vehicle.currentDriver != null ? this.showCurrentDriver() : "";
        console.log('Drivers are', this.drivers);
        this.loadingDrivers = false;
    }

    showCurrentDriver() {
        const driverIndex = _.findIndex(this.drivers, ['userId', this.vehicle.currentDriver]);
        driverIndex > -1 ? this.drivers[driverIndex].currentDriver = this.drivers[driverIndex].userId : "";
    }

    showDialog() {
        this.display = true;
    }

    getFleetDrivers() {
        this.fleetDrivers$ = this.vehicleService.getAllDriverDuty(this.fleetService.getFleetId()).subscribe(res => {
            if (res) {
                _.mapValues(res, (index, driver) => {
                    let count = _.findIndex(this.drivers, ['userId', driver]);
                    count > -1 ? this.drivers[count].status = index : "";
                });
            }
        }, error => {
            this.toastMsg.showError('ERROR', 'ERROR_FETCHING_FLEET_VIEW');
            this.loadingDrivers = false;
        });
    }

    refreshDriver(event) {
        this.loadingDrivers = true;
        this.vehicleInfo$ = this.vehicleService.fetchVehicleInfo(this.vehicle.vehicleId).subscribe(res => {
            this.vehicleService.setVehicle(res);
            this.loadingDrivers = false;
        })
    }
}
