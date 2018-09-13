import { Component, OnDestroy, OnInit } from '@angular/core';
import * as image from '../../models/image';
import * as _ from 'lodash';
import * as uuid from 'uuid';
import * as cbv from '../../models/insurance';
import * as cb from '../../models/vehicle';
import { Carbook } from '../../models/vehicle';
import { InsuranceService } from '../../service/insurance.service';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { ToastyService } from 'ng2-toasty';
import { VehicleService } from '../../service/vehicle.service';
import { AutoUnsubscribe } from '../../utils/auto-unsubscribe';
import { ToastMessageService } from '../../service/toast-message.service';
import { TranslateService } from '@ngx-translate/core';
import { FleetService } from '../../service/fleet.service';
import ReminderType = Carbook.ReminderType;
import ReminderEventType = Carbook.ReminderEventType;

interface IOptions {
    label: any;
    value: any;
}

@Component({
    selector: 'cbp-vehicle-insurance',
    templateUrl: './vehicle-insurance.component.html',
    styleUrls: ['./vehicle-insurance.component.scss']
})

@AutoUnsubscribe()
export class VehicleInsuranceComponent implements OnInit, OnDestroy {
    vehicleSub$;
    updateInsurance$;
    translateService$;
    setReminder$;
    recurrenceType: IOptions[] = [];
    disabled = false;
    picUrl$;
    allInsurance$;
    userInfo$;
    createInsurance$;
    minDate;
    maxDate;
    searching;
    loadingInsurance = true;
    vehicle: any;
    vid: any;
    vehicleId: string;
    userInfo: any = {};
    image: image.Image.ImageDetail = new image.Image.ImageDetail();
    insuranceReminder: cb.Carbook.Reminder = new cb.Carbook.Reminder();
    from: Date;
    to: Date;
    dateStr: string;
    create: any;
    insurance = new cbv.Insurance.InsuranceDetail();

    constructor(private service: InsuranceService, private vehicleService: VehicleService, private toastMsg: ToastMessageService,
        private translateService: TranslateService, private router: Router, private userservice: UserService, private toasty: ToastyService, private fleetService: FleetService) {
        this.getReccurrenceType();
        this.translateService$ = this.translateService.onLangChange.subscribe((event) => {
            this.getReccurrenceType();
        });
    }

    ngOnInit() {
        this.vehicleSub$ = this.vehicleService.getVehicle().subscribe(res => {
            console.log('Gift from parent', res);
            this.vehicle = res;
            this.vehicle ? this.getInsurance() : null;
        }, error => {
            this.toastMsg.showError('ERROR', 'ERROR_FETCHING_VEHICLES')
        });
    }

    ngOnDestroy() {
    }

    setFrom(event) {
        this.insurance.insuranceCompany.certificateCardValidity.from = new Date(event).getTime();
    }

    setTo(event) {
        this.insurance.insuranceCompany.certificateCardValidity.to = new Date(event).getTime();
    }

    setDob(event) {
        this.insurance.insurancePolicyHolder.dateOfBirth = new Date(event).getTime();
    }

    getReccurrenceType() {
        this.recurrenceType = [];
        if (this.translateService.currentLang == 'lang-de') {
            _.map(Carbook.recurrence, (item) => this.recurrenceType.push({ label: item.de, value: item.value }));
        } else {
            _.map(Carbook.recurrence, (item) => this.recurrenceType.push({ label: item.name, value: item.value }));
        }
    }

    setDlValidity(event) {
        this.insurance.insurancePolicyHolder.drivingLicenceValidity = new Date(event).getTime();
    }

    setReminder(event) {
        console.log('Set reminder', event);
        this.insuranceReminder.dueDate = new Date(event).getTime();
    }

    setRecurrenceType(event) {
        this.insuranceReminder.recurringRules.recurrence = event;
    }

