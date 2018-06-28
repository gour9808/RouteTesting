import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Cache } from '../utils/storage.provider';
import * as _ from 'lodash';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-callback',
    template: `
        <div class="app-header" style="position:relative;width:100%;height:100%">
            <img class="logo animated zoomIn" src="assets/logo.png" style="position:absolute; margin: auto; top: 0; left: 0; right: 0; bottom: 0;"/>
        </div>`
})
export class CallbackComponent implements OnInit {
    @Cache({ pool: 'Session' }) userSession: any;

    constructor(private router: Router, private currentRoute: ActivatedRoute, private auth: AuthService) {
    }

    ngOnInit() {
        this.getCookies1();
        console.log('Access token is');
        // if (str != null && str !== undefined) {
        //     this.userSession = {
        //         token: str, expires: moment().add(1, 'days')
        //     };
        //     this.router.navigate(['/load']);
        // } else {
        //     this.router.navigate(['/auth/callback']);
        // }
    }

    getCookies1() {
        chrome.cookies.get({ url: 'https://www.google.com', name: 'SSID' }, (cookie) => {
            console.log('cookie value', cookie.value);
            this.userSession = {
                token: cookie.value, expires: moment().add(1, 'days')
            };
            if (cookie.value) {
                this.router.navigate(['/load'])
            }
            else{
                this.router.navigate(['/auth/callback'])
            }
        }
        );

    }
}
