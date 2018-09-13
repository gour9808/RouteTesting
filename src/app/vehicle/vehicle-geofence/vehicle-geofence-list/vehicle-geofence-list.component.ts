import {Component, OnInit} from '@angular/core';
import {VehicleService} from '../../../service/vehicle.service';
import {Carbook} from '../../../models/vehicle';
import * as _ from 'lodash';
import {ActivatedRoute, Router} from '@angular/router';
import {GeoFence} from '../../../models/geofence';
import * as moment from 'moment';
import {ToastMessageService} from '../../../service/toast-message.service';
import GeofenceTracker = GeoFence.GeofenceTracker;
import Recurrence = GeoFence.Recurrence;
import OperationType = GeoFence.OperationType;

@Component({
    selector: 'cbp-vehicle-geofence-list',
    templateUrl: './vehicle-geofence-list.component.html',
    styleUrls: ['./vehicle-geofence-list.component.scss']
})
export class VehicleGeofenceListComponent implements OnInit {
    vehicleSub$: any;
    listGeofence$: any;
    vehicle: any;
    geoFenceList: any = [];
    deleteGeoFence$: any;
    loadingFences: boolean;
    isDialogVisible: boolean;
    selectedFence: any;
    originalFenceList: any = [];

    constructor(private vehicleService: VehicleService, private router: Router, private currentRoute: ActivatedRoute, private toastMessage: ToastMessageService) {
        this.vehicleSub$ = this.vehicleService.getVehicle().subscribe(res => {
            console.log('Gift from parent', res);
            this.vehicle = _.merge(new Carbook.Vehicle(), res);
        });
    }

    ngOnInit() {
        this.fetchGeoFence();
    }

    fetchGeoFence() {
        this.loadingFences = true;
        this.listGeofence$ = this.vehicleService.getGeoFenceList(this.vehicle.vehicleId)
            .finally(() => this.loadingFences = false)
            .subscribe(res => {
                if (res) {
                    console.log('Fences are', res);
                    this.originalFenceList = res;
                    this.geoFenceList = _.map(res, (fence: GeofenceTracker) => {
                        return {
                            id: fence.geofence.gid,
                            name: fence.geofence.geofenceName,
                            type: fence.geofence.geofenceType,
                            radius: fence.geofence.radius.toFixed(2),
                            notify: _.startCase(_.lowerCase(<string>fence.tracking_status)),
                            activate: this.getTimePeriod(fence.geofence.recurrence, fence.geofence.fenceActivationTime),
                            deactivate: this.getTimePeriod(fence.geofence.recurrence, fence.geofence.fenceExpiryTime),
                            repeat: _.startCase(_.lowerCase(<string>fence.geofence.recurrence))
                        };
                    });
                }
            });
    }

    getTimePeriod(mode, time) {
        if (!time) {
            return '-';
        }
        switch (mode) {
            case Recurrence[Recurrence.DAILY]:
                return moment(time).format('h:mm A');
            case Recurrence[Recurrence.WEEKLY]:
                return moment(time).format('ddd h:mm A');
            case Recurrence[Recurrence.MONTHLY]:
                return moment(time).format('Do ddd h:mm A');
            case Recurrence[Recurrence.YEARLY]:
                return moment(time).format('Do MMM h:mm A');
            default:
                return moment(time).format('Do MMM h:mm A');
        }
    }

    openFenceDetail(fence) {
        console.log('Detail Fence', fence);
        this.router.navigate(['../detail'], {relativeTo: this.currentRoute, queryParams: {'fenceId': fence.id}});
    }

    setUpNewFence() {
        this.router.navigate(['../new'], {relativeTo: this.currentRoute});
    }

    deleteFence(fence) {
        this.loadingFences = true;
        let deleteFence = _.find(this.originalFenceList, ['geofence.gid', fence.id]);
        deleteFence.operationType = OperationType[OperationType.DELETE];
        console.log('delete payload', deleteFence);

        this.deleteGeoFence$ = this.vehicleService.deleteGeoFenceFromVehicle(deleteFence)
            .finally(() => {
                this.loadingFences = false;
                this.isDialogVisible = false;
            })
            .subscribe(res => {
                    console.log('Geo fence data deleted successfully!!!', res);
                    this.toastMessage.showSuccess('SUCCESS', 'GEOFENCE_DELETED_SUCCESSFULLY');
                    this.fetchGeoFence();
                },
                err => {
                    console.log('Error geofence vehicle', err);
                    this.toastMessage.showError('ERROR', 'GEOFENCES_FAILED_TO_DELETE');
                });
    }

    showDialogChange() {
        this.isDialogVisible = false;
    }

}
