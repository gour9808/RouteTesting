import {Component, OnDestroy, OnInit} from '@angular/core';
import * as _ from 'lodash';
import {VehicleService} from '../../../service/vehicle.service';
import {Carbook} from '../../../models/vehicle';
import {ToastMessageService} from '../../../service/toast-message.service';
import {AutoUnsubscribe} from '../../../utils/auto-unsubscribe';
import {ActivatedRoute, Router} from '@angular/router';
import {FleetService} from '../../../service/fleet.service';
import { IFilterPipe } from 'app/utils/pipes/filter.pipe';


enum Months {
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
}

interface IOptions {
    label: any;
    value: any;
}


@Component({
    selector: 'cbp-expense-list',
    templateUrl: './expense-list.component.html',
    styleUrls: ['./expense-list.component.scss']
})

@AutoUnsubscribe()
export class ExpenseListComponent implements OnInit, OnDestroy {

    expense$;
    vehicleSub$;
    deleteExpense$;
    vehicle: Carbook.Vehicle;
    vid: any;
    expenseSum: any;
    expenseList: any = [];
    expenseType = [];
    list: any;
    searching: boolean;
    minDate: any;
    maxDate: any;
    loadingExpenses: boolean;
    colorScheme = {
        domain: ['#89f0da', '#50518f', '#8dbfb4', '#8a60bd', '#8b5a69', '#8abee7', '#e35ea0', '#8f92e2', '#82e074', '#78c6ff', '#fdd921', '#fb7066']
    };
    view: any[] = [700, 400];
    currency: any;
    selectedExpense;
    deletingExpense;
    isDialogVisible: boolean;
    filter: boolean = false;
    filterValue: any;
    searchTerm: IFilterPipe = {} as IFilterPipe;
    constructor(private vehicleService: VehicleService, private toastMessage: ToastMessageService, private fleetService: FleetService,
                private router: Router, private route: ActivatedRoute) {
        this.prepareExpenseType();
    }

    ngOnInit() {
        this.vehicleSub$ = this.vehicleService.getVehicle().subscribe(res => {
            console.log('Gift from parent', res);
            this.vehicle = _.merge(new Carbook.Vehicle(), res);
            this.vid = this.vehicle.vehicleId;
            this.getExpenseData();
        });
    }

    ngOnDestroy() {
    }


    getExpenseData() {
        this.loadingExpenses = true;
        this.expense$ = this.vehicleService.getAccruals(this.vehicle.vehicleId, this.fleetService.getFleetId())
            .finally(() => this.loadingExpenses = false)
            .subscribe(res => {
                this.expenseList = res ? _.filter(res, {'deleted': false, 'category': 'BUSINESS'}) : [];
                this.expenseList = _.map(this.expenseList, (expense: any) =>
                    _.extend({icon: this.getIconForExpenseType(expense.costType)}, expense)
                );
                console.log('Expenses are', this.expenseList);
            }, error => {
                this.toastMessage.showError('ERROR', 'Fehler beim Abrufen der Kostendaten')
            })
    }

    deleteExpense(expense) {
        this.deletingExpense = true;
        expense['deleted'] = true;
        console.log('delete expense', expense);
        this.deleteExpense$ = this.vehicleService.postAccruals(expense.vehicleId, expense)
            .finally(() => {
                this.deletingExpense = false;
                this.isDialogVisible = false
            })
            .subscribe(res => {
            console.log('deleted', res);
            this.getExpenseData();
            this.toastMessage.showSuccess('SUCCESS', 'DELETED_SUCCESSFULLY');
        }, error => {
            this.toastMessage.showError('ERROR', 'ERROR_DELETING_EXPENSES');
        });
    }

    prepareExpenseType() {
        _.map(Carbook.ExpensesCost, (item) => this.expenseType.push({label: item, value: item, icon: this.getIconForExpenseType(item)}));
    }

    getIconForExpenseType(type) {
        switch (type) {
            case 'PARKING':
                return 'mdi-parking';
            case 'FUEL':
                return 'mdi-fuel';
            case 'GARAGE':
                return 'mdi-garage-open';
            case 'INSURANCE':
                return 'mdi-file';
            case 'TOLL':
                return 'mdi-receipt';
            case 'FINE':
                return 'mdi-alarm-light';
            case 'FOOD':
                return 'mdi-food-fork-drink';
            case 'TAX':
                return 'mdi-cash-multiple';
            case 'CARWASHING':
                return 'mdi-car-wash';
            case 'OTHERS':
                return 'mdi-comment-question';
        }
    }

    gotoType(type) {
        this.filter ? this.filterValue = type.value : 
        this.router.navigate(['../add'], {queryParams: {'type': type.value}, relativeTo: this.route});
    }

    gotoDetails(expense) {
        console.log('goto type', expense);
        this.router.navigate(['../add'], {queryParams: {'type': expense.costType, 'costId': expense.id}, relativeTo: this.route})
    }
}
