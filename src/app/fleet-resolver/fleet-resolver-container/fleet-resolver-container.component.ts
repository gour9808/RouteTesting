import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastMessageService} from '../../service/toast-message.service';
import {AutoUnsubscribe} from '../../utils/auto-unsubscribe';
import {FleetService} from '../../service/fleet.service';
import {UserService} from '../../service/user.service';
import {OrganisationService} from '../../service/organisation.service';
import * as _ from 'lodash';

@Component({
    selector: 'cbp-fleet-resolver-container',
    templateUrl: './fleet-resolver-container.component.html',
    styleUrls: ['./fleet-resolver-container.component.scss']
})
@AutoUnsubscribe()
export class FleetResolverContainerComponent implements OnInit {
    // @Cache({ pool: 'FleetNames' }) fleetNames: any;
    fleetProfile$;
    orgService$;
    showFleet: boolean;
    fleets: any = [];
    selectedOrg: any;
    fleetFilter: any[] = [];
    ownsAtleastOne: boolean;
    fleetLoaded: boolean;
    constructor(private fleetService: FleetService, private router: Router, private toastMsg: ToastMessageService, private userService: UserService, private orgService: OrganisationService) {
        this.orgService$ = this.orgService.onChange().subscribe(data => {
            console.log('Changed', data);
            this.getFleet(_.map(data.fleet, 'groupId'));
        });
    }

    ngOnInit() {
        console.log('Fleets are', this.fleets);
        this.orgService.resolveOrganisation();
    }

    ngOnDestroy() {
    }

    getFleet(data) {
        if (data.length) {
            this.fleetProfile$ = this.fleetService.getFleetProfileForIds(data).subscribe(res => {
                console.log('Fleets are', res);
                this.fleetLoaded = true;
                this.fleets = _.compact(res['fleets']);
                // this.fleetNames =  _.map(this.fleets,_.partialRight(_.pick,['fleetName','fleetId','organisationId']));

            }, error => {
                this.fleetLoaded = true;
                this.toastMsg.showError('ERROR', 'ERROR_FETCHING_GROUPS_FOR_USER')
            })
        } else {
            this.fleetLoaded = true;
        }
    }

    setFleet(fleet) {
        console.log('FleetView is', fleet);
        const role = this.userService.getRole(fleet.fleetId);
        console.log('Role ', role);
        this.fleetService.setFleetId(fleet.fleetId);
        this.fleetService.setOrgId(fleet.organisationId);
        this.fleetService.setFleetRole(role);
        localStorage.setItem('fleetName', fleet.fleetName);
        this.router.navigate(['/fleet']);
    }
}
