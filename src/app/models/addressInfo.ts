import { GeoPoint } from './geopoint';

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
        this.city = "";
        this.postcode = "";
        this.street = "";
        this.housenumber = "";
        this.countrycode = "";
        this.county = "";
        this.suburb = "";
        this.state = "";
        this.geopoint =  new GeoPoint();
        }
    
}

