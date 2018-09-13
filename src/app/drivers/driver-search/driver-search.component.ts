import { Component, OnDestroy, OnInit } from '@angular/core';
import { FleetService } from '../../service/fleet.service';
import * as _ from 'lodash';
import * as  HS from '../../models/handshake';
import { UserService } from '../../service/user.service';
import { HandshakeService } from '../../service/handshake.service';
import * as uuid from 'uuid';
import { ToastMessageService } from '../../service/toast-message.service';
import * as cb from '../../models/vehicle';

import { AutoUnsubscribe } from '../../utils/auto-unsubscribe';
import { Utils } from '../../utils/utils';
import { IFilterPipe } from '../../utils/pipes/filter.pipe';
import { VehicleService } from '../../service/vehicle.service';
import { CommunicatorService } from '../../common/communicator.service';

@Component({
    selector: 'cbp-driver-search',
    templateUrl: './driver-search.component.html',
    styleUrls: ['./driver-search.component.scss']
})
@AutoUnsubscribe()
export class DriverSearchComponent implements OnInit, OnDestroy {
    vehicle: any;
    vehicleSub$: any;
    userMail$;
    vehicleDriver$;
    fleetDrivers$: any;
    userInfo: any;
    searching = false;
    searchUsers = [];
    loadingDriversSearch = true;
    newUserList: any[] = [];
    showErrorForUser = false;
    role = [{ label: 'Manager', value: 'manager' }, { label: 'Driver', value: 'driver' }];
    vehicles: any;
    loadingVehicles: boolean;
    handshake: HS.HandShake.HandshakeRequest;
    errorMessage: string;
    selectVehicle = false;
    showDialog: boolean;
    searchTerm: IFilterPipe = {} as IFilterPipe;
    drivers = [];
    loadingDrivers = true;
    progress = [];

    constructor(private fleetService: FleetService, private userService: UserService,
        private vehicleService: VehicleService, private handshakeService: HandshakeService,
        private toastMsg: ToastMessageService, private communicatorService: CommunicatorService) {
        this.communicatorService.on('reload_driver', () => {
            this.getFleetDrivers();
        })
    }

    ngOnInit() {
        this.getFleetDrivers();
        this.vehicleSub$ = this.vehicleService.getVehicle().subscribe(res => {
            this.vehicle = _.merge(new cb.Carbook.Vehicle(), res);
            console.log('Gift from parent', this.vehicle);
        }, error => {
            this.toastMsg.showError('ERROR', 'ERROR_FETCHING_VEHICLES')
        });
    }

    ngOnDestroy() {
    }

    getFleetDrivers() {
        this.fleetDrivers$ = this.fleetService.fetchFleetView(this.fleetService.getFleetId()).subscribe(res => {
            console.log('FleetView view is', res);
            if (_.has(res, 'userProfile')) {
                this.drivers = _.filter(res['userProfile'], profile => res['driverIdList'].includes(profile.userId));
                this.loadingDrivers = false;
            }
        }, error => {
            this.toastMsg.showError('ERROR', 'ERROR_FETCHING_FLEET_VIEW');
            this.loadingDrivers = false;
        });
    }

    setDriver(driver, index) {
        this.progress[index] = true;
        console.log('Setting Driver', driver, this.drivers);
        const payload = {
            editorId: this.fleetService.getFleetId(),
            vehicleId: this.vehicle.vehicleId,
            event: 'VEHICLEADDDRIVER',
            driverId: driver.userId
        };
        this.vehicleDriver$ = this.vehicleService.setDriver(this.vehicle.vehicleId, payload).subscribe(res => {
            console.log('Added Driver to vehicle', res);
            this.progress[index] = false;
            this.reloadVehicleInfo();
            this.toastMsg.showSuccess('Driver Added Successfully');
            _.remove(this.drivers, driver);
        }, error => {
            this.toastMsg.showError('Error Adding Driver', error);
        })
    }

    reloadVehicleInfo() {
        this.vehicleService.fetchVehicleInfo(this.vehicle.vehicleId).subscribe(res => {
            this.vehicleService.setVehicle(res);
        })
    }


    searchUser() {
        this.searchUsers = [];
        if (Utils.validateEmail(this.searchTerm.value)) {
            this.searching = true;
            this.showErrorForUser = false;
            this.userMail$ = this.userService.fetchUserByEmail(this.searchTerm.value).subscribe(res => {
                console.log('Search results: ', res);
                if (res != null) {
                    const result = _.map(_.get(res, 'results'), 'userprofile');
                    this.searchUsers = result;
                    console.log('Search Results', this.searchUsers);
                    this.loadingDriversSearch = false;
                    this.searching = false;
                    this.newUserList.push(this.searchUsers);
                    this.showErrorForUser = false;
                    this.errorMessage = '';
                } else {
                    this.searching = false;
                    this.showErrorForUser = true;
                    this.errorMessage = 'User not found'
                }
            }, err => {
                this.toastMsg.showError('ERROR', 'ERROR_FETCHING_USER_INFORMATION_BY_EMAIL');
                console.log('Error in Searching User');
                console.log(err);
            });
        }
    }

    /**
     * Get the vehicle license using vehicle id. Remove that vehicle from the vehicle dropdown.
     */
    getVehicleForPendingHandshake(shake) {
        const temp = _.filter(this.vehicles, {})
    }

    assignedVehicle(event) {
        console.log('event in add to fleet', event);
        this.selectVehicle = true;
        this.handshake = new HS.HandShake.HandshakeRequest();
        this.handshake.handshakeCategory = 'DRIVERINVITATION_FROM_OWNER_TO_DRIVER';
        this.handshake.handshakeId = uuid.v1();
        this.handshake.handshakeType = 'REQUEST';

        this.handshake.senderUserId = this.userInfo.userId;
        this.handshake.senderName = this.userInfo.displayname; //fleet name
        this.handshake.senderEmail = this.userInfo.currentEMail;
        this.handshake.senderUserId = this.userInfo.userId;

        this.handshake.receiverUserId = this.searchUsers[0].userId;
        this.handshake.receiverMember = true;
        this.handshake.receiverEmail = this.searchUsers[0].currentEMail;
        this.handshake.receiverName = this.searchUsers[0].displayname;

        this.handshake.vehicleMake = event.make;
        this.handshake.vehicleModel = event.model;
        // this.handshake.vehicleVariant = event.variant;
        this.handshake.vehiclePictureUrl = '';
        this.handshake.vehicleId = event.vehicleId;
    }

    addToFleet() {
        this.showDialog = true;
        this.vehicleDriver$ = this.handshakeService.addDriverToVehicle(this.handshake.vehicleId, this.handshake).subscribe(res => {
            console.log('Handshake for Driver', res);
            this.toastMsg.showSuccess('SUCCESS', 'VEHICLE_ASSIGNED_SUCCESSFULLY');
            this.showDialog = false;
        },
            err => {
                console.log('error', err);
                this.toastMsg.showError('ERROR', 'VEHICLE_ALREADY_ASSIGNED');
            });
    }

}
