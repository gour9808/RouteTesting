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
    @Cache({ pool: 'LogUserId' }) logUserId: any;
    currentUrl: any;


    constructor(private router: Router, private currentRoute: ActivatedRoute, private auth: AuthService) {
        this.getCurrentTabUrl();
    }

    ngOnInit() {
       
    }

    getCookies() {
        let url = localStorage.getItem("URL")
        chrome.cookies.get({ url: url, name: 'sid' }, (cookie) => {
            console.log('cookie value', cookie.value);
            if (cookie.value) {
                this.userSession = {
                    token: cookie.value, expires: moment().add(1, 'days')
                };

                console.log("get Cookies", this.userSession);
                this.router.navigate(['/load'])
            }
            else {
                this.router.navigate(['/auth/callback'])
            }
        });
    }

    getCurrentTabUrl() {
        chrome.tabs.query({ currentWindow: true, active: true }, function (tab) {
            console.log("tab is", tab);
            let path = new URL(tab[0].url).host;
            path = "https://" + path;
            localStorage.setItem("URL", path)
            this.currentUrl = path;
            console.log("url is", path);
        });
    }

    getLogUserId() {
        let url = localStorage.getItem("URL")
        chrome.cookies.get({ url: url, name: 'disco' }, (logUserId) => {
            console.log('log userid value value', logUserId.value);
            let str = logUserId.value;
            let a = str.split(':')[2];
            console.log("value of a ", a);
            this.logUserId = {
                userId: a
            }

        });
    }

}