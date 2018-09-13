import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MapLoaderService} from '../service/map-loader.service';
import {FleetService} from '../service/fleet.service';
import {CarbookRoles, UserService} from '../service/user.service';
import {OrganisationService} from '../service/organisation.service';
import * as cbf from '../models/fleet';
import {ToastMessageService} from '../service/toast-message.service';
import {Cache} from '../utils/storage.provider';
import {ActivatedRoute, Router} from '@angular/router';
import {Organisation} from '../models/organization';
import * as _ from 'lodash';
import {Utils} from '../utils/utils';
import * as moment from 'moment-timezone';
import {TimezonePickerService} from '../service/timezone-picker.service';
import {debounce} from '../utils/debounce.decorator';

declare const google;

interface IOptions {
    label: any;
    value: any;
}

@Component({
    selector: 'cbp-create-fleet',
    templateUrl: './create-fleet.component.html',
    styleUrls: ['./create-fleet.component.scss']
})

export class CreateFleetComponent implements OnInit {
    @Cache({pool: 'User'}) userInfo: any;
    businessList: any;
    fleetList: any;

    map: any;
    options: any = {
        center: {lat: 36.890257, lng: 30.707417},
        zoom: 12,
        gestureHandling: 'cooperative'
    };
    placedetail;
    geoCoderDetail;
    fleet: cbf.Fleet = new cbf.Fleet();
    organisation = new Organisation();
    showMap: boolean;
    overlays: any[] = [];
    icon: any;
    latitude: number;
    longitude: number;
    businessOptions: IOptions[] = [];
    business: any;
    showDialog: boolean;
    ownedBusiness;
    countries: any = [];
    currentCountry: any;
    timezones: any = [];
    currentTimezone: any;

    constructor(private fleetService: FleetService,
                private orgService: OrganisationService,
                private userservice: UserService,
                private router: Router,
                private route: ActivatedRoute,
                private toastMessage: ToastMessageService,
                private timeZoneService: TimezonePickerService,
                private changed: ChangeDetectorRef) {
        console.log('Business List', this.businessList);
    }

    ngOnInit() {
        this.countries = this.timeZoneService.getCountries();
        this.currentCountry = this.timeZoneService.getCountryISOForTimeZone(moment.tz.guess());
        this.timezones = this.timeZoneService.getTimezoneForCountryISO(this.currentCountry);
        this.currentTimezone = moment.tz.guess();
        console.log('Time zone is', this.timezones);
        console.log('Country is', this.currentCountry);
        this.fleet.address.county = this.timeZoneService.iso2country(this.currentCountry);
        this.fleet.address.countrycode = this.currentCountry;
        this.getUserInfo();
        this.orgService.resolveOrganisation();
        this.orgService.onChange().subscribe(res => {
            console.log('Groups are', res);
            if (!_.isEmpty(res)) {
                this.setBusiness(res['business']);
            }
        });
        MapLoaderService.load().then(() => {
            this.placedetail = new google.maps.places.PlacesService(document.createElement('div'));
            this.geoCoderDetail = new google.maps.Geocoder();
            this.showMap = true;
        });
        console.log('Locale is ', Utils.getLocale(), Utils.getTimezone());
        this.fleet.locale = Utils.getLocale();
        this.fleet.timeZoneId = Utils.getTimezone();
    }

    getUserInfo() {
        this.userservice.fetchUserInfo().subscribe(res => {
            console.log('Userinfo is', res);
            this.userInfo = res;
        }, error => {
            this.toastMessage.showError('ERROR', 'ERROR_FETCHING_USER_INFORMATION');
        });
    }

    goForFleet() {
        return this.fleet.fleetName && this.organisation.organisationName && this.fleet.timeZoneId;
    }

    setCountry(country) {
        console.log('Country selected is', this.timeZoneService.iso2country(country));
        console.log('List Timezone', this.timeZoneService.getTimezoneForCountryISO(country));
        this.timezones = this.timeZoneService.getTimezoneForCountryISO(country);
        this.currentTimezone = this.timezones[0].value;
        this.fleet.timeZoneId = this.currentTimezone;
        this.fleet.address.county = this.timeZoneService.iso2country(country);
        this.fleet.address.countrycode = country;
    }

    setTimezone(timezone) {
        console.log('Fleet Timezone', timezone);
        this.fleet.timeZoneId = timezone;
    }

    resetFleet() {
        this.fleet.fleetName = '';
        this.fleet.organisationName = '';
        this.fleet.description = '';
        this.clearAddress();
    }


