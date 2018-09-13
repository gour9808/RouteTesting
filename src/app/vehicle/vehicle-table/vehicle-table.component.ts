import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Constants} from '../../service/constants';
import {ActivatedRoute, Router} from '@angular/router';
import {VehicleService} from '../../service/vehicle.service';
import {ToastMessageService} from '../../service/toast-message.service';
import {IVehicle} from 'app/models/vehicles';
import {LogbookSummaryService} from "../../service/logbook-summary.service";
import {AutoUnsubscribe} from "../../utils/auto-unsubscribe";
import * as _ from 'lodash';
import {FleetService} from "../../service/fleet.service";


@Component({
    selector: 'cbp-vehicle-table',
    templateUrl: './vehicle-table.component.html',
    styleUrls: ['./vehicle-table.component.scss'],
    providers: [VehicleService]
})
@AutoUnsubscribe()
export class VehicleTableComponent implements OnInit {

    vehicles: any = [];
    loadingVehicles;
    @Input() isFleet;
    @Input() showAdd;
    @Output() onVehicleSelected = new EventEmitter<any>();
    @Output() onVehicleDeleted = new EventEmitter<any>();
    @Output() onAddNew = new EventEmitter<any>();
    @ViewChild('vehicleListTable') tableDiv: ElementRef;
    scrollH: any;
    scroll = false;
    isDialogVisible: boolean = false;
    selectedVehicle: IVehicle;
    removingVehicle: boolean;
    logbookSummary$: any;
    summary: any;
    fleetService$: any;

    constructor(private router: Router, private currentRoute: ActivatedRoute, private vehicleservice: VehicleService,
                private toastMsg: ToastMessageService, private logbookSummary: LogbookSummaryService
        , private fleetService: FleetService) {
        this.logbookSummary$ = this.logbookSummary.getSummary().subscribe(res => {
            if (!_.isEmpty(res)) {
                console.log('Summary is', res);
                this.summary = res;
                this.prepareVehicleMetrics();
            }
        });

        this.fleetService$ = this.fleetService.getFleetView().subscribe(res => {
            if (!_.isEmpty(res)) {
                this.vehicles = res.vehicleView;
                this.loadingVehicles = false;
            }
        })
    }

    prepareVehicleMetrics() {
        console.log('Unique Vehicles ', _(this.summary).groupBy('vehicleId').value());
        const uniqueVehicles = _(this.summary).groupBy('vehicleId').value();
        _.forEach(this.vehicles, vehicle => {
            const distance = _.sumBy(uniqueVehicles[vehicle.vehicleId], 'businessKM').toFixed(2);
            const trips = _.sumBy(uniqueVehicles[vehicle.vehicleId], 'businessTrips')
            console.log('Metrics ', distance, trips);
            vehicle.totalDistance = distance;
            vehicle.trips = trips;
        })

        console.log('Vehicles', this.vehicles);
    }

    ngOnInit() {
        this.loadingVehicles = true;
    }

    vehicleSelected(vehicle) {
        this.router.navigate(['../vehicle/details', vehicle.data.vehicleId], {relativeTo: this.currentRoute});
    }

    vehicleDeleted(event) {
        // this.deleteVehicle = event.vehicleId;
        this.onVehicleDeleted.emit(event);
    }

    add() {
        console.log('Upon add vehicle', this.onAddNew)
        this.onAddNew.emit();
    }

    getVehicleLogo(make) {
        if (make != null && make != undefined) {
            return Constants.GET_VEHICLE_LOGO(make);
        }
    }

    routeToCreate() {
        this.router.navigate(['../../vehicle/create'], {relativeTo: this.currentRoute})
    }

    routeToAdd() {
        this.router.navigate(['../../vehicle'], {queryParams: {add: true}, relativeTo: this.currentRoute})
    }

    routeToDetail(vehicle) {
        this.router.navigate(['../../vehicle/detail', vehicle.vehicleId], {relativeTo: this.currentRoute});
    }

    routeToTracking(vehicle) {
        this.router.navigate(['../vehicle/detail', vehicle.vehicleId, 'tracking'], {relativeTo: this.currentRoute});
    }

    removeFromFleet(vehicle) {
        this.removingVehicle = true;
        this.vehicleservice.deleteVehiclesFromFleet(localStorage.getItem('fleetID'), [vehicle.vehicleId]).subscribe((data) => {
                this.toastMsg.showSuccess('SUCCESS', 'VEHICLE_DELETED_SUCCESSFULLY');
                this.vehicleDeleted(vehicle);
                this.isDialogVisible = false;
                this.removingVehicle = false;
            },
            (error) => {
                this.toastMsg.showError("ERROR", "ERROR_DELETING_VEHICLES_FOR_FLEET");
                this.isDialogVisible = false;
                this.removingVehicle = false;
            },
            () => {

            });
    }

    showDialogChange(data) {
        this.isDialogVisible = data;
    }

}
