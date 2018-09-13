import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import * as _ from 'lodash';
import {VehicleService} from '../../service/vehicle.service';
import * as cb from '../../models/vehicle';
import * as uuid from 'uuid';
import {ToastMessageService} from '../../service/toast-message.service';
import {AutoUnsubscribe} from '../../utils/auto-unsubscribe';
import {FleetService} from '../../service/fleet.service';
import {TranslateService} from '@ngx-translate/core';
import * as moment from 'moment';
import {UserService} from 'app/service/user.service';
import {CommunicatorService} from '../../common/communicator.service';
import ReminderEventType = cb.Carbook.ReminderEventType;
import RecurrenceType = cb.Carbook.RecurrenceType;


interface IOptions {
    label: any;
    value: any;
}

@Component({
    selector: 'cbp-vehicle-reminder',
    templateUrl: './vehicle-reminder.component.html',
    styleUrls: ['./vehicle-reminder.component.scss']
})

@AutoUnsubscribe()
export class VehicleReminderComponent implements OnInit, OnDestroy {
    translateService$;
    vehicleSub$;
    createReminder$;
    fetchReminder$;
    deleteReminder$;
    userNames$;
    updateReminder$;
    recurrenceType: IOptions[] = [];
    reminderTypeList: IOptions[] = [];
    reminder: cb.Carbook.Reminder = new cb.Carbook.Reminder();
    minDate = new Date();
    todayDate: any;
    vehicle: any;
    reminderList: any[] = [];
    dueDates: any[] = [];
    dueDateReminder: any[] = [];
    dailyReminder: any[] = [];
    userIds: any[] = [];
    showDueDate: boolean = false;
    isDialogVisible: boolean = false;
    loadingReminder: boolean = true;
    dueDate: any;
    selectedIndex: any;
    selectedRemind: any;
    update: any;
    updateDue: any;
    reminderValue: any;
    showError: boolean;
    errorMessage = 'Exceeded minimum value';

    constructor(private router: Router, private vehicleService: VehicleService, private comms: CommunicatorService,
                private toastMsg: ToastMessageService, private translateService: TranslateService,
                private userService: UserService, private fleetService: FleetService) {
        this.getReminderType();
        this.translateService$ = this.translateService.onLangChange.subscribe((event) => {
            this.getReminderType();
        });
    }

    ngOnInit() {
        this.vehicleSub$ = this.vehicleService.getVehicle().subscribe(res => {
            console.log('Gift from parent', res);
            this.vehicle = res;
            this.setReminderObject();
            this.fetchReminder();
        }, error => {
            this.toastMsg.showError('ERROR', 'ERROR_FETCHING_VEHICLES');
        });
    }

    ngOnDestroy() {
    }

    getReminderType() {
        this.recurrenceType = [];
        this.reminderTypeList = [];
        if (this.translateService.currentLang == 'lang-de') {
            _.map(cb.Carbook.recurrence, (item) => this.recurrenceType.push({label: item.de, value: item.value}));
            _.map(cb.Carbook.reminderType, (item) => this.reminderTypeList.push({label: item.de, value: item.value}));
        } else {
            _.map(cb.Carbook.recurrence, (item) => this.recurrenceType.push({label: item.name, value: item.value}));
            _.map(cb.Carbook.reminderType, (item) => this.reminderTypeList.push({label: item.name, value: item.value}));
        }
    }

    fetchReminder() {
        this.fetchReminder$ = this.vehicleService.fetchReminder(this.vehicle.vehicleId)
            .finally(() => {
            })
            .subscribe(res => {
                if (res) {
                    console.log('all reminders', res);
                    this.setData(res);
                } else {
                    this.loadingReminder = false;
                    this.showDueDate = true;
                }
            }, err => {
            });
    }

    setData(res) {
        this.setCalendar(res);
        this.getUserName();
        this.dailyReminder = _.filter(this.reminderList, (reminder) => reminder.recurringRules ? _.eq(reminder.recurringRules.recurrence, RecurrenceType[RecurrenceType.DAILY]) : '');
        this.getDueTodayList(this.todayDate);
        this.loadingReminder = false;
    }

    setCalendar(res) {
        this.dueDates = [];
        this.userIds = [];
        this.reminderList = _.orderBy(res, 'dueDate');
        _.map(res, (reminder: any) => {
            this.dueDates.push(reminder.dueDate);
            reminder['icon'] = this.getIconForExpenseType(reminder.reminderType);
            reminder['time'] = this.convertToTime(reminder.dueDate);
            if (!(_.includes(this.userIds, reminder.userId))) {
                this.userIds.push(reminder.userId);
            }
        });
        this.comms.broadcast('dueDates', this.dueDates);
        this.showDueDate = true;
    }

    getUserName() {
        this.userNames$ = this.userService.getUserProfileForIds(this.userIds).subscribe(res => {
            console.log('check profile', res);
            if (res) {
                _.forEach(this.reminderList, (reminder) => {
                    var username = _.find(res['results'], (user: any) => _.eq(user.userprofile.userId, reminder.userId));
                    reminder.userName = username ? username.userprofile['displayname'] : '';
                });
            }
        });
    }

