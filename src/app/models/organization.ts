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

    constructor() {
        this.city = '';
        this.postcode = '';
        this.street = '';
        this.housenumber = '';
        this.countrycode = '';
        this.county = '';
        this.suburb = '';
        this.state = '';
        this.geopoint = new GeoPoint();
    }
}

export class GeoPoint {
    lon: number;
    lat: number;
    alt: number;

    constructor(data?: any) {
    }
}

export class OrganizationDetails {

    organisationId: string;
    organisationName: string;
    organisationOwnerId: string;
    addressInfo: AddressInfo;
    fleetIdList: string[];
    vendorIdList: string[];
    createTime: Date;
    updateTime: Date;
    description: string;
    phones: string[];
    emails: string[];
    pictureUrl: string;

    constructor(data?: any) {
        this.addressInfo = new AddressInfo();
    }
}

export const Organisation = OrganizationDetails;






