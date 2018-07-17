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
    @Cache({ pool: 'url' }) url: any;

    constructor(private router: Router, private currentRoute: ActivatedRoute, private auth: AuthService) {
        this.getCurrentTabUrl();
    }

    ngOnInit() {
        this.getCookies1();
        console.log('Access token is', this.userSession);
    }

    getCookies1() {
        chrome.cookies.get({ url: 'https://ap5.lightning.force.com/lightning/setup/SetupOneHome/home', name: 'sid_Client' }, (cookie) => {
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
        }
        );
    }

    getCurrentTabUrl() {
        chrome.tabs.query({ currentWindow: true, active: true }, function (tab) {
            let path = new URL(tab[0].url).host;
            console.log("https://" + path);
            path = "https://" + path;
            this.url = path;

        });
    }

    getData()
    {
        "https://ap5.salesforce.com/services/data/v35.0/tooling/query/?q=SELECT id, Application, Operation, Status, DurationMilliseconds, LogLength, StartTime, LogUser.Name from ApexLog where  LogUserId = '0057F0000045LeNQAU'  ORDER BY StartTime DESC LIMIT 20"
    }
}
