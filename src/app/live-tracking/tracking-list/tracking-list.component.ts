import {Component, OnInit} from '@angular/core';
import {CommunicatorService} from '../../common/communicator.service';
import {Constants} from '../../service/constants';
import * as _ from 'lodash';
import {VehicleService} from 'app/service/vehicle.service';
import * as moment from 'moment';

@Component({
    selector: 'cbp-tracking-list',
    templateUrl: './tracking-list.component.html',
    styleUrls: ['./tracking-list.component.scss']
})
export class TrackingListComponent implements OnInit {
    vehicleInfo$;
    filterVehicles: any;
    allVehicles: any;
    allDrivers: any;
    vehicles: any = [];
    vehicleIcon: any = {};
    carSvg = `M29.395,0H17.636c-3.117,0-5.643,3.467-5.643,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759
  c3.116,0,5.644-2.527,5.644-5.644V6.584C35.037,3.467,32.511,0,29.395,0z M34.05,14.188v11.665l-2.729,0.351v-4.806L34.05,14.188z
  M32.618,10.773c-1.016,3.9-2.219,8.51-2.219,8.51H16.631l-2.222-8.51C14.41,10.773,23.293,7.755,32.618,10.773z M15.741,21.713
  v4.492l-2.73-0.349V14.502L15.741,21.713z M13.011,37.938V27.579l2.73,0.343v8.196L13.011,37.938z M14.568,40.882l2.218-3.336
  h13.771l2.219,3.336H14.568z M31.321,35.805v-7.872l2.729-0.355v10.048L31.321,35.805z`;
    enableSwitch: boolean;
    selectedVehicle: any;
    selectedDriver: any;

    constructor(private comms: CommunicatorService, private vehicleService: VehicleService) {
        this.comms.on('tracking-vehicles', (payload) => {
            console.log('Payload from comms', payload);
            this.allVehicles = _.map(payload, o => _.extend({color: '#2c3e50', state: 'INACTIVE'}, o));
            this.vehicles = this.allVehicles;
            _.map(this.vehicles, (vehicle) => this.getLKL(vehicle));
            console.log("vehicle with lkl", this.vehicles);
        });
        this.comms.on('tracking-drivers', payload => {
            // console.log('Tracking Drivers', payload);
            this.allDrivers = payload;
        });
        this.comms.on('tracking-ready', vehicleId => {
            _.find(this.allVehicles, ['vehicleId', vehicleId]).color = '#e67e22';
            _.find(this.allVehicles, ['vehicleId', vehicleId]).state = 'IDLE';
            this.enableSwitchEvent();
        });
        this.comms.on('tracking-active', vehicleId => {
            _.find(this.allVehicles, ['vehicleId', vehicleId]).color = 'green';
            _.find(this.allVehicles, ['vehicleId', vehicleId]).state = 'ACTIVE';
            this.enableSwitchEvent();
        });
        this.comms.on('tracking-idle', vehicleId => {
            _.find(this.allVehicles, ['vehicleId', vehicleId]).color = '#e67e22';
            _.find(this.allVehicles, ['vehicleId', vehicleId]).state = 'IDLE';
            this.enableSwitchEvent();
        });
        this.comms.on('update-icon', (vehicleId, color) => {
            console.log('Update icon for vehicle', color);
            this.vehicleIcon[vehicleId] = color;
            console.log(this.vehicleIcon);
        });
    }

    getLKL(vehicle) {
        this.vehicleInfo$ = this.vehicleService.fetchLastKnownLocation(vehicle.vehicleId).subscribe(res => {
            if (res) {
                console.log('res LKL', res, res['lklLastUpdatedTime']);
                vehicle.lkl = moment(res['lklLastUpdatedTime']).format('lll');
            }
        })
    }

    ngOnInit() {
        console.log('Init Tracking List');
    }

    over(vehicle) {
        if (vehicle.state != 'INACTIVE') {
            this.comms.broadcast('map-bound', vehicle);
        }
        this.selectedVehicle = vehicle;
        this.selectedDriver = _.find(this.allDrivers, ['userId', vehicle.currentDriver])
    }

    unBound() {
        this.comms.broadcast('map-unbound');
        this.selectedVehicle = null;
        this.selectedDriver = null;
    }

    fitBounds(event) {
        this.comms.broadcast('fit-bound', event);
    }

    enableSwitchEvent() {
        this.enableSwitch = _.some(this.allVehicles, ['state', 'ACTIVE']);
    }

    filterActive(event) {
        console.log('Filter', event);
        if (event) {
            this.filterVehicles = _.filter(this.allVehicles, ['state', 'ACTIVE']);
            console.log('Filtered Active Vehicles', this.filterVehicles);
            this.vehicles = this.filterVehicles;
        } else {
            this.vehicles = this.allVehicles;
        }
    }

    getVehicleLogo(make) {
        if (make != null && make != undefined) {
            return Constants.GET_VEHICLE_LOGO(make);
        }
    }

}
