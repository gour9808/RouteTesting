import {Component, OnDestroy, OnInit} from '@angular/core';
import {FleetService} from '../service/fleet.service'
import * as moment from 'moment';
import * as _ from 'lodash';
import {Title} from '@angular/platform-browser';
import {Constants} from '../service/constants';
import {LogbookService} from '../service/logbook.service';
import {UserService} from '../service/user.service';
import {VehicleService} from '../service/vehicle.service';
import {CommunicatorService} from '../common/communicator.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Cache} from '../utils/storage.provider';
import {AutoUnsubscribe} from '../utils/auto-unsubscribe';
import {ToastMessageService} from '../service/toast-message.service';


@Component({
    selector: 'cbp-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss']
})


@AutoUnsubscribe()
export class UserProfileComponent implements OnInit, OnDestroy {
    userVehicle$;
    logbook$;

    @Cache({ pool: 'User' }) userInfo: any;
    viewHeight: any;
    display = false;
    tripImageUrl: String;
    startOdo: number;
    endOdo: number;

    vehicles: any[] = [];
    logs: any[] = [];
    loadingLogs = true;
    loadingVehicles = true;
    totalDistance: any = 0;
    metrics = [
        { icon: 'mdi-car', value: this.vehicles.length, label1: 'TOTAL', label2: 'VEHICLES' },
        { icon: 'mdi-car', value: this.totalDistance, label1: 'DISTANCE', label2: 'TRAVELLED' },
        { icon: 'mdi-car', value: '0', label1: 'ACTIVE', label2: 'VEHICLES' },
        { icon: 'mdi-car', value: '0', label1: 'IDLE', label2: 'VEHICLES' },
        { icon: 'mdi-car', value: '0', label1: 'TOTAL', label2: 'EXPENSES' }
    ];

    constructor(private router: Router, private route: ActivatedRoute, private fleetService: FleetService, private toastMsg: ToastMessageService, private titleService: Title, private logbookservice: LogbookService, private userservice: UserService, private vehicleservice: VehicleService, private communicatorService: CommunicatorService) {
    }

    ngOnInit() {
        this.getVehicles();
        this.getLogbook();
        this.titleService.setTitle('User Management | CarbookPlus');
        this.communicatorService.broadcast('update-title', 'HOME');
    }

    ngOnDestroy() { }

    checkIfOrgExists() {
        return !(this.fleetService.getOrgId() != null && this.fleetService.getOrgId() != undefined);
    }

    showDialog(event) {
        this.tripImageUrl = '';
        this.display = true;
        this.tripImageUrl = event.data.pictureURL;
        this.startOdo = event.data.startMileage;
        this.endOdo = event.data.endMileage
    }

    getVehicles() {
        this.userVehicle$ = this.vehicleservice.fetchUserVehicles().subscribe(res => {
            const result = _.filter(res, function (val) {
                return !_.has(val, 'deleteReason');
            });
            this.vehicles = result;
            this.metrics[0].value = this.vehicles.length;
            this.loadingVehicles = false;
        }, err => {
            this.toastMsg.showError("ERROR", "NO_VEHICLES_FOUND");
            console.log('Error in Getting Vehicles');
            console.log(err);
            this.loadingVehicles = false;
        });
    }

    getLogbook() {
        this.logbook$ = this.logbookservice.fetchLogbookForUser().subscribe(res => {
            this.logs = res;
            this.calculateDistance(this.logs);
        }, err => {
            this.toastMsg.showError("ERROR", "NO_LOGBOOK_FOUND");
            console.log('Error in Getting Logbook');
            console.log(err);
            this.loadingLogs = false;
        })
    }

    calculateDistance(logs) {
        let distance = 0;
        logs.forEach(log => {
            distance += log.distance;
        });
        console.log('Distance is', distance);
        this.totalDistance = Math.round(distance * 100) / 100;
        this.metrics[1].value = this.totalDistance;
    }

    getTimeDiff() {
        this.logs.forEach(log => {
            const start = moment(log.startTime);
            const end = moment(log.endTime);
            const duration = moment.duration(end.diff(start)); // format("h[h] m[m] s[s]");
            log.duration = duration.humanize();
        });
        console.log('Logbook is', this.logs);
        this.loadingLogs = false;
    }

    getVehicleLogo(make) {
        if (make != null && make != undefined && make.length > 1) {
            return Constants.GET_VEHICLE_LOGO(make);
        }
    }

    openFleetRegistration() {
        this.router.navigate(['/user/setup']);
    }

    openFleetView() {
        this.router.navigate(['/fleet'])
    }

}
