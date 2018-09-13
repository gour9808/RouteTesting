import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {VehicleService} from '../../service/vehicle.service';
import * as _ from 'lodash';
import {ToastMessageService} from '../../service/toast-message.service';
import * as cbgf from '../../models/geofence';
import {GeoFence} from '../../models/geofence';
import {MapLoaderService} from '../../service/map-loader.service';
import {Carbook} from '../../models/vehicle';
import {AutoUnsubscribe} from '../../utils/auto-unsubscribe';
import {ActivatedRoute, Router} from '@angular/router';
import * as moment from 'moment';
import {FleetService} from '../../service/fleet.service';
import TrackingStatus = GeoFence.TrackingStatus;
import OperationType = GeoFence.OperationType;
import GeofenceType = GeoFence.GeofenceType;
import Recurrence = GeoFence.Recurrence;

declare const google;

@Component({
    selector: 'cbp-vehicle-tracking',
    templateUrl: './vehicle-geofence.component.html',
    styleUrls: ['./vehicle-geofence.component.scss']
})

@AutoUnsubscribe()
export class VehicleGeofenceComponent implements OnInit, OnDestroy {
    vehicleSub$;
    createGeofence$;
    listGeofence$;
    updateGeofence$;
    deleteGeoFence$;
    fleetView$;
    showMap: boolean;
    geoCoderDetail;
    placedetail;
    center: any;
    map: any;
    overlays: any[] = [];
    vid: any;
    vehicle: Carbook.Vehicle;
    options: any;
    radius: number;
    geoFence: cbgf.GeoFence.GeofenceTracker = new cbgf.GeoFence.GeofenceTracker();
    currentOverlay: any;
    drawingManager: any;
    showSave = false;
    group: number;
    showRadius: boolean;
    notifyType: any = [
        {label: 'On Enter', value: 'ENTER'},
        {label: 'On Exit', value: 'EXIT'}
    ];
    recurrenceType: any = [
        {label: 'Daily', value: 'DAILY'},
        {label: 'Weekly', value: 'WEEKLY'},
        {label: 'Monthly', value: 'MONTHLY'},
        {label: 'Yearly', value: 'YEARLY'}
    ];
    thresholdValues: any = [
        {label: '0 Minutes', value: 0},
        {label: '5 Minutes', value: (5 * 60000)},
        {label: '10 Minutes', value: (10 * 60000)},
        {label: '15 Minutes', value: (15 * 60000)},
        {label: '30 Minutes', value: (30 * 60000)},
        {label: '45 Minutes', value: (45 * 60000)},
        {label: '60 Minutes', value: (60 * 60000)}
    ];
    dateFormat: any = 'DD MM yy';
    activateDate: Date;
    deactivateDate: Date;
    timeOnly = true;
    listRadio: any[] = [];
    fenceLifetime: Date[];
    earlyNotification: number;
    lateNotification: number;
    saving: boolean;

    constructor(private vehicleService: VehicleService, private toastMessage: ToastMessageService, private changeDetector: ChangeDetectorRef, private router: Router,
                private currentRoute: ActivatedRoute, private fleetService: FleetService) {

        MapLoaderService.load().then(() => {
            this.placedetail = new google.maps.places.PlacesService(document.createElement('div'));
            this.geoCoderDetail = new google.maps.Geocoder();
            this.showMap = true;
        });

        this.vehicleSub$ = this.vehicleService.getVehicle().subscribe(res => {
            console.log('Gift from parent', res);
            this.vehicle = _.merge(new Carbook.Vehicle(), res);
            this.vid = this.vehicle ? this.vehicle.vehicleId : '';
            this.geoFence.vehicle = this.vehicle.vehicleId;
        }, error => {
            this.toastMessage.showError('ERROR', 'ERROR_FETCHING_VEHICLES');
        });
    }

    ngOnInit() {
        this.options = {
            center: {lng: 77.66862, lat: 12.9195},
            zoom: 14,
            scaleControl: true,
            mapTypeControl: false, // disable satellite option
            gestureHandling: 'cooperative'
        };
    }

