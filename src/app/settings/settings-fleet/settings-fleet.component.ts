import { FleetService } from '../../service/fleet.service';
import { ToastMessageService } from '../../service/toast-message.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AutoUnsubscribe } from '../../utils/auto-unsubscribe';

@Component({
  selector: 'cbp-settings-fleet',
  templateUrl: './settings-fleet.component.html',
  styleUrls: ['./settings-fleet.component.scss']
})

@AutoUnsubscribe()
export class SettingsFleetComponent implements OnInit, OnDestroy {
  fleets$;
  fleetView$;
  updateFleet$;

  showErrorForName: boolean;
  fleet: any;
  loaded: boolean;
  errorMessage = 'NAME_CANNOT_BE_EMPTY';

  constructor(private fleetService: FleetService, private toastMessage: ToastMessageService) {
  }

  ngOnInit() {
    this.getFleetInfo();
  }

  ngOnDestroy() { }

  getFleetInfo() {
    this.fleets$ = this.fleetService.fetchFleet(this.fleetService.getFleetId()).subscribe(res => {
      console.log('FleetView is', res);
      this.fleet = res;
      this.fetchFleetView();
    }, error => {
      this.toastMessage.showError('ERROR', 'ERROR_FETCHING_FLEET')
    });
  }

  fetchFleetView() {
    this.fleetView$ = this.fleetService.fetchFleetView(this.fleet.fleetId).subscribe(res => {
      console.log('FleetView view is', res);
      this.loaded = true;
    }, err => {
      this.toastMessage.showError("ERROR", "ERROR_FETCHING_FLEET_VIEW");
      console.log('Error in getting FleetView View');
      console.log(err);
      this.loaded = true;
    });
  }

  updateFleetInfo() {
    console.log('Updating', this.fleet);
    this.loaded = false;
    this.updateFleet$ = this.fleetService.updateFleet(this.fleet).subscribe(res => {
      console.log('FleetView Updated', res);
      this.toastMessage.showSuccess("SUCCESS", "FLEET_UPDATED_SUCCESSFULLY");
      this.getFleetInfo();
    }, error => {
      this.toastMessage.showError('ERROR', 'ERROR_UPDATING_FLEET')
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
