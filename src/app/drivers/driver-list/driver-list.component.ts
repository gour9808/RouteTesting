import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IFilterPipe} from "../../utils/pipes/filter.pipe";
import {VehicleService} from "../../service/vehicle.service";

@Component({
    selector: 'cbp-driver-list',
    templateUrl: './driver-list.component.html',
    styleUrls: ['./driver-list.component.scss']
})
export class DriverListComponent implements OnInit {
    @Input() drivers: any = [];
    @Input() loadingDrivers: boolean;
    @Output() driverSelected: any = new EventEmitter<any>();
    @Input() showLog: boolean;
    @Input() showAdd: boolean;
    selectedDriver: any;
    searchTerm: IFilterPipe = {} as IFilterPipe;
    showDialog: boolean;
    totalDistance: any;

    constructor(private vehicleService: VehicleService) {
    }

    ngOnInit() {
    }

    getInfo() {
        this.driverSelected.next(this.selectedDriver)
    }

    public getDriversCount() {
        return this.drivers.length;
    }

}
