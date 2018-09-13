import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {OpenrequestService} from '../service/openrequest.service';

@Injectable()
export class OpenRequestResolver implements Resolve<any> {
    processList: any;
    constructor(private openRequest: OpenrequestService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.openRequest.getRequest('302d1185-5468-4f8c-b734-cd1e177ac15b');
    }
}
