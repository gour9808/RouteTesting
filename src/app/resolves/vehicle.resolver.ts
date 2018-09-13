import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {VehicleService} from '../service/vehicle.service';

@Injectable()
export class VehicleResolver implements Resolve<any> {
    processList: any;
    constructor(private vehicleService: VehicleService, private router: Router, private actRoute: ActivatedRoute) { }

    resolve(route: ActivatedRouteSnapshot) {
        const id = route.paramMap.get('vehicleID');
        return this.vehicleService.fetchVehicleInfo(id).take(1).map(vehicle => {
            if (vehicle) {
                console.log('Resolved Vehicle Detail', vehicle);
                this.vehicleService.setVehicle(vehicle);
                return vehicle;
            } else {
                this.router.navigate(['../vehicle'], {relativeTo: this.actRoute});
            }
        });
    }
}
