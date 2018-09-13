import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {VehicleService} from '../../service/vehicle.service';
import * as _ from 'lodash';
import {TrackingService} from '../../service/tracking.service';
import {MapLoaderService} from '../../service/map-loader.service';
import {Carbook} from '../../models/vehicle';
import * as cbgf from '../../models/geofence';
import {AutoUnsubscribe} from '../../utils/auto-unsubscribe';
import {ToastMessageService} from '../../service/toast-message.service';
import {Constants} from '../../service/constants';
import {FleetService} from '../../service/fleet.service';

declare var google;

@Component({
    selector: 'cbp-vehicle-tracking',
    templateUrl: './vehicle-tracking.component.html',
    styleUrls: ['./vehicle-tracking.component.scss']
})

@AutoUnsubscribe()
export class VehicleTrackingComponent implements OnInit, OnDestroy {
    vehicleSub$;
    geoFence$;
    vehicleInfo$;
    showMap: boolean;
    geoCoderDetail;
    placedetail;
    driver: any;
    center: any;
    map: any;
    overlays: any[] = [];
    vid: any;
    vehicle: Carbook.Vehicle;
    options: any;
    radius: number;
    vehicleMarker: any = {
        icon: null,
        marker: null,
        polyline: null,
        color: '',
        infoWindow: null
    };
    carSvg = 'M29.395,0H17.636c-3.117,0-5.643,3.467-5.643,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759 \
  c3.116,0,5.644-2.527,5.644-5.644V6.584C35.037,3.467,32.511,0,29.395,0z M34.05,14.188v11.665l-2.729,0.351v-4.806L34.05,14.188z \
  M32.618,10.773c-1.016,3.9-2.219,8.51-2.219,8.51H16.631l-2.222-8.51C14.41,10.773,23.293,7.755,32.618,10.773z M15.741,21.713 \
  v4.492l-2.73-0.349V14.502L15.741,21.713z M13.011,37.938V27.579l2.73,0.343v8.196L13.011,37.938z M14.568,40.882l2.218-3.336 \
  h13.771l2.219,3.336H14.568z M31.321,35.805v-7.872l2.729-0.355v10.048L31.321,35.805z';
    enableLive = true;
    geofence: boolean;
    payload: any;
    @Output() drawFenceEmit: any = new EventEmitter<any>();
    icon: any;
    geoFenceList: cbgf.GeoFence.GeofenceTracker[] = [];
    drivers: any = [];
    liveTrack: boolean;
    /**
     * Plot the vehicle marker on the Map
     * @param event
     */
    plotOnMapForVehicle = (event) => {
        this.enableLive = true;
        console.log('Plotting');
        const vehicleId = event.vehicleId;
        const position = event.waypoints[0].geopoint;
        const path = event.waypoints;
        const prevPos = this.vehicleMarker.marker.getPosition();
        this.vehicleMarker.marker.setPosition(new google.maps.LatLng(position.lat, position.lon));
        const heading = google.maps.geometry.spherical.computeHeading(prevPos, this.vehicleMarker.marker.getPosition());
        heading !== 0 ? this.vehicleMarker.icon.rotation = heading : null;
        this.vehicleMarker.marker.setIcon(this.vehicleMarker.icon);
        this.vehicleMarker.polyline.setPath(this.createPath(path.splice(0, Math.ceil(path.length / 2))));
        this.map.panTo(this.vehicleMarker.marker.getPosition());
    };

    constructor(private route: ActivatedRoute,
                private vehicleService: VehicleService,
                private fleetService: FleetService,
                private trackingService: TrackingService, private toastMsg: ToastMessageService) {
    }

    ngOnInit() {
        MapLoaderService.load().then(() => {
            this.placedetail = new google.maps.places.PlacesService(document.createElement('div'));
            this.geoCoderDetail = new google.maps.Geocoder();
            this.showMap = true;
        });

        this.vehicleSub$ = this.vehicleService.getVehicle().subscribe(res => {
            console.log('Gift from parent', res);
            this.vehicle = _.merge(new Carbook.Vehicle(), res);
            this.vid = this.vehicle ? this.vehicle.vehicleId : '';
            this.getFleetView();
        }, error => {
            this.toastMsg.showError('ERROR', 'ERROR_FETCHING_VEHICLES_FOR_FLEET')
        });
        this.options = {
            center: {lng: 77.66862, lat: 12.9195},
            zoom: 14,
            gestureHandling: 'cooperative'
        };
    }

