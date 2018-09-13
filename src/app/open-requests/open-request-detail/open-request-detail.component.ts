import {Component, OnDestroy, OnInit} from '@angular/core';
import {Constants} from '../../service/constants';
import {ActivatedRoute} from '@angular/router';
import {FleetService} from '../../service/fleet.service';
import {CommunicatorService} from '../../common/communicator.service';
import {RequestorService} from '../../service/requestor.service';
import {VehicleService} from '../../service/vehicle.service';
import {OpenrequestService} from '../../service/openrequest.service';
import * as _ from 'lodash';
import * as randomColor from 'randomcolor';
import {ToastMessageService} from '../../service/toast-message.service';
import {MapLoaderService} from "../../service/map-loader.service";
import {AutoUnsubscribe} from "../../utils/auto-unsubscribe";
import * as moment from 'moment';
import {Utils} from "../../utils/utils";

declare const google;

@Component({
  selector: 'cbp-open-request-detail',
  templateUrl: './open-request-detail.component.html',
  styleUrls: ['./open-request-detail.component.scss']
})

@AutoUnsubscribe()
export class OpenRequestDetailComponent implements OnInit, OnDestroy {
  request$;
  vehicleInfo$;
  endTrip$;
    cancelTrip$;
    abortTrip$;

  map: any;
  currentRequest: any;
  id: any;
  options: { center: { lng: number; lat: number; }; zoom: number; };
  overlays: any[] = [];
    tripduration: any;
  item: any = {
    'id': 1,
    'driver_name': 'Thacher Mapes',
    'driver_email': 'sgonthard0@sfgate.com',
    'driver_number': '126-237-2914',
    'requestor_name': 'Saunderson Gonthard',
    'requestor_email': 'sgonthard0@comsenz.com',
    'requestor_number': '485-346-6593',
    'vehicle_make': 'Volvo',
    'vehicle_model': 'V40',
    'start_address': '3 Briar Crest Terrace',
    'end_address': '6 Prairieview Point',
    'pick_up_time': '10:21 PM',
    'vehicle_license': 'MV6198',
    'request_status': 'Ended'
  };
  currentDriver: any = {};
  currentVehicle: any;
  start_marker;
  start_marker_info_window;
  point_marker;
  point_marker_info_window;
  end_marker;
  end_marker_info_window;
  vehicle_marker;
  vehicle_marker_info_window;
    aborttrip: boolean = false;
    canceltrip: boolean = false;
    endtrip: boolean = false;
  carSvg = 'M29.395,0H17.636c-3.117,0-5.643,3.467-5.643,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759 \
  c3.116,0,5.644-2.527,5.644-5.644V6.584C35.037,3.467,32.511,0,29.395,0z M34.05,14.188v11.665l-2.729,0.351v-4.806L34.05,14.188z \
  M32.618,10.773c-1.016,3.9-2.219,8.51-2.219,8.51H16.631l-2.222-8.51C14.41,10.773,23.293,7.755,32.618,10.773z M15.741,21.713 \
  v4.492l-2.73-0.349V14.502L15.741,21.713z M13.011,37.938V27.579l2.73,0.343v8.196L13.011,37.938z M14.568,40.882l2.218-3.336 \
  h13.771l2.219,3.336H14.568z M31.321,35.805v-7.872l2.729-0.355v10.048L31.321,35.805z';


  constructor(private fleetService: FleetService, private comms: CommunicatorService, private msgService: ToastMessageService, private requestorService: RequestorService, private vehicleService: VehicleService, private openRequestService: OpenrequestService, private route: ActivatedRoute, private msg: ToastMessageService) {

  }

  ngOnInit() {
    this.comms.broadcast('update-title', 'Booking Detail');
    this.options = {
      center: { lng: 77.66862, lat: 12.9195 },
      zoom: 14
    };
    MapLoaderService.load().then(() => {
      this.start_marker = new google.maps.Marker();
      this.start_marker_info_window = new google.maps.InfoWindow({ disableAutoPan: true });
      this.point_marker = new google.maps.Marker();
      this.point_marker_info_window = new google.maps.InfoWindow({ disableAutoPan: true });
      this.end_marker = new google.maps.Marker();
      this.end_marker_info_window = new google.maps.InfoWindow({ disableAutoPan: true });
      this.vehicle_marker = new google.maps.Marker();
      this.vehicle_marker_info_window = new google.maps.InfoWindow({ disableAutoPan: true });
        this.overlays.push(this.start_marker);
        this.overlays.push(this.end_marker);
    });
      console.log('Resolved', this.route.snapshot.params['reqId']);
      this.id = this.route.snapshot.params['reqId'];
    this.getRequest();
  }

  ngOnDestroy() { }

  getRequest() {
    this.request$ = this.openRequestService.getRequest(this.id).subscribe(res => {
      console.log('Current Request', Utils.flatten(res));
      this.currentRequest = {};
      this.currentRequest = Utils.flatten(res);
        this.currentRequest.openRequest_endTime != '' ? this.getTimeDiff() : this.tripduration = this.getStatus(this.currentRequest.openRequest_status);
      this.fetchVehicleInfo();
        this.showButton();
    }, error => {
      this.msgService.showError("ERROR", "ERROR_FETCHING_REQUEST");
    })
  }

    getTimeDiff() {
        const start = moment(this.currentRequest.openRequest_startTime);
        const end = moment(this.currentRequest.openRequest_endTime);
        const duration = moment.duration(end.diff(start));
        this.tripduration = duration.humanize();
        console.log('duration is', this.tripduration);
    }

