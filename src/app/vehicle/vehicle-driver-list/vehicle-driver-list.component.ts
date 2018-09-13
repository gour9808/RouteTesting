import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IFilterPipe} from '../../utils/pipes/filter.pipe';
import {VehicleService} from '../../service/vehicle.service';
import {Carbook} from '../../models/vehicle';
import * as _ from 'lodash';
import {ToastMessageService} from '../../service/toast-message.service';
import * as cd from '../../models/drivers';
import {Driver} from '../../models/drivers';
import {UserService} from '../../service/user.service';
import RemoveType = Driver.RemoveType;
import Event = Driver.Event;
import RemoveReason = Driver.RemoveReason;
import { CommunicatorService } from 'app/common/communicator.service';


@Component({
    selector: 'cbp-vehicle-driver-list',
    templateUrl: './vehicle-driver-list.component.html',
    styleUrls: ['./vehicle-driver-list.component.scss'],
})
export class VehicleDriverListComponent implements OnInit {
    @Input() drivers: any = [];
    @Input() loadingDrivers: boolean;
    @Output() driverSelected: any = new EventEmitter<any>();
    @Input() showLog: boolean;
    @Input() showAdd: boolean;
    @Output() refreshDriver: any = new EventEmitter<any>();
    selectedDriver: any;
    searchTerm: IFilterPipe = {} as IFilterPipe;
    showDialog: boolean;
    totalDistance: any;
    vehicle: any;
    currentDriver: any;
    vehicleInfo$: any;
    vehicleService$: any;
    user$: any;
    deleteDriver$: any;
    setDriver$;
    unsetDriver$;
    vehicleDriverService$: any;
    showSetDriver: any;
    isSetDriver: boolean;
    isRemoveDriver: boolean;
    removeDriver: cd.Driver.RemoveDriver = new cd.Driver.RemoveDriver;
    showOptions: any = {};
    removingVehicle: boolean;
    constructor(private vehicleService: VehicleService, private toastMessage: ToastMessageService, private userService: UserService,private communicatorService: CommunicatorService) {
        this.vehicleService$ = this.vehicleService.getVehicle().subscribe(res => {
            this.vehicle = _.merge(new Carbook.Vehicle(), res);
            console.log('Vehicle is', res);
            this.showSetDriver = !res.currentDriver;
            console.log('showSetDriver', this.showSetDriver);
        })
    }

    ngOnInit() {
    }

    removeChange(data) {
        this.isRemoveDriver = data;
    }

    driverCahnge(data) {
        this.isSetDriver = data;
    }

    checkDriver(driver) {
        console.log('driver selected', driver);
        if (this.vehicle.currentDriver) {
            this.isSetDriver = true;
            this.selectedDriver = driver;
        } else {
            this.setCurrentDriver(driver);
        }
    }

    changeCurrentDriver(driver) {
        this.isSetDriver = false;
        this.offDutyDriver(this.vehicle.currentDriver);
        setTimeout(() => {
            this.setCurrentDriver(driver);
        }, 1500);
    }

    setCurrentDriver(driver) {
        console.log('Set driver', driver);
        this.setDriver$ = this.vehicleService.setDriverForVehicle(driver.userId, this.vehicle.vehicleId)
            .subscribe(res => {
                this.toastMessage.showSuccess('DRIVER_ASSIGNED', driver.displayname + ' is set as driver for ' + this.vehicle.name);
                this.fetchLatest();
            })
    }

    offDutyDriver(userId) {
        console.log('off duty driver', userId);
        this.unsetDriver$ = this.vehicleService.unsetDriverForVehicle(userId, this.vehicle.vehicleId)
            .subscribe(res => {
                this.toastMessage.showSuccess('SUCCESS', 'UNSET_CURRENT_DRIVER');
                this.fetchLatest();
            }, error => {
                this.toastMessage.showSuccess('ERROR', 'DRIVER_ALREADY_ASSIGNED');
            })
    }

    fetchLatest() {
        setTimeout(() => {
            this.refreshDriver.emit(true);
        }, 1000);
    }

    public getDriversCount() {
        return this.drivers.length;
    }

    setPayload() {
        this.removeDriver.vehicleId = this.vehicle.vehicleId;
        this.removeDriver.event = Event[Event.VEHICLEREMOVEDRIVER];
        this.removeDriver.removeType = RemoveType[RemoveType.OWNER_REMOVED_DRIVER];
        this.removeDriver.ownerId = this.vehicle.ownerId;
        this.removeDriver.vehicleMake = this.vehicle.make;
        this.removeDriver.vehicleModel = this.vehicle.model;
        this.removeDriver.vehicleVariant = this.vehicle.variant;
        this.removeDriver.fleetId = this.vehicle.fleetId;
        this.removeDriver.removeReason = RemoveReason[RemoveReason.NOWORKER];
        this.removeDriver.editorId = this.userService.getUserId();
    }

    removeFromVehicle(driver) {
        if (this.vehicle.currentDriver == driver.userId) {
            this.offDutyDriver(driver.userId);
        }
        this.setPayload();
        this.removeDriver.driverId = driver.userId;
        this.removeDriver.driverName = driver.displayname;
        this.removeDriver.driverEmail = driver.currentEMail;
        console.log('remove driver payload', this.removeDriver);
        this.selectedDriver = null;
        this.isRemoveDriver = false;
        this.deleteDriver$ = this.vehicleService.deleteDriverFromVehicle(this.vehicle.vehicleId, this.removeDriver.driverId, this.removeDriver).subscribe(res => {
            this.toastMessage.showSuccess('SUCCESS', driver.displayname + ' is removed from ' + this.vehicle.name);
            this.fetchLatest();
            this.communicatorService.broadcast('reload_driver');
        });
    }
}
