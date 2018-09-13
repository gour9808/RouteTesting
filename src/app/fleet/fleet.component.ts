import {Component, EventEmitter, OnInit} from '@angular/core';
import {FleetService} from '../service/fleet.service';
import {CommunicatorService} from '../common/communicator.service';
import {CarbookRoles, GroupTypes, UserService} from '../service/user.service';
import {OneSignalService} from '../service/one-signal.service';

@Component({
    selector: 'cbp-fleet',
    templateUrl: './fleet.component.html',
    styleUrls: ['./fleet.component.scss']
})
export class FleetComponent implements OnInit {
    oneSignalId: any;
    showSidenav = true;
    public title: any;
    check: EventEmitter<any>;
    menuItems = [];
    userInfo: any;

    constructor(private fleetService: FleetService, private communicatorService: CommunicatorService, private userService: UserService, private oneSignalService: OneSignalService) {
        this.communicatorService.on('fleet_update', () => {
            this.checkRoleAndEnable();
        });
    }

    ngOnInit() {
        console.log('Init Container');
        this.oneSignalService.init();
        this.checkRoleAndEnable();

        console.log('Allowed');
    }

    checkRoleAndEnable() {
        this.menuItems = [{
            name: 'DASHBOARD',
            icon: 'mdi-view-dashboard',
            path: 'dashboard',
            active: true
        },
            // {
            //     name: 'VEHICLE_BOOKING',
            //     icon: 'mdi-book-open',
            //     path: 'requests',
            //     active: this.isAdminOrAgent()
            // },
            {
                name: 'VEHICLES',
                icon: 'mdi-car',
                path: 'vehicle',
                active: true
            }, {
                name: 'DRIVERS',
                icon: 'mdi-account-multiple',
                path: 'drivers',
                active: this.isAdminOrAgent()
            }, {
                name: 'LIVE_TRACKING',
                icon: 'mdi-near-me',
                path: 'tracking',
                active: true
            }, {
                name: 'REPORTS',
                icon: 'mdi-file-document-box',
                path: 'reports',
                active: this.isAdminOrAgent(),
                children: [
                    {
                        name: 'LOGBOOK_SUMMARY',
                        icon: 'mdi-notebook',
                        path: 'reports/logbook',
                        active: true
                    }, {
                        name: 'EXPENSE_REPORT',
                        icon: 'mdi-cash',
                        path: 'reports/expense',
                        active: true
                    }, {
                        name: 'VEHICLE_REPORT',
                        icon: 'mdi-car',
                        path: 'reports/vehicle',
                        active: true
                    }, {
                        name: 'DRIVER_REPORT',
                        icon: 'mdi-account-multiple',
                        path: 'reports/driver',
                        active: true
                    }
                ]
            }, {
                name: 'SETTINGS',
                icon: 'mdi-settings',
                path: 'settings',
                active: this.isAdminOrAgent(),
                children: [
                    {
                        name: 'TEAM_MANAGEMENT',
                        icon: 'mdi-account-multiple',
                        path: 'team',
                        active: this.isAdminOrAgent()
                    }
                ]
            }];
    }

    isAdminOrAgent() {
        return this.userService.hasRole(GroupTypes.FLEET, this.fleetService.getFleetId(), CarbookRoles.CB_ADMIN) ||
            this.userService.hasRole(GroupTypes.FLEET, this.fleetService.getFleetId(), CarbookRoles.MANAGER) ||
            this.userService.hasRole(GroupTypes.FLEET, this.fleetService.getFleetId(), CarbookRoles.FLEET_MANAGER) ||
            this.userService.hasRole(GroupTypes.FLEET, this.fleetService.getFleetId(), CarbookRoles.TEAM_MANAGER)
    }

    toggle() {
        this.showSidenav = !this.showSidenav;
    }
}
