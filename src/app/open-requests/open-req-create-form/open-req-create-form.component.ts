import { Component, OnDestroy, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { FleetService } from '../../service/fleet.service';
import { CommunicatorService } from '../../common/communicator.service';
import { RequestorService } from '../../service/requestor.service';
import * as  requestor from '../../models/requestor';
import * as  cbrf from '../../models/openrequest';
import { VehicleService } from '../../service/vehicle.service';
import * as _ from 'lodash';
import { OpenrequestService } from '../../service/openrequest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastMessageService } from '../../service/toast-message.service';

import { MapLoaderService } from '../../service/map-loader.service';
import { OrganisationService } from '../../service/organisation.service';
import { Cache } from '../../utils/storage.provider';
import { GroupTypes } from '../../service/user.service';
import { AutoUnsubscribe } from '../../utils/auto-unsubscribe';
import { Utils } from "../../utils/utils";
import * as $ from 'jquery';

import { GMap } from 'primeng/primeng';
import { query } from '@angular/animations';
import * as Rx from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

declare const google;
@Component({
    selector: 'cbp-open-req-create-form',
    templateUrl: './open-req-create-form.component.html',
    styleUrls: ['./open-req-create-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})


@AutoUnsubscribe()
export class OpenReqCreateFormComponent implements OnInit, OnDestroy {
    groupSub$;
    fleetRequest$;
    bookable$;
    createRequest$;
    createReuestor$;
    updateReuestor$;

    @Cache({ pool: 'GroupData' }) groupList: any;
    new: any;
    overlays: any[] = [];
    options: any;
    map;
    placedetail;
    selectedVehicle: any;
    minDate = new Date();
    wayPointTable: any = [];
    errorEmailMessage: string;
    error: boolean = false;

    // map marker
    myoverlay;
    start_marker;
    start_marker_info_window;
    end_marker;
    end_marker_info_window;
    point_marker;
    point_marker_info_window;
    allWayMarker = [];
    requestModel: cbrf.OpenRequest.PickupDropRequest = new cbrf.OpenRequest.PickupDropRequest();
    allWaypoints = [];
    vehicles: any = [];
    cars: any;
    requestors: requestor.Requestor.RequestorDetails[];
    requestor: requestor.Requestor.RequestorDetails = new requestor.Requestor.RequestorDetails();
    confirmState: boolean;
    addressHack = {
        start: {
            description: ''
        }, end: {
            description: ''
        }, way: {
            description: ''
        }
    };
    searching: boolean;
    pickUpNew: Date;
    showMap: boolean;
    nameError = "This field is required";
    lo = _;
    changevalue: boolean = false;
    debounceEmailSearch = _.debounce((query) => this.findRequestor(), 800, {});

    constructor(private fleetService: FleetService, private orgService: OrganisationService, private comms: CommunicatorService, private requestorService: RequestorService, private vehicleService: VehicleService, private openRequest: OpenrequestService, private router: Router, private route: ActivatedRoute, private msgService: ToastMessageService) {
        this.requestModel.pickupTime = new Date();
        MapLoaderService.load().then(() => {
            console.log('Map Loaded');
            this.placedetail = new google.maps.places.PlacesService(document.createElement('div'));
            this.showMap = true;
            this.start_marker_info_window = new google.maps.InfoWindow({ disableAutoPan: true });
            this.end_marker_info_window = new google.maps.InfoWindow({ disableAutoPan: true });
            this.start_marker = new google.maps.Marker({ optimized: false });
            this.end_marker = new google.maps.Marker({ optimized: false });
            this.point_marker_info_window = new google.maps.InfoWindow({ disableAutoPan: true });
            this.point_marker = new google.maps.Marker({ optimized: false });
            this.myoverlay = new google.maps.OverlayView();
            this.overlays.push(this.start_marker);
            this.overlays.push(this.end_marker);
        })
    }

    ngOnInit() {
        this.options = {
            center: { lng: 77.66862, lat: 12.9195 },
            zoom: 14
        };

        // this.overlays.push(this.point_marker);
        this.getFieldForceId();
        this.new = this.route.snapshot.queryParams['request'];
        this.comms.broadcast('update-title', 'New Booking');
        this.getRequestorsForFleet();
        this.requestModel.fleetId = this.fleetService.getFleetId();
        this.requestor.fleetId = this.fleetService.getFleetId();
        this.requestor.organisationId = this.fleetService.getOrgId();
    }

    ngOnDestroy() { }

    getFieldForceId() {
        this.groupSub$ = this.orgService.getSubGroupDetails(this.fleetService.getFleetId()).subscribe(res => {
            console.log('Sub Groups are', res);
            const group = _.find(res['data'].childGroups, ['groupType', GroupTypes[GroupTypes.FIELD_FORCE_DEPT]]);
            console.log('Field Force Group', group);
            this.requestModel.fieldForceId = group.groupId;
        }, error => {
            this.msgService.showError("ERROR", "ERROR_FETCHING_SUB_GROUP_DETAILS");
        });
    }

    getRequestorsForFleet() {
        this.fleetRequest$ = this.requestorService.getRequestorForFleet(this.fleetService.getFleetId()).subscribe(res => {
            console.log('Requestors are', res);
            this.requestors = res;
        }, error => {
            this.msgService.showError("ERROR", "ERROR_FETCHING_REQUESTORS");
        })
    }


    setRequestorFromSomething(event) {
        console.log('Setting requestor', event);
        this.requestor = event;
        this.requestModel.requestorId = event.id;
        this.requestModel.requestorEmail = event.emailId;
        this.requestModel.contacts = event.contacts;
    }

    setPickUpAddress(address) {
        this.requestModel.pickupAddress.city = address.formatted_address;
        this.requestModel.pickupAddress.geopoint.lat = address.geometry.location.lat();
        this.requestModel.pickupAddress.geopoint.lon = address.geometry.location.lng();
        this.addressHack.start.description = address.formatted_address;
    }

    setDropAddress(address) {
        this.requestModel.dropAddress.city = address.formatted_address;
        this.requestModel.dropAddress.geopoint.lat = address.geometry.location.lat();
        this.requestModel.dropAddress.geopoint.lon = address.geometry.location.lng();
        this.addressHack.end.description = address.formatted_address;
        console.log('object drop', this.requestModel);
    }

    setWayPoints(address) {
        if (this.allWaypoints !== undefined) {
            this.allWaypoints.push({
                'id': address.id, 'city': address.formatted_address,
                'geopoint': { 'lat': address.geometry.location.lat(), 'lon': address.geometry.location.lng() }
            });
        }
    }

    setTime(event) {
        this.requestModel.pickupTime = event;
        this.requestModel.advanceBooking = true;
    }

    setMessage(event) {
        this.requestModel.message = event;
    }

    valEmail(event) {
        this.error = true;
    }

    goForConfirm() {
        return !this.searching && this.requestor.name && this.requestor.contacts && this.requestor.emailId && this.requestModel.pickupAddress.city && this.requestModel.dropAddress.city;
    }

    wayPointConfirm() {
        return !this.requestModel.wayPoints;
    }

    back() {
        this.confirmState = false;
    }

    goForCreate() {
        return true// this.goForConfirm() && this.requestModel.vehicleId && this.requestModel.driverId;
    }

    setVehicle(vehicle) {
        console.log('Set Vehicle', vehicle);
        this.requestModel.vehicleId = vehicle.vehicleId;
        this.requestModel.driverId = vehicle.currentDriver;
        this.selectedVehicle = vehicle;
    }

    makeBookable(vehicle) {
        if (!vehicle.bookable) {
            this.bookable$ = this.vehicleService.makeBookable(vehicle.vehicleId).subscribe(res => {
                console.log('Booked');
                this.msgService.showSuccess("SUCCESS", "SUCCESSFULLY_MADE_BOOKABLE")
            }, error => {
                this.msgService.showError("ERROR", "ERROR_MAKING_VEHICLE_BOOKABLE");
            })
        }
    }

    setPickupTime() {
        const newPickup = this.convertTomilli(this.requestModel.pickupTime);
        this.requestModel.pickupTime = newPickup;
    }

    selectAction() {
        this.searching = true;
        if (this.requestor.id) {
            this.updateRequestor();
        } else {
            this.createRequestor();
        }
    }

    updateRequestor() {
        this.requestor.organisationId = this.fleetService.getOrgId();
        console.log("update requestor", this.requestor);
        this.updateReuestor$ = this.requestorService.updateRequestorDetails(this.requestor.id, this.requestor).subscribe(res => {
            console.log('Requestor Updated', res);
            this.createRequest();
        }, err => {
            this.msgService.showError("ERROR", "'ERROR_UPDATING_REQUEST'");
            this.createRequest();
        })
    }

    createRequestor() {
        this.setRequestModel();
        console.log(this.requestor, this.requestModel);
        this.createReuestor$ = this.requestorService.createRequestor(Utils.pruneEmpty(this.requestor)).subscribe(res => {
            this.requestModel.requestorId = res['reportObjId'];
            this.createRequest();
        }, error => {
            this.msgService.showError("ERROR", "'ERROR_CREATE_REQUESTOR'");
        })
    }


    createRequest() {
        this.requestModel.wayPoints = [];
        this.requestModel.wayPoints = this.wayPointTable.slice();
        this.setPickupTime();
        console.log('Request Model', this.requestModel);
        this.createRequest$ = this.openRequest.createRequest(this.requestModel).subscribe(res => {
            console.log('Created Request', res);
            this.msgService.showSuccess("SUCCESS", 'REQUEST_CREATED_SUCCESSFULLY');
            this.router.navigate(['../list'], { queryParams: { type: 'fleet' }, relativeTo: this.route });
        }, error => {
            this.msgService.showError("ERROR", "ERROR_CREATING_REQUEST");
        })
    }

    /* set requestor and request */
    removePhone(event) {
        _.pull(this.requestor.contacts, event);
        console.log("removed", this.requestor.contacts);
    }


    addPhone(event) {
        let phone = event;
        if (localStorage.getItem('countryCode') == 'IN') {
            phone = "+91" + event;
        } else if (localStorage.getItem('countryCode') == 'DE') {
            phone = "+49" + event;
        } else {
            phone = "+91" + event;
        }
        this.requestor.contacts.push(phone);
        console.log("phone change", this.requestor.contacts);
    }

    searchEmail(val) {
        this.valEmail(val);
        this.debounceEmailSearch(val);
    }

    findRequestor() {
        this.requestorService.getRequestorByEmail(this.requestor.emailId).subscribe(res => {
            this.setRequestor(res);
        }, error => {
            this.emptyRequestor();
        });
    }

    setRequestor(res) {
        this.requestor.id = res.id;
        this.requestor.emailId = res.emailId;
        this.requestor.contacts = res.contacts;
        this.requestor.name = res.name;
        this.setRequestModel();
        console.log("requestor value", this.requestor);
    }

    emptyRequestor() {
        this.requestor.contacts = [];
        this.requestor.name = '';
        // console.log("requestor value", this.requestor);
    }

    setRequestModel() {
        this.requestModel.requestorId = this.requestor.id;
        this.requestModel.requestorEmail = this.requestor.emailId;
        this.requestModel.contacts = this.requestor.contacts;
    }

    convertTomilli(date) {
        const c = new Date(date);
        const d = c.getTime();
        console.log('In milliseconds', d);
        return d;
    }

    addWayPoints(event) {
        this.wayPointTable = this.allWaypoints.slice();
        console.log('wayPointTable', this.wayPointTable);
        this.addressHack.way = null;
        console.log(this.overlays);
    }

    removeWay(event, index) {
        this.overlays.forEach((overlay, index) => {
            if (overlay instanceof google.maps.Marker) {
                const newindex = _.findIndex(this.overlays, { 'data': { 'id': event.id } });
                if (newindex > 0) {
                    this.overlays.splice(newindex, 1);
                }
            }
        });
        this.allWaypoints.splice(index, 1);
        this.wayPointTable = this.allWaypoints.slice(); // display table of waypoint updated
    }


    setMap(event) {
        this.map = event.map;
        //set an id for overlay map
        this.myoverlay.draw = function () {
            this.getPanes().markerLayer.id = 'markerLayer';
        };
        this.myoverlay.setMap(this.map);
        this.getLocation();
        console.log('map ready', this.map);
    }

    getLocation() {
        if (navigator.geolocation) {
            console.log('Getting location');
            navigator.geolocation.getCurrentPosition(position => {
                console.log(position);
                this.options = {
                    center: { lng: position.coords.longitude, lat: position.coords.latitude },
                    zoom: 14
                };
                this.map.panTo(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
            });
        }
    }

    getAutoPlaces(e, start?) {
        this.placedetail.getDetails({ placeId: e.place_id }, (results, status) => {
            if (results) {
                console.log('Place result ', results);
                this.addMarker(results, start);
            }
        });
    }


    addMarker(event, start?) {
        console.log('Address event', event);
        if (start) {
            this.start_marker.setIcon('./../../../assets/pin_green.png');
            this.start_marker.setPosition(new google.maps.LatLng(event.geometry.location.lat(), event.geometry.location.lng()));
            this.start_marker.setAnimation(google.maps.Animation.DROP);
            this.start_marker_info_window.setContent(event.adr_address);
            this.start_marker_info_window.open(this.map, this.start_marker);
            this.setPickUpAddress(event);
        } else {
            this.end_marker.setIcon('./../../../assets/pin_red.png');
            this.end_marker.setPosition(event.geometry.location);
            this.end_marker.setAnimation(google.maps.Animation.DROP);
            this.end_marker_info_window.setContent(event.adr_address);
            this.end_marker_info_window.open(this.map, this.end_marker);
            this.setBounds();
            this.setDropAddress(event);
        }
    }

    addMarkerWay(event) {
        this.placedetail.getDetails({ placeId: event.place_id }, (results, status) => {
            if (results) {
                console.log('Place result ', results);
                this.allWayMarker.push(results);

                this.allWayMarker.forEach((item, index) => {
                    this.setPointMarker(results);
                });
                this.setWayPoints(results);
            }
        });
    }

    setPointMarker(event) {
        this.point_marker = new google.maps.Marker({ optimized: false });
        this.point_marker_info_window = new google.maps.InfoWindow({ disableAutoPan: true });
        this.point_marker.setIcon('./../../../assets/pin_blue.png');
        this.point_marker.setPosition(new google.maps.LatLng(event.geometry.location.lat(), event.geometry.location.lng()));
        this.point_marker['data'] = event;
        this.end_marker.setAnimation(google.maps.Animation.DROP);
        this.point_marker_info_window.setContent(event.adr_address);
        this.point_marker_info_window.open(this.map, this.point_marker);
        this.overlays.push(this.point_marker);
    }

    setBounds() {
        const bounds = new google.maps.LatLngBounds();
        this.overlays.forEach(marker => {
            if (marker instanceof google.maps.Marker) {
                bounds.extend(marker.getPosition());
            }
        });
        setTimeout(() => { // map will need some time to load
            this.map.fitBounds(bounds); // Map object used directly
        }, 1000);
    }

}