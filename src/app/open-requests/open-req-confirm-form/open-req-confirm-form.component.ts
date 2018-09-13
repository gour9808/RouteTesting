import {Component, OnDestroy, OnInit} from '@angular/core';
import {FleetService} from '../../service/fleet.service';
import {Constants} from '../../service/constants';
import {CommunicatorService} from '../../common/communicator.service';
import {RequestorService} from '../../service/requestor.service';
import * as  requestor from '../../models/requestor';
import {VehicleService} from '../../service/vehicle.service';
import * as _ from 'lodash';
import {OpenrequestService} from '../../service/openrequest.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastMessageService} from '../../service/toast-message.service';
import {AutoUnsubscribe} from '../../utils/auto-unsubscribe';

@Component({
  selector: 'cbp-open-req-confirm-form',
  templateUrl: './open-req-confirm-form.component.html',
  styleUrls: ['./open-req-confirm-form.component.scss']
})

@AutoUnsubscribe()
export class OpenReqConfirmFormComponent implements OnInit, OnDestroy {
  request$;
  fleetVehicle$;
  vehicleinfo$;
  updateVehicle$;
    rejectTrip$;
    fleetView$;

  creating: boolean;
  id: any;
  sub: any;
  selectedVehicle: any;
  requestModel: any;
  vehicles: any = [];
  cars: any;
  requestors: requestor.Requestor.RequestorDetails[];
  requestor: requestor.Requestor.RequestorDetails = new requestor.Requestor.RequestorDetails();
  confirmState: boolean;
  addressHack = {
    start: {
      description: ""
    }, end: {
      description: ""
    }
  };

  constructor(private fleetService: FleetService, private comms: CommunicatorService, private toastMsg: ToastMessageService, private requestorService: RequestorService, private vehicleService: VehicleService, private openRequest: OpenrequestService, private route: ActivatedRoute, private router: Router) {
    this.comms.on("confirm-request", request => {
      console.log('Showing confirm page');
    });
    console.log('Resolved', this.route.snapshot.queryParams['request']);
    this.id = this.route.snapshot.queryParams['request'];
    this.getRequest();
  }

  ngOnInit() {
    this.getVehiclesForFleet();
    this.comms.broadcast('update-title', 'Confirm Booking');
  }

  ngOnDestroy() { }

  getRequest() {
    this.request$ = this.openRequest.getRequest(this.id).subscribe(res => {
      console.log('Current Request', res);
      this.requestModel = res;
      this.addMarker(this.requestModel.openRequest.dropAddress, false);
      this.addMarker(this.requestModel.openRequest.pickupAddress, true);
      this.addWayPointMarker(this.requestModel.openRequest.wayPoints);
    }, error => {
      this.toastMsg.showError("ERROR", "NO_REQUESTS_FOUND");
    })
  }

  getVehiclesForFleet() {
    this.fleetVehicle$ = this.fleetService.fetchVehicleInFleet(this.fleetService.getFleetId()).subscribe(res => {
        const freeVehicles = _.filter(res, ['freeStatus', true]);
        console.log("freevehicles", freeVehicles);
        freeVehicles.forEach(veh => {
        this.getVehicleProfile(veh);
      })
    }, error => {
      this.toastMsg.showError("ERROR", "ERROR_FETCHING_VEHICLES_FOR_FLEET");
    });
  }

  getVehicleLogo(make) {
    if (make != null && make != undefined)
      return Constants.GET_VEHICLE_LOGO(make);
  }

  addMarker(event, start?) {
    console.log("Address", event);
    this.comms.broadcast("set-point-on-address", { address: event.city, point: event.geopoint, isStart: start });
  }

  addWayPointMarker(waypoints) {
    this.comms.broadcast("set-waypoint-on-address", waypoints);
  }

  setRequestor(event) {
    console.log('Setting requestor', event);
    this.requestor = event;
    this.requestModel.requestorId = event.id;
    this.requestModel.requestorEmail = event.emailId;
    this.requestModel.contacts = event.contacts;
  }

  getTime(time) {
    // return time + 'Z';
    return time;
  }

  setMessage(event) {
    this.requestModel.message = event;
  }

  confirm() {
    this.confirmState = true;
  }

  goForConfirm() {
    return this.selectedVehicle && !this.creating;
  }

  goForCreate() {
    return this.selectedVehicle;
  }

  setVehicle(vehicle) {
    console.log('Set Vehicle', vehicle);
    this.requestModel.vehicleId = vehicle.vehicleId;
    this.requestModel.driverId = vehicle.currentDriver;
    this.selectedVehicle = vehicle;
  }


//   fetchFleetView() {
//     this.fleetView$ = this.fleetService.fetchFleetView(this.fleetService.getFleetId()).subscribe(res => {
//         console.log('FleetView view is', res.vehicleView);
//         let freeVehicles = _.filter(res.vehicleView, ['freeStatus', true]);
//           console.log("free vehicle", freeVehicles);
//           freeVehicles.forEach(veh => {
//             this.getVehicleProfile(veh);
//           })
//     }, error => {
//         this.toastMsg.showError("ERROR", "ERROR_FETCHING_FLEET_VIEW")
//     });
// }

  getVehicleProfile(vehicle) {
    this.vehicleinfo$ = this.vehicleService.fetchVehicleInfo(vehicle.vehicleId).subscribe(res => {
        // console.log("all profile is", res);
      if (_.has(res, 'currentDriver')) {
        console.log('Vehicle Profile is', res);
        this.comms.broadcast("plot-vehicle", res);
        this.vehicles.push(res);
      }
    }, error => {
      this.toastMsg.showError("ERROR", "ERROR_FETCHING_VEHICLE_PROFILE");
    });
  }

  updateRequest() {
    this.updateVehicle$ = this.openRequest.updateRequestVehicle(this.requestModel.openRequestId, this.selectedVehicle.vehicleId, this.selectedVehicle.currentDriver).subscribe(res => {
      console.log('Assigned Driver', res);
      this.toastMsg.showSuccess("SUCCESS", 'DRIVER_ASSIGNED_SUCCESSFULLY');
      this.router.navigate(['../../list'], { queryParams: { type: 'fleet' }, relativeTo: this.route });
    }, error => {
      this.toastMsg.showError("ERROR", "ERROR_UPDATING_REQUEST");
    })
  }

    rejectTrip() {
        console.log('rejecting Trip');
        this.rejectTrip$ = this.openRequest.updateRequestStatus(this.requestModel.openRequestId, 'FLTMNG_REJECTED').subscribe(res => {
            console.log('Updated request status', res);
            this.toastMsg.showSuccess("SUCCESS", "TRIP_REJECTED_SUCCESSFULLY");
            this.router.navigate(['../../list'], {queryParams: {type: 'fleet'}, relativeTo: this.route});
        }, error => {
            this.toastMsg.showError("ERROR", "ERROR_REJECTED_TRIP");
        })
    }
}
