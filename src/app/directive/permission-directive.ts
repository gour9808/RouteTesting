import {Directive, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {CarbookRoles, GroupTypes, UserService} from "../service/user.service";
import {FleetService} from "../service/fleet.service";
import {CommunicatorService} from "../common/communicator.service";
import {AutoUnsubscribe} from "../utils/auto-unsubscribe";

@AutoUnsubscribe()
@Directive({selector: '[cbpAdminOrAgentOnly]'})
export class PermissionDirective implements OnInit {

    private comms$;

    constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef,
                private userService: UserService, private fleetService: FleetService, private comms: CommunicatorService) {
        this.comms$ = this.comms.on('fleet_update', () => {
            this.updateDOM();
        });
    }

    ngOnInit() {
        this.updateDOM();
    }

    updateDOM() {
        this.viewContainer.clear();
        if (this.isAdminOrAgent()) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }

    isAdminOrAgent() {
        return this.userService.hasRole(GroupTypes.FLEET, this.fleetService.getFleetId(), CarbookRoles.CB_ADMIN) ||
            this.userService.hasRole(GroupTypes.FLEET, this.fleetService.getFleetId(), CarbookRoles.MANAGER) ||
            this.userService.hasRole(GroupTypes.FLEET, this.fleetService.getFleetId(), CarbookRoles.FLEET_MANAGER) ||
            this.userService.hasRole(GroupTypes.FLEET, this.fleetService.getFleetId(), CarbookRoles.TEAM_MANAGER)
    }
}
