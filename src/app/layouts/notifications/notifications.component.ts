import {CommunicatorService} from '../../common/communicator.service';
import {Component, OnInit} from '@angular/core';
import {animate, animateChild, query, style, transition, trigger} from '@angular/animations';
import {ActivityService} from "../../service/activity.service";


@Component({
    selector: 'cbp-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.scss'],
    animations: [
        trigger('slide', [
            transition(':enter', [   // :enter is alias to 'void => *'
                style({transform: 'translateX(50%)'}),
                animate(100, style({transform: 'translateX(0)'}))
            ]),
            transition(':leave', [   // :leave is alias to '* => void' Waiting for Angular to fix this issue
                query('@slide', animateChild()),
                style({transform: 'translateX(0%)'}),
                animate(200, style({transform: 'translateX(50%)'}))
            ])
        ])
    ]
})
export class NotificationsComponent implements OnInit {
    show: boolean;
    date: any;
    inviteLoaded: boolean;
    constructor(private comms: CommunicatorService, private activityService: ActivityService) {
        this.comms.on('toggle-notif', ev => {
            this.show = !this.show;
        })
    }

    ngOnInit() {

    }
}
