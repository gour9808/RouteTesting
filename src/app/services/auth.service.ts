import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {Router} from '@angular/router';
import {Cache} from '../utils/storage.provider';

@Injectable()
export class AuthService {
    @Cache({ pool: 'Session' }) userSession: any;

    constructor(private router: Router) {
    }

    public createSession(data) {
        this.userSession.token = data;
    }

    public isAuthenticated() {
        if (this.userSession && this.userSession.token) {
            return true;
        }
        return false;
    }
    public getToken() {
        return this.userSession.token ? this.userSession.token : false;
    }
}
/**
 * Authentication strategy
 * Store token and time when received.
 *
 */
