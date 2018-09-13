import * as moment from 'moment';
import * as _ from 'lodash';

export class ExpenseReportBase {
    expenseData: any;
    yearExpenses: any;
    yearTotalExpense: any = 0;
    expensiveCategory: any = '';
    expensiveMonth: any = '';
    expenseCategoryData: any = [];
    expenseMonthData: any = [];
    expenseVehicleData: any = [];
    expenseTotal: any = [];
    expensiveVehicle: any = {};

    setTotalExpenseData(expense) {
        _.forEach(expense, (value, key) => {
            this.expenseTotal = [...this.expenseTotal, ...value];
        });
        this.expenseTotal = _.filter(this.expenseTotal, {'deleted': false, 'category': 'BUSINESS'});
        this.yearTotalExpense = _.sumBy(this.expenseTotal, 'totalprice');
        console.log('Total Expense', this.expenseTotal);
        this.setExpenseCategoryData();
        this.setExpenseMonthData();
    }

    setExpenseMonthData() {
        const monthGroup = _.groupBy(this.expenseTotal, expense => {
            return moment(expense['paymentDate']).format('MMMM');
        });
        console.log('Group By', monthGroup);
        _.forEach(monthGroup, (value, key) => {
            this.expenseMonthData.push({
                name: _.upperCase(key),
                key: key,
                value: _.sumBy(value, 'totalprice')
            })
        });
        this.expensiveMonth = _.maxBy(this.expenseMonthData, 'value');
        console.log('Month Data', this.expenseMonthData);
        console.log('Expensive Month', this.expensiveMonth);
    }

    setExpenseCategoryData() {
        const costGroup = _.groupBy(this.expenseTotal, 'costType');
        console.log('Group By', costGroup);
        _.forEach(costGroup, (value, key) => {
            console.log('Value is ', key);
            this.expenseCategoryData.push({
                name: key,
                icon: this.getIconForExpenseType(key),
                value: _.sumBy(value, 'totalprice')
            })
        });
        this.expenseCategoryData = _.orderBy(this.expenseCategoryData, 'value', 'desc');
        console.log('Category Data', this.expenseCategoryData);
        this.expensiveCategory = _.maxBy(this.expenseCategoryData, 'value');
        console.log('Expensive Category', this.expensiveCategory);
    }

    setExpenseVehicleData(vehicleProfiles) {
        const vehicleGroup = _.groupBy(this.expenseTotal, 'vehicleId');
        console.log('Group By', vehicleGroup);
        _.forEach(vehicleGroup, (value, key) => {
            this.expenseVehicleData.push({
                vehicle: _.find(vehicleProfiles, ['vehicleId', key]),
                value: _.sumBy(value, 'totalprice')
            })
        });
        this.expenseVehicleData = _.orderBy(this.expenseVehicleData, 'value', 'desc');
        console.log('Vehicle Data', this.expenseVehicleData);
        this.expensiveVehicle = _.maxBy(this.expenseVehicleData, 'value')['vehicle'];
        console.log('Expensive Vehicle', this.expensiveVehicle);
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
}
