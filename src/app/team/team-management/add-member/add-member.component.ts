import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {UnverifiedUser, UserGroupsEntity} from '../../../models/UnverifiedUser';
import {Cache} from '../../../utils/storage.provider';
import {AutoUnsubscribe} from '../../../utils/auto-unsubscribe';
import {InviteService} from '../../../service/invite.service';
import {ToastMessageService} from '../../../service/toast-message.service';
import {Carbook} from '../../../models/invite';
import {TranslateService} from '@ngx-translate/core';
import * as _ from 'lodash';
import {Utils} from '../../../utils/utils';
import * as uuid from 'uuid';
import {FleetService} from '../../../service/fleet.service';
import {OrganisationService} from '../../../service/organisation.service';
import {Subject} from 'rxjs/Subject';
import {Constants} from '../../../service/constants';

@Component({
    selector: 'cbp-add-member',
    templateUrl: './add-member.component.html',
    styleUrls: ['./add-member.component.scss']
})
@AutoUnsubscribe()
export class AddMemberComponent implements OnInit, OnDestroy {
    @Cache({pool: 'GroupData'}) fleetList: any;
    groupData: any;
    showAddDialog = false;
    @Output() reload: EventEmitter<any> = new EventEmitter();
    unverifiedInvite: UnverifiedUser = new UnverifiedUser();
    @Cache({pool: 'User'}) userInfo: any;
    sendInvite$: any;
    inviteLoading: boolean;
    roles: any = [];
    translateService$: any;
    takeUntil$: Subject<boolean> = new Subject<boolean>();
    orgService$: any;
    inviteRole: any = [];
    constructor(private inviteService: InviteService, private toastMessage: ToastMessageService, private translateService: TranslateService, private fleetService: FleetService, private orgService: OrganisationService) {
        this.translateService$ = this.translateService.onLangChange.subscribe((event) => {
            this.setRoles();
        });
    }

    ngOnInit() {
        this.setRoles();
        this.groupData = _.find(this.fleetList, ['groupId', this.fleetService.getFleetId()]);
    }

    ngOnDestroy() {

    }

    setRoles() {
        this.roles = [];
        if (this.translateService.currentLang == 'lang-de') {
            _.map(Carbook.roles, (item) => this.roles.push({label: item.de, value: item.value}));
        } else {
            _.map(Carbook.roles, (item) => this.roles.push({label: item.label, value: item.value}));
        }
    }

    show() {
        this.showAddDialog = true;
        console.log('Show', this.showAddDialog);
    }

    hide() {
        console.log('Hide');
        this.unverifiedInvite = new UnverifiedUser();
        this.inviteRole = null;
        this.showAddDialog = false;
    }

    setRole(event) {
        this.unverifiedInvite.unverifiedUserInfo.userEntity.userGroups[0] = new UserGroupsEntity();
        this.unverifiedInvite.unverifiedUserInfo.userEntity.userGroups[0].roles = [event.toUpperCase()];
        this.unverifiedInvite.invite.roles = [event.toUpperCase()];
        this.inviteRole = [event.toUpperCase()];
        console.log('Set Role', this.unverifiedInvite);
    }

    setInvitePayload() {
        this.unverifiedInvite.invite.groupId = this.groupData.groupId;
        this.unverifiedInvite.invite.path = this.groupData.path;
        this.unverifiedInvite.invite.groupName = this.groupData.groupName;
        this.unverifiedInvite.invite.groupType = this.groupData.groupType;
        this.unverifiedInvite.invite.senderEmail = this.userInfo.currentEMail;
        this.unverifiedInvite.invite.senderUserId = this.userInfo.userId;
        this.unverifiedInvite.invite.senderName = this.userInfo.displayname;
        this.unverifiedInvite.invite.organisationId = this.fleetService.getOrgId();
        this.unverifiedInvite.invite.responseType = 'ACCEPTED';
        this.unverifiedInvite.invite.receiverName = this.unverifiedInvite.unverifiedUserInfo.userEntity.given_name + ' ' + this.unverifiedInvite.unverifiedUserInfo.userEntity.family_name;
        this.unverifiedInvite.invite.receiverEmail = this.unverifiedInvite.unverifiedUserInfo.userEntity.email;
        this.unverifiedInvite.invite.receiverPh = this.unverifiedInvite.unverifiedUserInfo.userEntity.mobile_number;
        this.unverifiedInvite.unverifiedUserInfo.userEntity.userGroups[0].groupId = this.groupData.groupId;
        this.unverifiedInvite.unverifiedUserInfo.userEntity.password = uuid.v1();
        this.unverifiedInvite.unverifiedUserInfo.client_id = Constants.CLIENT_ID;
        this.unverifiedInvite.unverifiedUserInfo.redirect_uri = Constants.REDIRECT_URI;
    }

    goForAdd() {
        return this.unverifiedInvite.unverifiedUserInfo.userEntity.given_name && this.unverifiedInvite.unverifiedUserInfo.userEntity.family_name
            && (this.unverifiedInvite.unverifiedUserInfo.userEntity.mobile_number || Utils.validateEmail(this.unverifiedInvite.unverifiedUserInfo.userEntity.email))
            && this.unverifiedInvite.invite.roles;
    }

    addUser() {
        this.inviteLoading = true;
        this.setInvitePayload();
        console.log('Adding', this.unverifiedInvite);
        this.sendInvite$ = this.inviteService.sendUnverifiedInvite(this.unverifiedInvite)
            .finally(() => this.inviteLoading = false)
            .subscribe(invRes => {
                console.log('Invitation Sent', invRes);
                this.reload.next();
                this.hide();
                this.toastMessage.showSuccess('INVITATION_SENT_TO', this.unverifiedInvite.invite.receiverName);
            }, error => {
                console.log('Error sending invite', error);
                this.toastMessage.showError('ERROR', 'INVITATION_NOT_SENT');
            });
    }
}