    getFleetView() {
        this.fleetService.fetchFleetView(this.fleetService.getFleetId()).subscribe(res => {
            console.log('FleetView is', res);
            this.drivers = _.filter(res['userProfile'], profile => res['driverIdList'].includes(profile.userId));
            this.prepareOverlay(this.vehicle);
            this.vehicleSelected();
        })
    }

    ngOnDestroy() {
        console.log('Destroy & Cleanup');
        if (this.liveTrack) {
            this.trackingService.stopTracking(this.vid);
            this.trackingService.disconnectSocket();
        }
    }

    setMap(event) {
        setTimeout(() => {
            this.map = event.map;
            this.getLocation();
        }, 350);
    }

    getLocation() {
        if (navigator.geolocation) {
            console.log('Getting location');
            navigator.geolocation.getCurrentPosition(position => {
                this.options = {
                    center: {lng: position.coords.longitude, lat: position.coords.latitude},
                    zoom: 14
                };
                // this.map.panTo(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
            });
        }
    }


    vehicleSelected() {
        this.vehicleInfo$ = this.vehicleService.fetchLastKnownLocation(this.vehicle.vehicleId).subscribe(res => {
            console.log('Vehicle LKL', res);
            if (res && _.has(res, 'resolvedAddress')) {
                this.addOverlayForVehicle(this.vehicle, res['resolvedAddress'].geopoint);
                this.centerMap(res['resolvedAddress'].geopoint);
            }
        }, error => {
            this.toastMsg.showError('ERROR', 'ERROR_FETCHING_VEHICLE_INFORMATION')
        });
    }

    addOverlayForVehicle(vehicle, position) {
        this.vehicleMarker.marker.setPosition(new google.maps.LatLng(position.lat, position.lon));
        this.overlays.push(this.vehicleMarker.marker);
        this.overlays.push(this.vehicleMarker.polyline);
        this.vehicleMarker.infoWindow.open(this.map, this.vehicleMarker.marker);
        this.vehicleMarker.color = '#298e04';
        this.vehicleMarker.icon.fillColor = '#298e04';
        this.vehicleMarker.polyline.strokeColor = '#298e04';
        // google.maps.event.addListener(this.vehicleMarker.marker, 'mouseover', this.hoverIn);
        // google.maps.event.addListener(this.vehicleMarker.marker, 'mouseout', this.hoverOut);
    }


