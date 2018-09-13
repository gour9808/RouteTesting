import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {VehicleService} from '../service/vehicle.service';

@Injectable()
export class VehicleCostResolver implements Resolve<any> {
    processList: any;
    vehicleId: any;
    vehicle: any;

    constructor(private vehicleService: VehicleService, private router: Router, private actRoute: ActivatedRoute) {
        this.vehicleService.getVehicle().subscribe(res => {
            console.log('Gift from parent', res);
            this.vehicleId = res.vehicleId;
            this.vehicle = res;
        }, error => {
            // this.toastMessage.showError("Error", "Error in getting vehicles")
        });
    }

    resolve(route: ActivatedRouteSnapshot) {
        const id = route.paramMap.get('costId');
        return this.vehicleService.getCostReceipt(this.vehicleId, id).take(1).map(expense => {
            if (expense) {
                console.log('Resolved Expense Detail', expense);
                // this.vehicleService.setExpense(expense);
                return expense;
            } else {
                this.router.navigate(['../detail'], {relativeTo: this.actRoute});
            }
        });
    }
}
