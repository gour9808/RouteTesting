import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { ToastyService } from 'ng2-toasty';
import { countries } from '../../../models/drop-values';
import * as _ from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressInfo } from '../../../models/addressInfo';
import { ToastMessageService } from '../../../service/toast-message.service';
import { AutoUnsubscribe } from '../../../utils/auto-unsubscribe';

@Component({
  selector: 'cbp-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})

@AutoUnsubscribe()
export class DetailsComponent implements OnInit, OnDestroy {
  sub$;
  user$;
  updateUser$;

  driver: any;
  id: any;
  gender = [];
  chosen: string;
  dob: any;
  phoneNos = [];
  phoneNo = '';
  locale: any;
  countries = countries;
  displayname = '';
  currentAddress: AddressInfo = new AddressInfo();
  constructor(private userService: UserService, private toastyService: ToastyService,
    private route: ActivatedRoute, private router: Router, private toastMsg: ToastMessageService) {

  }

  ngOnInit() {
    // console.log("id from details",this.id)
    this.sub$ = this.route.parent.params.subscribe(params => {
      this.id = params['userId'];
    });
    console.log('id from details', this.id);
    // this.gender.push({label:'MALE',value:'male'});
    // this.gender.push({label:'FEMALE',value:'female'});
    this.getDriverInfo();
  }

  ngOnDestroy() { }

  getDriverInfo() {
    this.user$ = this.userService.fetchUserById(this.id).subscribe(res => {
      console.log('Driver Details: ', res);
      if (res.gender) {
        this.chosen = res.gender;
      }
      this.driver = res;
      if (this.driver.phoneNumbers && this.driver.phoneNumbers.length === 0) {
        this.phoneNos = [];
      } else {
        this.phoneNos = this.driver.phoneNumbers;
      }

      if (_.has(res, 'gender')) {
        this.gender.push({ label: this.driver.gender, value: this.driver.gender })
      } else {
        this.gender.push({ label: 'MALE', value: 'male' });
        this.gender.push({ label: 'FEMALE', value: 'female' });
      }
      if (_.has(res, 'currentAddress')) {
        this.currentAddress = this.driver.currentAddress;
        console.log('current address', this.currentAddress);
      }

    }, error => {
      this.toastMsg.showError("ERROR", "ERROR_FETCHING_DRIVER_INFORMATION")
    });
  }

  AddPhone(e) {
    console.log('pn', e);
    this.phoneNos = e;
  }

  RemovePhone(e) {
    this.phoneNos = e;
  }

  existingPhone(e) {
    console.log(e);
    this.phoneNos = e;
  }




  updateDetails() {
    console.log('gender and phoneNo', this.chosen, this.phoneNo);
    this.driver.gender = this.chosen;
    // this.phoneNos.push(this.phoneNo);
    // this.driver.phoneNumbers = [];
    // this.driver.phoneNumbers = this.phoneNos;
    this.currentAddress.countrycode = this.locale;
    this.driver.currentAddress = this.currentAddress;
    if (this.phoneNo) {
      this.phoneNos.push(this.phoneNo);
    }
    this.driver.phoneNumbers = this.phoneNos;
    if (!this.driver.phoneNumbers) {
      this.driver.phoneNumbers = [];
    }
    console.log('Driver before put call', this.driver);
    this.updateUser$ = this.userService.updateUserInfoById(this.driver.userId, this.driver).subscribe(res => {
      console.log('updated driver with new license info details', res);
      this.toastMsg.showSuccess('SUCCESS', 'DRIVER_DETAILS_UPDATED_SUCCESSFULLY');
    }, error => {
      this.toastMsg.showError("ERROR", "ERROR_UPDATING_DRIVER_DETAILS")
    })
  }

}
