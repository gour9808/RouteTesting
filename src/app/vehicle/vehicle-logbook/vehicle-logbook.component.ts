import {Component, OnDestroy, OnInit} from '@angular/core';
import * as moment from 'moment-timezone';
import {VehicleService} from '../../service/vehicle.service';
import {LogbookService} from '../../service/logbook.service';
import * as _ from 'lodash';
import {ToastMessageService} from '../../service/toast-message.service';
import {FleetService} from '../../service/fleet.service';
import {CarbookRoles, UserService} from '../../service/user.service';
import printJS from 'print-js';
import {Utils} from '../../utils/utils';
import {TranslateService} from '@ngx-translate/core';
import {AutoUnsubscribe} from '../../utils/auto-unsubscribe';
import {MapLoaderService} from '../../service/map-loader.service';
import {ActivatedRoute} from '@angular/router';

declare const google;

@Component({
    selector: 'cbp-vehicle-logbook',
    templateUrl: './vehicle-logbook.component.html',
    styleUrls: ['./vehicle-logbook.component.scss']
})

@AutoUnsubscribe()
export class VehicleLogbookComponent implements OnInit, OnDestroy {
    vehicleSub$;
    translateService$;
    route$: any;
    vehicle: any;
    id: any;
    logs: any = [];
    totalDistance: any;
    user: any;
    sub: any;
    loadingLogs: boolean;
    rangeDates: any;
    fromDate: Date = Utils.getLastWeek();
    toDate: Date = Utils.getEndOfCurrentDay();
    filterCriteria = [
        {label: 'Last 7 Days', value: 'LAST_7_DAYS'},
        {label: 'Last 30 Days', value: 'LAST_30_DAYS'},
        {label: 'Last 60 Days', value: 'LAST_60_DAYS'},
        {label: 'Last Year', value: 'LAST_YEAR'}
    ];
    filterValue = {label: 'Last 7 Days', value: 'LAST_7_DAYS'};
    showDialog: boolean;
    loadingDriver: boolean;
    staticMaps: any;
    driver: any;
    logDetail: any = {};
    dateString: any;
    distanceCalculator: any;

    constructor(private logbook: LogbookService, private translateService: TranslateService, private vehicleService: VehicleService, private toast: ToastMessageService, private fleetService: FleetService, private userService: UserService, private currentRoute: ActivatedRoute) {
        this.vehicleSub$ = this.vehicleService.getVehicle().subscribe(res => {
            console.log('Gift from parent', res);
            this.vehicle = res;
        });
        this.translateService$ = this.translateService.onLangChange.subscribe((event) => {
            this.dateString = this.translateService.currentLang == 'lang-de' ? 'de' : 'en';
            moment.locale(this.dateString);
            this.getLogbook();
        });

        this.route$ = this.currentRoute.queryParams.subscribe(res => {
            console.log('Params are', res);
            if (res['date']) {
                this.fromDate = new Date(parseInt(res['date']));
                (this.toDate = new Date(parseInt(res['date']))).setHours(23, 59, 59);
                console.log('Date range filter', this.fromDate, this.toDate);
            }
        });
    }

    ngOnInit() {
        moment.locale(this.dateString);
        this.dateString = this.translateService.currentLang == 'lang-de' ? 'de' : 'en';
        MapLoaderService.load().then(() => {
            this.distanceCalculator = google.maps.geometry.spherical;
        });
        this.getLogbook();
    }

    getLogbook() {
        this.loadingLogs = true;
        this.logbook.fetchLogbookEntry(this.vehicle.vehicleId, this.userService.getUserId(), this.fromDate.valueOf(), this.toDate.valueOf())
            .finally(() => this.loadingLogs = false)
            .subscribe(res => {
                console.table(res, ['type', 'overlapId', 'id', 'distance']);
                const exclude = ['CHECKPOINT', 'OVERLAP'];
                this.logs = _.filter(res, (trip: any) => !_.includes(exclude, trip.type) && !_.has(trip, 'overlapId') && !trip.deleted);
                this.setTimeForZone();
                this.getTimeDiff();
                this.calculateHaltTime();
                const roles = this.userService.getRole(this.fleetService.getFleetId());
                if (roles.includes(CarbookRoles[CarbookRoles.DRIVER])) {
                    console.log('fleet login is driver', this.userService.getUserId(), roles, _.filter(this.logs, ['driverId', this.userService.getUserId()]));
                    this.logs = _.filter(this.logs, ['driverId', this.userService.getUserId()]);
                }
            });
    }

    ngOnDestroy() {
    }

    setTimeForZone() {
        const timeZone = this.vehicle.timeZoneId;
        _.forEach(this.logs, log => {
            log.startAddressTime = moment(log.startTime).tz(timeZone).format('LLLL');
            const timeZoneDate = moment(log.endTime).tz(timeZone);
            log.endAddressTime = moment(log.endTime).tz(timeZone).format('LLLL');
        });
        console.table(this.logs, ['startTime', 'startAddressTime', 'endAddressTime']);
    }