    prepareOverlay(vehicle) {
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
            label: ' '
        });
        this.vehicleMarker.marker['vehicle'] = vehicle;
        this.vehicleMarker.marker['self'] = this;
        this.vehicleMarker.polyline = new google.maps.Polyline({
            path: [],
            geodesic: true,
            strokeColor: '#e67e22',
            strokeOpacity: 0.5,
            strokeWeight: 5
        });
        console.log('Overlay ready');
        this.hasCurrentDriver(vehicle) ? this.setDriverInfoWindow(vehicle) : this.setVehicleInfoWindow(vehicle);
    }

    hasCurrentDriver(vehicle) {
        return _.has(vehicle, 'currentDriver');
    }

    setDriverInfoWindow(vehicle) {
        if (this.vehicleMarker) {
            const driver = _.find(this.drivers, ['userId', vehicle.currentDriver]);
            const vehicleLogo = _.has(vehicle, 'make') ? '<span class="car-icon" style="background-image: url(' + this.getVehicleLogo(vehicle.make) + ')"></span>'
                : '<span class="car-icon"><i class="mdi mdi-car"></i></span>';
            const imgStr = _.has(driver, 'profilePhotoURL') ? '<img src="' + driver.profilePhotoURL + '" class="driver-avatar">'
                : '<i class="mdi mdi-account-circle avatar"></i>';
            const phone = _.has(driver, 'phoneNumbers') ? '<a href="tel:' + driver.phoneNumbers[0] + '" title="Call Driver">' + driver.phoneNumbers[0] + '</a>'
                : '<a href="mailto:' + driver.currentEMail + '" title="Email Driver">' + driver.currentEMail + '</a>';
            this.vehicleMarker.infoWindow = new google.maps.InfoWindow({
                content: '<div class="details-header">' + imgStr +
                '<div class="column">' +
                '<div class="driver-name">' + _.capitalize(_.startCase(driver.displayname)) + '</div>' +
                '<div class="driver-email">' + phone + '</div></div><hr/>' + vehicleLogo + '<div class="column">' +
                '<div class="driver-license">' + vehicle.numberPlate.strLicense + '</div>' +
                '<div class="driver-license">' + vehicle.make + '</div>' +
                '</div></div>',
                maxWidth: 300,
                disableAutoPan: true
            });
        }
    }

    setVehicleInfoWindow(vehicle) {
        if (this.vehicleMarker) {
            const vehicleLogo = _.has(vehicle, 'make') ? '<span class="car-icon" style="background-image: url(' + this.getVehicleLogo(vehicle.make) + ')"></span>'
                : '<span class="car-icon"><i class="mdi mdi-car"></i></span>';
            this.vehicleMarker.infoWindow = new google.maps.InfoWindow({
                content: '<div class="details-header">' +
                vehicleLogo + '<div class="column">' +
                '<div class="driver-license">' + vehicle.numberPlate.strLicense + '</div>' +
                '<div class="driver-license">' + vehicle.make + '</div>' +
                '</div></div>',
                maxWidth: 300,
                disableAutoPan: true
            });
        }
    }

    getVehicleLogo(make) {
        if (make != null && make !== undefined && make.length > 1) {
            return Constants.GET_VEHICLE_LOGO(make);
        }
    }

    startLiveTracking(start) {
        this.liveTrack = start;
        console.log('Live tracking start', start);
        if (start && this.showMap) {
            this.trackingService.init(() => {
                this.trackingService.joinChannel([this.vid]);
                this.trackingService.startTracking(this.vid, this.plotOnMapForVehicle);
            });
        } else {
            this.trackingService.stopTracking(this.vid, this.plotOnMapForVehicle)
        }
    }

    centerMap(location) {
        this.map.panTo(new google.maps.LatLng(location.lat, location.lon));
    }

    showGeoFence(event) {
        if (event && this.vehicle.vehicleId && this.showMap) {
            this.getGeoFence();
        } else if (!event) {
            this.overlays = _.filter(this.overlays, overlay => {
                return !(overlay instanceof google.maps.Circle || overlay instanceof google.maps.Polygon);
            });
        }
    }

    showFenceIfEverythingReady() {
        if (this.vehicle.vehicleId && this.showMap) {
            this.getGeoFence();
        }
    }

    getGeoFence() {
        this.geoFence$ = this.vehicleService.getGeoFenceList(this.vehicle.vehicleId).subscribe(res => {
            console.log('Get fence data ', res);
            if (res) {
                this.geoFenceList = res;
                console.log('Geofence List', this.geoFenceList);
                this.setView();
            }
        }, error => {
            this.toastMsg.showError('ERROR', 'ERROR_FETCHING_GEOFENCE')
        })
    }

    setView() {
        this.geoFenceList.forEach((element, index) => {
            let color = '';
            switch (element.tracking_status) {
                case 'ENTER':
                    color = '#4CAF50';
                    break;
                case 'EXIT':
                    color = '#ff6d00';
                    break;
            }
            if (element.geofence.geofenceType === 'POINT') {
                this.overlays.push(this.drawCircle(element.geofence.gid, element.geofence.points[0], color, element.geofence.radius));
            } else if (element.geofence.geofenceType === 'POLYGON') {
                this.overlays.push(this.drawPolygon(element.geofence.gid, element.geofence.points, color));
            }
        });
        console.log('Overlays are', this.overlays);
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
            fillOpacity: 0.4,
        });
        polygon['gid'] = id;
        return polygon;
    }

    drawCircle(id, points, color, radius) {
        const circle = new google.maps.Circle({
            strokeColor: color,
            strokeWeight: 2,
            fillColor: color,
            fillOpacity: 0.4,
            radius: radius == 0 ? 1000 : radius,
            center: {lat: points.lat, lng: points.lon},
            // center: citymap[city].center,
        });
        circle['gid'] = id;
        return circle;
    }

    /**
     * Create trailing lines for points
     * @param points
     */
    createPath(points) {
        const path = [];
        points.forEach(point => {
            path.push(new google.maps.LatLng(point.geopoint.lat, point.geopoint.lon))
        });
        return path;
    }

}
