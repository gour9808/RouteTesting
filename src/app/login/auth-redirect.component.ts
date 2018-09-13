import {Component, OnInit} from '@angular/core';
import {environment} from '../../environments/environment';
import {Constants} from '../service/constants';

@Component({
    selector: 'cbp-callback',
    template: `
        <div class="app-header" style="position:relative;width:100%;height:100%">
            <img class="logo animated zoomIn" src="assets/logo.png" style="position:absolute; margin: auto; top: 0; left: 0; right: 0; bottom: 0;"/>
        </div>`
})
export class AuthRedirectComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
        if (environment.production) {
            window.location.href = Constants.PROD_URL;
        } else if (environment.test) {
            window.location.href = Constants.TEST_URL;
        } else {
            window.location.href = Constants.DEV_URL;
        }
    }
}
