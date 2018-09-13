import { AddressInfo } from './addressInfo';
import { GeoPoint } from './geopoint';

export class Organisation {
    organisationId: string;
    organisationName: string;
    organisationOwnerId: string;
    addressInfo: AddressInfo;
    fleetIdList: any[];

    constructor() {
        this.organisationName = "";
        this.organisationOwnerId = "";
        this.addressInfo = new AddressInfo();
        this.fleetIdList = [];
    }
}