import {Component, OnDestroy, OnInit} from '@angular/core';
import {FleetService} from '../../service/fleet.service';
import {CommunicatorService} from '../../common/communicator.service';
import {VehicleService} from '../../service/vehicle.service';
import {ActivatedRoute, Router} from '@angular/router';
import {IFilterPipe} from '../../utils/pipes/filter.pipe';
import {ToastMessageService} from '../../service/toast-message.service';
import {AutoUnsubscribe} from '../../utils/auto-unsubscribe';
import * as _ from "lodash";

@Component({
  selector: 'cbp-driver-grid',
  templateUrl: './driver-grid.component.html',
  styleUrls: ['./driver-grid.component.scss']
})

@AutoUnsubscribe()
export class DriverGridComponent implements OnInit, OnDestroy {
  fleetView$;
  fleetvehicle$;

  filterTerm: any = '';
  vehicles: any;
  loadingVehicles: boolean;
  loadingDrivers = true;
  fleetInfo: any;
  drivers: any = [];
  filteredDrivers: any[];
  searchTerm: IFilterPipe = {} as IFilterPipe;
    showDialog: boolean;
    filterActive: any;
  constructor(private fleetService: FleetService, private comms: CommunicatorService, private toastMsg: ToastMessageService, private vehicleService: VehicleService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.fetchFleetView();
    this.getVehiclesForFleet();
  }

  ngOnDestroy() { }

  fetchFleetView() {
    this.fleetView$ = this.fleetService.fetchFleetView(this.fleetService.getFleetId()).subscribe(res => {
      console.log('FleetView view is', res);
        this.drivers = _.filter(res['userProfile'], profile => res['driverIdList'].includes(profile.userId));
        this.filteredDrivers = _.filter(res['userProfile'], profile => res['driverIdList'].includes(profile.userId));
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
    this.fleetvehicle$ = this.fleetService.fetchVehicleInFleet(this.fleetService.getFleetId()).subscribe(res => {
      this.vehicles = res;
      this.loadingVehicles = false;
      console.log('Vehicles are', this.vehicles);
    }, err => {
      this.toastMsg.showError("ERROR", "ERROR_FETCHING_VEHICLES_FOR_FLEET");
      console.log('Error in getting vehicles for fleet');
      console.log(err);
      this.loadingVehicles = false;
    });
  }

  openDriverDetail(driver) {
    console.log('Open driver detail', driver, driver.userId);
    this.comms.broadcast('driver-detail', driver);
    this.router.navigate(['../details', driver.userId], { relativeTo: this.route });
    // this.router.navigate(['/fleet/drivers/info'],{ queryParams : { 'id': driver.userId }})
  }

  openVehicleDetail() {
    console.log('Vehicle Detail');
    this.comms.broadcast('vehicle-detail');
  }
}