    getFenceFromResolver() {
        this.listGeofence$ = this.currentRoute.data.subscribe(res => {
            console.log('Route data', res);
            if (res['fence']) {
                this.geoFence = _.merge(new cbgf.GeoFence.GeofenceTracker(), res['fence']);
                console.log('Current Route Data is', this.geoFence);
                this.fenceLifetime = [];
                this.fenceLifetime[0] = new Date(this.geoFence.geofence.fenceActivationTime);
                this.fenceLifetime[1] = new Date(this.geoFence.geofence.fenceExpiryTime);
                this.activateDate = new Date(this.geoFence.geofence.activeTimeThreshold.startTime);
                this.deactivateDate = new Date(this.geoFence.geofence.activeTimeThreshold.endTime);
                this.earlyNotification = moment(this.geoFence.geofence.onTimeThreshold.startTime).diff(moment(this.geoFence.geofence.activeTimeThreshold.startTime), 'minutes') * 60000;
                this.lateNotification = moment(this.geoFence.geofence.activeTimeThreshold.endTime).diff(moment(this.geoFence.geofence.onTimeThreshold.endTime), 'minutes') * 60000;
                this.updateRecurrenceMode(this.geoFence.geofence.recurrence);
                console.log(this.earlyNotification, this.lateNotification);
                this.setView();
                this.showSave = true;
            } else {
                this.setUpNewFence();
            }
        });
    }

    ngOnDestroy() {
        console.log('Destroy & Cleanup');
        this.currentOverlay = null;
        this.drawingManager = null;
        this.map = null;
    }

    setMap(event) {
        this.map = event.map;
        this.setUpDrawingManager();
        setTimeout(() => {
            this.getFenceFromResolver();
        }, 500);
    }

    setUpNewFence() {
        this.geoFence.geofence.geofenceName = 'New Fence';
        this.geoFence.geofence.radius = 1000;
        this.geoFence.geofence.active = true;
        this.geoFence.geofence.persist = true;
        this.geoFence.fleetId = this.fleetService.getFleetId();
        this.setGeofenceTimezone();
    }

