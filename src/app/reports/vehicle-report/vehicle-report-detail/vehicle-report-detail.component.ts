import {Component, OnDestroy, OnInit} from '@angular/core';
import {AutoUnsubscribe} from '../../../utils/auto-unsubscribe';
import {VehicleService} from '../../../service/vehicle.service';
import {LogbookSummaryService} from '../../../service/logbook-summary.service';
import {FleetService} from '../../../service/fleet.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Utils} from '../../../utils/utils';
import * as _ from 'lodash';
import {MapLoaderService} from '../../../service/map-loader.service';
import {Constants} from '../../../service/constants';
import * as moment from 'moment';

declare var google;
@Component({
    selector: 'cbp-vehicle-report-detail',
    templateUrl: './vehicle-report-detail.component.html',
    styleUrls: ['./vehicle-report-detail.component.scss']
})
@AutoUnsubscribe()
export class VehicleReportDetailComponent implements OnInit, OnDestroy {

    routeSub$: any;
    vehicleService$: any;
    logbookSummary$: any;
    vehicleInfo$: any;
    vehicleId: any;
    fromDate: Date = Utils.getStartOfCurrentYear();
    toDate: Date = Utils.getEndOfCurrentDay();

    vehicleInfo: any = {};
    logSummary: any;

    metrics = [
        {icon: 'mdi-car', value: '0', label1: 'TOTAL_DURATION_DRIVEN', label2: ''},
        {icon: 'mdi-car', value: '0', label1: 'DISTANCE_COVERED_KMS', label2: ''},
        {icon: 'mdi-car', value: 0, label1: 'NUMBER_OF_TRIPS', label2: ''}
    ];

    indicators = [
        {icon: 'mdi-oil-temperature', label: 'Coolant Temperature', value: '52.9 C', status_icon: 'mdi-check-circle'},
        {icon: 'mdi-battery-90', label: 'Battery', value: '99%', status_icon: 'mdi-check-circle'},
        {icon: 'mdi-signal', label: 'GPS Signal', value: '10', status_icon: 'mdi-check-circle'},
        {icon: 'mdi-engine', label: 'Average Engine RPM', value: '925', status_icon: 'mdi-check-circle'}
    ];
    options: any;
    showMap: boolean;
    logbookSummaryList: any = [];
    carSvg = 'M29.395,0H17.636c-3.117,0-5.643,3.467-5.643,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759 \
  c3.116,0,5.644-2.527,5.644-5.644V6.584C35.037,3.467,32.511,0,29.395,0z M34.05,14.188v11.665l-2.729,0.351v-4.806L34.05,14.188z \
  M32.618,10.773c-1.016,3.9-2.219,8.51-2.219,8.51H16.631l-2.222-8.51C14.41,10.773,23.293,7.755,32.618,10.773z M15.741,21.713 \
  v4.492l-2.73-0.349V14.502L15.741,21.713z M13.011,37.938V27.579l2.73,0.343v8.196L13.011,37.938z M14.568,40.882l2.218-3.336 \
  h13.771l2.219,3.336H14.568z M31.321,35.805v-7.872l2.729-0.355v10.048L31.321,35.805z';
    vehicleMarker: any;
    overlays: any = [];
    map: any;

    constructor(private vehicleService: VehicleService, private logbookSummary: LogbookSummaryService, private fleetService: FleetService,
                private router: Router, private currentRoute: ActivatedRoute) {
        this.routeSub$ = this.currentRoute.queryParams.subscribe(params => {
            console.log('Route params are', params);
            this.vehicleId = params['vehicle'];
            MapLoaderService.load().then(() => {
                this.showMap = true;
                this.getVehicleInfo();
                this.getSummary();
            });
        });
    }

    setMap(event) {
        setTimeout(() => {
            this.map = event.map;
            this.getLastKnownLocation();
        }, 350);
    }

    getVehicleInfo() {
        this.vehicleService$ = this.vehicleService.fetchVehicleInfo(this.vehicleId).subscribe(res => {
            console.log('Vehicle info is ', res);
            this.vehicleInfo = res;
        });
    }

