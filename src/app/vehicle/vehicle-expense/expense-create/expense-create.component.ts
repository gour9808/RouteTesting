import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import * as cbv from '../../../models/vehicle';
import {Carbook} from '../../../models/vehicle';
import {AutoUnsubscribe} from '../../../utils/auto-unsubscribe';
import * as _ from 'lodash';
import {MapLoaderService} from '../../../service/map-loader.service';
import {VehicleService} from '../../../service/vehicle.service';
import {ToastMessageService} from '../../../service/toast-message.service';
import { UserService } from 'app/service/user.service';
import UnitType = Carbook.UnitType;

declare var google;

interface IOptions {
    label: any;
    value: any;
}

@Component({
    selector: 'cbp-expense-create',
    templateUrl: './expense-create.component.html',
    styleUrls: ['./expense-create.component.scss']
})

@AutoUnsubscribe()
export class ExpenseCreateComponent implements OnInit {
    vehicleSub$;
    createExpense$;
    costReceipt$;
    type: any;
    expenses: cbv.Carbook.Expenses = new cbv.Carbook.Expenses;
    vehicle: cbv.Carbook.Vehicle = new cbv.Carbook.Vehicle;
    showMap: boolean;
    geoCoderDetail;
    placedetail;
    center: any;
    map: any;
    overlays: any[] = [];
    options: any;
    icon: any;
    dateStr: string;
    searching: boolean;
    minDate: any;
    maxDate: any;
    routerSub: any;
    yearRange = '';
    dialog;

    // minDate = new Date(this.paymentDate.getTime() - (13 * 24 * 60 * 60 * 1000));

    constructor(private route: ActivatedRoute, private changeDetector: ChangeDetectorRef,
                private router: Router,
                private vehicleService: VehicleService, private userService: UserService,
                private toastMessage: ToastMessageService) {

        this.maxDate = new Date();
        this.maxDate.setDate = this.maxDate.getDate();
        this.maxDate.setTime = this.maxDate.getTime();
        this.expenses.paymentDate = this.maxDate;
        const startYear = this.maxDate.getFullYear() - 1;
        const currentYear = this.maxDate.getFullYear();
        this.yearRange = startYear + ':' + currentYear;

        console.log('max time', this.maxDate);
        MapLoaderService.load().then(() => {
            this.placedetail = new google.maps.places.PlacesService(document.createElement('div'));
            this.geoCoderDetail = new google.maps.Geocoder();
        });
        this.getVehicleDetail();
    }

    ngOnInit() {
        console.log('Redirect type is', this.route.snapshot.queryParams['type']);
        this.type = this.route.snapshot.queryParams['type'];
        this.options = {
            center: {lng: 77.66862, lat: 12.9195},
            zoom: 14,
            scaleControl: true,
            mapTypeControl: false, // disable satellite option
            gestureHandling: 'cooperative'
        };
        this.routerSub = this.route.queryParams.subscribe(params => {
            console.log('Params are', params);
            this.expenses.id = params['costId'];
            this.getExpenseDetail();
        })
    }

    ngOnDestroy() {
    }

    getVehicleDetail() {
        this.vehicleSub$ = this.vehicleService.getVehicle().subscribe(res => {
            console.log('Gift from parent', res);
            this.vehicle = _.merge(new Carbook.Vehicle(), res);
            this.setCurrency();
        }, error => {
            this.toastMessage.showError('ERROR', 'ERROR_FETCHING_VEHICLES_FOR_FLEET')
        });
    }

    getExpenseDetail() {
        if (this.expenses.id) {
            console.log('Get Expense Details');
            this.costReceipt$ = this.vehicleService.getCostReceipt(this.vehicle.vehicleId, this.expenses.id).subscribe(res => {
                this.expenses = _.merge(new Carbook.Expenses(), res);
                console.log('detail is', this.expenses);
                this.type = this.expenses.costType;
                this.showMap = true;
                const dateUTC = new Date(this.expenses.paymentDate);
                this.expenses.paymentDate = new Date(dateUTC.getTime() + (330 * 60000));
            }, error => {
                this.toastMessage.showError('ERROR', 'ERROR_FETCHING_EXPENSE_DETAILS');
            })
        } else {
            this.showMap = true;
        }
    }

