import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {ActivityService} from '../../service/activity.service';
import {Cache} from '../../utils/storage.provider';
import {ActivityStatus, ActivityUpdateRequest, CarbookBaseType, ResponseType} from '../../models/activity';
import * as _ from 'lodash';
import * as cb from '../../models/invite';
import {InviteService} from '../../service/invite.service';
import {AutoUnsubscribe} from "../../utils/auto-unsubscribe";

@Component({
    selector: 'cbp-activity-list',
    templateUrl: './activity-list.component.html',
    styleUrls: ['./activity-list.component.scss']
})
@AutoUnsubscribe()
export class ActivityListComponent implements OnInit, OnDestroy {
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
        this.activityService$ = this.activityService.getPendingActivityForType(this.userInfo.userId, CarbookBaseType.INVITE_REQUEST_TASK).subscribe((res: any[]) => {
            this.activityList = res;
            this.inviteList = _.map(_.filter(res, ['responseType', 'PENDING']), i => _.pick(i, 'id', 'responseType', 'invite'));
            console.log('Pending activites', this.inviteList);
            this.loaded.emit(true);
        }, error => {
            this.loaded.emit(true);
        })
    }

    updateInvitation(index, status, activity) {
        console.log('Invitation ', index, activity);
        this.progress[index] = true;
        const updateRequest = new ActivityUpdateRequest();
        updateRequest.status = status ? ActivityStatus[ActivityStatus.ACTIVTY_ACCEPTED] : ActivityStatus[ActivityStatus.ACTIVITY_REJECTED];
        updateRequest.userId = this.userInfo.userId;
        updateRequest.activityId = activity.id;
        updateRequest.baseType = CarbookBaseType[CarbookBaseType.INVITE_REQUEST_TASK];
        this.updateActivity$ = this.activityService.updateActivityForUser(updateRequest).subscribe(res => {
            console.log('Activity Updated for User', res);
            this.invite = activity['invite'];
            this.invite.responseType = status ? ResponseType[ResponseType.ACCEPTED] : ResponseType[ResponseType.REJECTED];
            console.log('get invite', this.invite);
            this.updateInvite(index);
        }, error => {
            console.log('Error updating activity', error);
            this.updateInvite(index);
            this.progress[index] = false;
        });
    }


    updateInvite(index) {
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
