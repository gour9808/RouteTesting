import {FleetVehicleView} from './fleet.vehicleview';

export class Geopoint {
    lon: number;
    lat: number;
    alt: number;

    constructor(data?: any) {

    }
}

export class Locale {
    language: string;
    script: string;
    country: string;
    variant: string;
    extensionKeys: string[];
    unicodeLocaleAttributes: string[];
    unicodeLocaleKeys: string[];
    iso3Language: string;
    iso3Country: string;
    displayLanguage: string;
    displayScript: string;
    displayCountry: string;
    displayVariant: string;
    displayName: string;

    constructor() {
        this.language = '';
        this.script = '';
        this.country = '';
        this.variant = '';
        this.extensionKeys = [''];
        this.unicodeLocaleAttributes = [''];
        this.unicodeLocaleKeys = [''];
        this.iso3Language = '';
        this.iso3Country = '';
        this.displayLanguage = '';
        this.displayScript = '';
        this.displayCountry = '';
        this.displayVariant = '';
        this.displayName = '';
    }
}

export class Address {
    city: string;
    postcode: string;
    street: string;
    housenumber: string;
    countrycode: string;
    county: string;
    suburb: string;
    state: string;
    geopoint: Geopoint;

    constructor() {
        this.geopoint = new Geopoint();
    }
}

export class Fleet {
    _id: string;
    fleetId: string;
    organisationId: string;
    fleetName: string;
    organisationName: string;
    managerIdList: string[];
    vehicleView: FleetVehicleView[];
    vehicleIdList: string[];
    fleetType: string;
    fieldForceId: string;
    description: string;
    pictureUrl: string;
    address: Address;
    locale: string;
    timeZoneId: string;

    constructor() {
        this.organisationId = '';
        this.fleetName = '';
        this.managerIdList = [];
        this.vehicleView = [];
        this.vehicleIdList = [];
        this.address = new Address();
    }
}
