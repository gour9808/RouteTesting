import {Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {FleetService} from '../../service/fleet.service';
import {Constants} from '../../service/constants';
import * as cb from '../../models/vehicle';
import {Carbook} from '../../models/vehicle';
import {Subject} from 'rxjs/Subject';
import * as moment from 'moment-timezone';
import {VehicleService} from '../../service/vehicle.service';
import {UserService} from '../../service/user.service';
import {FuelTypeService} from '../../service/fuel.service';
import * as _ from 'lodash';
import {Router} from '@angular/router';
import {ToastMessageService} from '../../service/toast-message.service';
import {Cache} from '../../utils/storage.provider';
import {AutoUnsubscribe} from '../../utils/auto-unsubscribe';
import {TranslateService} from '@ngx-translate/core';
import {TimezonePickerService} from '../../service/timezone-picker.service';
import OwnerType = Carbook.OwnerType;

@Component({
    selector: 'cbp-vehicle-create',
    templateUrl: './vehicle-create.component.html',
    styleUrls: ['./vehicle-create.component.scss']
})

@AutoUnsubscribe()
export class VehicleCreateComponent implements OnInit, OnDestroy {

    makemodel$;
    userInfo$;
    vehicleLicense$;
    fueltype$;
    createVehicle$;
    fleetView$;
    translateService$;

    @Cache({ pool: 'User' }) userInfo: any;
    @Output() hide = new EventEmitter<any>();
    showErrorForLicenseExists: boolean;
    searching: boolean;
    licenseChanged: Subject<string> = new Subject<string>();
    newVehicle: cb.Carbook.Vehicle = new cb.Carbook.Vehicle();
    results: any = [];
    brand: any;
    public brandName: string;
    vehicleTypes = [];
    fuelTypeInd = [];
    fuelTypeDe = [
        { label: 'Super E10', value: 'SUPER_E10' },
        { label: 'SuperPlus', value: 'SUPER_PLUS' },
        { label: 'Diesel', value: 'DIESEL' },
        { label: 'Super', value: 'SUPER' }
    ];

    @Output() showDialog: any = new EventEmitter<any>();
    @Output() refresh: any = new EventEmitter<any>();
    maxDateValue: Date;
    selectedDateValue: Date;
    @ViewChild('vehicleNameInput') vehicleNameInput: ElementRef;
    @ViewChild('vin') vinInput: ElementRef;

    years: any;
    countries: any = [];
    currentCountry: any;
    timezones: any = [];
    currentTimezone: any;
    constructor(private fleetService: FleetService, private vehicleservice: VehicleService,
        private router: Router, private userservice: UserService, private translateService: TranslateService,
        private fueltypeservice: FuelTypeService, private timeZoneService: TimezonePickerService, private toastMsg: ToastMessageService) {
        this.licenseChanged
            .debounceTime(500) // wait 300ms after the last event before emitting last event
            .distinctUntilChanged()
            .subscribe(model => {
                if (model) {
                    this.checkIfLicenseExists();
                }
            });
            this.translateService$ = this.translateService.onLangChange.subscribe((event) => {
            this.translateService.currentLang == 'lang-de' ? this.deDropdown() : this.enDropdown();
        });
    }

    ngOnInit() {
        this.maxDateValue = moment(new Date()).toDate();
        this.selectedDateValue = moment().startOf('year').toDate();
        this.translateService.currentLang == 'lang-de' ? this.deDropdown() : this.enDropdown();
        this.countries = this.timeZoneService.getCountries();
        this.currentCountry = this.timeZoneService.getCountryISOForTimeZone(moment.tz.guess());
        this.timezones = this.timeZoneService.getTimezoneForCountryISO(this.currentCountry);
        this.currentTimezone = moment.tz.guess();
        this.setupVehicleInfo();
        console.log('Time zone is', this.timezones);
        console.log('Country is', this.currentCountry);
    }

    ngOnDestroy() {
    }

    deDropdown() {
        this.vehicleTypes = [];
        this.fuelTypeInd = [];
        _.map(Carbook.vehicleTypes, (item) => this.vehicleTypes.push({ label: item.de, value: item.value }));
        _.map(Carbook.fuelTypes, (item) => this.fuelTypeInd.push({ label: item.de, value: item.value }));
    }

    enDropdown() {
        this.vehicleTypes = [];
        this.fuelTypeInd = [];
        _.map(Carbook.vehicleTypes, (item) => this.vehicleTypes.push({ label: item.label, value: item.value }));
        _.map(Carbook.fuelTypes, (item) => this.fuelTypeInd.push({ label: item.label, value: item.value }));
    }

    setupVehicleInfo() {
        this.newVehicle = new cb.Carbook.Vehicle();
        this.newVehicle.fuelType = 'PETROL';
        this.newVehicle.fleetId = this.fleetService.getFleetId();
        this.newVehicle.ownerId = this.fleetService.getFleetId();
        this.newVehicle.orgId = this.fleetService.getOrgId();
        this.newVehicle.ownerType = 'FLEET';
        this.fleetView$ = this.fleetService.fetchFleetView(this.fleetService.getFleetId()).subscribe(res => {
            console.log("fleet view", res);
            this.newVehicle.timeZoneId = res.timeZoneId;
            this.newVehicle.numberPlate.locale = res.locale;
        });
    }

    setCountry(country) {
        console.log('Country selected is', this.timeZoneService.iso2country(country));
        console.log('List Timezone', this.timeZoneService.getTimezoneForCountryISO(country));
        this.timezones = this.timeZoneService.getTimezoneForCountryISO(country);
        this.currentTimezone = this.timezones[0].value;
        // this.newVehicle.timeZoneId = this.currentTimezone;
        this.newVehicle.numberPlate.locale = country;
    }

    setTimezone(timezone) {
        this.newVehicle.timeZoneId = timezone;
        console.log('Fleet Timezone', timezone, this.newVehicle);
    }


    searchMakeAndModel(event) {
        this.searching = true;
        this.makemodel$ = this.vehicleservice.getMakeAndModel(event.query).subscribe(res => {
            console.log('Autocomplete result', res);
            this.results = res.newResults;
            this.searching = false;
        }, err => {
            this.toastMsg.showError('ERROR', 'ERROR_FETCHING_MAKE_MODEL')
        })
    }

    fetchUserInfo() {
        this.userInfo$ = this.userservice.fetchUserInfo().subscribe(info => {
            this.userInfo = info;
            this.newVehicle.ownerId = this.userInfo.userId;
            console.log('User info is', this.userInfo);
        }, err => {
            this.toastMsg.showError('ERROR', 'ERROR_FETCHING_USER_INFORMATION')
        });
    }

    selectedBrand(event) {
        console.log('event', event);
        this.newVehicle.make = event.object.make;
        this.newVehicle.model = event.object.model;
        this.newVehicle.variant = event.object.variant;
        this.brand = event.object.make + ' ' + event.object.model + ' ' + event.object.variant;
        this.newVehicle.fuelType = event.object.engineTransmission && event.object.engineTransmission.fuelType ? event.object.engineTransmission.fuelType : 'PETROL';
        event.object.bodyType ? this.getVehicleType(event.object.bodyType) : this.newVehicle.vehicleType = 'CAR';
        console.log('Selected Brand', this.newVehicle);
    }

    getVehicleType(bodyType) {
        switch (bodyType) {
            case 'COUPE':
            case 'WAGON':
            case 'LUXURY':
            case 'OFFROAD':
            case 'SPORTS':
            case 'MUSCLE':
            case 'SEDAN':
            case 'HATCHBACK':
            case 'CUSTOMIZABLE':
            case 'CONVERTIBLE':
            case 'JEEP':
            case 'SUPERCAR':
            case 'RACING':
                this.newVehicle.vehicleType = 'CAR';
                break;
            case 'VAN':
            case 'CARAVAN_MOTORHOME':
                this.newVehicle.vehicleType = 'VAN';
                break;
            case 'SUV':
            case 'TUV':
            case 'MUV':
            case 'LUV':
                this.newVehicle.vehicleType = 'SUV';
                break;
            case 'TRUCKS_MINITRUCK':
            case 'TRUCKS_TRAILER':
            case 'TRUCKS_TIPPER':
            case 'TRUCKS_PICKUP':
            case 'TRUCKS_TRUCK':
            case 'TRACTOR_TRACTOR':
                this.newVehicle.vehicleType = 'TRUCK';
                break;
            case 'BUS_BUS':
            case 'BUS_MINIBUS':
            case 'BUS_CLASSIC':
            case 'BUS_SINGLEDECK':
            case 'BUS_DOUBLEDECK':
            case 'BUS_ARTICULATEDBUS':
            case 'BUS_LUXURYBUS':
            case 'BUS_TOURERBUS':
                this.newVehicle.vehicleType = 'BUS';
                break;
            case 'TWOWHEELER_SCOOTER':
            case 'TWOWHEELER_STANDARD':
            case 'TWOWHEELER_SPORTSBIKE':
            case 'TWOWHEELER_OFFROAD':
            case 'TWOWHEELER_CRUISER':
            case 'TWOWHEELER_TOURING':
            case 'TWOWHEELER_NAKED':
            case 'TWOWHEELER_SPORTSTOURING':
            case 'TWOWHEELER_DUALSPORTS':
            case 'THREEWHEELER_OPEN':
            case 'THREEWHEELER_CLOSED':
                this.newVehicle.vehicleType = 'MOTORBIKE';
                break;
            default:
                this.newVehicle.vehicleType = 'CAR';
                break;
        }
    }

    getVehicleLogo(make) {
        if (make != null && make != undefined && make.length > 1) {
            return Constants.GET_VEHICLE_LOGO(make);
        }
    }

    triggerCheck() {
        console.log(this.newVehicle.numberPlate.strLicense);
        if (this.newVehicle.numberPlate.strLicense.length > 0) {
            this.licenseChanged.next();
        }
    }

    getFuelType() {
        const locale = localStorage.getItem('Locale');
        if (locale != null) {
            if (locale.indexOf('en') >= 0) {
                return this.fuelTypeInd;
            } else if (locale.indexOf('de') >= 0) {
                return this.fuelTypeDe;
            }
        } else {
            return this.fuelTypeInd;
        }
    }

    checkIfLicenseExists() {
        this.searching = true;
        this.showErrorForLicenseExists = false;
        this.vehicleLicense$ = this.vehicleservice.fetchVehicleByLicense(this.newVehicle.numberPlate.strLicense).subscribe(res => {
            this.searching = false;
            this.showErrorForLicenseExists = true;
        }, err => {
            this.toastMsg.showError('ERROR', 'ERROR_FETCHING_LICENSE_INFORMATION')
        });
    }

    getCountryFuelType() {
        this.fueltype$ = this.fueltypeservice.fetchFuelType('en_IN').subscribe(res => {
            console.log('Fuel type', res);
        }, err => {
            this.toastMsg.showError('ERROR', 'ERROR_FETCHING_FUEL_TYPE')
        });
    }

    ignition() {
        return this.newVehicle.name && this.newVehicle.numberPlate.strLicense && this.brand
            && this.newVehicle.name.trim().length > 0 && this.newVehicle.numberPlate.strLicense.trim().length > 0;
    }

    validateVIN(event) {
        console.log(event);
        if (event) {
            const stripped = event.replace(/[ioIO`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
            this.vinInput.nativeElement.value = stripped;
        }
    }

    cancel() {
        this.hide.next();
    }

    save() {
        this.showDialog.next(true);
        this.newVehicle.numberPlate.locale = 'en_IN';
        this.newVehicle.purchasetime = this.selectedDateValue;
        this.newVehicle.ownerId = this.fleetService.getFleetId();
        this.newVehicle.ownerType = OwnerType[OwnerType.FLEET];
        this.newVehicle.bookable = true;
        this.createVehicle$ = this.vehicleservice.createNewVehicle(this.newVehicle).subscribe(res => {
            console.log('Vehicle created');
            this.refresh.next();
            this.setupVehicleInfo();
            this.brand = '';
            this.showDialog.next(false);
            this.toastMsg.showSuccess('SUCCESS', 'VEHICLE_CREATED_SUCCESSFULLY');
        }, err => {
            this.showDialog.next(false);
            console.log('Error creating vehicle', err);
            this.toastMsg.showError('ERROR', 'VEHICLE_WITH_THIS_LICENSE_ALREADY_EXISTS');
        })
    }

    checkQueryToVehicleDetails() {
        if (_.startsWith(this.router.url, '/fleet')) {
            this.router.navigate(['/fleet/vehicle'], { queryParams: { type: 'fleet' } })
        } else {
            this.router.navigate(['/user/vehicle'], { queryParams: { type: 'user' } })
        }
    }

    BackToList() {
        this.checkQueryToVehicleDetails();
    }

}