    setCurrency() {
        console.log('vehicle locale', this.vehicle.numberPlate.locale);
        if (this.vehicle.numberPlate.locale == 'en_IN') {
            this.expenses.currency = '₹';
        } else if (this.vehicle.numberPlate.locale == 'de_DE') {
            this.expenses.currency = '€';
        }
    }

    setPaymentDate(event) {
        this.expenses.paymentDate = event;
        console.log('paymentDate date', this.expenses.paymentDate);
    }

    getUnit() {
        switch (this.expenses.costType) {
            case 'PARKING':
                this.expenses.unit = UnitType[UnitType.HRS];
                break;
            case 'FUEL':
                switch (this.vehicle.fuelType) {
                    case 'LPG':
                    case 'HYDROGEN':
                    case 'CNG':
                        this.expenses.unit = UnitType[UnitType.GALLON]
                        break;
                    case 'PETROL':
                    case 'DIESEL':
                    case 'PETROL_ETHANOL':
                        this.expenses.unit = UnitType[UnitType.LITER]
                }
                break;
        }
    }

    getTotalPrice() {
        console.log('total price', this.expenses.priceperunit * this.expenses.amount);
        this.expenses.amount ?
            this.expenses.totalprice = this.expenses.priceperunit * this.expenses.amount : this.expenses.totalprice = 0;
    }

    setPayload() {
        this.expenses.id != undefined ? this.sendExpense() : this.savePayload();
    }

    savePayload() {
        this.expenses.vehicleId = this.vehicle.vehicleId;
        this.expenses.costType = this.type;
        this.expenses.fleetId = this.vehicle.fleetId;
        this.expenses.userId = this.userService.getUserId();
        this.expenses.priceperunit ? this.expenses.priceperunit = +this.expenses.priceperunit : 0;
        this.expenses.amount ? this.expenses.amount = +this.expenses.amount : 0;
        this.expenses.totalprice = +this.expenses.totalprice;
        this.expenses.category = 'BUSINESS';
        this.getUnit();
        console.log('save payload', this.expenses);
        this.sendExpense();
    }

    sendExpense() {
        this.createExpense$ = this.vehicleService.postAccruals(this.vehicle.vehicleId, this.expenses).subscribe(res => {
            console.log('Get expense data ', res);
            this.gotoDetail();
        }, error => {
            this.toastMessage.showError('ERROR', 'ERROR_CREATING_EXPENSE');
        });
    }

    gotoDetail() {
        this.router.navigate(['../list'], {relativeTo: this.route});
    }

    goForIgnition() {
        return this.expenses.totalprice;
    }

    setMap(event) {
        this.map = event.map;
        if (this.expenses.geopoint.lat) {
            this.setPostion();
        }
        this.getLocation();
    }

    setPostion() {
        this.overlays = [];
        this.map.setCenter(new google.maps.LatLng(this.expenses.geopoint.lat, this.expenses.geopoint.lon))
        this.overlays.push(new google.maps.Marker({
            position: {
                lat: this.expenses.geopoint.lat,
                lng: this.expenses.geopoint.lon
            }, draggable: true, icon: this.icon
        }));
        this.setBounds();
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
            this.map.setZoom(12);
        }, 1000);
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
        this.placedetail.getDetails({placeId: e.place_id}, (results, status) => {
            if (results) {
                console.log('Place result ', results);
                this.setCostAddress(results);
                this.options.center.lat = results.geometry.location.lat();
                this.options.center.lng = results.geometry.location.lng();
                this.overlays.push(new google.maps.Marker({position: {lat: this.options.center.lat, lng: this.options.center.lng}, draggable: true}));
                this.map.panTo(new google.maps.LatLng(this.options.center.lat, this.options.center.lng));
                this.map.setZoom(12);
                this.changeDetector.detectChanges();
            }
        });
    }

    setCostAddress(address) {
        this.expenses.geopoint.lat = address.geometry.location.lat();
        this.expenses.geopoint.lon = address.geometry.location.lng();
    }

    addFileToReceipt(event) {
        console.log('get file', event);
        this.expenses.receiptImage.costType = this.type;
        this.expenses.receiptImage.pictureURL = event;
    }
}
