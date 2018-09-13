import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OpenrequestService} from '../../service/openrequest.service';
import {FleetService} from '../../service/fleet.service';
import {RequestorService} from '../../service/requestor.service';
import {Observable} from 'rxjs';
import * as _ from 'lodash';
import {ToastMessageService} from '../../service/toast-message.service';
import {Constants} from '../../service/constants';
import {CommunicatorService} from '../../common/communicator.service';
import {AutoUnsubscribe} from '../../utils/auto-unsubscribe';

@Component({
    selector: 'cbp-open-req-list',
    templateUrl: './open-req-list.component.html',
    styleUrls: ['./open-req-list.component.scss']
})

@AutoUnsubscribe()
export class OpenReqListComponent implements OnInit, OnDestroy {
    scrollWindow$;
    requestSub$;

    driverPanel: boolean;
    request: any = [];
    @ViewChild('scrollContainer') scrollContainer: ElementRef;
    @ViewChild('op') overlay: any;
    @ViewChild('vehicleOp') vehicleOverLay: any;
    @ViewChild('requestorOp') requestorOverLay: any;
    driverHoverItem: any = {};
    vehicleHoverItem: any = {};
    reqtrHoverItem: any = {};
    requests = [];
    sort = [{label: 'Pick Up Time', value: 'pickupTime'}, {label: 'Recently Updated', value: 'updated'}];
    filters = [
        {label: 'New Requests', value: 'RECEIVED'},
        {label: 'Assigned', value: 'ASSIGNED'},
        {label: 'Accepted', value: 'ACCEPTED'},
        {label: 'Trips Started', value: 'START_TRIP'},
        {label: 'Driver Arrived', value: 'ARRIVED'},
        {label: 'Ended Trip', value: 'USER_END_TRIP'},
        {label: 'Cancelled By User', value: 'USER_CANCELLED'},
        {label: 'Rejected By Driver', value: 'DRIVER_REJECTED'},
        {label: 'Cancelled By Driver', value: 'DRIVER_CANCELLED'},
        // { label: 'Cancelled By FleetView Manager', value: 'FLTMGR_CANCELLED' },
        {label: 'Emergency', value: 'SOS'}
    ];

    // RECEIVED, ASSIGNED, ACCEPTED, ARRIVED, START_TRIP, USER_END_TRIP, DRIVER_END_TRIP, FLTMGR_END_TRIP, USER_CANCELLED, DRIVER_CANCELLED, FLTMGR_CANCELLED, SOS
    selectedSort: any = 'updated';
    selectedStatus: any;
    filter: any;
    cars: any = [];
    loadingRequest = true;
    constructor(private router: Router, private route: ActivatedRoute, private msgService: ToastMessageService, private requestorService: RequestorService, private requestService: OpenrequestService, private fleetService: FleetService, private comms: CommunicatorService) {
    }

    ngOnInit() {
        this.comms.broadcast('update-title', 'All Bookings');
        this.scrollWindow$ = Observable
            .fromEvent(this.scrollContainer.nativeElement, 'scroll').debounceTime(50).subscribe((event) => {
                this.onScroll(event);
            });
        this.getAllRequestsInFleet();

    }

    ngOnDestroy() {
    }

    getColor(status) {
        switch (status) {
            // Assigned,Recieved,Started,Ended,Cancelled
            case 'ASSIGNED':
                return '#4885ed';
            case 'RECEIVED':
                return '#f4c20d';
            case 'ACCEPTED':
                return '#3cba54';
            case 'START_TRIP':
                return '#194D04';
            case 'USER_CANCELLED':
            case 'DRIVER_CANCELLED':
            case 'FLTMGR_CANCELLED':
                return '#db3236';
            case 'TRIP_IN_PROGRESS':
                return '#ff6d00';
            case 'AUTO_REJECT':
            case 'DRIVER_REJECTED':
            case 'FLTMNG_REJECTED':
            case 'FLTMNG_ABORTED':
            case 'USER_ABORTED':
            case 'DRIVER_ABORTED':
                return '#f90';
            case 'FLTMGR_END_TRIP':
            case 'USER_END_TRIP':
            case 'DRIVER_END_TRIP':
                return '#3f3ea1';
            case 'SOS':
                return "#ff0000";
        }
    }

    getIcon(status) {
        if (status) {
            switch (status) {
                // Assigned,Recieved,Started,Ended,Cancelled
                case 'ASSIGNED':
                    return 'mdi-account-check';
                case 'RECEIVED':
                    return 'mdi-arrow-down';
                case 'ACCEPTED':
                    return 'mdi-approval';
                case 'START_TRIP':
                case 'TRIP_STARTED':
                    return 'mdi-car';
                case 'TRIP_IN_PROGRESS':
                    return 'mdi-car-connected';
                case 'FLTMNG_ABORTED':
                case 'USER_ABORTED':
                case 'DRIVER_ABORTED':
                    return 'mdi-cancel';
                case 'FLTMGR_END_TRIP':
                case 'USER_END_TRIP':
                    return 'mdi-google-maps';
                case 'DRIVER_END_TRIP':
                    return 'mdi-flag-checkered';
                case 'USER_CANCELLED':
                case 'DRIVER_CANCELLED':
                case 'FLTMGR_CANCELLED':
                    return 'mdi-close';
                case 'AUTO_REJECT':
                case 'DRIVER_REJECTED':
                case 'FLTMNG_REJECTED':
                    return 'mdi-account-off';
                case 'SOS':
                    return 'mdi-alarm-light';
            }
        }
    }

