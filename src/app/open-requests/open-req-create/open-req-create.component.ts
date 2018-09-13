import {Component, OnInit} from '@angular/core';
import {OpenrequestService} from '../../service/openrequest.service';
import {RequestorService} from '../../service/requestor.service';
import {FleetService} from '../../service/fleet.service';
import {CommunicatorService} from '../../common/communicator.service';
import {ActivatedRoute} from '@angular/router';
import {MapLoaderService} from '../../service/map-loader.service';

declare const google;

@Component({
    selector: 'cbp-open-req-create',
    templateUrl: './open-req-create.component.html',
    styleUrls: ['./open-req-create.component.scss']
})
export class OpenReqCreateComponent implements OnInit {
    new: any;
    overlays: any[] = [];
    options: any;
    map;
    infoWindow;
    start_marker;
    start_marker_info_window;
    end_marker;
    end_marker_info_window;
    showMap: boolean;

    constructor(private requestorService: RequestorService, private openRequestService: OpenrequestService, private fleetService: FleetService, private comms: CommunicatorService, private route: ActivatedRoute) {
        this.comms.on('set-marker-on-address', payload => {
            this.addMarker(payload.address, payload.isStart);
        });
        this.comms.on('set-point-on-address', payload => {
            this.addMarkerByPoint(payload.address, payload.point, payload.isStart);
        })
        MapLoaderService.load().then(() => {
            console.log('Map Loaded');
            this.showMap = true;
            this.start_marker_info_window = new google.maps.InfoWindow({disableAutoPan: true});
            this.end_marker_info_window = new google.maps.InfoWindow({disableAutoPan: true});
            this.start_marker = new google.maps.Marker();
            this.end_marker = new google.maps.Marker();
        })
    }

    ngOnInit() {
        this.options = {
            center: {lng: 77.66862, lat: 12.9195},
            zoom: 14
        };
        this.overlays.push(this.start_marker);
        this.overlays.push(this.end_marker);
        this.new = this.route.snapshot.queryParams['request'];
    }

    setMap(event) {
        this.map = event.map;
        this.getLocation();
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
        };
    }

    addMarker(event, start) {
        if (start) {
            this.start_marker.setIcon('https://maps.google.com/mapfiles/ms/icons/green-dot.png');
            this.start_marker.setPosition(event.geometry.location);
            this.start_marker_info_window.setContent(event.adr_address);
            this.start_marker_info_window.open(this.map, this.start_marker);
        } else {
            this.end_marker.setIcon('https://maps.google.com/mapfiles/ms/icons/red-dot.png');
            this.end_marker.setPosition(event.geometry.location);
            this.end_marker_info_window.setContent(event.adr_address);
            this.end_marker_info_window.open(this.map, this.end_marker);
            this.setBounds();
        }
    }

    addMarkerByPoint(adrr, point, start) {
        if (start) {
            this.start_marker.setIcon('https://maps.google.com/mapfiles/ms/icons/green-dot.png');
            this.start_marker.setPosition(new google.maps.LatLng(point.lat, point.lon));
            this.start_marker_info_window.setContent(adrr);
            this.start_marker_info_window.open(this.map, this.start_marker);
        } else {
            this.end_marker.setIcon('https://maps.google.com/mapfiles/ms/icons/red-dot.png');
            this.end_marker.setPosition(new google.maps.LatLng(point.lat, point.lon));
            this.end_marker_info_window.setContent(adrr);
            this.end_marker_info_window.open(this.map, this.end_marker);
        }
    }

    setBounds() {
        const bounds = new google.maps.LatLngBounds();
        this.overlays.forEach(marker => {
            if (marker instanceof google.maps.Marker) {
                bounds.extend(marker.getPosition());
            }
        });
        setTimeout(() => { // map will need some time to load
            this.map.fitBounds(bounds); // Map object used directly
        }, 1000);
    }


}



