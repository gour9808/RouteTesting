export module Vendor {

    class Serializable {
        fillFromJSON(json: any) {
            let jsonObj = json;
            for (const propName in jsonObj) {
                this[propName] = typeof jsonObj[propName] === 'object' ? this.fillFromJSON(jsonObj[propName]) : jsonObj[propName];
                this[propName] = jsonObj[propName];
            }
        }
    }

    enum WeekDay {
        MONDAY, TUESDAY, WEDNESDAY,
        THURSDAY,
        FRIDAY,
        SATURDAY,
        SUNDAY
    }

    enum CostType {
        PARKING,
        FUEL, VEHICLEDEALER, FINANCING, GARAGE, INSURANCE, LEASING
    }

    export class MediaHandles {
        FACEBOOK: string;
        TWITTER: string;
        LINKEDIN: string;
        WEBSITE: string;
        constructor(data?: any) {
        }
    }

    export class TimePeriod {
        startTime: any;
        endTime: any;
        constructor(data?: any) {
            this.startTime = new Date();
            this.endTime = new Date();
        }
    }

    export class OpenTime {
        openingTime: TimePeriod;
        daysOfWeek: string;
        holiday: boolean;
        constructor() {
            this.openingTime = new TimePeriod();
        }
    }

    export class AddressInfo {
        city: String;
        postcode: number;
        street: string;
        housenumber: String;
        countrycode: String;
        county: String;
        suburb: String;
        state: String;
        geopoint: Geopoint;
        constructor() {
            this.geopoint = new Geopoint();
        }
    }
    export class Geopoint {
        lon: number;
        lat: number;
        alt: number;
        constructor(data?: any) {

        }
    }

    export class makeModelVariant {
        make: string;
        model: String;
        variant: String;
        constructor(data?: any) {
        }
    }

    export class Image {
        content: String;
        filename: String;
        imagetype: String;
        objectid: String;
        file: null;
        constructor(data?: any) { }
    }


    export class VendorDetail {
        id: string;
        name: string;
        make: string;
        model: string;
        vendortype: string;
        description: string;
        openTimes: OpenTime[];
        phoneNumber: string;
        phoneNumbers: string[];
        variant: string;
        email: string;
        emails: string[];
        photoUrlGallery: any[];
        logoUrl: string;
        address: AddressInfo;
        listOfBrands: string[];
        makemodelvariant: makeModelVariant[];
        servicesOffered: string[];
        vendorStatus: string;
        sales: boolean;
        service: boolean;
        mediaHandles: MediaHandles;
        serviceTemplates: any;
        constructor() {
            this.address = new AddressInfo();
            this.photoUrlGallery = [];
            this.servicesOffered = [];
            this.emails = [];
            this.phoneNumbers = [];
            this.makemodelvariant = [];
            this.listOfBrands = [];
            this.mediaHandles = new MediaHandles();
            this.openTimes = new Array<OpenTime>(7).fill(new OpenTime());
            this.setWeeks();
        }

        public setWeeks() {
            this.openTimes[0].daysOfWeek = 'MONDAY';
            this.openTimes[1].daysOfWeek = 'TUESDAY';
            this.openTimes[2].daysOfWeek = 'WEDNESDAY';
            this.openTimes[3].daysOfWeek = 'THURSDAY';
            this.openTimes[4].daysOfWeek = 'FRIDAY';
            this.openTimes[5].daysOfWeek = 'SATURDAY';
            this.openTimes[6].daysOfWeek = 'SUNDAY';
        }
    }

}




