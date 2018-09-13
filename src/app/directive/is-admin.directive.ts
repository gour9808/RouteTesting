import {Directive, Host, OnInit, Optional, Self} from '@angular/core';
import {CarbookRoles, GroupTypes, UserService} from 'app/service/user.service';
import {FleetService} from 'app/service/fleet.service';
import {InputFieldTextComponent} from 'app/widgets/input-field-text/input-field-text.component';
import {InputFieldAutocompleteVehiclesComponent} from '../widgets/input-field-autocomplete-vehicles/input-field-autocomplete-vehicles.component';
import {InputFieldAutocompleteAddressComponent} from '../widgets/input-field-autocomplete-address/input-field-autocomplete-address.component';
import {InputFieldCalendarComponent} from 'app/widgets/input-field-calendar/input-field-calendar.component';
import {CalenderComponent} from 'app/widgets/calender/calender.component';
import {InputFieldOptionsComponent} from '../widgets/input-field-options/input-field-options.component';
import {SwitchComponent} from 'app/widgets/switch/switch.component';
import {InputFieldNumberComponent} from 'app/widgets/input-field-number/input-field-number.component';


@Directive({
    selector: '[isAdmin]'
})
export class IsAdminDirective implements OnInit {

    constructor(private userService: UserService, private fleetService: FleetService,
                @Host() @Self() @Optional() public inputText: InputFieldTextComponent,
                @Host() @Self() @Optional() public inputFieldAutocompleteVehicles: InputFieldAutocompleteVehiclesComponent,
                @Host() @Self() @Optional() public inputFieldAutocompleteAddress: InputFieldAutocompleteAddressComponent,
                @Host() @Self() @Optional() public inputCalendar: CalenderComponent,
                @Host() @Self() @Optional() public inputSwitch: SwitchComponent,
                @Host() @Self() @Optional() public inputFieldCalendar: InputFieldCalendarComponent,
                @Host() @Self() @Optional() public inputFieldOptions: InputFieldOptionsComponent,
                @Host() @Self() @Optional() public inputFieldNumber: InputFieldNumberComponent) {
    }

    ngOnInit() {

        if (this.inputText) {
            this.inputText.disabled = !this.isAdminOrAgent();
        } else if (this.inputFieldAutocompleteVehicles) {
            this.inputFieldAutocompleteVehicles.disabled = !this.isAdminOrAgent();
        } else if (this.inputFieldAutocompleteAddress) {
            this.inputFieldAutocompleteAddress.disabled = !this.isAdminOrAgent();
        } else if (this.inputCalendar) {
            this.inputCalendar.disabled = !this.isAdminOrAgent();
        } else if (this.inputFieldCalendar) {
            this.inputFieldCalendar.disabled = !this.isAdminOrAgent();
        } else if (this.inputSwitch) {
            this.inputSwitch.disabled = !this.isAdminOrAgent();
        } else if (this.inputFieldOptions) {
            this.inputFieldOptions.disabled = !this.isAdminOrAgent();
        } else if (this.inputFieldNumber) {
            this.inputFieldOptions.disabled = !this.isAdminOrAgent();
        }
    }

    isAdminOrAgent() {
        return this.userService.hasRole(GroupTypes.FLEET, this.fleetService.getFleetId(), CarbookRoles.CB_ADMIN) ||
            this.userService.hasRole(GroupTypes.FLEET, this.fleetService.getFleetId(), CarbookRoles.MANAGER) ||
            this.userService.hasRole(GroupTypes.FLEET, this.fleetService.getFleetId(), CarbookRoles.FLEET_MANAGER) ||
            this.userService.hasRole(GroupTypes.FLEET, this.fleetService.getFleetId(), CarbookRoles.TEAM_MANAGER)
    }
}