    getDueTodayList(date) {
        this.dueDateReminder = _.filter(this.reminderList, (reminder) =>
            _.eq(this.convertToDate(reminder.dueDate), this.convertToDate(date)) && reminder.recurringRules.recurrence != RecurrenceType[RecurrenceType.DAILY]
        );
        console.log('due today are', this.dueDateReminder);
    }

    setReminderDate(time, reminder?) {
        if (reminder) {
            reminder.dueDate = moment(moment(this.todayDate).format('L') + ' ' + moment(time).format('LT')).valueOf();
        } else {
            this.reminder.dueDate = moment(moment(this.todayDate).format('L') + ' ' + moment(time).format('LT')).valueOf();
        }
    }

    ignition() {
        return this.reminder.dueDate && this.reminder.recurringRules.recurrence && this.reminder.reminderType;
    }

    setReminderObject() {
        this.reminder.reminderId = uuid.v1();
        this.reminder.fleetId = this.fleetService.getFleetId();
        this.reminder.vehicleId = this.vehicle.vehicleId;
        this.reminder.ownerId = this.vehicle.ownerId;
        this.reminder.userId = this.userService.getUserId();
        this.reminder.odoThreshold = this.vehicle.startOdo;
        this.reminder.vehicleMileage = this.vehicle.mileage;
        this.reminder.vehicleMake = this.vehicle.make ? this.vehicle.make : '';
        this.reminder.vehicleModel = this.vehicle.model ? this.vehicle.model : '';
        this.reminder.vehicleName = this.vehicle.name;
        this.reminder.vehiclePictureUrl = this.vehicle.profilePictureUrl ? this.vehicle.profilePictureUrl : '';
        this.reminder.eventType = ReminderEventType[ReminderEventType.REMINDER_CREATED];
    }

    saveReminder(reminder) {
        this.reminder = reminder;
        this.reminder.reminderId = uuid.v1();
        console.log('save reminder', this.reminder, this.reminder.odoThreshold);
        this.loadingReminder = true;
        this.createReminder$ = this.vehicleService.createReminder(this.reminder)
            .finally(() => {
            })
            .subscribe(res => {
                if (res) {
                    this.getDueTodayList(this.reminder.dueDate);
                    this.fetchReminder();
                    this.resetReminder();
                    this.toastMsg.showSuccess('SUCCESS', 'REMINDER_SAVED_SUCCESSFULLY');
                }
            }, error => {
                this.resetReminder();
                this.toastMsg.showError('ERROR', 'ERROR_SAVING_REMINDER');
            });
    }

    resetReminder() {
        this.dueDate = null;
        this.reminder.dueDate = null;
        this.reminder.odoThreshold = 0;
        this.reminder.reminderType = null;
        this.reminder.recurringRules.recurrence = null;
        console.log('reset reminder', this.reminder, this.dueDate);
    }

    deleteReminder(reminder) {
        this.loadingReminder = true;
        reminder.eventType = ReminderEventType[ReminderEventType.REMINDER_REMOVED];
        console.log('delete reminder', this.reminder, reminder);
        this.deleteReminder$ = this.vehicleService.createReminder(reminder).subscribe(res => {
            if (res) {
                this.isDialogVisible = false;
                this.fetchReminder();
                this.resetReminder();
                this.toastMsg.showSuccess('SUCCESS', 'REMINDER_DELETED_SUCCESSFULLY');
            }
        }, error => {
            this.toastMsg.showError('ERROR', 'ERROR_DELETING_REMINDER');
        });
    }

    updateReminder(reminder) {
        this.loadingReminder = true;
        reminder.eventType = 'REMINDER_UPDATED';
        console.log('update event', reminder);
        this.update = false;
        this.updateDue = false;
        this.updateReminder$ = this.vehicleService.createReminder(reminder).subscribe(res => {
            if (res) {
                this.toastMsg.showSuccess('SUCCESS', 'REMINDER_SAVED_SUCCESSFULLY');
                this.fetchReminder();
                this.resetReminder();
            }
        }, error => {
            this.toastMsg.showError('ERROR', 'ERROR_SAVING_REMINDER');
        });
    }

    convertToDate(milli) {
        return moment(milli).format('LL');
    }

    convertToTime(time: Date) {
        return moment(time).format('h:mm a');
    }

    showDialogChange(data) {
        this.isDialogVisible = data;
    }

    checkUpdate(i, selection) {
        if (selection == i) {
            return false;
        } else {
            return true;
        }
    }

    iconColor(date) {
        if (date < moment(new Date).valueOf()) {
            return '#f10000';
        } else {
            return 'rgba(0, 0, 0, 0.6)';
        }
    }

    matchTime(date) {
        const dateTime = this.convertToTime(date);
        if (date < this.minDate.getTime()) {
            return true;
        } else {
            return false;
        }
    }

    hide() {
        this.updateDue = false;
    }

    fadeOut() {
        this.update = false;
    }

    minOdoReading(event) {
        if (event < this.reminder.odoThreshold) {
            this.showError = true;
        } else {
            this.reminder.odoThreshold = event;
            this.showError = false;
        }
    }

    getIconForExpenseType(type) {
        switch (type) {
            case 'PARKING':
                return 'mdi-parking';
            case 'FUEL':
                return 'mdi-fuel';
            case 'SERVICE':
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
            default:
                return 'mdi-alarm';
        }
    }
}
