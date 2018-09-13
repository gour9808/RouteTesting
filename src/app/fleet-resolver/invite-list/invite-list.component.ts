import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {ActivityService} from '../../service/activity.service';
import {Cache} from '../../utils/storage.provider';
import * as _ from 'lodash';
import * as cb from '../../models/invite';
import {InviteService} from '../../service/invite.service';
import {AutoUnsubscribe} from "../../utils/auto-unsubscribe";

@Component({
    selector: 'cbp-invite-list',
    templateUrl: './invite-list.component.html',
    styleUrls: ['./invite-list.component.scss']
})
@AutoUnsubscribe()
export class InviteListComponent implements OnInit, OnDestroy {
    @Cache({pool: 'User'}) userInfo: any;
    activityList: any = [];
    inviteList: any = [];
    progress: any = [];
    activityService$: any;
    updateActivity$: any;
    updateInvite$: any;
    invite: cb.Carbook.InviteModel = new cb.Carbook.InviteModel();
    @Output() loaded: EventEmitter<boolean> = new EventEmitter();

    constructor(private activityService: ActivityService, private inviteService: InviteService) {
    }

    ngOnInit() {
        this.getActivities();
    }

    ngOnDestroy() {

    }

    getActivities() {
        this.activityService$ = this.inviteService.getInvitesForEmail(this.userInfo.currentEMail).subscribe((res: any[]) => {
            this.inviteList = res;
            this.inviteList = _.orderBy(this.inviteList, 'updateTime', 'desc');
            console.log('Pending activites', this.inviteList);
            this.loaded.emit(true);
        }, error => {
            this.loaded.emit(true);
        })
    }

    updateInvitation(index, status, invite) {
        console.log('Invitation ', index, invite);
        this.invite = invite;
        this.progress[index] = true;
        this.invite.responseType = status ? 'ACCEPTED' : 'REJECTED';
        this.invite.receiverUserId = this.userInfo.userId;
        this.updateInvite$ = this.inviteService.updateInvite(this.invite).subscribe(res => {
            console.log(res);
            this.getActivities();
            this.progress[index] = false;
        }, error => {
            console.log('Error updating invite', error);
            this.getActivities();
            this.progress[index] = false;
        })
    }
}
