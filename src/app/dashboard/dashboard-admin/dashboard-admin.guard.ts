import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {CarbookRoles, GroupTypes, UserService} from "../../service/user.service";
import {FleetService} from "../../service/fleet.service";

@Injectable()
export class DashboardAdminGuard implements CanActivate {
    processList: any;

    constructor(private userService: UserService, private fleetService: FleetService, private router: Router, private actRoute: ActivatedRoute) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const allowed = this.userService.hasRole(GroupTypes.FLEET, this.fleetService.getFleetId(), CarbookRoles.CB_ADMIN);
        if (!allowed) {
            this.router.navigate(['/access-denied']);
        }
        return this.userService.hasRole(GroupTypes.FLEET, this.fleetService.getFleetId(), CarbookRoles.CB_ADMIN);
    }
}
