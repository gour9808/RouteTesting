import {Component, OnDestroy, OnInit} from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';
import {FleetService} from '../../service/fleet.service';
import {FleetView} from '../../models/fleetview';
import {Title} from '@angular/platform-browser';
import {Constants} from '../../service/constants';
import {UserService} from '../../service/user.service';
import {Router} from '@angular/router';
import {CommunicatorService} from '../../common/communicator.service';
import {Utils} from '../../utils/utils';
import {Cache} from '../../utils/storage.provider';
import {OrganisationService} from '../../service/organisation.service';
import {AutoUnsubscribe} from '../../utils/auto-unsubscribe';
import {ToastMessageService} from '../../service/toast-message.service';
import {Observable} from 'rxjs/Observable';
import {VehicleService} from '../../service/vehicle.service';
import {LogbookSummaryService} from '../../service/logbook-summary.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'cbp-dashboard-admin',
    templateUrl: './dashboard-admin.component.html',
    styleUrls: ['./dashboard-admin.component.scss']
})
@AutoUnsubscribe()
export class DashboardAdminComponent implements OnInit, OnDestroy {
    @Cache({pool: 'lang'}) lang;
    view: any[] = [700, 400];
    fleetView$;
    expense$;
    loadingDrivers = true;
    loadingVehicles = true;
    @Cache({pool: 'User'}) userInfo: any;
    fleetInfo = new FleetView();
    vehicles: any = [];
    drivers: any = [];
    expenses: any;
    totalprice: any[] = [];
    totalexpenses: any[] = [];
    metrics: any[];
    inviteLoaded: boolean;
    currentYear: any;
    currencySymbol: any;
    legendTitle: '';
    locale: any;
    dateString: any;
    barPadding = '10';
    colorScheme = {
        domain: ['#F85959']
    };
    pieData = [
        {
            'name': 'Active',
            'value': 0
        },
        {
            'name': 'Idle',
            'value': 0
        },
        {
            'name': 'Inactive',
            'value': 0
        }
    ];
    expensePie = [];
    expenseBarData = [];
    showExpensePie = false;
    loadingExpense = true;
    utilizationData = [
        {'name': 'Vehicle Utilization', 'series': []},
        {'name': 'Driver Utilization', 'series': []},
    ];
    resizeListener$;
    logbookSummary$: any;
    vehicleAreaData = false;
    vehicleAreaDataLoaded = false;
    driverBarData = [];
    driverBarDataLoaded: boolean;
    vehicleArea = [
        {
            'name': 'Distance Travelled (KM)',
            'series': []
        },
    ];

    constructor(private fleetService: FleetService, private vehicleService: VehicleService, private orgService: OrganisationService, private toastMsg: ToastMessageService,
                private titleService: Title, private translateService: TranslateService, private userservice: UserService, private router: Router, private communicatorService: CommunicatorService, private logbookSummary: LogbookSummaryService) {
        this.prepareChartData();
        this.resizeListener$ = Observable.fromEvent(window, 'resize')
            .debounceTime(1000)
            .subscribe((event) => {
                this.onResize(event);
            });
        this.communicatorService.on('fleet_update', () => {
            this.vehicles = [];
            this.drivers = [];
            this.loadingVehicles = true;
            this.loadingDrivers = true;
            this.fetchFleetView();
        });
        this.metrics = [
            {icon: 'mdi-car', value: this.vehicles.length, label1: 'TOTAL_VEHICLES', label2: ''},
            {icon: 'mdi-car', value: this.drivers.length, label1: 'TOTAL_DRIVERS', label2: ''},
            {icon: 'mdi-car', value: '0', label1: 'TOTAL_TRIPS', label2: '(2018)'},
            {icon: 'mdi-car', value: '0 kms', label1: 'TOTAL_DISTANCE', label2: ''},
            {icon: 'mdi-car', value: '', label1: 'TOTAL_EXPENSE', label2: '(2018)', type: '0'}
        ];
    }

    emitedTranslate(event) {
        console.log('event', event);
        this.vehicleArea = [...event];
    }

    onResize(event) {
        console.log('Resize', event.target.innerWidth);
        this.view[0] = (event.target.innerWidth * 50) / 100;
    }

    ngOnInit() {
        console.log('Init Home');
        this.titleService.setTitle('FleetView Management | CarbookPlus');
        this.getVehicleLogo('audi');
        this.communicatorService.broadcast('update-title', 'DASHBOARD');
        this.fetchFleetView();
    }

    getSummary() {
        this.driverBarData = [];
        this.vehicleAreaDataLoaded = this.driverBarDataLoaded = false;
        const fromDate = Utils.getStartOfCurrentYear();
        const toDate = Utils.getEndOfCurrentDay();
        this.metrics[2].label2 = moment(fromDate).format('(YYYY)');
        this.logbookSummary$ = this.logbookSummary.fetchLogbookSummary(this.fleetService.getFleetId(), null, null, fromDate.valueOf(), toDate.valueOf(), 'all')
            .subscribe(res => {
                console.log('Logbook summary us', res);
                this.logbookSummary.setSummary(res);
                this.prepareDriverMetrics();
                this.formatVehicleData();
                this.formatDriverData();
            })
    }

    ngOnDestroy() {
    }

    prepareChartData() {
        Utils.getLast10Days().forEach(day => {
            this.expenseBarData.push({
                'name': day, 'value': 0
            });
            this.utilizationData[0].series.push({
                'name': day, 'value': 100
            })
            this.utilizationData[1].series.push({
                'name': day, 'value': 50
            })
        })
    }

