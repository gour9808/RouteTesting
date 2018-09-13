import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../../service/user.service';
import { ToastyService } from "ng2-toasty";
import { ToastMessageService } from '../../../../service/toast-message.service';
import { countries } from "../../../../models/drop-values";
import { licenseCategoryType } from '../../../../models/licenseCategoryType';

import { FormBuilder, Validators } from '@angular/forms';
import { AutoUnsubscribe } from '../../../../utils/auto-unsubscribe';


@Component({
    selector: 'cbp-license-add',
    templateUrl: './license-add.component.html',
    styleUrls: ['./license-add.component.scss']
})


@AutoUnsubscribe()
export class LicenseAddComponent implements OnInit, OnDestroy {
    sub$;
    user$;
    updateUser$;

    driver: any;
    id: any;
    licenseInfo: any;
    countries = countries;
    locale: any;
    licenseInfoArray = [];
    firstName: string;
    lastName: string;
    licenseNumber: string = '';
    addressInfo: string;

    dob: Date;
    doi: Date;
    doe: Date;
    licenseCategoryArray = [];
    licenseCategoryValue: licenseCategoryType = new licenseCategoryType();
    placeOfBirth: string;
    issuingAuthority: string;
    form: any;
    licenseError: string;
    doiError: string = '';
    doeError: string = '';

    constructor(private route: ActivatedRoute, fb: FormBuilder, private userService: UserService, private router: Router, private toastyService: ToastyService, private toastMsg: ToastMessageService) {
        console.log("Init add license Component");
        this.form = fb.group({
            'licenseNo': [null, Validators.required],
            'doi': [null, Validators.required],
            'doe': [null, Validators.required]
        })
    }

    ngOnInit() {

        this.sub$ = this.route.parent.params.subscribe(params => {
            this.id = params['userId'];
        });
        console.log("id in add license", this.id);
        this.getDriverInfo();
    }


    ngOnDestroy() {
    }

    getDriverInfo() {
        this.user$ = this.userService.fetchUserById(this.id).subscribe(res => {
            console.log("Driver Details: ", res);
            this.driver = res;
            console.log("license Info", this.driver.userLicenseInfo);
            if (this.driver.userLicenseInfo) {
                console.log("already existing License info", this.driver.userLicenseInfo)
            }
        }, error => {
            this.toastMsg.showError("ERROR", "ERROR_FETCHING_DRIVER_INFORMATION")
        });
    }

    convertTomilli(date) {
        var c = new Date(date);
        var d = c.getTime();
        console.log("In milliseconds", d);
        return d;
    }

    mandatory() {
        var doe = this.convertTomilli(this.doe);
        var doi = this.convertTomilli(this.doi);
        if (this.licenseNumber.length == null || this.licenseNumber.length == 0)
            this.licenseError = "Enter valid License No";
        if (doi > doe) {
            this.doiError = "Enter valid date of issue";
            this.doeError = "Enter valid date of expiry"
        }

        this.addLicense()
    }

    addLicense() {
        console.log("all details with driverID", this.driver.userId, this.locale,
            this.firstName, this.lastName, this.licenseNumber, this.addressInfo, this.licenseCategoryValue, this.placeOfBirth);
        console.log("all dates", this.dob, this.doi, this.doe);
        var dob = this.convertTomilli(this.dob);
        var doi = this.convertTomilli(this.doi);
        var doe = this.convertTomilli(this.doe);
        this.licenseCategoryArray.push(this.licenseCategoryValue);

        console.log("all dates after conversion", doe, doi, dob);
        console.log("licenseCategory", this.licenseCategoryArray);
        if (this.licenseNumber.length && (doi < doe)) {
            this.doiError = "";
            this.doeError = "";
            this.driver.userLicenseInfo[this.locale] = {
                firstName: this.firstName,
                lastName: this.lastName,
                licenseNumber: this.licenseNumber,
                addressInfo: this.addressInfo,
                dateOfBirth: dob,
                placeOfBirth: this.placeOfBirth,
                issuingAuthority: this.issuingAuthority,
                dateOfIssue: doi,
                dateOfExpiry: doe,
                licenseCategory: this.licenseCategoryArray
            };

            console.log("driver for put", this.driver);
            this.updateUser$ = this.userService.updateUserInfoById(this.driver.userId, this.driver).subscribe(res => {
                console.log('updated driver with new license info details', res);
                this.toastMsg.showSuccess("SUCCESS", "LICENSE_INFORMATION_ADDED_SUCCESSFULLY");
            }),
                err => {
                    console.log("Error creating vehicle", err);
                    this.toastMsg.showError("ERROR", "ERROR_ADDING_LICENSE_INFORMATION");
                }
        }

        if (this.licenseNumber.length == null || this.licenseNumber.length == 0)
            this.licenseError = "Enter valid License No";

        if (doi > doe || isNaN(doi) || isNaN(doe)) {
            this.doiError = "Enter valid date of issue";
            this.doeError = "Enter valid date of expiry"
        }

    }
}
