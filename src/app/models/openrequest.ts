export module OpenRequest {

    type PickupDropStatus = 'RECIEVED' | 'ASSIGNED' | 'ACCEPTED' | 'START_TRIP' | 'USER_END_TRIP' |
        'DRIVER_END_TRIP' | 'FLTMGR_END_TRIP' | 'USER_CANCELLED' | 'DRIVER_CANCELLED' | 'FLTMGR_CANCELLED' |
        'DRIVER_REJECTED' | 'FLTMNG_REJECTED' | 'AUTO_REJECT' | 'SOS' |
        'DRIVER_ABORTED' | 'USER_ABORTED' | 'FLTMNG_ABORTED' | 'TRIP_IN_PROGRESS';

    export class PickupDropRequest {
        public id: string;
        public requestorId: string;
        public carbookUserId: string;
        public requesterEmail: string;
        public requestorEmail: string;
        public contacts: string[];
        public pickupAddress: PickupAddress;
        public dropAddress: DropAddress;
        public wayPoints: wayPoints[];
        // public wayPoints: WayPoints;
        public pickupTime: any;
        public fleetId: string;
        public fieldForceId: string;
        public status: PickupDropStatus;
        public createTime: any;
        public updateTime: any;
        public vehicleId: string;
        public driverId: string;
        public updatedBy: string;
        public message: string;
        public advanceBooking: boolean;
        public cancellationReason: string;
        public startTime: any;
        public endTime: any;
        public startMileage: any;
        public endMileage: any;
        public distance: any;
        public pictureURL: string;
        public iconURL: string;

        constructor(data?: any) {
            this.pickupAddress = new PickupAddress();
            this.dropAddress = new DropAddress();
            // this.wayPoints = new WayPoints();
            this.contacts = [];
        }
    }

    export class GeoPoint {
        lon: number;
        lat: number;
        alt: number;

        constructor(data?: any) {
        }
    }

    export class PickupAddress {
        city: string;
        postcode: string;
        street: string;
        housenumber: string;
        countrycode: string;
        county: string;
        suburb: string;
        state: string;
        geopoint: GeoPoint;

        constructor(data?: any) {
            this.geopoint = new GeoPoint();
        }
    }

    export class DropAddress {
        city: string;
        postcode: string;
        street: string;
        housenumber: string;
        countrycode: string;
        county: string;
        suburb: string;
        state: string;
        geopoint: GeoPoint;

        constructor(data?: any) {
            this.geopoint = new GeoPoint();
        }
    }

    export class wayPoints {
        city: string;
        postcode: string;
        street: string;
        housenumber: string;
        countrycode: string;
        county: string;
        suburb: string;
        state: string;
        geopoint: GeoPoint;

        constructor(data?: any) {
            this.geopoint = new GeoPoint();
        }
    }


}
