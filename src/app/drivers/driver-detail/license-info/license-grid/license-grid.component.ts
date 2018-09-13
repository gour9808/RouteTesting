import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../../service/user.service';
import {ToastyService} from 'ng2-toasty';
import {countries} from '../../../../models/drop-values';
import {ShareCacheService} from '../../../../utils/share-cache.service';
import {licenseInfo} from '../../../../models/licenseInfo';
import {licenseCategoryType} from '../../../../models/licenseCategoryType';
import {ImageService} from '../../../../service/image.service';
import {ToastMessageService} from '../../../../service/toast-message.service';
import {Component, Input, OnDestroy, OnInit} from '@angular/core';


import {AutoUnsubscribe} from '../../../../utils/auto-unsubscribe';
import {Utils} from "../../../../utils/utils";

@Component({
    selector: 'cbp-license-grid',
    templateUrl: './license-grid.component.html',
    styleUrls: ['./license-grid.component.scss']
})

@AutoUnsubscribe()
export class LicenseGridComponent implements OnInit, OnDestroy {
    routeSub$;
    user$;
    updateUser$;

    @Input() driver: any;
    id: any;
    licenseInfo: any;
    editLicenseInfo: licenseInfo;
    countryCode: any;
    countries = countries;
    locale: any;
    licenseInfoArray = [];
    show = false;
    dob: any;
    doi: any;
    doe: any;
    licenseCategoryArray = [];
    licenseCategoryValue: licenseCategoryType = new licenseCategoryType();
    edit = false;
    profilePic: any;
    btn = false;

    constructor(private route: ActivatedRoute, private imageService: ImageService, private userService: UserService, private router: Router,
        private toastyService: ToastyService, private shareCacheService: ShareCacheService, private toastMsg: ToastMessageService) {
        console.log('Init License grid Component');
        console.log('driverId', this.id);
    }

    ngOnInit() {
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        };
        this.routeSub$ = this.route.parent.params.subscribe(params => {
            this.id = params['userId'];
        });
        console.log('id in license grid', this.id);
        this.getDriverInfo();
    }

    ngOnDestroy() { }

    getDriverInfo() {
        this.user$ = this.userService.fetchUserById(this.id).subscribe(res => {
            console.log('Driver Details: ', res);
            this.driver = res;
            console.log('license Info', this.driver.userLicenseInfo);
            if (this.driver.userLicenseInfo) {
                this.licenseInfo = this.driver.userLicenseInfo;
                Object.keys(this.licenseInfo).forEach(value => {
                    this.licenseInfoArray.push(value);
                    this.show = true;
                });
                if (this.driver.userLicenseInfo.licenseCategory) {
                    this.licenseCategoryArray = this.driver.userLicenseInfo.licenseCategory;
                    console.log('licensInfoArray', this.licenseInfoArray);
                }

            } else {
                this.driver.userLicenseInfo = {};
                this.licenseInfo = {};
                this.show = false;
            }
        }, error => {
            this.toastMsg.showError("ERROR", "ERROR_FETCHING_DRIVER_INFORMATION")
        });
    }

    showbtn(index) {
        console.log('index', index);
        this.licenseInfoArray.forEach(item => {
            if (item === index) {
                this.btn = true;
            }
        });
        this.btn = false;
    }


    editDetails(key) {
        this.editLicenseInfo = this.licenseInfo[key];
        this.countryCode = key;
        this.updateLicense();
    }

    updateLicense() {
        console.log('to be editted and the key and license pic', this.editLicenseInfo, this.countryCode, this.profilePic, this.licenseCategoryValue);
        if (this.licenseCategoryValue && this.editLicenseInfo.licenseCategory) {
            this.editLicenseInfo.licenseCategory.push(this.licenseCategoryValue)
        } else {
            this.editLicenseInfo.licenseCategory = [];
            this.editLicenseInfo.licenseCategory.push(this.licenseCategoryValue)
        }
        this.driver.userLicenseInfo[this.countryCode] = {
            firstName: this.editLicenseInfo.firstName,
            lastName: this.editLicenseInfo.lastName,
            licenseNumber: this.editLicenseInfo.licenseNumber,
            addressInfo: this.editLicenseInfo.addressInfo,
            dateOfBirth: this.editLicenseInfo.dateOfBirth,
            placeOfBirth: this.editLicenseInfo.placeOfBirth,
            issuingAuthority: this.editLicenseInfo.issuingAuthority,
            dateOfIssue: this.editLicenseInfo.dateOfIssue,
            dateOfExpiry: this.editLicenseInfo.dateOfExpiry,
            licenseCategory: this.editLicenseInfo.licenseCategory,
            licensePictureUrl: this.profilePic
        };
        console.log('user license info', this.driver.userLicenseInfo[this.countryCode]);
        console.log('Driver before put', this.driver);
        this.updateUser$ = this.userService.updateUserInfoById(this.driver.userId, this.driver).subscribe(res => {
            console.log('updated driver with new license info details', res);
            this.toastMsg.showSuccess('SUCCESS', 'DRIVER_DETAILS_UPDATED_SUCCESSFULLY');
        }, error => {
            this.toastMsg.showError("ERROR", "ERROR_UPDATING_LICENSE_DETAILS")
        })
    }

    onFilesSelected(event) {
        this.uploadImages(event.target.files[0])
    }

    uploadImages(img) {
        const reader = new FileReader();
        reader.onloadend = () => {
            const image = this.stripMetaFromDataURL(reader.result, Utils.getExtension(img.name));
            this.upload({ filename: img.name, imagetype: 'USER', objectid: this.id, content: image });
        };
        reader.readAsDataURL(img);
    }

    upload(data) {

    }

    stripMetaFromDataURL(data, ext) {
        let base64;
        switch (ext) {
            case 'jpeg':
                base64 = data.replace('data:image/jpeg;base64,', '');
                break;
            case 'jpg':
                base64 = data.replace('data:image/jpeg;base64,', '');
                break;
            case 'png':
                base64 = data.replace('data:image/png;base64,', '');
                break;
            case 'gif':
                base64 = data.replace('data:image/gif;base64,', '');
                break;
        }
        return base64;
    }
}
