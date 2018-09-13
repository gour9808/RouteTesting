import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Constants} from '../../service/constants';
import {AutoUnsubscribe} from '../../utils/auto-unsubscribe';
import {VehicleService} from '../../service/vehicle.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Carbook} from '../../models/invite';
import {ToastMessageService} from '../../service/toast-message.service';
import {CarbookRoles, GroupTypes, UserService} from 'app/service/user.service';
import {FleetService} from 'app/service/fleet.service';


@Component({
    selector: 'cbp-vehicle-grid-item',
    templateUrl: './vehicle-grid-item.component.html',
    styleUrls: ['./vehicle-grid-item.component.scss']
})

@AutoUnsubscribe()
export class VehicleGridItemComponent implements OnInit, OnDestroy {
    @Input() grid: any;
    @Input() filterterm: any;
    @Input() sort: any;
    @Output() onVehicleDeleted = new EventEmitter<any>();
    removingVehicle: boolean;
    driver$;
    driver: any;
    isFleet: boolean;
    invitation: Carbook.InviteModel = new Carbook.InviteModel();
    loadingDriver = true;
    isDialogVisible: boolean;
    vehicleService$;
    selectedVehicle;
    constructor(private vehicleService: VehicleService, private router: Router,
                private toastMsg: ToastMessageService,
                private currentRoute: ActivatedRoute, private userService: UserService, private fleetService: FleetService) {
    }

    ngOnInit() {
        this.getVehicleDriver();
    }

    getVehicleLogo(make) {
        if (make != null && make !== undefined) {
            return Constants.GET_VEHICLE_LOGO(make, '3x');
        }
    }

    getVehicleDriver() {
        (this.grid.currentDriver) ? this.getDriverInfo(this.grid.currentDriver) : this.loadingDriver = false;

    }

    getDriverInfo(driverId) {
        this.driver$ = this.vehicleService.getDriverData(driverId).subscribe(res => {
            console.log('driver info', res);
            this.driver = res;
            // this.toastMsg.showSuccess('SUCCESS', 'DRIVER_INFO');
            this.loadingDriver = false;
        }, error => {
            this.toastMsg.showError('ERROR', 'ERROR_FETCHING_DRIVER_INFO');
        })
    }

    openVehicleDetail(vehicle) {
        console.log('Vehicle detail', vehicle);
        this.router.navigate(['../detail', vehicle.vehicleId], {queryParams: {type: 'fleet'}, relativeTo: this.currentRoute});
    }

    openVehicleTracking(vehicle) {
        console.log('Vehicle detail', vehicle);
        this.router.navigate(['../detail', vehicle.vehicleId, 'tracking'], {queryParams: {type: 'fleet'}, relativeTo: this.currentRoute});
    }

    cancelInvite() {
        const response = 'REJECTED';
        this.vehicleService$ = this.vehicleService.updateNotification(this.grid.fleetId, this.grid.vehicleId, response).subscribe(res => {
            console.log('invitation rejected', res);
            this.toastMsg.showSuccess('SUCCESS', 'INVITATION_REJECTED');
        }, error => {
            this.toastMsg.showError('ERROR', 'ERROR_INVITATION_REJECTION');
        });
    }

    openVehicleLogbook(vehicle) {
        this.router.navigate(['../detail', vehicle.vehicleId, 'logbook'], {queryParams: {type: 'fleet'}, relativeTo: this.currentRoute});
    }

    enableRemoveVehicleDialog() {
        this.isDialogVisible = true;
    }

    removeFromFleet(vehicle) {
        this.removingVehicle = true;
        this.vehicleService$ = this.vehicleService.deleteVehiclesFromFleet(localStorage.getItem('fleetID'), [vehicle.vehicleId]).subscribe((data) => {
                this.toastMsg.showSuccess('SUCCESS', 'VEHICLE_DELETED_SUCCESSFULLY');
                this.vehicleDeleted(vehicle);
                this.isDialogVisible = false;
                this.removingVehicle = false;
            },
            (error) => {
                this.toastMsg.showError('ERROR', 'ERROR_DELETING_VEHICLES_FOR_FLEET');
                this.isDialogVisible = false;
                this.removingVehicle = false;
            },
            () => {

            });

    }

    showDialogChange(data) {
        this.isDialogVisible = data;
    }

    sendReminder() {
        const response = 'PENDING';
        this.vehicleService$ = this.vehicleService.updateNotification(this.grid.fleetId, this.grid.vehicleId, response).subscribe(res => {
            console.log('invitation pending', res);
            this.toastMsg.showSuccess('SUCCESS', 'SEND_REMINDER_SUCCESSFULLY');
        }, error => {
            this.toastMsg.showError('ERROR', 'ERROR_SAVING_REMINDER');
        });
    }

    vehicleDeleted(event) {
        // this.deleteVehicle = event.vehicleId;
        this.onVehicleDeleted.emit(event);
    }

    isAdminOrAgent() {
        return this.userService.hasRole(GroupTypes.FLEET, this.fleetService.getFleetId(), CarbookRoles.CB_ADMIN) ||
            this.userService.hasRole(GroupTypes.FLEET, this.fleetService.getFleetId(), CarbookRoles.MANAGER) ||
            this.userService.hasRole(GroupTypes.FLEET, this.fleetService.getFleetId(), CarbookRoles.TEAM_MANAGER)
    }

    ngOnDestroy() {

    }

}
