import {Component, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {Constants} from '../../service/constants';
import {ActivatedRoute} from '@angular/router';
import {VehicleService} from '../../service/vehicle.service';
import * as _ from 'lodash';
import * as cb from '../../models/vehicle';
import {ToastMessageService} from '../../service/toast-message.service';
import {AutoUnsubscribe} from '../../utils/auto-unsubscribe';
import {FleetService} from "../../service/fleet.service";
import * as moment from 'moment';
import {CarbookRoles, GroupTypes} from 'app/service/user.service';
import {UserService} from '../../service/user.service';


@Component({
    selector: 'cbp-vehicle-detail',
    templateUrl: './vehicle-detail.component.html',
    styleUrls: ['./vehicle-detail.component.scss']
})

@AutoUnsubscribe()
export class VehicleDetailComponent implements OnInit, OnDestroy {
    @Input() showDetail: boolean;
    vehicle: any;
    @ViewChild('tabsContainer', { read: ViewContainerRef }) tabsContainer;
    tabs = [
        { name: 'DETAILS', path: 'info', icon: 'mdi-car' },
        { name: 'EXPENSES', path: 'expenses', icon: 'mdi-credit-card-multiple' },
        { name: 'INSURANCE', path: 'insurance', icon: 'mdi-car' },
        { name: 'REMINDERS', path: 'reminders', icon: 'mdi-calendar-check' },
        { name: 'LOGBOOK', path: 'logbook', icon: 'mdi-library-books' },
        { name: 'LIVE_TRACKING', path: 'tracking', icon: 'mdi-map' },
        { name: 'GEO_FENCES', path: 'fence', icon: 'mdi-map-marker-radius' },

    ];
    metrics = [
        { icon: 'mdi-car', value: '0', label1: 'Total', label2: 'Trips' },
        { icon: 'mdi-car', value: '0', label1: 'Business', label2: 'Mileage' },
        { icon: 'mdi-car', value: '0', label1: 'Personal', label2: 'Mileage' },
        { icon: 'mdi-car', value: '0', label1: 'Total', label2: 'Mileage' }
    ];

    id: any;
    vehicleSub$;
    vehicleLKLSub$;
    vehicleInfo$;
    fleetDrivers$;
    driverList = {};
    drivers = [];
    loadingDrivers = true;
    driver: any;
    driver$: any;
    loadingDriver = true;
    staticMaps: any;
    geoCoderDetail: any;
    address: any = '-';
    lastUpdatedTime: any;
    loadingDetails: boolean = false;
    showDialog: boolean = false;
    userDriver: boolean = false;
    driverOnDuty: any;
    driverUserId: any;
    vehicleDriverList: any[] = [];
    searchTerm: any;
    constructor(private route: ActivatedRoute, private vehicleService: VehicleService, private userService: UserService,private toastMsg: ToastMessageService, private fleetService: FleetService) {
        console.log('id from driver detail', this.id);
    }

    ngOnInit() {
        console.log('Init Vehicle Detail');

        this.vehicleSub$ = this.vehicleService.getVehicle().subscribe(res => {
            this.vehicle = _.merge(new cb.Carbook.Vehicle(), res);
            this.vehicle.lastUpdateTime = this.vehicle.lastUpdateTime + 'z';
            this.vehicle.currentDriver != null ? this.getDriverInfo(this.vehicle.currentDriver) : this.driver = null;
            console.log('Gift from parent', this.vehicle);
            this.loadingDetails = true;
            this.setupMetrics();
            this.getLKL();
        }, error => {
            this.toastMsg.showError('ERROR', 'ERROR_FETCHING_VEHICLES_FOR_FLEET')
        });
        this.driverUserId = this.userService.getUserId();
        this.getFleetView();
    }

    getLKL() {
        this.vehicleLKLSub$ = this.vehicleService.fetchLastKnownLocation(this.vehicle.vehicleId).subscribe(res => {
            console.log('Last Known Location is', res);
            if (res && _.has(res, 'waypoints')) {
                this.setupLastKnownLocation(res);
                this.lastUpdatedTime = moment(res['lklLastUpdatedTime']).format('MMMM Do YYYY, h:mm:ss a');
            }
            console.log("lastUpdatedTime", this.lastUpdatedTime);
        })
    }

    setupLastKnownLocation(waypoints) {
        const coordinates = waypoints.resolvedAddress.geopoint;
        this.address = waypoints.resolvedAddress.housenumber;
        this.staticMaps = this.setupStaticMap(coordinates);
    }

    setupStaticMap(coordinates) {
        return `https://maps.googleapis.com/maps/api/staticmap?
            center=${coordinates.lat},${coordinates.lon}
            &markers=${coordinates.lat},${coordinates.lon}
            &scale=4&size=600x300&maptype=roadmap&key=AIzaSyCDAXGspOuqxMX_Ek1Idz5_Yamag1vog4o&format=png&visual_refresh=true`;
    }

    ngOnDestroy() {
    }

    getVehicleLogo(make) {
        if (make != null && make !== undefined && make.length > 1) {
            return Constants.GET_VEHICLE_LOGO(make);
        }
    }

    setupMetrics() {
        this.metrics[0].value = this.vehicle.numberOfTrips;
        this.metrics[1].value = this.vehicle.mileageBusiness;
        this.metrics[2].value = this.vehicle.mileagePrivate;
        this.metrics[3].value = '' + Math.round(this.vehicle.mileageBusiness + this.vehicle.mileagePrivate);
    }

    getDriverInfo(driverId) {
        this.driver$ = this.vehicleService.getDriverData(driverId).subscribe(res => {
            console.log('driver info', res);
            if(res){
                this.driver = res;
            }
            // this.toastMsg.showSuccess('SUCCESS', 'DRIVER_INFO');
            this.loadingDriver = false;
        }, error => {
            this.toastMsg.showError('ERROR', 'ERROR_FETCHING_DRIVER_INFO');
        })
    }

    getFleetView() {
        this.fleetDrivers$ = this.fleetService.fetchFleetView(this.fleetService.getFleetId()).subscribe(res => {
            console.log('FleetView view is', res);
            if (_.has(res, 'userProfile')) {
                this.driverList = res['userProfile'];
                this.getFleetDrivers();
            }
        }, error => {
            this.toastMsg.showError('ERROR', 'ERROR_FETCHING_FLEET_VIEW');
            this.loadingDrivers = false;
        });
    }

    getFleetDrivers() {
        this.vehicle.driverList = [];
        this.fleetDrivers$ = this.vehicleService.getAllDriverDuty(this.fleetService.getFleetId()).subscribe(res => {
            if(res) {
                _.mapValues(res, (driver, index) => {
                    driver == null ? this.vehicle.driverList.push(index) : this.vehicleDriverList.push({"driver": index, "vehicle": driver})
                });
                console.log("all offduty drivers",  this.vehicle.driverList);
                this.vehicle.driverList.length != 0 ? this.getDriverProfile() : '';
                this.checkRole();
            }
        }, error => {
            this.toastMsg.showError('ERROR', 'ERROR_FETCHING_FLEET_VIEW');
            this.loadingDrivers = false;
        });
    }

    getDriverProfile() {
        this.drivers = [];
        _.map(this.vehicle.driverList, (id) => this.drivers.push(_.find(this.driverList, ['userId', id])));
        console.log('Drivers', this.drivers);
        this.drivers = _.compact(this.drivers);
        this.loadingDrivers = false;
    }

    checkRole() {
        const driverRole = this.userService.hasRole(GroupTypes.FLEET, this.fleetService.getFleetId(), CarbookRoles.DRIVER);
        console.log("user is driver");
        driverRole == true ? this.userIsDriver() : this.userDriver = false;
        this.loadingDetails = true;
    }

    userIsDriver() {
        this.userDriver = true;
        console.log("check for drivers", this.vehicle.driverList);
        if(_.includes(this.vehicle.driverList, this.driverUserId)){
            this.driverOnDuty = false;
            console.log("driver is free");
        } else { console.log("driver is on duty"); this.checkVehicleOnDuty(); }
    }

    checkVehicleOnDuty() {
        this.driverOnDuty = true;
        const vehicle = _.find(this.vehicleDriverList, ['driver', this.driverUserId]);
        this.vehicle.vehicleId = vehicle.vehicle;
        console.log("vehicleDriverList", this.vehicleDriverList);
    }

    changeDuty(event) {
        console.log("change duty", event, this.userService.getUserId());
        event == true ? this.onDutyDriver(this.driverUserId) : this.offDutyDriver(this.driverUserId);
    }

    onDutyDriver(userId) {
        console.log("current vehicle id", this.vehicle.vehicleId);
        this.vehicleService.setDriverForVehicle(userId, this.vehicle.vehicleId)
        .subscribe(res => {
            this.toastMsg.showSuccess('SUCCESS', 'SET_CURRENT_DRIVER');
            this.loadingDetails = false;
            this.fetchLatest();
            this.showDialog = false;
        }, error => {
            this.toastMsg.showSuccess('ERROR', 'DRIVER_ALREADY_ASSIGNED');
        })
    }

    offDutyDriver(userId) {
        this.vehicleService.unsetDriverForVehicle(userId, this.vehicle.vehicleId)
        .subscribe(res => {
            this.toastMsg.showSuccess('SUCCESS', 'UNSET_CURRENT_DRIVER');
            this.loadingDetails = false;
            this.fetchLatest();
        }, error => {
            this.toastMsg.showSuccess('ERROR', 'DRIVER_ALREADY_ASSIGNED');
        })
    }

    fetchLatest() {
        this.vehicleInfo$ = this.vehicleService.fetchVehicleInfo(this.vehicle.vehicleId).subscribe(res => {
            this.vehicle = res;
            this.vehicleService.setVehicle(this.vehicle);
            this.vehicle.lastUpdateTime = this.vehicle.lastUpdateTime + 'z';
            this.vehicle.currentDriver != null ? this.getDriverInfo(this.vehicle.currentDriver) : this.driver = null;
            this.setupMetrics();
            this.getLKL();
            console.log('Vehicle Info', this.vehicle);
        }, error => {
            this.toastMsg.showError('ERROR', 'ERROR_FETCHING_VEHICLE_INFORMATION')
        });
        this.getFleetDrivers();
        this.loadingDetails = true;
    }
}
