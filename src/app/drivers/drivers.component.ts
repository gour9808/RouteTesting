import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FleetService} from '../service/fleet.service';
import {FleetView} from '../models/fleetview';
import * as _ from 'lodash';
import {Constants} from '../service/constants';
import {UserService} from '../service/user.service';
import {HandshakeService} from '../service/handshake.service';
import * as  HS from '../models/handshake';
import * as uuid from 'uuid';

import {ToastyService} from 'ng2-toasty';
import {CommunicatorService} from '../common/communicator.service';
import {ToastMessageService} from '../service/toast-message.service';
import {AutoUnsubscribe} from '../utils/auto-unsubscribe';

@Component({
    selector: 'cbp-drivers',
    templateUrl: './drivers.component.html',
    styleUrls: ['./drivers.component.scss']
})

@AutoUnsubscribe()
export class DriversComponent implements OnInit, OnDestroy {
    fleetView$;
    fleetVehicle$;
    handshake$;
    userMail$;
    userInfo$;
    vehicleDriver$;

    errorMessage: string;
    viewHeight_2: any;
    vehicleList: any = [];
    vehicles: any;

    handshake: HS.HandShake.HandshakeRequest;
    userInfo: any;
    fleetHandShakes;
    isHandshakePending: boolean;
    ready: boolean;
    @Output() onAddToFleet: any = new EventEmitter<any>();
    @Output() check = new EventEmitter<any>();
    @Input() loadingVehicles: boolean;
    @Input() showLog = true;
    @Input() showAdd = true;
    showEmailError = false;
    isFleet = false;
    searching = false;
    searchEmail: any = '';
    searchUsers: any[] = [];
    loadingDriversSearch = true;
    newUserList: any[] = [];
    loadingDrivers = true;
    drivers: any[] = [];
    selectedDriver: any;
    selectedVehicle: any = {};
    selectVehicle = false;
    fleetInfo = new FleetView();
    showDialog: boolean;
    showErrorForUser = false;
    driverCreate = true;

    constructor(private fleetService: FleetService, private userservice: UserService,
        private handshakeService: HandshakeService, private toastyService: ToastyService,
        private communicatorService: CommunicatorService, private toastMsg: ToastMessageService) {
    }

    ngOnInit() {
        console.log('Init Drivers');
        this.fetchFleetView();
        this.getVehiclesForFleet();
        const c = 'Drivers';
        this.check.emit(c);
        const driver = 'Drivers';
        this.communicatorService.broadcast('update-title', 'DRIVERS');
    }

    ngOnDestroy() { }

    fetchFleetView() {
        this.fleetView$ = this.fleetService.fetchFleetView(this.fleetService.getFleetId()).subscribe(res => {
            console.log('FleetView view is', res);
            this.drivers = _.filter(res['userProfile'], profile => res['driverIdList'].includes(profile.userId));
            console.log('Drivers', this.drivers);
            this.loadingDrivers = false;
        }, err => {
            this.toastMsg.showError("ERROR", "ERROR_FETCHING_FLEET_VIEW");
            console.log('Error in getting FleetView View');
            console.log(err);
            this.loadingDrivers = false;
        });
    }

    getVehiclesForFleet() {
        this.loadingVehicles = true;
        this.fleetVehicle$ = this.fleetService.fetchVehicleInFleet(this.fleetService.getFleetId()).subscribe(res => {
            this.vehicles = res;
            this.loadingVehicles = false;
            console.log('Vehicles are', this.vehicles);
            this.setUpVehicleList();
        }, err => {
            this.toastMsg.showError("ERROR", "ERROR_FETCHING_VEHICLES_IN_FLEET");
            console.log('Error in getting vehicles for fleet');
            console.log(err);
            this.loadingVehicles = false;
        });
    }

    //To filter based on the responseType if pending or accepted, it wont appear in the list
    setUpVehicleList() {
        this.vehicles.forEach(veh => {
            // if   (veh.responseType != 'ACCEPTED' && veh.responseType !='PENDING')
            this.vehicleList.push({ label: veh.name, value: veh, make: veh.make });
        })
    }

    searchEnabled() {
        return (this.searchEmail.length > 0 && !this.showEmailError);
    }

