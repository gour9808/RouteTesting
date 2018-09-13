import {FleetService} from '../../service/fleet.service';
import {ActivatedRoute, Router} from '@angular/router';
import {VehicleService} from '../../service/vehicle.service';
import {CommunicatorService} from '../../common/communicator.service';
import * as _ from 'lodash';
import {Constants} from '../../service/constants';
import {IFilterPipe} from '../../utils/pipes/filter.pipe';
import {ToastMessageService} from '../../service/toast-message.service';
import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AutoUnsubscribe} from '../../utils/auto-unsubscribe';
import {InputFieldSearchComponent} from '../../widgets/input-field-search/input-field-search.component';
import {CarbookRoles, GroupTypes, UserService} from 'app/service/user.service';

@Component({
    selector: 'cbp-vehicle-grid',
    templateUrl: './vehicle-grid.component.html',
    styleUrls: ['./vehicle-grid.component.scss']
})

@AutoUnsubscribe()
export class VehicleGridComponent implements OnInit, OnDestroy {
    fleetVehicle$;
    userVehicle$;
    driver: any;
    isFleet: boolean;
    vehicles: any = [];
    loadingVehicles: boolean = true;
    showDialog = false;
    fleetView: any;
    searchTerm: IFilterPipe = {} as IFilterPipe;
    sortvalue: IFilterPipe = {} as IFilterPipe;
    sortType = [{label: 'ALL', value: 'all'}, {label: 'AVAILABLE_VEHICLES', value: 'ACCEPTED'}, {label: 'PENDING_VEHICLES', value: 'PENDING'}];
    @ViewChild('search') searchBar: InputFieldSearchComponent;
    driverUserId: any;
    driverVehicles: any[] = [];
    commService$: any;

    constructor(private fleetService: FleetService, private currentRoute: ActivatedRoute, private userService: UserService, private toastMsg: ToastMessageService, private router: Router, private vehicleservice: VehicleService, private communicatorService: CommunicatorService) {
        this.commService$ = this.communicatorService.on('new-added', (dialogState: boolean) => {
            console.log('New Vehicle Added');
            this.showDialog = dialogState;
            this.getVehiclesInFleet();
        });
        this.driverUserId = this.userService.getUserId();
    }

    ngOnInit() {
        this.currentRoute
            .queryParams
            .subscribe(params => {
                // Defaults to 0 if no query param provided.
                this.showDialog = params['add'];
            });
        this.getVehiclesInFleet();

    }

    ngOnDestroy() {
    }

    checkQueryAndGetVehicles() {
        if (_.startsWith(this.router.url, '/fleet')) {
            this.isFleet = true;
            this.getVehiclesInFleet();
        } else {
            this.getVehicles();
        }
    }

    add() {
        this.router.navigate(['../search'], {relativeTo: this.currentRoute});
    }

    dialogStatus(event) {
        this.showDialog = event == true ? false : true;
    }

    getVehiclesInFleet() {
        this.fleetVehicle$ = this.fleetService.fetchFleet(this.fleetService.getFleetId()).subscribe(res => {
            this.fleetView = res;
            const obsList = [];
            _.forEach(res['vehicleIdList'], id => {
                obsList.push(this.vehicleservice.fetchVehicleInfo(id));
            });
            this.checkRole();
        })
    }

    checkRole() {
        const driverRole = this.userService.hasRole(GroupTypes.FLEET, this.fleetService.getFleetId(), CarbookRoles.DRIVER);
        driverRole == true ? this.checkSuperRole() : this.setUpDemoData(this.fleetView['vehicleView']);
    }

    checkSuperRole() {
        const superRole = this.userService.getRole(this.fleetService.getFleetId());
        if (_.includes(superRole, CarbookRoles[CarbookRoles.MANAGER]) || _.includes(superRole, CarbookRoles[CarbookRoles.CB_ADMIN])) {
            this.setUpDemoData(this.fleetView['vehicleView']);
        } else {
            this.loadDriverVehicle();
        }
    }

    loadDriverVehicle() {
        _.map(this.fleetView['vehicleView'], (vehicle) => {
            if (_.includes(vehicle['driverList'], this.driverUserId) || vehicle['currentDriver'] == this.driverUserId) {
                console.log('user is driver for vehicle', vehicle, this.driverUserId);
                this.driverVehicles.push(vehicle);
            }
        });
        this.setUpDemoData(this.driverVehicles);
    }

    setUpDemoData(array) {
        this.vehicles = [];
        console.log("all details", this.fleetView);
        array.forEach(vehicle => {
            this.vehicles.push({
                fleetId: this.fleetView.fleetId,
                vehicleId: vehicle.vehicleId,
                name: vehicle.name,
                make: vehicle.make,
                model: vehicle.model,
                variant: vehicle.variant ? vehicle.variant : "",
                license: vehicle.numberPlate.strLicense,
                freeStatus: vehicle.freeStatus,
                responseType: vehicle.responseType,
                profilePictureUrl: vehicle.profilePictureUrl,
                currentDriver: vehicle.currentDriver,
            })
        });
        this.vehicles = [...this.vehicles];
        this.vehicles = _.filter(this.vehicles, (vehicle) => vehicle.responseType != 'REJECTED');
        this.loadingVehicles = false;
        console.log("vehicles", this.vehicles);
    }

    getVehicles() {
        this.loadingVehicles = true;

        this.userVehicle$ = this.vehicleservice.fetchUserVehicles().subscribe(res => {
            const result = _.filter(res, function (val) {
                return !_.has(val, 'deleteReason');
            });
            this.vehicles = result;
            this.loadingVehicles = false;
            console.log('Vehicles are', this.vehicles);
            // this.getVehicleDriver();
        }, err => {
            this.toastMsg.showError("ERROR", "ERROR_FETCHING_USER_VEHICLES");
            console.log('Error in Getting Vehicle List');
            console.log(err);
        });
    }

    getVehicleLogo(make) {
        if (make != null && make !== undefined) {
            return Constants.GET_VEHICLE_LOGO(make);
        }
    }
}
