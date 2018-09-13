import {Component, OnDestroy, OnInit} from '@angular/core';
import {FleetService} from '../service/fleet.service';
import {Router} from '@angular/router';
import {CarbookRoles, UserService} from '../service/user.service';
import {MapLoaderService} from '../service/map-loader.service';
import {Cache} from '../utils/storage.provider';
import {OrganisationService} from '../service/organisation.service';
import {AutoUnsubscribe} from '../utils/auto-unsubscribe';
import {ToastMessageService} from '../service/toast-message.service';
import * as _ from 'lodash';
import {CommunicatorService} from '../common/communicator.service';

@Component({
    selector: 'cbp-data-loader',
    templateUrl: './data-loader.component.html',
    styleUrls: ['./data-loader.component.scss']
})
/**
 * Use this class for loading necessary data before showing the user interface for the user.
 * Do not get. Use fetch instead. This ensures fresh data after every login.
 * Although there could be some better way to do this, I'm in a hurry to push this to test env, so ¯\_(ツ)_/¯
 */

@AutoUnsubscribe()
export class DataLoaderComponent implements OnInit, OnDestroy {
    times = [{odd: true}, {odd: false}, {odd: true}, {odd: false}];
    @Cache({pool: 'User'}) userInfo: any;
    fleetProfile$;
    orgService$;
    showFleet: boolean;
    fleets: any = [];
    selectedOrg: any;
    fleetFilter: any[] = [];
    ownsAtleastOne: boolean;
    fleetLoaded: boolean;
    comms$: any;
    constructor(private msgService: ToastMessageService, private fleetService: FleetService, private router: Router, private userservice: UserService, private comms: CommunicatorService, private orgService: OrganisationService) {
        this.fetchUserInfo();
        this.orgService$ = this.orgService.onChange().subscribe(data => {
            console.log('Changed', data);
            if (data.fleet && data.fleet.length) {
                this.getFleet(_.map(data.fleet, 'groupId'));
                this.checkOwnFleet(_.map(data.fleet, 'groupId'));
            } else {
                console.log('No Fleet Data. Redirect to Create');
                this.router.navigate(['/resolver']);
            }
        });
        this.comms$ = this.orgService.showRegistration().subscribe((res) => {
            console.log('Show Registration', res);
            res ? this.router.navigate(['/resolver']) : '';
        })
    }

    ngOnInit() {
        console.log('Init Data Loader');
        MapLoaderService.load();
    }

    ngOnDestroy() {
        console.log('On Destroy called');
    }

    fetchUserInfo() {
        this.userservice.fetchUserInfo().subscribe(userInfo => {
            console.log('User info is', userInfo);
            this.userInfo = userInfo;
            this.orgService.resolveOrganisation()
            // this.router.navigate(['/resolver']);
        }, error => {
            this.msgService.showError('ERROR', 'ERROR_FETCHING_USER_INFORMATION')
            this.router.navigate(['/auth']);
        });
    }

    checkOwnFleet(fleetIds) {
        fleetIds.forEach(fleetId => {
            this.ownsAtleastOne = _.includes(this.userservice.getRole(fleetId), CarbookRoles[CarbookRoles.OWNER]);
        });
    }

    getFleet(data) {
        if (data.length) {
            this.fleetProfile$ = this.fleetService.getFleetProfileForIds(data).subscribe(res => {
                console.log('Fleets are', res);
                this.fleetLoaded = true;
                this.fleets = _.compact(res['fleets']);
                this.setFleet(this.fleets[0]);
            }, error => {
                this.fleetLoaded = true;
                this.msgService.showError('ERROR', 'ERROR_FETCHING_GROUPS_FOR_USER')
            })
        } else {
            this.fleetLoaded = true;
        }
    }

    setFleet(fleet) {
        console.log('FleetView is', fleet);
        const role = this.userservice.getRole(fleet.fleetId);
        console.log('Role ', role);
        this.fleetService.setFleetId(fleet.fleetId);
        this.fleetService.setOrgId(fleet.organisationId);
        this.fleetService.setFleetRole(role);
        localStorage.setItem('fleetName', fleet.fleetName);
        this.router.navigate(['/fleet']);
    }
}
