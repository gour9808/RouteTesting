import {Component, OnDestroy, OnInit} from '@angular/core';
import {Cache} from '../../utils/storage.provider';
import {InviteService} from '../../service/invite.service';
import {Carbook} from '../../models/invite';
import * as _ from 'lodash';
import {UserService} from '../../service/user.service';
import {OrganisationService} from '../../service/organisation.service';
import {ActivatedRoute} from '@angular/router';
import {FleetService} from '../../service/fleet.service';
import {ToastMessageService} from '../../service/toast-message.service';
import {IFilterPipe} from '../../utils/pipes/filter.pipe';
import {AutoUnsubscribe} from '../../utils/auto-unsubscribe';

import {Subject} from 'rxjs/Subject';
import {TranslateService} from '@ngx-translate/core';
import InviteModel = Carbook.InviteModel;

interface IOptions {
    label: any;
    value: any;
}

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

@Component({
    selector: 'cbp-team-management',
    templateUrl: './team-management.component.html',
    styleUrls: ['./team-management.component.scss']
})

@AutoUnsubscribe()
export class TeamManagementComponent implements OnInit, OnDestroy {
    orgService$;
    getInvites$;
    updateInvite$;
    translateService$;

    @Cache({pool: 'User'}) userInfo: any;
    invitees: Invitee[] = [];
    sub: any;
    error: boolean = false;
    roles: IOptions[] = [];
    loadingInvitees: boolean;
    takeUntil$: Subject<boolean> = new Subject<boolean>();
    searchTerm: IFilterPipe = {} as IFilterPipe;
    filterType = [{label: 'All', value: 'ALL'}, {label: 'ACCEPTED', value: 'ACCEPTED'}, {label: 'PENDING', value: 'PENDING'}];
    inviteRole: any;
    groupData: any;

    constructor(private orgService: OrganisationService,
                private route: ActivatedRoute,
                private toastMessage: ToastMessageService,
                private inviteService: InviteService,
                private translateService: TranslateService,
                private fleetService: FleetService,
                private userService: UserService) {
        this.orgService$ = this.orgService.onChange().takeUntil(this.takeUntil$).subscribe(data => {
            console.log('Changed', data);
            if (data.fleet) {
                this.takeUntil$.next(true); // to prevent unnecessary network calls
                this.groupData = _.find(data.fleet, ['groupId', this.fleetService.getFleetId()]);
            }
        });
    }

    ngOnInit() {
        this.getInvites();
        this.orgService.resolveOrganisation();
    }

    ngOnDestroy() {
    }

    getInvites() {
        this.loadingInvitees = true;
        this.getInvites$ = this.inviteService.getInvites(this.fleetService.getOrgId(), this.fleetService.getFleetId())
            .finally(() => {
                this.loadingInvitees = false;
            })
            .subscribe((res: any[]) => {
                console.log('Invites are', res);
                this.invitees = _(res).map((invitee: InviteModel) => {
                    return {
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
                        obj: invitee,
                        invitedBy: invitee.senderName
                    };
                }).reverse().value();
            }, err => {
                this.toastMessage.showError('ERROR', 'NO_INVITEES_FOUND');
            });
    }

    resendInvite(invite) {
        invite.obj.responseType = 'PENDING';
    }

    cancelInvitation(invite) {
        console.log('Cancel Invitation for', invite.obj);
        invite.obj.responseType = 'ABORTED';
        this.updateInvite$ = this.inviteService.updateInvite(invite.obj).subscribe(res => {
            console.log('Aborted invite', res);
            this.toastMessage.showSuccess('SUCCESS', 'INVITATION_REMOVED_FOR ' + invite.name);
            this.getInvites();
        }, error => {
            console.log('Error aborting invite', error);
            this.toastMessage.showError('ERROR', 'INVITATION_NOT_REMOVED');
        });
    }

    getRole(role) {
        if (role == 'CB_ADMIN') {
            return 'ADMIN';
        } else {
            return role;
        }
    }
}
