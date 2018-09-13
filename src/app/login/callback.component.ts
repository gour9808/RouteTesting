import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../service/auth.service';
import * as moment from 'moment';
import {Cache} from '../utils/storage.provider';
import * as _ from 'lodash';

@Component({
    selector: 'cbp-callback',
    template: `
        <div class="app-header" style="position:relative;width:100%;height:100%">
            <img class="logo animated zoomIn" src="assets/logo.png" style="position:absolute; margin: auto; top: 0; left: 0; right: 0; bottom: 0;"/>
        </div>`
})
export class CallbackComponent implements OnInit {
    @Cache({pool: 'Session'}) userSession: any;

    constructor(private router: Router, private currentRoute: ActivatedRoute, private auth: AuthService) {
    }

    ngOnInit() {
        const str = this.getHashParameter(location.hash).access_token;
        console.log('Access token is', str);
        if (str != null && str !== undefined) {
            this.userSession = {
                token: str, expires: moment().add(1, 'days')
            };
            this.router.navigate(['/load']);
        } else {
            this.router.navigate(['/auth']);
        }
    }

    getHashParameter(string): any {
        if (string) {
            const vars = string.substring(1).split('&');
            let key = {};
            _.forEach(vars, str => {
                const keys = str.split('=');
                key[keys[0]] = keys[1];
            });
            return key;
        }
        return null;
    }
}