    getStatus(status) {
        switch (status) {
            // Assigned,Recieved,Started,Ended,Cancelled
            case 'RECEIVED':
                return 'NEW_REQUEST';
            case 'ASSIGNED':
                return 'VEHICLE_ASSIGNED';
            case 'ACCEPTED':
                return 'DRIVER_ACCEPTED';
            case 'ARRIVED':
                return 'DRIVER_ARRIVED_AT_LOCATION';
            case 'START_TRIP':
                return 'TRIP_STARTED';
            case 'TRIP_IN_PROGRESS':
                return 'TRIP_IN_PROGRESS';
            case 'AUTO_REJECT':
                return 'AUTO_REJECT';
            case 'DRIVER_REJECTED':
                return 'REJECTED_BY_DRIVER';
            case 'FLTMNG_REJECTED':
                return 'REJECTED_BY_FLEET_MANAGER';
            case 'DRIVER_ABORTED':
                return 'ABORTED_BY_DRIVER';
            case 'FLTMNG_ABORTED':
                return 'ABORTED_BY_FLEET_MANAGER';
            case 'USER_ABORTED':
                return 'ABORTED_BY_USER';
            case 'USER_END_TRIP':
                return 'TRIP_ENDED_BY_USER';
            case 'DRIVER_END_TRIP':
                return 'TRIP_ENDED_BY_DRIVER';
            case 'FLTMGR_END_TRIP':
                return 'TRIP_ENDED_BY_FLEET_MANAGER';
            case 'USER_CANCELLED':
                return 'TRIP_CANCELLED_BY_USER';
            case 'DRIVER_CANCELLED':
                return 'TRIP_CANCELLED_BY_DRIVER';
            case 'FLTMGR_CANCELLED':
                return 'TRIP_CANCELLED_BY_FLEET_MANAGER';
            case 'SOS':
                return 'EMERGENCY';
        }
    }

    getVehicleLogo(make) {
        if (make != null && make !== undefined) {
            return Constants.GET_VEHICLE_LOGO(make);
        }
    }

    showMoreInfo(event, overlayPanel, item, driver?) {
        if (driver) {
            this.driverPanel = true;
            if (item.driverProfile) {
                this.driverHoverItem = {
                    name: item.driverProfile.displayname, email: item.driverProfile.currentEMail,
                    phone: item.driverProfile.phonenumbers, gender: item.gender, profilePhotoURL: item.driverProfile.profilePhotoURL
                };
                overlayPanel.toggle(event);
            }
        } else {
            this.driverPanel = false;
            if (item.vehicleView) {
                this.vehicleHoverItem = {
                    license: item.vehicleView.numberPlate.strLicense, make: item.vehicleView.make, name: item.vehicleView.name,
                    model: item.vehicleView.model, variant: item.vehicleView.variant, picture: item.vehicleView.profilePictureUrl
                };
                overlayPanel.toggle(event);
            }
        }
    }

    showRequestorInfo(event, overlayPanel, item) {
        this.reqtrHoverItem = {
            name: item.requestor.name, email: item.requestor.emailId,
            phone: item.requestor.contacts, profilePic: item.requestor.requestorImage
        };
        overlayPanel.toggle(event);
    }

    onScroll(event) {
        if (this.overlay) {
            this.overlay.hide();
        }
        if (this.vehicleOverLay) {
            this.vehicleOverLay.hide();
        }
        if (this.requestorOverLay) {
            this.requestorOverLay.hide();
        }
    }

    getAllRequestsInFleet() {
        this.loadingRequest = true;
        this.requests = [];
        const fleetId = this.fleetService.getFleetId();
        console.log('fleetId', fleetId);
        this.requestSub$ = this.requestService.fetchAllOpenRequests(fleetId).subscribe(res => {
            this.loadingRequest = false;
            if (res) {
                // this.requests = res;
                res.forEach((element) => {
                    this.requests.push({
                        id: element.openRequest.id,
                        requestorId: element.openRequest.requestorId,
                        carbookUserId: element.openRequest.carbookUserId,
                        pickupAddress: element.openRequest.pickupAddress.housenumber + ' ' + element.openRequest.pickupAddress.street + ' ' + element.openRequest.pickupAddress.city + ' ' + element.openRequest.pickupAddress.state,
                        dropAddress: element.openRequest.dropAddress.housenumber + ' ' + element.openRequest.dropAddress.street + ' ' + element.openRequest.dropAddress.city + ' ' + element.openRequest.dropAddress.state,
                        pickupTime: element.openRequest.pickupTime,
                        fleetId: element.openRequest.fleetId,
                        status: element.openRequest.status,
                        requestor: element.requestor,
                        driverProfile: element.driverProfile,
                        vehicleView: element.vehicleView,
                        duration: element.openRequest.status === 'START_TRIP' ? element.updateTime : 'TRIP_NOT_STARTED',
                        updated: element.openRequest.updateTime,
                    });
                });
                this.requests = _.orderBy(this.requests, 'updated', 'desc');
                console.log('Requests', this.requests);
            }
        })
    }

    sorting() {
        console.log('sort type', this.selectedSort);
        // switch(this.selectedSort){

        // }
    }

    checkStatusAndNavigate(item) {
        console.log(item);
        switch (item.status) {
            case 'RECEIVED':
                this.router.navigate([`../confirm`, item.id], {relativeTo: this.route, queryParams: {type: 'fleet', request: item.id}});
                break;
            default:
                this.router.navigate(['../detail/', item.id], {relativeTo: this.route, queryParams: {type: 'fleet'}});
                break;
        }

    }

    getTime(time) {
        // return time + 'Z';
        return time;
    }

}
