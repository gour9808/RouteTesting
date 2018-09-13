import {GeoPoint} from './geopoint';

export module Carbook {

    enum VehicleType {
        CAR,
        VAN,
        BUS,
        MOTORBIKE,
        TRUCK,
        SUV,
        SPECIALVEHICLE
    }

    export enum OwnerType {
        INDIVIDUAL, FLEET
    }

    export enum ReminderType {
        FUEL, VEHICLEDEALER, FINANCING, GARAGE, INSURANCE, SERVICE, LEASING, TOLL, FINE, FOOD, TAX, CARWASHING, OTHERS
    }

    export const ExpensesCost = [
        "PARKING", "FUEL", "GARAGE", "INSURANCE", "TOLL", "FINE", "FOOD", "TAX", "CARWASHING", "OTHERS"
    ];

    export const vehicleTypes = [
        { label: 'Car', value: 'CAR', de: 'Auto'},
        { label: 'Van', value: 'VAN', de: 'Lieferwagen'},
        { label: 'Bus', value: 'BUS', de: 'BUS'},
        { label: 'Motorbike', value: 'MOTORBIKE', de: 'Motorrad'},
        { label: 'Truck', value: 'TRUCK', de: 'LKW'},
        { label: 'SUV', value: 'SUV', de: 'Geländewagen'},
        { label: 'Special Vehicle', value: 'SPECIALVEHICLE', de: 'Spezialfahrzeug'}
    ]

    export const fuelTypes = [
        {label: 'Petrol', value: 'PETROL', de: 'Benzin'},
        {label: 'Petrol Preminum', value: 'PETROL_PREMIUM', de: 'Superbenzin'},
        {label: 'LPG', value: 'LPG', de: 'LPG'},
        {label: 'CNG', value: 'CNG', de: 'CNG'},
        {label: 'Diesel', value: 'DIESEL', de: 'Diesel'},
        {label: 'Diesel Premium', value: 'DIESEL_PREMIUM', de: 'Premium-Diesel'}
    ]

    export enum ReminderEventType {
        REMINDER_CREATED,
        REMINDER_UPDATED,
        REMINDER_REMOVED
    }

    enum EngineType {
        PETROL,
        DIESEL,
        FLEXI_FUEL,
        ELECTRICITY,
        LPG,
        NG,
        HYDROGEN,
        PETROL_ETHANOL
    }

    export enum UnitType {
        LITER, GALLON, HRS
    }

    export const reminderType = [
        {name: 'Fuel', value: "FUEL", de: 'Kraftstoff'},
        {name: 'Insurance', value: "INSURANCE", de: 'Versicherung'},
        {name: 'Service', value: "SERVICE", de: 'Service'},
        {name: 'Leasing', value: "LEASING", de: 'Leasing'},
        {name: 'Tax', value: "TAX", de: 'Steuer'},
        {name: 'Car Washing', value: "CARWASHING", de: 'Autowäsche'},
    ]

    export const FuelType = [
        { name: 'Normal', engineType: EngineType.PETROL },
        { name: 'Super', engineType: EngineType.PETROL },
        { name: 'Super E10', engineType: EngineType.PETROL },
        { name: 'Super Premium', engineType: EngineType.PETROL },
        { name: 'Diesel', engineType: EngineType.DIESEL },
        { name: 'Diesel Premium', engineType: EngineType.DIESEL },
        { name: 'Exhaust Fluid', engineType: EngineType.DIESEL },
        { name: 'Truck Diesel', engineType: EngineType.DIESEL },
        { name: 'CNG', engineType: EngineType.NG },
        { name: 'LPG', engineType: EngineType.LPG },
        { name: 'Ethanol', engineType: EngineType.PETROL_ETHANOL },
        { name: 'Hydrogen', engineType: EngineType.HYDROGEN },
        { name: 'Electricity', engineType: EngineType.ELECTRICITY },
        { name: 'Petrol', engineType: EngineType.PETROL },
        { name: 'Petrol Premium', engineType: EngineType.PETROL }
    ];

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
        locale: string;
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

    export class Vehicle {
        timeZoneId: any;
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
        ownerType: OwnerType | string;
        addressInfo: string;
        currentDriver: string;
        bookable: boolean;

        constructor() {
            this.numberPlate = new NumberPlate();

        }
    }


    export class Reminder {
        reminderId: string;
        vehicleId: string;
        userId: string;
        ownerId: string;
        reminderType: ReminderType | string;
        dueDate: number;
        fleetId: string;
        previousDueDate: any;
        odoThreshold: number;
        vehicleMileage: number;
        vehicleMake: string;
        vehicleModel: string;
        vehicleVariant: string;
        vehicleName: string;
        vehiclePictureUrl: string;
        recurringRules: RecurringRules;
        eventType: ReminderEventType | string;

        constructor(data?: any) {
            this.recurringRules = new RecurringRules();
        }
    }

    export enum RecurrenceType {
        DAILY, MONTHLY, YEARLY, WEEKLY, QUARTERLY
    }

    export const recurrence = [
        {name: 'Daily', value: "DAILY", de: "täglich"},
        {name: 'Weekly', value: "WEEKLY", de: "wochentlich"},
        {name: 'Monthly', value: "MONTHLY", de: "monatlich"},
        {name: 'Quarterly', value: "QUARTERLY", de: "vierteljährlich"},
        {name: 'Yearly', value: "YEARLY", de: "jährlich"},

    ]

    export class RecurringRules {
        recurrence: RecurrenceType;

        constructor(data?: any) {
        }
    }

    export class Expenses {
        id: string;
        createTime: Date;
        updateTime: Date;
        userId: string;
        vehicleId: string;
        vendorId: string;
        paymentDate: Date;
        currency: string;
        receiptImage?: ReceiptImage;
        priceperunit: number;
        amount: number;
        totalprice: number;
        geopoint?: GeoPoint;
        vendorName: string;
        mileage: number;
        costType: string;
        unit: UnitType | string;
        tripId: string;
        placeId: string;
        deleted: boolean;
        category: string;
        fleetId: string;
        orgId: string;
        description: string;

        constructor(data?: any) {
            this.geopoint = new GeoPoint();
            this.receiptImage = new ReceiptImage();
        }
    }

    export class ReceiptImage {
        updatedon: Date;
        costType: string;
        quality: number;
        pictureURL: string;
        iconURL: string;

        constructor(data?: any) {
        }
    }

}

