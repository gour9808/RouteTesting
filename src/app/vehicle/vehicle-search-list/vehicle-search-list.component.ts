import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FleetService} from '../../service/fleet.service';
import {Constants} from '../../service/constants';
import {VehicleService} from 'app/service/vehicle.service';
import {ToastMessageService} from '../../service/toast-message.service';
import {IFilterPipe} from '../../utils/pipes/filter.pipe';
import * as _ from 'lodash';


@Component({
    selector: 'vehicle-search-list',
    templateUrl: './vehicle-search-list.component.html',
    styleUrls: ['./vehicle-search-list.component.scss']
})

export class VehicleSearchListComponent implements OnInit, OnDestroy {
    vehicleDriver$: any;
    isDialogVisible: any;
    vehicles: any[] = [];
    @Input() driver;
    searchTerm: IFilterPipe = {} as IFilterPipe;
    progress = [];

    constructor(private fleetService: FleetService, private vehicleService: VehicleService, private toastMsg: ToastMessageService) {

    }

    ngOnDestroy(): void {

    }

    ngOnInit(): void {
        this.getVehiclesForFleet();
    }

    getVehiclesForFleet() {
        const fleetID = this.fleetService.getFleetId();
        this.fleetService.fetchVehicleInFleet(fleetID).subscribe(res => {

            this.vehicles = _.filter(res, vehicle => {
                if (_.has(res, 'responseType')) {
                    return vehicle['responseType'] == 'ACCEPTED';
                }
                else {
                    return true;
                }
            });

            this.vehicles = _.map(this.vehicles, vehicle => {
                if (_.has(vehicle, 'driverList')) {
                    vehicle.isDriverAssigned = vehicle['driverList'].includes(this.driver.userId);
                    return vehicle;
                } else {
                    return vehicle;
                }
            });
        }, err => {
            this.toastMsg.showError("ERROR", "ERROR_FETCHING_VEHICLES_FOR_FLEET");
            console.log('Error in Getting Vehicles For FleetView');
        });
    }

    getVehicleLogo(make) {
        if (make != null && make != undefined) {
            return Constants.GET_VEHICLE_LOGO(make);
        }
    }

    assignDriverToVehicle(vehicle, index) {
        this.progress[index] = true;
        const payload = {
            editorId: this.fleetService.getFleetId(),
            vehicleId: vehicle.vehicleId,
            event: 'VEHICLEADDDRIVER',
            driverId: this.driver.userId
        };
        this.vehicleDriver$ = this.vehicleService.setDriver(vehicle.vehicleId, payload).subscribe(res => {
            this.progress[index] = false;
            this.vehicles.filter(vehicleProfile => vehicleProfile.vehicleId == vehicle.vehicleId).map(vehicleProfile => vehicleProfile.isDriverAssigned = true);
            this.toastMsg.showSuccess('SUCCESS', 'DRIVER_ASSIGNED_TO_VEHICLE_SUCCESSFULLY')
        }, error => {
            this.toastMsg.showError("ERROR", "ERROR_ASSIGNING_DRIVER");
        })
    }
}
