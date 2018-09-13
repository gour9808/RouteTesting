import {Component, Input, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Cache} from '../../utils/storage.provider';
import {Router} from '@angular/router';
import {AutoUnsubscribe} from '../../utils/auto-unsubscribe';

import {FleetService} from '../../service/fleet.service';
import {UserService} from '../../service/user.service';
import {OrganisationService} from '../../service/organisation.service';
import {CommunicatorService} from '../../common/communicator.service';
import * as _ from 'lodash';
import {IFilterPipe} from '../../utils/pipes/filter.pipe';

@Component({
    selector: 'cbp-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
@AutoUnsubscribe()
export class SidebarComponent implements OnInit {
    @Cache({pool: 'GroupData'}) fleetList: any;
    orgService$;
    @Input() menu: Array<any>;
    version = environment.version;
    userInfo: any = {};
    menuLabeled: any = [];
    menuIcon: any = [];
    expanded: boolean;
    fleetName: any;
    showFleets = false;
    fleetId: any;
    data: any;
    role: any;
    fleetProfile$;
    fleets: any = [];
    fleetLoaded: boolean;
    searchTerm: IFilterPipe = {} as IFilterPipe;
    filteredFleets: any = [];

    constructor(private fleetService: FleetService, private router: Router,
                private userService: UserService, private orgService: OrganisationService,
                private communicatorService: CommunicatorService) {

        this.fleetName = localStorage.getItem('fleetName');
        this.role = this.displayRoleName(this.fleetService.getFleetRole());

        this.orgService$ = this.orgService.onChange().subscribe(res => {
            console.log('side bar org service response', res);
            this.data = res;
            this.getFleet(_.map(this.data.fleet, 'groupId'));
        });
    }

    ngOnInit() {
        console.log('Init Sidebar');
        console.log(this.menu);
        this.orgService.resolveOrganisation();
        this.communicatorService.on('fleet_update', () => {
            this.fleetName = localStorage.getItem('fleetName');
            this.role = this.displayRoleName(this.fleetService.getFleetRole());
            this.getFleet(_.map(this.data.fleet, 'groupId'));
        });
    }

    expand(event) {

    }

    displayRoleName(role) {
        if (role.indexOf(',') > -1) {
            role = role.split(',')[0]
        }
        role = role.replace('CB_ADMIN', 'ADMIN');
        return role;
    }

    getRole(role) {
        let roles = role.join();
        roles = roles.replace('CB_ADMIN', 'ADMIN');
        return roles;
    }

    createFleet() {
        this.router.navigate(['/registration'])
    }

    getFleet(data) {
        if (data.length) {
            this.fleetProfile$ = this.fleetService.getFleetProfileForIds(data).subscribe(res => {
                console.log('Fleets are', res);
                this.fleetLoaded = true;
                this.fleets = _.compact(res['fleets']);
                this.filteredFleets = _(this.fleets).filter(flt => flt.fleetId != this.fleetService.getFleetId())
                    .map(flt => _.extend({role: this.getRole(this.userService.getRole(flt.fleetId))}, flt))
                    .orderBy('fleetName').value();
            })
        }
    }

    setFleet(fleet) {
        this.showFleets = false;
        const role = this.userService.getRole(fleet.fleetId);
        this.fleetService.setFleetId(fleet.fleetId);
        this.fleetService.setOrgId(localStorage.getItem('orgID'));
        this.fleetService.setFleetRole(role);
        localStorage.setItem('fleetName', fleet.fleetName);
        this.communicatorService.broadcast('fleet_update');
        this.filteredFleets = _(this.fleets).filter(flt => flt.fleetId != this.fleetService.getFleetId()).orderBy('fleetName').value();
        this.router.navigate(['/fleet']);
    }

}
