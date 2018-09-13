import {Component, OnDestroy, OnInit} from '@angular/core';
import {FleetService} from '../service/fleet.service';
import {Constants} from '../service/constants';
import * as _ from 'lodash';
import {CommunicatorService} from '../common/communicator.service';
import {Router} from '@angular/router';
import {VehicleService} from '../service/vehicle.service';
import {MapLoaderService} from '../service/map-loader.service';
import {AutoUnsubscribe} from '../utils/auto-unsubscribe';
import {ToastMessageService} from '../service/toast-message.service';
import {TrackingService} from '../service/tracking.service';
import {CarbookRoles, UserService} from 'app/service/user.service';
import {GroupTypes} from '../service/user.service';

declare var google;

@Component({
    selector: 'cbp-tracking',
    templateUrl: './tracking.component.html',
    styleUrls: ['./tracking.component.scss']
})

@AutoUnsubscribe()
export class TrackingComponent implements OnInit, OnDestroy {
    vehicleInfo$;
    showMap: boolean;
    mapToBounds: boolean;
    vehicleBounds: boolean;
    selectedVehicle: any;
    trackers: any = {};
    vehicles: any = [];
    drivers: any = [];
    polyline: any;
    position: any;
    check: any;
    icon;
    options: any = {
        center: {lng: -98.5795, lat: 39.8282},
        zoom: 14
    };
    overlays: any[] = [];
    marker: any;
    map: any;
    bounds: any;
    // Use https://robert.katzki.de/posts/inline-svg-as-google-maps-marker
    carSvg = 'M29.395,0H17.636c-3.117,0-5.643,3.467-5.643,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759 \
            c3.116,0,5.644-2.527,5.644-5.644V6.584C35.037,3.467,32.511,0,29.395,0z M34.05,14.188v11.665l-2.729,0.351v-4.806L34.05,14.188z \
            M32.618,10.773c-1.016,3.9-2.219,8.51-2.219,8.51H16.631l-2.222-8.51C14.41,10.773,23.293,7.755,32.618,10.773z M15.741,21.713 \
            v4.492l-2.73-0.349V14.502L15.741,21.713z M13.011,37.938V27.579l2.73,0.343v8.196L13.011,37.938z M14.568,40.882l2.218-3.336 \
            h13.771l2.219,3.336H14.568z M31.321,35.805v-7.872l2.729-0.355v10.048L31.321,35.805z';
    temp = [
        {vehicleId: 'afd6cf19-67b2-4401-9246-d835532ae64d'},
        {vehicleId: 'be82050b-4966-4518-8c2d-d01061257d3f'},
        {vehicleId: '2606472d-461c-4432-9fd4-200ef7805fc3'}
    ];
    tabs = [{title: 'Active Car', active: false}, {
        title: 'Inactive Car'
        , active: false
    }];
    infoWindow: any;
    driverUserId: any;
    hoverIn = function showInfoWindow(event) {
        console.log('Info Window in', this.vehicle);
        this.self.infoWindow.setContent(this.vehicle.name + ' ' + this.vehicle.make + ' ' + this.vehicle.model);
        this.self.infoWindow.open(this.self.map, this);
    };
    hoverOut = function showInfoWindow(event) {
        console.log('Info Window out', this.vehicle);
        this.self.infoWindow.close();
    };
    /**
     * Check if overlay is created. If not, create it and then add it to map.
     * @param event Event to plot
     *
     */
    checkAndPlot = (event) => {
        console.log('Plotting', event);
        if (_.has(this.trackers, event.vehicleId)) {
            if (event.waypoints.length >= 1) {
                this.plotOnMapForVehicle(event.vehicleId, event.waypoints[0].geopoint, event.waypoints);
                this.comms.broadcast('tracking-active', event.vehicleId);
            } else {
                this.comms.broadcast('tracking-ready', event.vehicleId);
                console.log('Amber it out');
            }
        } else {
            this.prepareOverlays(_.find(this.vehicles, ['vehicleId', event.vehicleId]));
            this.checkAndPlot(event);
        }
    }

    constructor(private fleetService: FleetService, private comms: CommunicatorService, private userService: UserService,
                private toastMsg: ToastMessageService, private router: Router, private vehicleService: VehicleService, private trackingService: TrackingService) {
        this.driverUserId = this.userService.getUserId();
    }

    enableComms() {
        this.comms.on('map-bound', vehicle => {
            console.log('Bound to ', vehicle);
            this.mapToBounds = false;
            this.vehicleBounds = true;
            this.selectedVehicle = vehicle;
            this.setBoundsForVehicle(vehicle);
        });

        this.comms.on('map-unbound', () => {
            this.vehicleBounds = false;
            this.selectedVehicle = null;
        })

        this.comms.on('fit-bound', (shouldFit) => {
            console.log('Fit to bound', shouldFit);
            this.mapToBounds = shouldFit;
            shouldFit ? this.setBounds() : null;
        });
    }