    setBusiness(event) {
        console.log('Selected Business', _.map(event, 'roles'));
        this.ownedBusiness = _.find(event, (business) => {
            return _.includes(business.roles, CarbookRoles[CarbookRoles.OWNER]);
        });
        console.log('Owned Business', this.ownedBusiness);
        if (this.ownedBusiness) {
            this.fleet.organisationId = this.ownedBusiness.groupId;
            this.fleet.organisationName = this.ownedBusiness.groupName;
            this.organisation.organisationName = this.ownedBusiness.groupName;
        }
    }


    setMap(event) {
        this.map = event.map;
        console.log('map ready', this.map);
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
        }
    }

    getAutoPlaces(e) {
        this.overlays = [];
        this.placedetail.getDetails({placeId: e.place_id}, (results, status) => {
            if (results) {
                this.options.center.lat = results.geometry.location.lat();
                this.options.center.lng = results.geometry.location.lng();
                this.overlays.push(new google.maps.Marker({position: {lat: this.options.center.lat, lng: this.options.center.lng}, draggable: true, icon: this.icon}));
                this.map.panTo(new google.maps.LatLng(this.options.center.lat, this.options.center.lng));
                this.setAddress(results);
                this.changed.detectChanges();
            }
        });
    }


    clearAddress() {
        this.fleet.address.housenumber = '';
        this.fleet.address.state = '';
        this.fleet.address.postcode = '';
        this.fleet.address.city = '';
        this.fleet.address.street = '';
        this.fleet.address.county = '';
        this.fleet.address.countrycode = '';
    }

    setAddress(place) {
        this.latitude = place.geometry.location.lat();
        this.longitude = place.geometry.location.lng();
        this.fleet.address.geopoint.lat = this.latitude;
        this.fleet.address.geopoint.lon = this.longitude;


        this.clearAddress();

        place.address_components
            .forEach(function (comp, index) {
                switch (comp.types[0]) {
                    case 'premise':
                        this.fleet.address.housenumber = comp.long_name;
                        break;
                    case 'administrative_area_level_1':
                        this.fleet.address.state = comp.long_name;
                        break;
                    case 'postal_code':
                        this.fleet.address.postcode = parseFloat(comp.long_name);
                        break;
                    case 'locality':
                        this.fleet.address.city = comp.long_name;
                        break;
                    case 'route':
                        this.fleet.address.street = comp.long_name;
                        break;
                    case 'country':
                        this.fleet.address.county = comp.long_name;
                        this.fleet.address.countrycode = comp.short_name;
                        break;
                    default:
                        break;
                }
            }, this);
    }

    @debounce()
    searchOrganisation() {
        console.log('Searching', this.organisation.organisationName);
        this.orgService.getOrganisationByName(this.organisation.organisationName).subscribe(res => {
            console.log('Found Organisation', res);
        }, error => {
            this.toastMessage.showError('ERROR', 'ORGANIZATION_NAME_EXISTS_PLEASE_TRY_WITH_ANOTHER_NAME');
        });
    }

    saveOrg() {
        console.log('Organisation is', this.organisation.organisationName);
        this.showDialog = true;
        if (!this.ownedBusiness) {
            this.organisation.addressInfo = this.fleet.address;
            this.organisation.emails = [this.userInfo.currentEMail];
            this.organisation.organisationOwnerId = this.userInfo.userId;
            this.organisation.description = this.fleet.description;
            console.log('Organisation info', this.organisation);

            this.orgService.createOrganisation(this.organisation).subscribe(res => {
                console.log('Created Organisation', res);
                this.toastMessage.showSuccess('SUCCESS', 'ORGANIZATION_CREATED_SUCCESSFULLY');
                this.fleet.organisationId = res['reportObjId'];
                this.saveFleet();
            }, error => {
                this.toastMessage.showError('ERROR', 'ERROR_CREATING_ORGANIZATION');
            });
        } else {
            this.saveFleet();
        }
    }

    saveFleet() {
        this.setPayload();
        this.fleetService.createFleet(Utils.pruneEmpty(this.fleet)).subscribe(res => {
            console.log('FleetView Created Successfully', res);
            this.toastMessage.showSuccess('SUCCESS', 'FLEET_CREATED_SUCCESSFULLY');
            setTimeout(() => {
                this.showDialog = false;
                this.orgService.resolveOrganisation();
                this.router.navigate(['/load'], {relativeTo: this.route});
            }, 2500);
        }, error => {
            this.toastMessage.showError('ERROR', 'ERROR_CREATING_FLEET');
        });
    }


    setPayload() {
        this.fleet.fleetType = 'FLEET_BASIC';
        this.fleet.organisationName = this.fleet.fleetName;
        console.log('payload', this.fleet);
    }

}
