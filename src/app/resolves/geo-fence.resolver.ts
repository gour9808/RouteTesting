import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {VehicleService} from '../service/vehicle.service';

@Injectable()
export class GeoFenceResolver implements Resolve<any> {
    processList: any;

    constructor(private vehicleService: VehicleService, private router: Router, private actRoute: ActivatedRoute) {
    }

    resolve(route: ActivatedRouteSnapshot) {
        console.log('Params are', route.queryParams);
        const id = route.queryParams['fenceId'];
        const vehicleId = route.paramMap.get('vehicleID');
        console.log('Resolving', id, vehicleId);
        return this.vehicleService.getGeoFenceData(vehicleId, id).take(1).map(fence => {
            if (fence) {
                console.log('Resolved Fence Detail', fence);
                return fence;
            } else {
                // this.router.navigate(['../list'], {relativeTo: this.actRoute});
            }
        });
    }
}
