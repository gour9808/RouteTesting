import {FleetVehicleView} from './fleet.vehicleview';

export class Fleet {
    fleetId: string;
    organisationId: string;
    fleetName: string;
    managerIdList: string[];
    vehicleView: FleetVehicleView[];
    vehicleIdList: string[];

    constructor() {
        this.organisationId = "";
        this.fleetName = "";
        this.managerIdList = [];
        this.vehicleView = [];
        this.vehicleIdList = [];
    }
}

export const FleetView = Fleet;
