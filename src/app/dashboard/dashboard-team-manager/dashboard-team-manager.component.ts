import { Component, OnDestroy, OnInit } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';
import { FleetService } from '../../service/fleet.service';
import { FleetView } from '../../models/fleetview';
import { Title } from '@angular/platform-browser';
import { Constants } from '../../service/constants';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { CommunicatorService } from '../../common/communicator.service';
import { Utils } from '../../utils/utils';
import { Cache } from '../../utils/storage.provider';
import { OrganisationService } from '../../service/organisation.service';
import { AutoUnsubscribe } from '../../utils/auto-unsubscribe';
import { ToastMessageService } from '../../service/toast-message.service';
import { Observable } from 'rxjs/Observable';
import { VehicleService } from '../../service/vehicle.service';
import { LogbookSummaryService } from '../../service/logbook-summary.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'cbp-dashboard-team-manager',
    templateUrl: './dashboard-team-manager.component.html',
    styleUrls: ['./dashboard-team-manager.component.scss']
})
@AutoUnsubscribe()
export class DashboardTeamManagerComponent implements OnInit {

    metrics: any[] = [];
    @Cache({pool: 'User'}) userInfo: any;
    inviteLoaded: boolean;

    constructor(private fleetService: FleetService, private vehicleService: VehicleService, private orgService: OrganisationService, private toastMsg: ToastMessageService,
        private titleService: Title, private translateService: TranslateService, private userservice: UserService, private router: Router, private communicatorService: CommunicatorService, private logbookSummary: LogbookSummaryService) {
        this.metrics = [
            { icon: 'mdi-car', value: '0', label1: 'TOTAL_MEMBERS', label2: '' },
            { icon: 'mdi-car', value: '0', label1: 'TOTAL_DRIVERS', label2: '' },
            { icon: 'mdi-car', value: '0', label1: 'TOTAL_MANAGER', label2: '' },
            { icon: 'mdi-car', value: '0', label1: 'INVITATIONS', label2: '' }
        ];
    }

    ngOnInit() {
        console.log('Init Team manager');
    }

}