    getLocation() {
        if (navigator.geolocation) {
            console.log('Getting location');
            navigator.geolocation.getCurrentPosition(position => {
                console.log(position);
                this.options = {
                    center: {lng: position.coords.longitude, lat: position.coords.latitude},
                    zoom: 14
                };
                this.map.panTo(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
            });
            this.setBounds();
        }
    }

    getAutoPlaces(e) {
        this.placedetail.getDetails({placeId: e.place_id}, (results, status) => {
            if (results) {
                console.log('Place result ', results);
                this.options.center.lat = results.geometry.location.lat();
                this.options.center.lng = results.geometry.location.lng();
                this.overlays.push(new google.maps.Marker({position: {lat: this.options.center.lat, lng: this.options.center.lng}, draggable: true}));
                const place = this.drawCircle(results.id, {lat: this.options.center.lat, lon: this.options.center.lng}, '#2d6ba1', 1000, true);
                this.overlays.push(place);
                this.map.panTo(new google.maps.LatLng(this.options.center.lat, this.options.center.lng));
                this.map.setZoom(14);
                this.currentOverlay = place;
                console.log('after place result', this.overlays, this.currentOverlay);
                this.setCustomCircle(this.options.center, 1000);
                this.changeDetector.detectChanges();
                this.showRadius = true;
                this.showSave = true;
            }
        });
    }

    changeRadius(event) {
        console.log('radius changed', event);
        setTimeout(function () {

        }, 1000);
    }

    updateLifetime(time: Date[]) {
        console.log('Updated lifetime', time);
        this.geoFence.geofence.fenceActivationTime = time[0].getTime();
        this.geoFence.geofence.fenceExpiryTime = time[1] ? time[1].getTime() : undefined;
    }

    updateActivateTime(time: Date) {
        console.log('Update Activate Time', time);
        this.geoFence.geofence.onTimeThreshold.startTime = time.getTime();
        console.log('Updated fence payload', this.geoFence);
    }

    updateDeactivateTime(time: Date) {
        console.log('Update Deactivate Time', time);
        this.geoFence.geofence.onTimeThreshold.endTime = time.getTime();
        console.log('Updated fence payload', this.geoFence);
    }

    updateNotifyMode(mode) {
        console.log('Update Notify Mode', mode);
        this.geoFence.tracking_status = mode;
        console.log('Updated fence payload', this.geoFence);
    }

    updateRecurrenceMode(mode) {
        console.log('Update Recurrence Mode', mode);
        switch (mode) {
            case Recurrence[Recurrence.DAILY]:
                this.timeOnly = true;
                break;
            case Recurrence[Recurrence.WEEKLY]:
                this.timeOnly = false;
                this.dateFormat = 'DD';
                break;
            case Recurrence[Recurrence.MONTHLY]:
                this.timeOnly = false;
                this.dateFormat = 'dd MM yy';
                break;
            case Recurrence[Recurrence.YEARLY]:
                this.timeOnly = false;
                this.dateFormat = 'dd MM yy';
                break;
        }
        this.geoFence.geofence.recurrence = mode;
        console.log('Updated fence payload', this.geoFence);
    }

    updateEarlyNotificationThreshold(threshold) {
        console.log('Update Early Notification', threshold);
        this.geoFence.geofence.activeTimeThreshold.startTime = this.geoFence.geofence.onTimeThreshold.startTime - threshold;
        console.log('Updated fence payload', this.geoFence);
    }

    updateLateNotificationThreshold(threshold) {
        console.log('Update Arrival Notification', threshold);
        this.geoFence.geofence.activeTimeThreshold.endTime = this.geoFence.geofence.onTimeThreshold.endTime + threshold;
        console.log('Updated fence payload', this.geoFence);
    }

    saveOrUpdate() {
        this.saving = true;
        if (this.geoFence.geofence.gid) {
            this.updateGeofence();
        } else {
            this.saveGeoFence();
        }
    }

    setCustomCircle(circle, radius) {
        this.geoFence.geofence.points = [];
        this.geoFence.geofence.geofenceType = GeofenceType[GeofenceType.POINT];
        this.geoFence.geofence.points.push({
            lat: circle.lat,
            lon: circle.lng
        });
        this.geoFence.geofence.radius = radius;
        console.log('custom circle fence', this.geoFence);
    }

    centerMap(center) {
        this.center = center;
    }

    /**
     * Create trailing lines for points
     * @param points
     */
    createPath(points) {
        const path = [];
        points.forEach(point => {
            path.push(new google.maps.LatLng(point.geopoint.lat, point.geopoint.lon));
        });
        return path;
    }

    setUpDrawingManager() {
        this.drawingManager = new google.maps.drawing.DrawingManager({
            // drawingMode: google.maps.drawing.OverlayType.MARKER,
            drawingControl: false,
            drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_LEFT,
                drawingModes: [
                    google.maps.drawing.OverlayType.POLYGON,
                    google.maps.drawing.OverlayType.CIRCLE
                ]
            },
            markerOptions: {
                position: new google.maps.LatLng(12.9195, 77.66862),
                icon: ''
            },
            polygonOptions: {
                clickable: true,
                draggable: true,
                editable: true,
                strokeWeight: 2,
                strokeColor: '#ff6d00',
                fillColor: '#ff6d00',
                fillOpacity: 0.4
            },
            circleOptions: {
                editable: false,
                clickable: true,
                draggable: true,
                strokeWeight: 2,
                strokeColor: '#ff6d00',
                fillColor: '#ff6d00',
                fillOpacity: 0.4
            },
            rectangleOptions: {
                editable: false,
                clickable: true,
                strokeWeight: 2,
                strokeColor: '#ff6d00',
                fillColor: '#ff6d00',
                fillOpacity: 0.4
            }
        });
        this.drawingManager.setMap(this.map);
        this.setupOverlayListener();
    }

    setShape(shape) {
        this.clearGeoFence();
        switch (shape) {
            case 'circle':
                this.drawingManager.setDrawingMode(google.maps.drawing.OverlayType.CIRCLE);
                this.showRadius = true;
                break;
            case 'polygon':
                this.drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
                this.showRadius = false;
                break;
        }
    }

