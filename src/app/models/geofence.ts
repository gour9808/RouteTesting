export module GeoFence {

    export enum GeofenceType {
        GEOMETRY_COLLECTION, LINE_STRING, MULTI_LINE_STRING, MULTI_POINT, MULTI_POLYGON, POINT, POLYGON
    }

    export enum GeofenceTrackerType {
        GEO_FENCE, TIME_ELAPSED, DATE_TIME, FUEL_LEVEL, FAVOURITE, NEW_CUSTOMER, NEW_CB_USER, NEW_CB_VEHICLE
    }

    export enum TrackingStatus {
        ENTER, EXIT, BOTH
    }

    export enum OperationType {
        CREATE, UPDATE, DELETE
    }

    export enum Recurrence {
        DAILY, MONTHLY, HALFYEARLY, YEARLY, QUARTERLY, WEEKLY
    }

    export class Point {
        lon: number;
        lat: number;
        alt?: number;
    }

    export class Threshold {
        startTime: number;
        endTime: number;
    }

    export class Geofence {
        gid: string;
        points: Point[];
        geofenceType: GeofenceType | string;
        radius: number;
        geofenceName: string;
        persist = true;
        active = true;
        fenceExpiryTime: number;
        fenceActivationTime: number;
        onTimeThreshold: Threshold;
        activeTimeThreshold: Threshold;
        recurrence: Recurrence | string;
        timezoneId: string;

        constructor() {
            this.points = [];
            this.onTimeThreshold = new Threshold();
            this.activeTimeThreshold = new Threshold();
            this.recurrence = Recurrence[Recurrence.DAILY];
        }
    }

    export class GeofenceTracker {
        id: string;
        type: GeofenceTrackerType | string;
        createTime: Date;
        updateTime: Date;
        tracking_status: TrackingStatus | string;
        vehicle: string;
        fleetId: string;
        geofence: Geofence;
        operationType: OperationType | string;

        constructor() {
            this.geofence = new Geofence();
            this.type = GeofenceTrackerType[GeofenceTrackerType.GEO_FENCE];
            this.tracking_status = TrackingStatus[TrackingStatus.ENTER];
        }
    }

}

