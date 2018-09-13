export class DriverSearchObject {
    currentEMail: string;
    displayname: string;
    userId: string;
    assignedVehicle: any;
    handshakePending: boolean;
}

export module Driver {

    export enum Event {
        VEHICLECREATE_UPDATE, VEHICLEDELETE, VEHICLEOWNERCHANGE, VEHICLEADDDRIVER, VEHICLEREMOVEDRIVER, VEHICLEADDPHOTO, VEHICLETRIPUPDATE,
        VEHICLEDEALERUPDATE, VEHICLEADDTOFLEETVIEW, VEHICLEDELETEFLEETVIEW, VEHICLETRACKINGSETTINGSVIEW
    }

    export enum RemoveReason {
        NOWORKER, OWNVEHICLE, VEHICLEDELETE, OTHERS, UNKNOWNDRIVER
    }

    export enum RemoveType {
        DRIVER_REMOVED_HIMSELF, OWNER_REMOVED_DRIVER
    }

    export class RemoveDriver {
        id: string;
        createTime: string;
        editorId: string;
        vehicleId: string;
        event: Event | string;
        driverId: string;
        driverName: string;
        driverEmail: string;
        editorName: string;
        editorEmail: string;
        ownerId: string;
        ownerName: string;
        ownerEmail: string;
        vehicleMake: string;
        vehicleModel: string;
        vehicleVariant: string;
        removeReason: RemoveReason | string;
        removeType: RemoveType | string;
        fleetId: string;
    }
}
