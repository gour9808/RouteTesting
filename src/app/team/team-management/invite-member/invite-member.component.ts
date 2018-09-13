import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Carbook} from '../../../models/invite';
import {InviteService} from '../../../service/invite.service';
import {ToastMessageService} from '../../../service/toast-message.service';
import {FleetService} from '../../../service/fleet.service';
import {TranslateService} from '@ngx-translate/core';
import * as _ from 'lodash';
import {UserService} from '../../../service/user.service';
import {Cache} from '../../../utils/storage.provider';
import {OrganisationService} from '../../../service/organisation.service';
import {Subject} from 'rxjs/Subject';
import {Utils} from '../../../utils/utils';

@Component({
    selector: 'cbp-invite-member',
    templateUrl: './invite-member.component.html',
    styleUrls: ['./invite-member.component.scss']
})
export class InviteMemberComponent implements OnInit, OnDestroy {
    @Cache({pool: 'User'}) userInfo: any;
    @Cache({pool: 'GroupData'}) fleetList: any;
    @Input() showInviteDialog: boolean;
    groupData: any;
    @Output() reload: EventEmitter<any> = new EventEmitter();
    translateService$: any;
    roles: any = [];
    invitation: Carbook.InviteModel = new Carbook.InviteModel();
    inviteRole: any = [];
    inviteLoading: boolean;
    userService$: any;
    sendInvite$: any;
    takeUntil$: Subject<boolean> = new Subject<boolean>();
    orgService$: any;

    constructor(private inviteService: InviteService, private toastMessage: ToastMessageService, private translateService: TranslateService, private fleetService: FleetService, private userService: UserService
        , private orgService: OrganisationService) {
        this.translateService$ = this.translateService.onLangChange.subscribe((event) => {
            this.setRoles();
        });
    }

    ngOnInit() {
        this.setRoles();
        this.setBranch(_.find(this.fleetList, ['groupId', this.fleetService.getFleetId()]));
    }

    ngOnDestroy() {

    }

    setRoles() {
        this.roles = _.map(Carbook.roles, item => {
            return this.translateService.currentLang == 'lang-de' ? {label: item.de, value: item.value} : {label: item.label, value: item.value};
        });
    }

    show() {
        this.showInviteDialog = true;
        console.log('Show', this.showInviteDialog);
    }

    hide() {
        console.log('Hide');
        this.invitation = new Carbook.InviteModel();
        this.inviteRole = null;
        this.showInviteDialog = false;
    }

    invite() {
        this.inviteLoading = true;
        this.userService$ = this.userService.fetchUserByEmail(this.invitation.receiverEmail).subscribe(res => {
            console.log('Carbook User is', res);
            if (res && res['results']) {
                this.invitation.receiverUserId = res['results'][0].userprofile.userId;
            }
            this.setInvitePayload();
        }, error => {
            this.inviteLoading = false;
            console.log('Error sending invite', error);
            this.toastMessage.showError('ERROR', 'INVITATION_NOT_SENT');
        });
    }

    goForInvitation() {
        return this.invitation.receiverName && Utils.validateEmail(this.invitation.receiverEmail) && this.invitation.groupId && this.invitation.roles;
    }

    setInvitePayload() {
        this.invitation.senderEmail = this.userInfo.currentEMail;
        this.invitation.senderUserId = this.userInfo.userId;
        this.invitation.senderName = this.userInfo.displayname;
        this.invitation.responseType = 'PENDING';
        this.sendInvite(this.invitation);
    }

    sendInvite(invitation) {
        console.log('Invited', invitation);
        this.hide();
        this.inviteLoading = false;
        this.sendInvite$ = this.inviteService.sendInvite(invitation)
            .finally(() => this.inviteLoading = false)
            .subscribe(invRes => {
                console.log('Invitation Sent', invRes);
                this.reload.next();
                this.hide();
                this.toastMessage.showSuccess('INVITATION_SENT_TO', this.invitation.receiverName);
            }, error => {
                console.log('Error sending invite', error);
                this.toastMessage.showError('ERROR', 'INVITATION_NOT_SENT');
            });
    }


    setBranch(event) {
        console.log('Selected Branch', event);
        _.includes(event.roles, 'MANAGER') ? _.remove(this.roles, ['value', 'CB_ADMIN']) : '';
        this.invitation.groupId = event.groupId;
        this.invitation.path = event.path;
        this.invitation.groupName = event.groupName;
        this.invitation.groupType = event.groupType;
        this.invitation.organisationId = this.fleetService.getOrgId();
    }

    setRole(event) {
        this.invitation.roles = [event.toUpperCase()];
        this.inviteRole = [event.toUpperCase()];
        console.log('Set Role', this.invitation);
    }

}