    createInsuranceReminder(overlayPanel) {
        this.insuranceReminder.reminderId = uuid.v1();
        this.insuranceReminder.fleetId = localStorage.getItem('fleetID');
        this.insuranceReminder.reminderType = ReminderType[ReminderType.INSURANCE];
        this.insuranceReminder.eventType = ReminderEventType[ReminderEventType.REMINDER_CREATED];
        this.insuranceReminder.vehicleId = this.vehicle.vehicleId;
        this.insuranceReminder.ownerId = this.vehicle.ownerId;
        this.insuranceReminder.userId = this.vehicle.ownerId;
        if (this.vehicle.make && this.vehicle.model) {
            this.insuranceReminder.vehicleMake = this.vehicle.make;
            this.insuranceReminder.vehicleModel = this.vehicle.model;
        } else {
            this.insuranceReminder.vehicleMake = ' ';
            this.insuranceReminder.vehicleModel = ' ';
        }
        this.insuranceReminder.vehicleName = this.vehicle.name;
        this.insuranceReminder.vehiclePictureUrl = ' ';
        console.log('event is ', this.insuranceReminder);

        this.setReminder$ = this.vehicleService.createReminder(this.insuranceReminder).subscribe(res => {
            console.log('insurance reminder', res);
            if (res) {
                overlayPanel.hide();
                this.toastMsg.showSuccess('SUCCESS', 'REMINDER_SAVED_SUCCESSFULLY');
            }
        },error => {
            this.toastMsg.showError('ERROR', 'ERROR_SAVING_REMINDER');
        });
    }


    choose() {
        if (this.insurance.id) {
            this.updateInsurance();
        } else {
            this.createInsurance();
        }
    }

    setDamage(e) {
        console.log(e);
        this.insurance.insuranceCompany.materialDamageCovered = e
    }


    updateInsurance() {
        console.log('passed body', this.insurance);
        this.updateInsurance$ = this.service.updateInsuranceDetails(this.insurance).subscribe(res => {
            if (res) {
                console.log('response for update', res);
                this.toastMsg.showSuccess('SUCCESS', 'UPDATED_SUCCESSFULLY')
            }
        }, error => {
            this.toastMsg.showError('ERROR', 'ERROR_UPDATING_INSURANCE');
            console.log('Error: ' + error)
        }
        )
    }

    getInsurance() {
        this.allInsurance$ = this.service.getInsuranceDetails(this.vehicle.vehicleId).subscribe((res: cbv.Insurance.InsuranceDetail) => {
            console.log('response for insurance', res);
            this.loadingInsurance = false;
            if (res) {
                this.insurance = res;
                this.dateStr = this.insurance.insuranceCompany.certificateCardValidity.from;
                let dateUTC = new Date(this.dateStr);
                this.insurance.insuranceCompany.certificateCardValidity.from = new Date(dateUTC.getTime() + (330 * 60000));
                this.dateStr = this.insurance.insuranceCompany.certificateCardValidity.to;
                dateUTC = new Date(this.dateStr);
                this.insurance.insuranceCompany.certificateCardValidity.to = new Date(dateUTC.getTime() + (330 * 60000));
                this.dateStr = this.insurance.insurancePolicyHolder.dateOfBirth;
                dateUTC = new Date(this.dateStr);
                this.insurance.insurancePolicyHolder.dateOfBirth = new Date(dateUTC.getTime() + (330 * 60000));
                this.dateStr = this.insurance.insurancePolicyHolder.drivingLicenceValidity;
                dateUTC = new Date(this.dateStr);
                this.insurance.insurancePolicyHolder.drivingLicenceValidity = new Date(dateUTC.getTime() + (330 * 60000))
            }
        }, error => {
            console.log('Error Fetching insurance', error);
            this.loadingInsurance = false;
        })
    }

    createInsurance() {
        this.insurance.vehicleId = this.vehicle.vehicleId;
        this.insurance.userId = this.fleetService.getFleetId();
        this.createInsurance$ = this.service.createInsurance(this.insurance).subscribe(res => {
            console.log(' create response is', res);
            this.toastMsg.showSuccess('SUCCESS', 'CREATED_SUCCESSFULLY')
        }, error => {
            this.toastMsg.showError('ERROR', 'ERROR_CREATING_INSURANCE')
        })
    }


    goForIgnition() {
        return (this.insurance.insuranceCompany.policyNumber || this.insurance.insuranceCompany.name);
    }

    goForReminder() {
        return this.insuranceReminder.recurringRules.recurrence && this.insuranceReminder.dueDate;
    }

}
