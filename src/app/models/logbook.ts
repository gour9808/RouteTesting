export class logbook {
    id: string;
    vehicleId: string;
    logbookId: string;
    date: Date;
    sDate: string;
    fleetId: string;
    orgId: string;
    driverId: string;
    privateTrips: number;
    businessTrips: number;
    gaps: number;
    overlaps: number;
    checkpoints: number;
    deletedTrips: number;
    unreviewedTrips: number;
    privateKM: number;
    businessKM: number;
    privateDrivenTime: number;
    businessDrivenTime: number;
    errors: number;
    warnings: number;
    createTime: Date;
    updateTime: Date;
    driverName:string;
    vehicleName:string;

    constructor() {

    }
}