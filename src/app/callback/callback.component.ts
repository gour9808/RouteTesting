import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    @Cache({ pool: 'instance' }) instanceUrl: any;



    constructor(private router: Router, private currentRoute: ActivatedRoute, private auth: AuthService) {

    }

    ngOnInit() {
        this.getHostName();

    }




    getHostName() {

        chrome.cookies.getAll({ domain: "salesforce.com", name: "sid_Client" }, (value) => {
            console.log(value);
            for (var idx = 0; idx < value.length; idx++) {
                var replacementNodeName = this.hostName(value[idx].domain);
                console.log('Visualforce / lightning - Salesforce URL Match ', replacementNodeName);
                console.log("instance url ", value[idx].domain);
                this.instanceUrl = {
                    currentURL: "https://" + value[idx].domain
                }

                chrome.cookies.get({ url: this.instanceUrl.currentURL, name: 'disco' }, (logUserId) => {
                    let str = logUserId.value;
                    let a = str.split(':')[2];
                    console.log("value of a ", a);
                    this.logUserId = {
                      userId: a
                    }
              
                  });
                chrome.cookies.get({
                    "url": 'https://' + value[idx].domain,
                    "name": "sid"
                }, (cookie) => {
                    console.log('cookie value', cookie.value);
                    if (cookie.value) {
                        this.userSession = {
                            token: cookie.value
                        };
                        console.log("get Cookies", this.userSession);
                        this.router.navigate(['/home'])
                    }
                    else {
                        this.router.navigate(['/auth/callback'])
                    }
                })


            }
        })
    }

    hostName(name) {
        return name.substring(0, name.indexOf('.salesforce.com'));
    }







}