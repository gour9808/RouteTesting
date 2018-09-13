import { Component, OnDestroy, OnInit } from '@angular/core';
import { FleetService } from '../../service/fleet.service';
import { UserService } from '../../service/user.service';
import { ToastMessageService } from '../../service/toast-message.service';
import { CommunicatorService } from '../../common/communicator.service';
import { AutoUnsubscribe } from '../../utils/auto-unsubscribe';

@Component({
  selector: 'cbp-settings-org',
  templateUrl: './settings-org.component.html',
  styleUrls: ['./settings-org.component.scss']
})

@AutoUnsubscribe()
export class SettingsOrgComponent implements OnInit, OnDestroy {
  fleetOrg$;
  updateOrg$;

  showErrorForName: boolean;
  organisation: any;
  loading: boolean;
  errorMessage = 'NAME_CANNOT_BE_EMPTY';
  constructor(private fleetService: FleetService, private userService: UserService, private toastMsg: ToastMessageService, private comms: CommunicatorService) { }

  ngOnInit() {
    this.fetchOrganisationInfo();
    this.comms.broadcast('update-title', 'Settings');
  }

  ngOnDestroy() { }

  fetchOrganisationInfo() {
    this.fleetOrg$ = this.fleetService.fetchOrganisationInfo(this.fleetService.getOrgId()).subscribe(res => {
      console.log('Organisation is', res);
      this.organisation = res;
    }, err => {
      this.toastMsg.showError("ERROR", "ERROR_FETCHING_ORGANIZATION_INFORMATION");
      console.log('Error in getting Organisation Info');
      console.log(err);
    });
  }

  updateOrganisation() {
    console.log('Sending for update', this.organisation);
    this.updateOrg$ = this.fleetService.updateOrganisation(this.organisation).subscribe(res => {
      console.log('Organisation Updated');
      this.toastMsg.showSuccess("SUCCESS", "ORGANIZATION_UPDATED_SUCCEFULLY");
      this.fetchOrganisationInfo();
    }, error => {
      this.toastMsg.showError("ERROR", "ERROR_UPDATING_ORGANIZATION_INFORMATION");
    })
  }

  validateName(elem) {
    console.log(elem);
    if (elem.length < 1) {
      this.showErrorForName = true;
    } else {
      this.showErrorForName = false;
    }
  }



}
