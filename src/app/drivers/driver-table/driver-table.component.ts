import { Component, OnDestroy, OnInit } from '@angular/core';
import { Utils } from '../../utils/utils';
import { FleetService } from '../../service/fleet.service';
import { ToastMessageService } from 'app/service/toast-message.service';
import { LogbookSummaryService } from 'app/service/logbook-summary.service';
import * as _ from 'lodash';
import { IFilterPipe } from 'app/utils/pipes/filter.pipe';
import { Carbook } from '../../models/invite';
import { InviteService } from 'app/service/invite.service';
import { UserService } from 'app/service/user.service';
import { Observable } from 'rxjs/Observable';
import InviteModel = Carbook.InviteModel;
import { Cache } from '../../utils/storage.provider';
import { OrganisationService } from 'app/service/organisation.service';
import { Subject } from "rxjs/Subject";
import { TranslateService } from '@ngx-translate/core';

interface Invitee {
    id: any;
    name: any;
    email: any;
    phone: any;
    assigned?: any;
    role?: any;
    responseType?: any;
    updateTime: any;
    groupId?: any;
    path?: any;
    obj?: any;
}


interface IOptions {
    label: any;
    value: any;
}

@Component({
    selector: 'cbp-driver-table',
    templateUrl: './driver-table.component.html',
    styleUrls: ['./driver-table.component.scss']
})

export class DriverTableComponent implements OnInit, OnDestroy {
    payload: {};
    totalDuration: any;
    totalTrips: any;
    totalDistance: any;
    fleetService$: any;
    sendInvite$: any;
    fleetView: any;
    drivers: any = [];
    userService$: any;
    getInvites$: any;
    orgService$;
    loadingDrivers: boolean;
    logbookSummary$: any;
    summary: any = [];
    totalGaps: any = 0;
    totalOverlaps: any = 0;
    fromDate: Date = Utils.getStartOfCurrentYear();
    toDate: Date = Utils.getEndOfCurrentDay();
    driverStatus: any = {};
    searchTerm: IFilterPipe = {} as IFilterPipe;
    filterValue: IFilterPipe = {} as IFilterPipe;
    filterType = [{ label: 'Active', value: 'ACTIVE' }, { label: 'Inactive', value: 'INACTIVE' }, { label: 'Removed', value: 'REMOVED' }];
    isVehicleDialogVisible: boolean;
    isRemoveDialogVisible: boolean;
    currentDriver: any;
    removingVehicle: any;
    invitation: Carbook.InviteModel = new Carbook.InviteModel();
    loadingInvitees: boolean;
    invitees: Invitee[] = [];
    @Cache({ pool: 'User' }) userInfo: any;
    takeUntil$: Subject<boolean> = new Subject<boolean>();
    roles: IOptions[] = [];
    progress = [];
    removingDriver: boolean;
    translateService$;

    constructor(private orgService: OrganisationService, private fleetService: FleetService, private toast: ToastMessageService, private logbookSummary: LogbookSummaryService, private inviteService: InviteService, private userService: UserService, private translateService: TranslateService, ) {
        this.orgService$ = this.orgService.onChange().takeUntil(this.takeUntil$).subscribe(data => {
            console.log('Changed', data);
            if (data.fleet) {
                this.takeUntil$.next(true); // to prevent unnecessary network calls
                this.setBranch(_.find(data.fleet, ['groupId', this.fleetService.getFleetId()]));
            }
        });
        this.setRoles();
        this.translateService$ = this.translateService.onLangChange.subscribe((event) => {
            this.setRoles();
        });
    }

    ngOnInit() {
        this.getInvites();
        this.invitation.organisationId = this.fleetService.getOrgId();
    }

    ngOnDestroy() {
    }

    getSummary() {
        this.loadingDrivers = true;
        this.logbookSummary$ = this.logbookSummary.fetchLogbookSummary(this.fleetService.getFleetId(), null, null, this.fromDate.valueOf(), this.toDate.valueOf(), 'all')
            .subscribe(res => {
                console.log('Logbook summary us', res);
                this.summary = res;
                this.getDriversInFleet();
            });
    }

    getDriversInFleet() {
        this.fleetService$ = this.fleetService.fetchFleetView(this.fleetService.getFleetId()).subscribe(res => {
            this.fleetView = res;
            this.loadingDrivers = true;
            if (_.has(res, 'userProfile') && _.has(res, 'fleetDriverList')) {
                this.drivers = _.filter(res['userProfile'], profile => res['driverIdList'].includes(profile.userId));
                this.driverStatus = res.fleetDriverList;
                this.loadingDrivers = false;
                this.prepareDriverMetrics();
            } else {
                this.drivers = [];
                this.loadingDrivers = false;
            }
        })
    }

    prepareTotals() {
        this.totalDistance = _.sumBy(this.summary, 'businessKM').toFixed(2);
        this.totalTrips = _.sumBy(this.summary, 'businessTrips');
        this.totalDuration = _.sumBy(this.summary, 'businessDrivenTime');
        this.totalGaps = _.sumBy(this.summary, 'gaps');
        this.totalOverlaps = _.sumBy(this.summary, 'overlaps');
    }

    prepareDriverMetrics() {
        const uniqueDrivers = _(this.summary).groupBy('driverId').value();
        console.log('Unique Drivers ', uniqueDrivers);
        _.forEach(this.drivers, driver => {
            driver.totalDistance = _.sumBy(uniqueDrivers[driver.userId], 'businessKM').toFixed(2);
            driver.trips = _.sumBy(uniqueDrivers[driver.userId], 'businessTrips');
            driver.duration = Utils.displayTime(_.sumBy(uniqueDrivers[driver.userId], 'businessDrivenTime'));
            driver.gaps = _.sumBy(uniqueDrivers[driver.userId], 'gaps');
            driver.overlaps = _.sumBy(uniqueDrivers[driver.userId], 'overlaps');
            driver.status = this.getDriverStatus(driver);
        });
        this.prepareTotals();
        console.log("driver>> "+JSON.stringify(this.drivers));
    }

