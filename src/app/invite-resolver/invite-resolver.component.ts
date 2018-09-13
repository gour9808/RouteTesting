import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AutoUnsubscribe} from "../utils/auto-unsubscribe";
import {environment} from "../../environments/environment";
import {Constants} from "../service/constants";
import {CookieService} from "../service/cookie.service";

@Component({
    selector: 'cbp-invite-resolver',
    templateUrl: './invite-resolver.component.html',
    styleUrls: ['./invite-resolver.component.scss']
})
@AutoUnsubscribe()
export class InviteResolverComponent implements OnInit, OnDestroy {
    routeSub$: any;

    constructor(private route: ActivatedRoute,
                private router: Router, private cookieService: CookieService) {
    }

    ngOnInit() {
        this.routeSub$ = this.route.queryParams.subscribe(params => {
            console.log('Params are', params['invite_code']);
            if (params['invite_code']) {
                this.cookieService.set('invite_code', params['invite_code']);
                this.doLogin(`&invite_code=${params['invite_code']}`);
            }
        })
    }

    ngOnDestroy() {

    }

    doLogin(invite_code) {
        console.log('Login for invite', invite_code);
        if (environment.production) {
            window.location.href = Constants.PROD_URL + invite_code;
        } else if (environment.test) {
            window.location.href = Constants.TEST_URL + invite_code;
        } else {
            window.location.href = Constants.DEV_URL + invite_code;
        }
    }

}
