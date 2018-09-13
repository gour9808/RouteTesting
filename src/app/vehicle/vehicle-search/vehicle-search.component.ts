import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FleetService} from '../../service/fleet.service';
import * as _ from 'lodash';
import {Constants} from '../../service/constants';
import {VehicleService} from '../../service/vehicle.service';
import {Router} from '@angular/router';
import {ToastyService} from 'ng2-toasty';
import {CommunicatorService} from '../../common/communicator.service';
import {ToastMessageService} from '../../service/toast-message.service';
import {AutoUnsubscribe} from '../../utils/auto-unsubscribe';

@Component({
    selector: 'cbp-vehicle-search',
    templateUrl: './vehicle-search.component.html',
    styleUrls: ['./vehicle-search.component.scss']
})

@AutoUnsubscribe()
export class VehicleSearchComponent implements OnInit, OnDestroy {
    vehicleLicense$;
    createVehicle$;
    fleetVehicle$;

    searchLicense: any;
    searching = false;
    showErrorForVehicle = false;
    showErrorForVehicleExists = false;
    searchVehicles: any[] = [];
    errorMessage: string;
    vehicles: any;
    error = false;
    @Input() selectedVehicle: any;
    @Output() hide = new EventEmitter<any>();
    @Output() onAdd = new EventEmitter<any>();
    @Output() onDelete = new EventEmitter<any>();
    @Output() redirectto = new EventEmitter<any>();
    saveAndClose: boolean;

    constructor(private comms: CommunicatorService, private fleetService: FleetService,
                private vehicleservice: VehicleService,
                private router: Router, private toastyService: ToastyService, private toastMsg: ToastMessageService) {
    }

    ngOnInit() {
    }

    ngOnDestroy() {
    }

    searchVehicle() {
        let temp = [...this.searchVehicles];
        this.searching = true;
        this.showErrorForVehicle = false;
        this.showErrorForVehicleExists = false;
        console.log(this.searchLicense);
        this.vehicleLicense$ = this.vehicleservice.fetchVehicleByLicense(this.searchLicense).subscribe(res => {
            console.log('response from get vehicle by license', res);
            if (!_.has(res, 'deleteReason') || res.fleetId == null) {
                if (!_.find(this.searchVehicles, res)) {
                    temp.push(res);
                    this.searchVehicles = temp;
                }
                this.searching = false;
                this.addToFleet();
            } else {
                this.toastMsg.showError('ERROR', 'VEHICLE_EXISTS_IN_ANOTHER_FLEET');
                console.log('Search Result', this.searchVehicles);
                this.searching = false;
            }
        }, error => {
            console.log('Vehicle error', error);
            this.toastMsg.showError('ERROR', 'VEHICLE_NOT_FOUND');
            this.searching = false;
        });
    }


    removeFromSearch(vehicle) {
        this.searching = true;
        let index = this.searchVehicles.indexOf(vehicle);
        this.searchVehicles = this.searchVehicles.filter((val, i) => i != index);
        console.log(vehicle);
        console.log(this.searchVehicles);
        this.searching = false;
        this.onDelete.next(vehicle);
    }

    getVehiclesForFleet() {
        this.fleetVehicle$ = this.fleetService.fetchVehicleInFleet(this.fleetService.getFleetId()).subscribe(res => {
            this.vehicles = res;
            //  this.loadingVehicles = false;
            console.log('FleetView Vehicle', res);
        }, error => {
            this.toastMsg.showError('ERROR', 'NO_VEHICLES_FOUND')
        });
    }


    addToFleet() {
        //this.onAdd.emit(this.searchVehicles);
        this.error = false;
        this.createVehicle$ = this.fleetService.addVehiclesToFleet(this.fleetService.getFleetId(), this.searchVehicles).subscribe(res => {
                console.log('Add Successful', res);
                this.toastMsg.showSuccess('SUCCESS', 'VEHICLE_ADDED_SUCCESSFULLY');
                this.comms.broadcast('new-added', this.saveAndClose);
            },
            err => {
                console.log('error', err);
                this.toastMsg.showError('ERROR', err.error.error);
            });
        // this.newVehicleList.length = 0;
        this.clearSearch();
        this.getVehiclesForFleet();
    }

    clearSearch() {
        this.searchVehicles.length = 0;
    }

    cancel() {
        this.searchVehicles.length = 0;
        this.hide.next();
    }

    getVehicleLogo(make) {
        if (make != null && make != undefined) {
            return Constants.GET_VEHICLE_LOGO(make);
        }
    }

    redirect() {
        this.selectedVehicle = false;
        this.redirectto.emit(this.selectedVehicle);
    }

    checkQueryToVehicleDetails() {
        if (_.startsWith(this.router.url, '/fleet')) {
            this.router.navigate(['/fleet/vehicle'], {queryParams: {type: 'fleet'}})
        } else {
            this.router.navigate(['/user/vehicle'], {queryParams: {type: 'user'}})
        }
    }

    BackToList() {
        this.checkQueryToVehicleDetails();
    }

}
