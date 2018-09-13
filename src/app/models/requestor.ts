export module Requestor {

    class Serializable {
        fillFromJSON(json: any) {
            const jsonObj = json;
            for (const propName in jsonObj) {
                this[propName] = typeof jsonObj[propName] == 'object' ? this.fillFromJSON(jsonObj[propName]) : jsonObj[propName]
                this[propName] = jsonObj[propName]
            }
        }
    }


    export class GeoPoint {
        lon: number;
        lat: number;
        alt: number;

        constructor(data?: any) {
        }
    }

    export class AddressInfo {
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

    export class Organisation {
        organisationId: string;
        organisationName: string;
        organisationOwnerId: string;
        addressInfo: AddressInfo;
        fleetIdList: any[];

        constructor() {
            this.organisationName = '';
            this.organisationOwnerId = '';
            this.addressInfo = new AddressInfo();
            this.fleetIdList = [];
        }
    }

    export class RequestorDetails {
        id: string;
        name: string
        emailId: string
        contacts: any[];
        fleetId: string;
        organisationId: string;

        constructor() {
            this.name = '';
            this.emailId = '';
            this.fleetId = '';
            this.contacts = [];
        }
    }
}


