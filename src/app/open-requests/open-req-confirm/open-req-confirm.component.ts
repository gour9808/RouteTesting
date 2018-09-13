import {Component, OnInit} from '@angular/core';
import {CommunicatorService} from '../../common/communicator.service';
import {ActivatedRoute} from '@angular/router';
import * as _ from 'lodash';
import * as randomColor from 'randomcolor';
import {Constants} from '../../service/constants';
import {MapLoaderService} from "../../service/map-loader.service";

declare const google;

@Component({
  selector: 'cbp-open-req-confirm',
  templateUrl: './open-req-confirm.component.html',
  styleUrls: ['./open-req-confirm.component.scss']
})
export class OpenReqConfirmComponent implements OnInit {

  new: any;
  overlays: any[] = [];
  options: any;
  map;
  infoWindow;
  start_marker;
  start_marker_info_window;
  end_marker;
  end_marker_info_window;
  point_marker;
  point_marker_info_window;
  trackers: any = {};
  carSvg = 'M29.395,0H17.636c-3.117,0-5.643,3.467-5.643,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759 \
  c3.116,0,5.644-2.527,5.644-5.644V6.584C35.037,3.467,32.511,0,29.395,0z M34.05,14.188v11.665l-2.729,0.351v-4.806L34.05,14.188z \
  M32.618,10.773c-1.016,3.9-2.219,8.51-2.219,8.51H16.631l-2.222-8.51C14.41,10.773,23.293,7.755,32.618,10.773z M15.741,21.713 \
  v4.492l-2.73-0.349V14.502L15.741,21.713z M13.011,37.938V27.579l2.73,0.343v8.196L13.011,37.938z M14.568,40.882l2.218-3.336 \
  h13.771l2.219,3.336H14.568z M31.321,35.805v-7.872l2.729-0.355v10.048L31.321,35.805z';
  vehicles: any = [];
  showMap: boolean;
  constructor(private comms: CommunicatorService, private route: ActivatedRoute) {
    this.comms.on('plot-vehicle', payload => {
      console.log('Plot');
      this.vehicles.push(payload);
      this.addOverlayForVehicle(payload);
    })
    this.comms.on('set-point-on-address', payload => {
      this.addMarkerByPoint(payload.address, payload.point, payload.isStart);
    })
    this.comms.on('set-waypoint-on-address', payload => {
      this.addMarkerWayPoint(payload);
    })
  }

  ngOnInit() {
    this.options = {
      center: { lng: 77.66862, lat: 12.9195 },
      zoom: 14
    };
    MapLoaderService.load().then(() => {
        this.start_marker_info_window = new google.maps.InfoWindow({ disableAutoPan: true });
        this.start_marker = new google.maps.Marker();
        this.end_marker = new google.maps.Marker();
        this.end_marker_info_window = new google.maps.InfoWindow({ disableAutoPan: true });
        this.point_marker = new google.maps.Marker();
        this.point_marker_info_window = new google.maps.InfoWindow({ disableAutoPan: true });
        this.showMap = true;
        this.overlays.push(this.start_marker);
        this.overlays.push(this.end_marker);
    });
    this.new = this.route.snapshot.queryParams['request'];
  }

  setMap(event) {
    this.map = event.map;
    // this.getLocation();
  }

  getLocation() {
    if (navigator.geolocation) {
      console.log('Getting location');
      navigator.geolocation.getCurrentPosition(position => {
        console.log(position);
        this.options = {
          center: { lng: position.coords.longitude, lat: position.coords.latitude },
          zoom: 14
        }
        this.map.panTo(new google.maps.LatLng(position.coords.latitude , position.coords.longitude ));
      });
    };
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

  addMarkerWayPoint(waypoints) {
    if (waypoints !== undefined) {
      waypoints.forEach((item, index) => {
        this.point_marker = new google.maps.Marker();
        this.point_marker_info_window = new google.maps.InfoWindow({ disableAutoPan: true });
        this.point_marker.setIcon('https://maps.google.com/mapfiles/ms/icons/blue-dot.png');
        this.point_marker.setPosition(new google.maps.LatLng(item.geopoint.lat, item.geopoint.lon));
        this.point_marker_info_window.setContent(item.city);
        this.point_marker_info_window.open(this.map, this.point_marker);
        this.overlays.push(this.point_marker);
        this.setBounds();
      });
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


  prepareOverlays() {
    this.vehicles.forEach(vehicle => {
      this.addOverlayForVehicle(vehicle);
    });
    console.log('Trackers', this.trackers);
    console.log('Overlays', this.overlays);
  }

  addOverlayForVehicle(vehicle, noLoca?) {
    const color = randomColor({
      luminosity: 'dark'
    });
    this.trackers[vehicle.vehicleId] = {
      icon: null,
      marker: null,
      polyline: null,
      color: color
    };
    this.trackers[vehicle.vehicleId].icon = {
      path: this.carSvg, // url
      fillColor: color,
      fillOpacity: 4,
      anchor: new google.maps.Point(25, 25),
      scale: .75,
      strokeWeight: 0,
      rotation: 0
    };
    this.trackers[vehicle.vehicleId].marker = new google.maps.Marker({
      position: { lat: _.has(vehicle, 'lastKnownPosition.lat') ? vehicle.lastKnownPosition.lat : 0, lng: _.has(vehicle, 'lastKnownPosition.lon') ? vehicle.lastKnownPosition.lon : 0 },
      title: vehicle.name,
      icon: this.trackers[vehicle.vehicleId].icon,
      label: ' '
    });
    this.trackers[vehicle.vehicleId].marker['vehicle'] = vehicle;
    this.trackers[vehicle.vehicleId].marker['self'] = this;
    this.trackers[vehicle.vehicleId].polyline = new google.maps.Polyline({
      path: [],
      geodesic: true,
      strokeColor: color,
      strokeOpacity: 0.5,
      strokeWeight: 5
    });
    this.trackers[vehicle.vehicleId].infoWindow = new google.maps.InfoWindow({
      content: '<div><b>' + vehicle.numberPlate.strLicense + '</b>',
      disableAutoPan: true
    });
    this.overlays.push(this.trackers[vehicle.vehicleId].marker);
    this.overlays.push(this.trackers[vehicle.vehicleId].polyline);
    // google.maps.event.addListener(this.trackers[vehicle.vehicleId].marker, 'mouseover', this.hoverIn);
    // google.maps.event.addListener(this.trackers[vehicle.vehicleId].marker, 'mouseout', this.hoverOut);
    this.trackers[vehicle.vehicleId].infoWindow.open(this.map, this.trackers[vehicle.vehicleId].marker);
  }

  hasLastPosition(vehicle) {
    return _.has(vehicle, 'lastKnownPosition.lat') && _.has(vehicle, 'lastKnownPosition.lon');
  }

  getVehicleLogo(make) {
    if (make != null && make !== undefined) {
      return Constants.GET_VEHICLE_LOGO(make);
    }
  }

}