    getSummary() {
        this.logbookSummary$ = this.logbookSummary.fetchLogbookSummary(this.fleetService.getFleetId(), this.vehicleId, null, this.fromDate.valueOf(), this.toDate.valueOf(), 'all')
            .subscribe(res => {
                console.log('Logbook summary us', res);
                this.logSummary = res;
                this.prepareMetrics();
                this.formatTableData();
            });
    }

    prepareMetrics() {
        this.metrics[0].value = Utils.displayTime(_.sumBy(this.logSummary, 'businessDrivenTime'));
        this.metrics[1].value = _.sumBy(this.logSummary, 'businessKM').toFixed(2);
        this.metrics[2].value = _.sumBy(this.logSummary, 'businessTrips');
    }

    formatTableData() {
        this.logbookSummaryList = [];
        this.logbookSummaryList = _.map(this.logSummary, (log: any) => {
            return {
                date: moment(log.date).format('MMM Do YYYY'),
                day: moment(log.date).format('dddd'),
                businessKM: log.businessKM.toFixed(2),
                businessTrip: log.businessTrips,
                businessDuration: Utils.displayTime(log.businessDrivenTime),
                gaps: log.gaps,
                overlaps: log.overlaps,
                sDate: log.date
            };
        });
        this.logbookSummaryList = _.orderBy(this.logbookSummaryList, 'sDate', 'desc');
        console.table(this.logbookSummaryList);
    }

    openLogbook(log) {
        console.log('Log Detail', log);
        this.router.navigate(['/fleet/vehicle/detail', this.vehicleId, 'logbook'], {queryParams: {date: log.sDate}, relativeTo: this.currentRoute});
    }

    getVehicleLogo(make) {
        if (make != null && make !== undefined && make.length > 1) {
            return Constants.GET_VEHICLE_LOGO(make);
        }
    }

    updateMetrics() {
        this.indicators[0].value = Utils.getRandomDecimalInRange(50, 55, 1);
        this.indicators[1].value = _.sample(['99', '98']);
        this.indicators[3].value = Utils.getRandomDecimalInRange(900, 950, 0);
    }

    getLastKnownLocation() {
        this.vehicleInfo$ = this.vehicleService.fetchLastKnownLocation(this.vehicleId).subscribe(res => {
            console.log('Vehicle LKL', res);
            if (res && _.has(res, 'resolvedAddress')) {
                this.prepareOverlay(this.vehicleInfo, res['resolvedAddress'].geopoint);
                this.centerMap(res['resolvedAddress'].geopoint);
            }
        });
    }

    prepareOverlay(vehicle, position) {
        this.vehicleMarker = {
            icon: null,
            marker: null,
            polyline: null,
            color: '#e67e22'
        };
        this.vehicleMarker.icon = {
            path: this.carSvg, // url
            fillColor: '#e67e22',
            fillOpacity: 4,
            anchor: new google.maps.Point(25, 25),
            scale: .75,
            strokeWeight: 0,
            rotation: 0
        };
        this.vehicleMarker.marker = new google.maps.Marker({
            title: vehicle.name,
            icon: this.vehicleMarker.icon,
            label: ' ',
            position: new google.maps.LatLng(position.lat, position.lon)
        });
        this.vehicleMarker.polyline = new google.maps.Polyline({
            path: [],
            geodesic: true,
            strokeColor: '#e67e22',
            strokeOpacity: 0.5,
            strokeWeight: 5
        });
        console.log('Overlay ready');
        this.overlays.push(this.vehicleMarker.marker);
    }

    centerMap(location) {
        this.map.panTo(new google.maps.LatLng(location.lat, location.lon));
        var bounds = new google.maps.LatLngBounds();
        bounds.extend(this.vehicleMarker.marker.getPosition());
        this.map.fitBounds(bounds);
        this.map.setZoom(14);
    }

    ngOnInit(): void {
        this.options = {
            center: {lat: 0, lng: 0},
            zoom: 1
        };
    }

    ngOnDestroy(): void {
    }

}
