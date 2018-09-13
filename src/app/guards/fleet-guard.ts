import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../service/auth.service'
@Injectable()
export class FleetGuard implements CanActivate {

    constructor(public router: Router, private auth: AuthService) { }
    canActivate() {
        if (localStorage.getItem('orgId') != null && localStorage.getItem('orgId') != undefined) {
            return true;
        } else {
            return false;
        }
    }
}