    ngOnInit() {
        MapLoaderService.load().then(() => {
            this.showMap = true;
        });
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
        }
    }

    ngOnDestroy() {
        console.log('Destroy & Cleanup');
        this.trackingService.stopTracking(_.map(this.vehicles, 'vehicleId'));
        this.trackingService.disconnectSocket();
    }

    getFleetView() {
        this.fleetService.fetchFleetView(this.fleetService.getFleetId()).subscribe(res => {
            console.log('FleetView is', res);
            this.vehicles = res['vehicleView'];
            this.vehicles = _.filter(this.vehicles, (vehicle) => vehicle.responseType != 'REJECTED');
            this.checkRole();
            this.drivers = _.filter(res['userProfile'], profile => res['driverIdList'].includes(profile.userId));
            this.comms.broadcast('tracking-vehicles', this.vehicles);
            this.comms.broadcast('tracking-drivers', this.drivers);
            this.getLKLForVehicles();
        })
    }

    checkRole() {
        const driverRole = this.userService.hasRole(GroupTypes.FLEET, this.fleetService.getFleetId(), CarbookRoles.DRIVER);
        console.log('user is driver', this.driverUserId);
        if (driverRole == true) {
            this.checkSuperRole();
        }
    }

    checkSuperRole() {
        const superRole = this.userService.getRole(this.fleetService.getFleetId());
        console.log('all roles are', superRole);
        if ((_.includes(superRole, CarbookRoles[CarbookRoles.MANAGER]) || _.includes(superRole, CarbookRoles[CarbookRoles.CB_ADMIN])) == false) {
            this.vehicles = _.filter(this.vehicles, {'currentDriver': this.driverUserId});
            console.log('current driver vehicle', this.vehicles);
        }
    }

    addOverlayForVehicle(vehicle, position) {
        this.trackers[vehicle.vehicleId].marker.setPosition(new google.maps.LatLng(position.lat, position.lon));
        this.overlays.push(this.trackers[vehicle.vehicleId].marker);
        this.overlays.push(this.trackers[vehicle.vehicleId].polyline);
        this.trackers[vehicle.vehicleId].infoWindow.open(this.map, this.trackers[vehicle.vehicleId].marker);
        this.trackers[vehicle.vehicleId].color = '#298e04';
        this.trackers[vehicle.vehicleId].icon.fillColor = '#298e04';
        this.trackers[vehicle.vehicleId].polyline.strokeColor = '#298e04';
        // google.maps.event.addListener(this.trackers[vehicle.vehicleId].marker, 'mouseover', this.hoverIn);
        // google.maps.event.addListener(this.trackers[vehicle.vehicleId].marker, 'mouseout', this.hoverOut);
        this.comms.broadcast('tracking-ready', vehicle.vehicleId);
        this.comms.broadcast('update-icon', vehicle.vehicleId, '#298e04');
    }

    prepareOverlays(vehicle) {
        this.trackers[vehicle.vehicleId] = {
            icon: null,
            marker: null,
            polyline: null,
            color: '#e67e22'
        };
        this.trackers[vehicle.vehicleId].icon = {
            path: this.carSvg, // url
            fillColor: '#e67e22',
            fillOpacity: 4,
            anchor: new google.maps.Point(25, 25),
            scale: .75,
            strokeWeight: 0,
            rotation: 0
        };
        this.trackers[vehicle.vehicleId].marker = new google.maps.Marker({
            title: vehicle.name,
            icon: this.trackers[vehicle.vehicleId].icon,
            label: ' '
        });
        this.trackers[vehicle.vehicleId].marker['vehicle'] = vehicle;
        this.trackers[vehicle.vehicleId].marker['self'] = this;
        this.trackers[vehicle.vehicleId].polyline = new google.maps.Polyline({
            path: [],
            geodesic: true,
            strokeColor: '#e67e22',
            strokeOpacity: 0.5,
            strokeWeight: 5
        });
        console.log('Overlay ready');
        this.hasCurrentDriver(vehicle) ? this.setDriverInfoWindow(vehicle) : this.setVehicleInfoWindow(vehicle);
        this.enableComms();
    }


    hasCurrentDriver(vehicle) {
        return _.has(vehicle, 'currentDriver');
    }

    getVehicleLogo(make) {
        if (make != null && make !== undefined) {
            return Constants.GET_VEHICLE_LOGO(make);
        }
    }

    setMap(event) {
        this.getLocation();
        console.log('event from map', event.map);
        this.map = event.map;
        this.getFleetView();
    }

    adjustZoom() {
        google.maps.event.addListenerOnce(this.map, 'bounds_changed', function (event) {
            if (this.getZoom() < 15) {
                this.setZoom(14);
            }
        });
    }

    fitBounds(val) {
        console.log('Fit Bounds', val);
        this.mapToBounds = val;
    }

    setBounds() {
        const bounds = new google.maps.LatLngBounds();
        this.overlays.forEach(marker => {
            if (marker instanceof google.maps.Marker) {
                bounds.extend(marker.getPosition());
            }
        });
        setTimeout(() => { // map will need some time to load
            // this.adjustZoom();
            this.map.fitBounds(bounds); // Map object used directly
        }, 1000);
    }

    setBoundsForVehicle(vehicle) {
        if (_.has(this.trackers, vehicle.vehicleId)) {
            console.log('Bounding to', this.trackers[vehicle.vehicleId]);
            const bounds = new google.maps.LatLngBounds();
            bounds.extend(this.trackers[vehicle.vehicleId].marker.getPosition());
            this.trackers[vehicle.vehicleId].marker.setZIndex(google.maps.Marker.MAX_ZINDEX + 1);
            setTimeout(() => { // map will need some time to load
                this.adjustZoom();
                this.map.panTo(this.trackers[vehicle.vehicleId].marker.getPosition()); // Map object used directly
            }, 100)
        }
    }

    /**
     * Start listening to all the vehicles in a fleet
     *
     * TODO: Listen to only approved vehicles
     */
    joinRoom() {
        this.trackingService.joinChannel(_.map(this.vehicles, 'vehicleId'));
        this.vehicles.forEach(vehicle => {
            this.trackingService.startTracking(vehicle.vehicleId, this.checkAndPlot);
        });
    }

    /**
     * Get the last known location of the vehicle. HACK. DONT USE IN PROD.
     */
    getLKLForVehicles() {
        this.vehicles.forEach(vehicle => {
            this.prepareOverlays(vehicle);
            this.vehicleInfo$ = this.vehicleService.fetchLastKnownLocation(vehicle.vehicleId).subscribe(res => {
                console.log('Vehicle LKL', res);
                if (res && _.has(res, 'waypoints')) {
                    this.addOverlayForVehicle(vehicle, res['waypoints'][0].geopoint)
                }
            })
        });
        this.trackingService.init(() => {
            console.log('Socket Connected');
            this.joinRoom();
        })
    }

    setDriverInfoWindow(vehicle) {
        if (_.has(this.trackers, vehicle.vehicleId)) {
            const driver = _.find(this.drivers, ['userId', vehicle.currentDriver]);
            const vehicleLogo = _.has(vehicle, 'make') ? '<span class="car-icon" style="background-image: url(' + encodeURI(this.getVehicleLogo(vehicle.make)) + ')"></span>'
                : '<span class="car-icon"><i class="mdi mdi-car"></i></span>';
            const imgStr = _.has(driver, 'profilePhotoURL') ? '<img src="' + driver.profilePhotoURL + '" class="driver-avatar">'
                : '<i class="mdi mdi-account-circle avatar"></i>';
            const phone = _.has(driver, 'phoneNumbers') ? '<a href="tel:' + driver.phoneNumbers[0] + '" title="Call Driver">' + driver.phoneNumbers[0] + '</a>'
                : '<a href="mailto:' + driver.currentEMail + '" title="Email Driver">' + driver.currentEMail + '</a>';
            this.trackers[vehicle.vehicleId].infoWindow = new google.maps.InfoWindow({
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
        if (_.has(this.trackers, vehicle.vehicleId)) {
            const vehicleLogo = _.has(vehicle, 'make') ? '<span class="car-icon" style="background-image: url(' + encodeURI(this.getVehicleLogo(vehicle.make)) + ')"></span>'
                : '<span class="car-icon"><i class="mdi mdi-car"></i></span>';
            this.trackers[vehicle.vehicleId].infoWindow = new google.maps.InfoWindow({
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

    /**
     * Plot the vehicle marker on the Map
     * @param vehicleId
     * @param position
     * @param path
     */
    plotOnMapForVehicle(vehicleId, position, path) {
        const prevPos = this.trackers[vehicleId].marker.getPosition();
        this.trackers[vehicleId].marker.setPosition(new google.maps.LatLng(position.lat, position.lon));
        const heading = prevPos ? google.maps.geometry.spherical.computeHeading(prevPos, this.trackers[vehicleId].marker.getPosition()) : 0;
        heading !== 0 ? this.trackers[vehicleId].icon.rotation = heading : null;
        this.trackers[vehicleId].marker.setIcon(this.trackers[vehicleId].icon);
        this.trackers[vehicleId].polyline.setPath(this.createPath(path.splice(0, Math.ceil(path.length / 2))));
        this.mapToBounds ? this.setBounds() : null;
        this.selectedVehicle && vehicleId == this.selectedVehicle.vehicleId && this.vehicleBounds ? this.setBoundsForVehicle(this.selectedVehicle) : null;
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
