import {Component, Input, OnInit} from '@angular/core';
import {Constants} from '../../service/constants';
import {AutoUnsubscribe} from '../../utils/auto-unsubscribe';
import {VehicleService} from '../../service/vehicle.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as _ from 'lodash';
import {ToastMessageService} from '../../service/toast-message.service';


@Component({
    selector: 'cbp-tracking-detail-item',
    templateUrl: './tracking-detail-item.component.html',
    styleUrls: ['./tracking-detail-item.component.scss']
})

@AutoUnsubscribe()
export class TrackingDetailItemComponent implements OnInit {

    @Input() vehicle: any;
    @Input() driver: any;
    userVehicle$;
    lastKnownLocation$: any;
    address: any;

    constructor(private vehicleservice: VehicleService, private router: Router,
                private toastMsg: ToastMessageService,
                private currentRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.userVehicle$ = this.vehicleservice.fetchVehicleInfo(this.vehicle.vehicleId).subscribe(res => {
            this.vehicle = _.extend(res, this.vehicle);
            console.log('Vehicle Detail is', this.vehicle);
            this.getLKLForVehicle();
        })
    }

    getVehicleLogo(make) {
        if (make != null && make !== undefined) {
            return Constants.GET_VEHICLE_LOGO(make);
        }
    }

    getLKLForVehicle() {
        this.lastKnownLocation$ = this.vehicleservice.fetchLastKnownLocation(this.vehicle.vehicleId).subscribe((res: any) => {
            if (res) {
                console.log('Last Known Location', res);
                this.address = res.resolvedAddress.housenumber;
            }
        })
    }

    openVehicleDetail(vehicle) {
        console.log('Vehicle detail', vehicle);
        this.router.navigate(['/fleet/vehicle/detail', vehicle.vehicleId], {queryParams: {type: 'fleet'}, relativeTo: this.currentRoute});
    }
}