    getDriverStatus(driver) {
        return this.driverStatus[driver.userId] ? this.driverStatus[driver.userId] : this.getDriverInviteStatus(driver);
    }
    getDriverInviteStatus(driver) {
        return this.invitees.find(invitee => invitee.obj.receiverEmail == driver.currentEMail) != undefined ? this.invitees.find(invitee => invitee.obj.receiverEmail == driver.currentEMail).responseType : "INVITE";
    }

    changeDriverState(data, driverId) {
        console.log('driverId ' + driverId)
        this.payload = {
            [driverId]: data == true ? 'ACTIVE' : 'INACTIVE'
        };
        this.drivers.filter(driver => driver.userId == driverId).map(driver => {
            driver.status = data == true ? 'ACTIVE' : 'INACTIVE';
        });
        this.fleetService.updateFleetDriver(this.fleetService.getFleetId(), this.payload).subscribe((res) => {
            this.ngOnInit();
            this.toast.showSuccess('SUCCESS', 'DRIVER_UPDATED_SUCCESSFULLY');
        }, (error) => {
            this.ngOnInit();
            this.toast.showError('ERROR', 'ERROR_UPDATING_DRIVER');
        });
    }

    removeDriver(driverId) {
        this.removingDriver = true;
        this.payload = {
            [driverId]: 'REMOVED'
        };
        this.fleetService.updateFleetDriver(this.fleetService.getFleetId(), this.payload).subscribe((res) => {
            this.drivers.filter(driver => driver.userId == driverId).map(driver => driver.status = "REMOVED");
            this.removingDriver = false;
            this.isRemoveDialogVisible=false;
            this.ngOnInit();
            this.toast.showSuccess('SUCCESS', 'DRIVER_UPDATED_SUCCESSFULLY');
        }, (error) => {
            this.toast.showError('ERROR', 'ERROR_UPDATING_DRIVER');
        });
    }

    vehicleDialogChange(data) {
        this.isVehicleDialogVisible = data;
    }

    removeDialogChange(data) {
        this.isRemoveDialogVisible = data;
    }

    sendInvite(driver, index) {
        this.invitation.senderEmail = this.userInfo.currentEMail;
        this.invitation.senderUserId = this.userInfo.userId;
        this.invitation.senderName = this.userInfo.displayname;
        this.invitation.responseType = "PENDING";
        this.invitation.roles = ["DRIVER"];
        this.sendInvite$ = this.inviteService.sendInvite(this.invitation)
            .finally(() => this.progress[index] = false)
            .subscribe(invRes => {
                this.drivers.filter(driverProfile => driverProfile.userId == driver.userId).map(driver => {
                    driver.status = "PENDING";
                });
                this.progress[index] = false;
                console.log('Invitation Sent', invRes);
                this.toast.showSuccess('SUCCESS', 'INVITATION_SENT_TO' +' '+ this.invitation.receiverName);
                this.ngOnInit();

            }, error => {
                this.progress[index] = false;
                console.log('Error sending invite', error);
                this.toast.showError('ERROR', 'INVITATION_NOT_SENT');
            });
    }



    invite(driver, index) {
        this.invitation.receiverName = driver.displayname;
        this.invitation.receiverEmail = driver.currentEMail;
        this.progress[index] = true;
        this.userService$ = this.userService.fetchUserByEmail(this.invitation.receiverEmail).subscribe(res => {
            if (res && res['results']) {
                this.invitation.receiverUserId = res['results'][0].userprofile.userId;
            }
            this.sendInvite(driver, index);
        }, error => {
            this.toast.showError('ERROR', 'INVITATION_NOT_SENT');
        });
    }

    getInvites() {
        this.invitees = [];
        this.getInvites$ = this.inviteService.getInvites(this.fleetService.getOrgId(), this.fleetService.getFleetId()).subscribe((res: any[]) => {
            console.log('Invites are', res);
            this.loadingInvitees = true;
            res.forEach((invitee: InviteModel) => {
                this.invitees.push({
                    id: invitee.id,
                    name: invitee.receiverName,
                    email: invitee.receiverEmail,
                    phone: invitee.receiverPh,
                    updateTime: invitee.updateTime,
                    assigned: invitee.groupName,
                    role: this.getRole(_.join(invitee.roles, ' ,')),
                    responseType: invitee.responseType,
                    groupId: invitee.groupId,
                    path: invitee.path,
                    obj: invitee
                });
            });
            this.invitees = [...this.invitees];
            _.reverse(this.invitees);
            console.log("invitees "+JSON.stringify(this.invitees));
            this.getSummary();
        }, err => {
            this.toast.showError("ERROR", "NO_INVITEES_FOUND")
        });
    }

    getRole(role) {
        if (role == 'CB_ADMIN') {
            return 'ADMIN';
        } else {
            return role;
        }
    }

    setBranch(event) {
        console.log('Selected Branch', event);
        this.invitation.groupId = event.groupId;
        this.invitation.path = event.path;
        this.invitation.groupName = event.groupName;
        this.invitation.groupType = event.groupType;
    }

    setRoles() {
        this.roles = [];
        if (this.translateService.currentLang == 'lang-de') {
            _.map(Carbook.roles, (item) => this.roles.push({ label: item.de, value: item.de }));
        } else {
            _.map(Carbook.roles, (item) => this.roles.push({ label: item.label, value: item.label }));
        }
    }
}