    fromChange(change) {
        console.log('From Changed', this.fromDate);
        this.fromDate.setHours(0, 0, 0, 0);
        if (this.fromDate > this.toDate) {
            console.log('Date Error');
            this.toast.showError('INVALID_DATE_RANGE', 'FROM_DATE_CANT_BE_GREATER_TO_DATE');
        } else {
            // proceed
            this.getLogbook();
        }
    }

    toChange(change) {
        console.log('To Changed', this.toDate);
        this.toDate.setHours(23, 59, 59, 59);
        if (this.fromDate > this.toDate) {
            console.log('Date Error');
            this.toast.showError('INVALID_DATE_RANGE', 'TO_DATE_CANT_BE_LESSTHAN_FROM_DATE');
        } else {
            // proceed
            this.getLogbook();
        }
    }

    calculateHaltTime() {
        this.logs.forEach((log, index) => {
            if (index + 1 < this.logs.length && log.type == 'TRIP' && this.logs[index + 1].type == 'TRIP') {
                log.haltTime = this.getHaltDuration(log.endTime, this.logs[index + 1].startTime);
            }
        });
    }

    getTimeDiff() {
        this.logs.forEach(log => {
            const start = moment(log.startTime);
            const end = moment(log.endTime);
            const duration = moment.duration(end.diff(start));
            log.duration = duration.humanize();
        });
        console.log('Logbook is', this.logs);
    }

    getHaltDuration(start, end) {
        return moment.duration(moment(end).diff(moment(start))).humanize();
    }

    printLogbook() {
        this.loadingLogs = true;
        this.logbook.printLogbook(this.vehicle.vehicleId, this.fleetService.getFleetId(), this.fleetService.getFleetName(), this.fromDate.valueOf(), this.toDate.valueOf())
            .finally(() => this.loadingLogs = false)
            .subscribe(res => {
                console.log('Dowload res is', res);
                const fileURL = URL.createObjectURL(res);
                printJS(fileURL);
            });
    }

    tripDetail(log) {
        console.log('Detail trip', log);
        // note to future self: don't optimise this more.
        // I know you think you can. I dare you to try. You'll cry later
        this.logDetail = Object.assign({}, log);
        if (log.type != 'GAP') {
            this.logDetail.waypoints = log.waypoints ? [log.endAddress, ...log.waypoints, log.startAddress] : [log.endAddress, log.startAddress];
        } else {
            this.logDetail.waypoints = [log.endAddress, log.startAddress];
            if (this.distanceCalculator) {
                this.logDetail.distance = (this.distanceCalculator.computeDistanceBetween(new google.maps.LatLng(log.startAddress.geopoint.lat, log.startAddress.geopoint.lon),
                    new google.maps.LatLng(log.endAddress.geopoint.lat, log.endAddress.geopoint.lon)) * 0.001).toFixed(2);
                console.log('Distance is', this.logDetail);
            }
        }
        this.loadingDriver = true;
        this.showDialog = true;
        (log.driverId && this.fleetService.getFleetId() != log.driverId) ? this.getDriverInfo(log.driverId) : '';
        this.logDetail.waypoints = log.waypoints ? [log.endAddress, ...log.waypoints, log.startAddress] : [log.endAddress, log.startAddress];
        console.log('Points', log.waypoints);
        const paths = _.map(this.logDetail.waypoints, (points: any) => new google.maps.LatLng(points.geopoint.lat, points.geopoint.lon));
        const encodeString = google.maps.geometry.encoding.encodePath(paths);
        this.staticMaps = this.setupStaticMap({lat: this.logDetail.startAddress.geopoint.lat, lng: this.logDetail.startAddress.geopoint.lon},
            {lat: this.logDetail.endAddress.geopoint.lat, lng: this.logDetail.endAddress.geopoint.lon},
            encodeString
        );
    }

    getDriverInfo(driverId) {
        this.userService.fetchUserById(driverId)
            .finally(() => this.loadingDriver = false)
            .subscribe(res => {
                console.log('Driver profile is', res);
                this.driver = res;
            });
    }

    encodePath(path) {

    }

    setupStaticMap(startMark, endMark, path) {
        return `https://maps.googleapis.com/maps/api/staticmap?&markers=color:green%7C${startMark.lat},${startMark.lng}&markers=color:red%7C${endMark.lat},${endMark.lng}&path=weight:3%7Ccolor:blue%7Cenc:${path}&scale=2&size=600x300&maptype=roadmap&key=AIzaSyCDAXGspOuqxMX_Ek1Idz5_Yamag1vog4o&format=png&visual_refresh=true`;
    }
}
