import {Component, OnInit} from '@angular/core';
import {AuthService} from '../service/auth.service'
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {OnDestroy} from '@angular/core/src/metadata/lifecycle_hooks';
import {Constants} from "../service/constants";
import {AutoUnsubscribe} from '../utils/auto-unsubscribe';

@Component({
    selector: 'cbp-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

@AutoUnsubscribe()
export class LoginComponent implements OnInit, OnDestroy {

    sub$;
    redirect: boolean;

    constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) {
        console.log('Init LoginComponent');
    }

    ngOnInit() {
        localStorage.clear();
        this.sub$ = this.route
            .queryParams
            .subscribe(params => {
                // Defaults to 0 if no query param provided.
                console.log(params['redirect']);
                this.redirect = params['redirect'];
                if (params['redirect']) {
                    this.doLogin();
                }
            });
    }

    ngOnDestroy() {
    }

    doLogin() {
        console.log('Login here');
        if (environment.production) {
            window.location.href = Constants.PROD_URL + '&viewtype=login';
        } else if (environment.test) {
            window.location.href = Constants.TEST_URL + '&viewtype=login';
        } else {
            window.location.href = Constants.DEV_URL + '&viewtype=login';
        }
    }

    doRegister() {
        console.log('Register here');
        if (environment.production) {
            window.location.href = Constants.PROD_URL + '&viewtype=register';
        } else if (environment.test) {
            window.location.href = Constants.TEST_URL + '&viewtype=register';
        } else {
            window.location.href = Constants.DEV_URL + '&viewtype=register';
        }
    }

    // doLogin(){
    //   window.location.href = this.prod_local_url;
    // }


}