    setupOverlayListener() {
        google.maps.event.addListener(this.drawingManager, 'overlaycomplete', (event) => {
            console.log('Overlay complete', event);
            this.showSave = true;
            this.drawingManager.setDrawingMode(null);
            this.drawingManager.setOptions({
                drawingControl: false
            });
            event.overlay.setEditable(false);
            this.currentOverlay = event.overlay;
            switch (event.type) {
                case 'polygon':
                    this.getPointsForPoly(event.overlay);
                    break;
                case 'circle':
                    this.getPointsForCircle(event.overlay);
                    break;
            }
            this.changeDetector.detectChanges();
        });
    }

    clearGeoFence() {
        console.log('this.currentOverlay', this.currentOverlay);
        this.overlays = [];
        this.showSave = false;
        if (this.currentOverlay) {
            this.currentOverlay.setMap(null);
            this.currentOverlay = null;
            this.showRadius = false;
            this.geoFence.geofence.radius = 0;
            this.changeDetector.detectChanges();
        }
    }

    back(saving?) {
        this.router.navigate(['../list'], {relativeTo: this.currentRoute});
    }

    setGeofenceTimezone() {
        this.fleetView$ = this.fleetService.fetchFleetView(this.fleetService.getFleetId()).subscribe(res => {
            console.log('fleet view', res);
            this.geoFence.geofence.timezoneId = res.timeZoneId;
        });
    }

    saveGeoFence() {
        this.geoFence.operationType = OperationType[OperationType.CREATE];
        console.log('payload', this.geoFence);
        this.createGeofence$ = this.vehicleService.postGeoFenceData(this.geoFence)
            .finally(() => this.saving = false)
            .subscribe(res => {
                    console.log('Geo fence data sent successfully!!!', res);
                    this.toastMessage.showSuccess('SUCCESS', 'GEOFENCE_SAVED_SUCCESSFULLY');
                    this.back(true);
                },
                err => {
                    console.log('Error geofence vehicle', err);
                    this.toastMessage.showError('ERROR', 'ERROR_SAVING_GEOFENCE');
                });
        this.drawingManager.setMap(null);
    }

    setView() {
        let color = '';
        switch (this.geoFence.tracking_status) {
            case 'ENTER':
                color = '#4CAF50';
                break;
            case 'EXIT':
                color = '#ff6d00';
                break;
        }
        if (this.geoFence.geofence.geofenceType === 'POINT') {
            this.showRadius = true;
            this.overlays.push(this.drawCircle(this.geoFence.geofence.gid, this.geoFence.geofence.points[0], color, this.geoFence.geofence.radius, true));
        } else if (this.geoFence.geofence.geofenceType === 'POLYGON') {
            this.overlays.push(this.drawPolygon(this.geoFence.geofence.gid, this.geoFence.geofence.points, color));
        }
        console.log('Overlays are', this.overlays);
        this.setBounds();
    }

    fenceBound(fence) {
        switch (fence.geofence.geofenceType) {
            case GeofenceType[GeofenceType.POINT]:
                console.log('Overlay is ', _.filter(this.overlays, ['gid', fence.geofence.gid])[0]);
                const overlay = _.filter(this.overlays, ['gid', fence.geofence.gid])[0];
                if (overlay instanceof google.maps.Circle) {
                    this.map.fitBounds(overlay.getBounds());
                    overlay.setOptions({strokeColor: '#33e5b5'});
                }
                break;
            default:
                const bounds = new google.maps.LatLngBounds();
                fence.geofence.points.forEach(point => {
                    bounds.extend(new google.maps.LatLng(point.lat, point.lon));
                });
                this.map.fitBounds(bounds);
                break;
        }
    }

    setBounds() {
        const bounds = new google.maps.LatLngBounds();
        this.overlays.forEach((item, index) => {
            if (item instanceof google.maps.Circle) {
                bounds.union(item.getBounds());
            } else if (item instanceof google.maps.Polygon) {
                bounds.union(this.getPolygonBounds(item));
            }
        });
        this.map.fitBounds(bounds); // Map object used directly
    }