  addMarkerByPoint() {
    this.start_marker.setIcon('https://maps.google.com/mapfiles/ms/icons/green-dot.png');
    this.start_marker.setPosition(new google.maps.LatLng(this.currentRequest.openRequest_pickupAddress_geopoint_lat, this.currentRequest.openRequest_pickupAddress_geopoint_lon));
    this.start_marker_info_window.setContent(this.currentRequest.openRequest_pickupAddress_city);
    this.start_marker_info_window.open(this.map, this.start_marker);
    this.end_marker.setIcon('https://maps.google.com/mapfiles/ms/icons/red-dot.png');
    this.end_marker.setPosition(new google.maps.LatLng(this.currentRequest.openRequest_dropAddress_geopoint_lat, this.currentRequest.openRequest_dropAddress_geopoint_lon));
    this.end_marker_info_window.setContent(this.currentRequest.openRequest_dropAddress_city);
    this.end_marker_info_window.open(this.map, this.end_marker);
    this.setBounds();
  }

  addMarkerWayPoint() {
    if (this.currentRequest.openRequest_wayPoints !== undefined) {
      this.currentRequest.openRequest_wayPoints.forEach((item, index) => {
        this.point_marker = new google.maps.Marker();
        this.point_marker_info_window = new google.maps.InfoWindow({ disableAutoPan: true });
        this.point_marker.setIcon('https://maps.google.com/mapfiles/ms/icons/blue-dot.png');
        this.point_marker.setPosition(new google.maps.LatLng(item.geopoint.lat, item.geopoint.lon));
        this.point_marker_info_window.setContent(item.city);
        this.point_marker_info_window.open(this.map, this.point_marker);
        this.overlays.push(this.point_marker);
        this.setBounds();
      });
    }
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

  setMap(event) {
    this.map = event.map;
    this.getLocation();
    this.addMarkerByPoint();
    this.addMarkerWayPoint();
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

  fetchVehicleInfo() {
    this.vehicleInfo$ = this.vehicleService.fetchVehicleInfo(this.currentRequest.vehicleView_vehicleId).subscribe(res => {
      console.log('Vehcle info is ', res);
      if (this.hasLastPosition(res)) {
        this.vehicle_marker.setIcon({
          path: this.carSvg, // url
          fillColor: randomColor({ luminosity: 'dark', hue: 'red' }),
          fillOpacity: 4,
          anchor: new google.maps.Point(25, 25),
          scale: .75,
          strokeWeight: 0,
          rotation: 0
        });
        this.vehicle_marker.setPosition({
          lat: _.has(res, 'lastKnownPosition.lat') ? res.lastKnownPosition.lat : 0,
          lng: _.has(res, 'lastKnownPosition.lon') ? res.lastKnownPosition.lon : 0
        });
        this.overlays.push(this.vehicle_marker);
      }
    }, error => {
      this.msgService.showError("ERROR", "ERROR_FETCHING_VEHICLE_INFORMATION");
    })
  }

  getVehicleLogo(make) {
    if (make != null && make !== undefined) {
      return Constants.GET_VEHICLE_LOGO(make);
    }
  }

  hasLastPosition(vehicle) {
    return _.has(vehicle, 'lastKnownPosition.lat') && _.has(vehicle, 'lastKnownPosition.lon');
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
  humanReadableDate(date) {
    // return date + 'Z';
    return date;
  }

    showButton() {
    switch (this.currentRequest.openRequest_status.toLowerCase()) {
      case 'assigned':
      case 'accepted':
          this.canceltrip = true;
        break;
      case 'start_trip':
          this.canceltrip = true;
          this.aborttrip = true;
          break;
        case 'trip_in_progress':
            this.endtrip = true;
        break;
    }
  }

    // endOrCancelTrip() {
    //   switch (this.currentRequest.openRequest_status.toLowerCase()) {
    //     case 'assigned':
    //     case 'accepted':
    //     case 'arrived':
    //       this.cancelTrip();
    //       break;
    //     case 'start_trip':
    //       this.endTrip();
    //       break;
    //   }
    // }

  endTrip() {
    console.log('Ending Trip');
    this.endTrip$ = this.openRequestService.updateRequestStatus(this.currentRequest.openRequest_id, 'FLTMGR_END_TRIP').subscribe(res => {
      console.log('Updated request status', res);
      this.msg.showSuccess("SUCCESS", "TRIP_ENDED_SUCCESSFULLY");
      this.getRequest();
    }, error => {
      this.msgService.showError("ERROR", "ERROR_ENDING_TRIP");
    })
  }

    abortTrip() {
        console.log('Abort Trip');
        this.abortTrip$ = this.openRequestService.updateRequestStatus(this.currentRequest.openRequest_id, 'FLTMNG_ABORTED').subscribe(res => {
            console.log('Updated request status', res);
            this.msg.showSuccess("SUCCESS", "TRIP_ABORTED_SUCCESSFULLY");
            this.getRequest();
        }, error => {
            this.msgService.showError("ERROR", "ERROR_ABORTING_TRIP");
        })
    }

  cancelTrip() {
    console.log('Cancelling Trip');
      this.cancelTrip$ = this.openRequestService.updateRequestStatus(this.currentRequest.openRequest_id, 'FLTMGR_CANCELLED').subscribe(res => {
      console.log('Updated request status', res);
      this.msg.showSuccess('SUCCESS', "TRIP_CANCELLED_SUCCESSFULLY");
      this.getRequest();
    }, error => {
      this.msgService.showError("ERROR", "ERROR_CANCELLING_TRIP");
    })
  }

}

// RECEIVED, ASSIGNED, ACCEPTED, ARRIVED, START_TRIP, USER_END_TRIP, DRIVER_END_TRIP, FLTMGR_END_TRIP, USER_CANCELLED, DRIVER_CANCELLED, FLTMGR_CANCELLED, SOS