    //to remove all the vehicles that have already been assigned based on the vehicle id
    removeVehicleFromList(vehicleId) {
        console.log('deleting vehicle with vehicleId and senderUserId= ', vehicleId);
        _.remove(this.vehicleList, (vehicle: any) => {
            return vehicle.value.vehicleId == vehicleId;
        });
        console.log('vehicle list after removing vehicle from the list: ', this.vehicleList)
    }

    //to check if vehicle has been already assigned to someone else
    getHandshakeStatus() {
        this.handshake$ = this.handshakeService.checkIfHandshakePending(this.searchEmail).subscribe(res => {
            this.searching = false;
            console.log('Handshake Pending', res);
            if (res != null) {
                //check if any of the object has senderId same as fleetId or userId, otherwise this code will fail and you'll go home crying!!
                this.fleetHandShakes = _.filter(res, { senderUserId: this.userInfo.userId });
                console.log('FleetView shakes', this.fleetHandShakes);
                if (this.fleetHandShakes.length > 0) {
                    this.isHandshakePending = true;
                    this.setupPendingResults(this.fleetHandShakes);
                } else {
                    this.ready = true;
                }
                this.fleetHandShakes.forEach(element => {
                    console.log('for each element ', element);
                    this.removeVehicleFromList(element.vehicleId);
                })
            }

        }, err => {
            this.toastMsg.showError("ERROR", "ERROR_FETCHING_HANDSHAKE_STATUS");
            console.log('Error in getting Handshake Status');
            console.log(err);
        })

    }

    searchUser() {
        this.searchUsers = [];
        if (this.searchEmail.length > 0) {
            this.searching = true;
            this.showErrorForUser = false;
            this.userMail$ = this.userservice.fetchUserByEmail(this.searchEmail).subscribe(res => {
                console.log('Search results: ', res);
                if (res != null) {
                    const resu = _.get(res, 'results');
                    const result = _.map(resu, 'userprofile');
                    this.searchUsers = result;
                    console.log('Search Results', this.searchUsers);
                    this.fetchUserInfo();
                    this.loadingDriversSearch = false;
                    this.searching = false;
                    this.newUserList.push(this.searchUsers);
                    this.showErrorForUser = false;
                    this.getHandshakeStatus();
                    this.errorMessage = '';
                } else {
                    this.searching = false;
                    this.showErrorForUser = true;
                    this.errorMessage = 'User not found'
                }
            }, err => {
                this.toastMsg.showError("ERROR", "ERROR_FETCHING_USER_BY_EMAIL");
                console.log('Error in Searching User');
                console.log(err);
            });
        }
        // this.checkIfVehicleAssigned(this.searchEmail);
    }

    validateEmail(event) {
        const email = event;
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.showEmailError = !re.test(email);
        this.errorMessage = 'Invalid Email';
    }

    getVehicleLogo(make) {
        if (make != null && make != undefined) {
            return Constants.GET_VEHICLE_LOGO(make);
        }
    }

    clearSearch() {
        this.searchUsers.length = 0;
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


        // this.onAddToFleet.next(this.handshake);
    }


    fetchUserInfo() {
        this.userInfo$ = this.userservice.fetchUserInfo().subscribe(userInfo => {
            // this.handshakeinput.senderName = userInfo.displayname;
            // this.handshakeinput.senderEmail = userInfo.currentEMail;
            console.log('user info', userInfo);
            this.userInfo = userInfo;
            console.log('User info is', userInfo.currentEMail);
        }, err => {
            this.toastMsg.showError("ERROR", "ERROR_FETCHING_USER_INFORMATION");
            console.log('Error in getting User Info');
            console.log(err);
        });
    }

    getInfo(event) {
        this.selectedDriver = event.data;
    }

    searchVehicle(event) {

    }

    addUser(event) {

    }

    removeUser(event) {

    }


    // getInfo(e) {
    // console.log("clicked the p-column", e)
    // }

    clicked() {

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


        // this.removeVehicleFromList(this.handshake.vehicleId);
    }

    setupPendingResults(data) {
        this.ready = true;
    }

    createDriver() {
        console.log('here');
        this.driverCreate = !this.driverCreate;
    }

    onDriverSelected(event) {
        console.log('In driver selected function', event)
    }

}