    drawPolygon(id, points, color) {
        const allpoints = [];
        points.forEach((item, index) => {
            allpoints.push({lat: points[index].lat, lng: points[index].lon});
        });
        const polygon = new google.maps.Polygon({
            // paths: allpoints,
            paths: allpoints,
            editable: false,
            strokeWeight: 2,
            strokeColor: color,
            fillColor: color,
            fillOpacity: 0.4
        });
        polygon['gid'] = id;
        return polygon;
    }

    drawCircle(id, points, color, radius, drag) {
        const circle = new google.maps.Circle({
            strokeColor: color,
            strokeWeight: 2,
            fillColor: color,
            fillOpacity: 0.4,
            radius: radius == 0 ? 1000 : radius,
            center: {lat: points.lat, lng: points.lon},
            draggable: drag
            // center: citymap[city].center,
        });
        circle['gid'] = id;
        return circle;
    }

    handleDragEnd(event) {
        console.log('handle drag', event);
        this.setPointsForCircle(event.overlay);
    }

    setPointsForCircle(circle) {
        this.geoFence.geofence.points = [];
        this.geoFence.geofence.points.push({
            lat: circle.center.lat(),
            lon: circle.center.lng()
        });
        console.log('new points', this.geoFence);
    }

    getPointsForCircle(circle) {
        this.geoFence.geofence.points = [];
        this.geoFence.geofence.geofenceType = GeofenceType[GeofenceType.POINT];
        this.geoFence.geofence.points.push({
            lat: circle.getCenter().lat(),
            lon: circle.getCenter().lng()
        });
        this.geoFence.geofence.radius = circle.getRadius();
        console.log('New Fence', this.geoFence);
    }

    getPointsForPoly(polygon) {
        this.geoFence.geofence.points = [];
        this.geoFence.geofence.geofenceType = GeofenceType[GeofenceType.POLYGON];
        const path = polygon.getPath();
        for (let i = 0; i < path.length; i++) {
            this.geoFence.geofence.points.push({
                lat: path.getAt(i).lat(),
                lon: path.getAt(i).lng()
            });
        }
        this.geoFence.geofence.radius = 0;
        console.log('New Fence', this.geoFence);
    }

    getPolygonBounds(polygon) {
        const paths = polygon.getPaths();
        const bounds = new google.maps.LatLngBounds();
        paths.forEach(function (path) {
            const ar = path.getArray();
            for (let i = 0, l = ar.length; i < l; i++) {
                bounds.extend(ar[i]);
            }
        });
        return bounds;
    }

    radioChecked(event) {
        this.geoFence.tracking_status = TrackingStatus[event.value];
        console.log('radio select', event);
    }

    activeChange(event, fence) {
        // this.geoFence = fence;
        // this.geoFence.geofence.active = event;
        // this.putPayload(this.geoFence);
    }

    updateGeofence() {
        this.geoFence.operationType = OperationType[OperationType.UPDATE];
        console.log('put payload', this.geoFence);
        this.updateGeofence$ = this.vehicleService.updateGeoFenceData(this.geoFence)
            .finally(() => this.saving = false)
            .subscribe(res => {
                    console.log('Geo fence data update successfully!!!', res);
                    this.toastMessage.showSuccess('SUCCESS', 'GEOFENCE_UPDATED_SUCCESSFULLY');
                    this.back(true);
                },
                err => {
                    console.log('Error failed to update', err.status, err);
                    this.toastMessage.showError('ERROR', 'ERROR_UPDATING_GEOFENCE');
                });
    }

    deleteShape(fence) {
        this.geoFence = fence;
        this.geoFence.operationType = OperationType[OperationType.DELETE];
        console.log('delete payload', this.geoFence, this.geoFence.operationType);

        this.deleteGeoFence$ = this.vehicleService.deleteGeoFenceFromVehicle(this.geoFence).subscribe(res => {
                console.log('Geo fence data deleted successfully!!!', res);
                this.toastMessage.showSuccess('SUCCESS', 'GEOFENCE_DELETED_SUCCESSFULLY');
                this.callAfterTimeOut();
            },
            err => {
                console.log('Error geofence vehicle', err);
                this.toastMessage.showError('ERROR', 'GEOFENCES_FAILED_TO_DELETE');
            });
    }

    callAfterTimeOut() {
    }
}
