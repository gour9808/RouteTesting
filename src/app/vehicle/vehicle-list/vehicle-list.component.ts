import {Constants} from '../../service/constants';
import {FleetService} from '../../service/fleet.service';
import {VehicleService} from '../../service/vehicle.service';
import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';

import {ActivatedRoute, Params, Router} from '@angular/router';
import {AutoUnsubscribe} from '../../utils/auto-unsubscribe';
import * as _ from 'lodash';
import {ToastMessageService} from '../../service/toast-message.service';

@AutoUnsubscribe()
@Component({
  selector: 'cbp-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
})
export class VehicleListComponent implements OnInit, OnDestroy {
  @Input() vehicles: any = [];
  currentRoute$;
  currentRouteId$;
  vehicleSub$;
  userVehicle$;

  @Input() loadingVehicles;
  @Input() isFleet = false;
  @Input() showAdd;
  @Output() onVehicleSelected = new EventEmitter<any>();
  @Output() onVehicleDeleted = new EventEmitter<any>();
  @Output() onAddNew = new EventEmitter<any>();
  vehicle: any;
  showDialog = false;
  @ViewChild('vehicleListTable') tableDiv: ElementRef;
  scrollH: any;
  scroll = false;
  // deleteVehicle : any = "" ;
  constructor(private fleetService: FleetService, private router: Router, private vehicleservice: VehicleService,
    private toastMsg: ToastMessageService, private currentRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.checkQueryAndGetVehicles();
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() { }

  checkQueryAndGetVehicles() {
    this.currentRoute$ = this.currentRoute.queryParams.subscribe((params: Params) => {
      console.log(params);
      const type = params['type'];
      console.log('Activated', type);
      switch (type) {
        case 'fleet':
          if (_.startsWith(this.router.url, '/fleet')) {
            this.isFleet = true;
            this.getVehiclesForFleet();
          }
          break;
        case 'user':
          this.isFleet = false;
          this.getVehicles();
          break;
      }
    }, err => {
      this.toastMsg.showError("ERROR", "ERROR_QUERY_FOR_VEHICLE");
      console.log('Error in query for vehicle ');
      console.log(err);
    });
  }

  checkQueryToGetVehicleDetails(vid) {
    this.currentRouteId$ = this.currentRoute.queryParams.subscribe((params: Params) => {
      console.log(params);
      const type = params['type'];
      console.log('Activated', type);
      switch (type) {
        case 'fleet':
          this.router.navigate(['/fleet/vehicle/details', vid]);
          break;
        case 'user':
          this.router.navigate(['/user/vehicle/details', vid]);
          break;
      }
    }, err => {
      this.toastMsg.showError("ERROR", "ERROR_QUERY_FOR_VEHICLE");
      console.log('Error in query for vehicle ');
      console.log(err);
    });
  }

  getVehiclesForFleet() {
    this.showDialog = true;
    this.loadingVehicles = true;
    const fleet = JSON.parse(localStorage.getItem('fleet'));
    this.fleetService.fetchVehicleInFleet(fleet.fleetId).subscribe(res => {
      this.vehicles = res;
      this.loadingVehicles = false;
      console.log('Vehicles are', this.vehicles);
      this.showDialog = false;
    }, err => {
      this.toastMsg.showError("ERROR", "ERROR_FETCHING_VEHICLES_FOR_FLEET");
      console.log('Error in Getting Vehicles For FleetView');

      console.log(err);
      this.loadingVehicles = false;
    });
  }

  getVehicles() {
    this.showDialog = true;
    this.vehicleservice.fetchUserVehicles().subscribe(res => {

      const result = _.filter(res, function (val) {
        return !_.has(val, 'deleteReason');
      });
      this.vehicles = result;
      this.loadingVehicles = false;
      console.log('Vehicles  are', this.vehicles);
      this.showDialog = false;
    }, err => {
      this.toastMsg.showError("ERROR", "ERROR_FETCHING_VEHICLES_OF_USER");
      console.log('Error in Getting Vehicle List');
      console.log(err);
    });
  }

  redirectToDetails(c) {
    console.log('c', c.vehicleId);
    this.checkQueryToGetVehicleDetails(c.vehicleId);
  }

  vehicleSelected(vehicle) {
    // if(this.deleteVehicle != event.data.vehicleId)
    console.log('coming', vehicle);
    this.onVehicleSelected.emit(vehicle);
  }

  vehicleDeleted(event) {
    // this.deleteVehicle = event.vehicleId;
    this.onVehicleDeleted.emit(event);
  }

  add() {
    console.log('Upon add vehicle', this.onAddNew);
    // since next is deprecated, better use emit() https://stackoverflow.com/questions/35840576/difference-between-eventemitter-next-and-eventemitter-emit-in-angular-2
    this.onAddNew.emit();
  }

  getVehicleLogo(make) {
    if (make != null && make != undefined) {
      return Constants.GET_VEHICLE_LOGO(make);
    }
  }

}
