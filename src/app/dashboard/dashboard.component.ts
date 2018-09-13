import {Component, OnDestroy, OnInit} from '@angular/core';
import {FleetService} from '../service/fleet.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CarbookRoles, UserService} from '../service/user.service';
import {AutoUnsubscribe} from '../utils/auto-unsubscribe';

@Component({
    selector: 'cbp-dashboard',
    template: ''
})
/**
 * Use this class for loading necessary data before showing the user interface for the user.
 * Do not get. Use fetch instead. This ensures fresh data after every login.
 * Although there could be some better way to do this, I'm in a hurry to push this to test env, so ¯\_(ツ)_/¯
 */

@AutoUnsubscribe()
export class DashboardComponent implements OnInit, OnDestroy {
    constructor(private fleetService: FleetService, private router: Router, private currentRoute: ActivatedRoute, private userService: UserService) {
    }

    ngOnInit() {
        console.log('Init Data Loader');
        this.navigate();
    }

    ngOnDestroy() {
        console.log('On Destroy called');
    }

    navigate() {
        const roles = this.userService.getRole(this.fleetService.getFleetId());
        if (roles.includes(CarbookRoles[CarbookRoles.CB_ADMIN])) {
            this.router.navigate(['admin'], {relativeTo: this.currentRoute});
        } else if (roles.includes(CarbookRoles[CarbookRoles.MANAGER])) {
            console.log('Roles are', roles);
            this.router.navigate(['/fleet/dashboard/manager']);
        } else if (roles.includes(CarbookRoles[CarbookRoles.DRIVER])) {
            console.log('Roles are', roles);
            this.router.navigate(['/fleet/dashboard/driver']);
        }
    }
}
