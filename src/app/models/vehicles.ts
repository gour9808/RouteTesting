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
}

export class NumberPlate {
    strLicense: string;
    locale: Locale;

    constructor() {
        this.locale = new Locale();
    }
}

export class LastKnownPosition {
    lon: number;
    lat: number;
    alt: number;
}

export class DealerInfo {
    dealerID: string;
    visitedOn: Date;
    upcomingVisit: Date;
}

export class BluetoothIdList {
    additionalProp1: string;
    additionalProp2: string;
    additionalProp3: string;
}

export class BeconEntity {
    major: string;
    minor: string;
    beaconName: string;
    beaconUUID: string;
}

export class IVehicle {
    vehicleId: string;
    name: string;
    createTime: Date;
    lastUpdateTime: Date;
    averageConsumption: number;
    vin: string;
    fuelType: string;
    iconGallery: string[];
    pictureGallery: string[];
    numberPlate: NumberPlate;
    make: string;
    model: string;
    variant: string;
    profileIconUrl: string;
    profilePictureUrl: string;
    vehicleType: string;
    yearOfConstruction: number;
    listPrice: number;
    purchaseprice: number;
    purchasetime: Date;
    vendorId: string;
    numberOfBillsCollected: number;
    driverList: string[];
    ownerId: string;
    companyId: string;
    vehicleUsage: string;
    mileage: number;
    mileageBusiness: number;
    lastKnownPosition: LastKnownPosition;
    numberOfTrips: number;
    startOdo: number;
    deleteReason: string;
    effectiveMileage: number;
    effectiveDate: Date;
    mileagePrivate: number;
    dealerInfo: DealerInfo[];
    fleetId: string;
    deviceId: string;
    trackingMode: string;
    bluetoothIdList: BluetoothIdList;
    beconEntity: BeconEntity[];
    accuracyLevel: string;
    orgId: string;
    transferStatus: string;
    ownerName: string;
    chassisNo: string;
    engineNo: string;
    registraionImages: string[];
    regDate: Date;
    validUpto: Date;
    addressInfo: string;
    currentDriver: string;
    bookable: boolean;

    init() {

    }
}

export const Vehicle = IVehicle;
export type Vehicle = IVehicle;