    fetchFleetView() {
        this.fleetView$ = this.fleetService.fetchFleetView(this.fleetService.getFleetId()).subscribe(res => {
            this.fleetService.setFleetView(res);
            this.setCurrencyLocale(res);
            this.getSummary();
            this.vehicles = res.vehicleView;
            this.vehicles = _.filter(this.vehicles, (vehicle) => vehicle.responseType != 'REJECTED');
            this.metrics[0].value = this.vehicles.length;
            this.pieData[0].value = _.filter(this.vehicles, ['freeStatus', true]).length;
            this.pieData[2].value = _.filter(this.vehicles, ['freeStatus', false]).length;
            this.pieData = [...this.pieData];
            this.loadingVehicles = false;
            if (_.has(res, 'userProfile')) {
                this.drivers = _.filter(res['userProfile'], profile => res['driverIdList'].includes(profile.userId));
                this.metrics[1].value = this.drivers.length;
                this.loadingDrivers = false;
            } else {
                this.drivers = [];
                this.metrics[1].value = 0;
                this.loadingDrivers = false;
            }
        }, error => {
            this.toastMsg.showError('ERROR', 'ERROR_FETCHING_FLEET_VIEW');
            this.loadingDrivers = false;
            this.loadingVehicles = false;
        });
        this.getVehicleProfile();
    }

    setCurrencyLocale(res) {
        if (res.locale == 'en_IN') {
            this.locale = 'INR';
        } else if (res.locale == 'de_DE') {
            this.locale = 'EUR';
        }
    }

    getVehicleProfile() {
        this.expense$ = this.vehicleService.getAccrualsFleet(this.fleetService.getFleetId()).subscribe(res => {
            res ? this.setExpenseData(res) : this.metrics[4].type = 0;
        });
    }

    setExpenseData(res) {
        this.totalprice = [];
        const fleetTotal = _.map(res, (data) => _.filter(data, {'deleted': false, 'category': 'BUSINESS'}));
        _.map(fleetTotal, (expense) => this.calculateExpense(expense));
        this.totalprice = _.filter(this.totalprice, ['year', moment(new Date).format('YYYY')]);
        this.metrics[4].type = _.sumBy(this.totalprice, 'totalprice');
        console.log('totalexpenses', this.totalprice, this.metrics[4].type);
    }

    prepareDriverMetrics() {
        this.logbookSummary.getSummary().subscribe(res => {
            const logSummary = res;
            const uniqueDrivers = _(logSummary).groupBy('driverId').value();
            console.log('Unique Drivers ', uniqueDrivers);
            _.forEach(this.drivers, driver => {
                const distance = _.sumBy(uniqueDrivers[driver.userId], 'businessKM').toFixed(2);
                const trips = _.sumBy(uniqueDrivers[driver.userId], 'businessTrips')
                // console.log('Metrics ', distance, trips);
                driver.totalDistance = distance;
                driver.trips = trips;
            });
            this.drivers = _.orderBy(this.drivers, ['trips'], ['desc']);
            console.log('Drivers ', this.drivers);
        });
    }

    formatDriverData() {
        this.logbookSummary.getSummary().subscribe(res => {
            console.log('Driver response ', res);
            this.metrics[2].value = _.sumBy(res, 'businessTrips');
            /* + _.sumBy(res, 'privateTrips') + _.sumBy(res, 'unreviewedTrips') */
            const driverGroup = _.groupBy(res, 'driverId');
            _.forEach(driverGroup, (payload, driverId) => {
                const driver: any = _.find(this.drivers, {userId: driverId});
                const trips = _.sumBy(payload, 'businessTrips');
                // console.log('Driver is ', driver, payload, trips);
                if (driver) {
                    this.driverBarData.push({
                        name: driver.displayname ? driver.displayname : '',
                        value: trips
                    });
                }
            });
            console.log('this.driverBarData', this.driverBarData.length);
            this.driverBarData.length <= 3 ? this.barPadding = '50' : this.barPadding = '2';
            this.driverBarData = [...this.driverBarData];
            this.driverBarDataLoaded = true;
        });
    }

    formatVehicleData() {
        this.logbookSummary.getSummary().subscribe(res => {
            if (res) {
                /* no of total trips */
                res = _.orderBy(res, ['sDate'], ['asc']);
                this.metrics[3].value = _.sumBy(res, 'businessKM').toFixed(2) + ' kms';
                /* data for vehicle summary chart */
                const dateGroup = _.groupBy(res, 'date');
                _.forEach(dateGroup, (date, id: any) => {
                    this.vehicleArea[0].series.push({
                        name: moment(new Date().setTime(id)).format('MMM Do'), value: _.sumBy(date, 'businessKM').toFixed(2)
                    });
                });
                this.vehicleArea = [...this.vehicleArea];
                this.vehicleAreaDataLoaded = true;
                this.vehicleArea[0].series.length != 0 ? this.vehicleAreaData = true : this.vehicleAreaData = false;
            } else {
                this.metrics[3].value = 0;
                this.vehicleAreaDataLoaded = true;
                this.vehicleAreaData = false;
                // this.vehicleArea = [];
                this.vehicleArea[0].series = [];
            }
        });
    }

    calculateExpense(expense) {
        expense.length > 0 ? _.map(expense, (data) => this.totalprice.push(
            {
                'year': moment(data['paymentDate']).format('YYYY'),
                'totalprice': data['totalprice'], 'currency': data['currency']
            }
        )) : '';
    }

    getVehicleLogo(make) {
        if (make != null && make !== undefined && make.length > 1) {
            return Constants.GET_VEHICLE_LOGO(make);
        }
    }

    reload(event) {
        this.ngOnInit();
    }
}
