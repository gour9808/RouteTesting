import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class OAuthGuard implements CanActivate {

    constructor(public router: Router, private auth: AuthService) { }
    canActivate() {
        console.log('Activated Guard', this.auth.isAuthenticated());
        if (this.auth.isAuthenticated()) {
            return this.auth.isAuthenticated();
        } else {
            this.router.navigate(['/auth/callback']);
        }
    }

}
