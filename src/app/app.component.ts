import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {environment} from '../environments/environment.test';
import {MapLoaderService} from './service/map-loader.service';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {UserService} from './service/user.service';
import {Cache} from './utils/storage.provider';

@Component({
    selector: 'cbp-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    showLoader: any;
    title = 'cbp works!';
    showDialog: boolean;
    country: any;

    @Cache() userLocale: any;

    constructor(private cdRef: ChangeDetectorRef, private router: Router, private translateService: TranslateService, private userService: UserService) {
        console.log('CarbookPlus FleetView Management', environment.version);
        this.translateService.setDefaultLang('lang-en'); // set English as default
        MapLoaderService.load();
        this.getCountryCode();
    }

    getCountryCode() {
        this.userService.getCountry().subscribe(res => {
            console.log('User country is', res);
            this.userLocale = res;
            this.country = res['country_code'];
            localStorage.setItem('countryCode', this.country);
            this.userService.setLocale(res);
        });
    }


    checkRouterEvent(routerEvent): void {
        if (routerEvent instanceof NavigationStart) {
            setTimeout(() => {
                this.showDialog = true;
            })
        }
        if (routerEvent instanceof NavigationEnd ||
            routerEvent instanceof NavigationCancel ||
            routerEvent instanceof NavigationError) {
            setTimeout(() => {
                this.showDialog = false;
            })
        }
    }


    ngOnInit() {
        this.router.events.subscribe(routerEvent => {
            this.checkRouterEvent(routerEvent);
        });
    }
}
