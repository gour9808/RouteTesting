import { Injectable } from '@angular/core';
import { Constants } from './constants';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ShareCacheService } from "../utils/share-cache.service";


const fleetViewMockData = {
    "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02",
    "organisationId": "9704ff99-1336-4931-807f-7b61c6ebd2a0",
    "fleetName": "gourav",
    "driverIdList": [
        "a53cb2c1-63e0-4e44-bed0-a63ff48f1865",
        "84813efe-55f5-47ee-8981-ac47590c3665",
        "c7ec8c17-8a09-4689-b428-4325eec9f328",
        "204b1161-ef19-457a-8997-217bd8ea39ef"
    ],
    "managerIdList": [
        "84813efe-55f5-47ee-8981-ac47590c3665"
    ],
    "vehicleView": [
        {
            "vehicleId": "38c76bda-a5ef-4308-9302-64d12fa343d0",
            "ownerId": "6f201db9-d76f-495b-9e67-cec43deb0d50",
            "name": "UT vehicle",
            "numberPlate": {
                "strLicense": "UT 12 0045",
                "locale": "en_IN"
            },
            "make": "Ferrari",
            "model": "458",
            "variant": "Speciale",
            "responseType": "PENDING",
            "vehicleRejected": false,
            "freeStatus": true
        }
    ],
    "userProfile": [
        {
            "userId": "548e8d50-e962-4f9b-bf17-4fe738cb4c25",
            "carbookIdentifier": "https://apis.carbookplus/com/userprofile/548e8d50-e962-4f9b-bf17-4fe738cb4c25",
            "createTime": "2018-03-09T12:32:33.229",
            "currentEMail": "fleet1235@mailinator.com",
            "firstname": "Mohammedali",
            "displayname": "Mohammedali H",
            "fcmIds": [
                "c8ZwvtAgb28:APA91bGTF6Yg1-tMyKt0RmIzUgCDOxxdKpN2fDK6WJqGsOiU-QBbxL1sVw2sTocEcA4o3ugs2Yp6YcEgVlzwcpSTi89mRLpAgoZoghlmY-IcNi1sWiVxYA_yMsOIwWgVHGBC4XMTW_rq"
            ]
        },
        {
            "userId": "c7ec8c17-8a09-4689-b428-4325eec9f328",
            "carbookIdentifier": "https://apis.carbookplus/com/userprofile/c7ec8c17-8a09-4689-b428-4325eec9f328",
            "createTime": "2018-03-07T12:50:05.367",
            "currentEMail": "driver18@mailinator.com",
            "firstname": "Driver",
            "displayname": "Driver 18"
        }
    ],
    "fleetDriverList": {
        "62a0a5cf-17ac-4220-bf3d-4e3df09ba0bf": "ACTIVE",
        "73c8d168-0bd8-490c-b1d7-c40fb7e69a4f": "REMOVED",
        "ab322224-4095-4e41-9983-61dc70a8f861": "INACTIVE",
        "8421aac4-516c-4853-ae95-e3d08bacecaa": "ACTIVE",
        "ff374aa1-a502-4dca-bfaf-d77eca8f0fcf": "ACTIVE",
        "01de2025-3cec-4213-943f-55d60e24fc00": "REMOVED",
        "efd0eced-3f4e-4bb5-95a4-4df805380cba": "REMOVED",
        "e7ac552f-cd54-4af2-b0b5-c5b014cc1db2": "ACTIVE",
        "00270646-1f06-467b-944d-92f347a8b441": "ACTIVE"
    },
    "locale": "en_IN",
    "timeZoneId": "Asia/Calcutta"
}

const fleetProfileIds = {
    "fleets": [
        {
            "fleetId": "93864245-5898-4268-b442-20e87b4ba0ee",
            "organisationId": "dd51dabb-1477-4674-8529-ae33a11a238a",
            "fleetName": "Gotham ",
            "managerIdList": [],
            "vehicleView": [],
            "fleetType": "FLEET_BASIC",
            "fieldForceId": "f781a098-3582-49da-bbd9-24fb8f189ce0",
            "address": {
                "city": "",
                "postcode": "",
                "street": "",
                "housenumber": "",
                "countrycode": "IN",
                "county": "India",
                "suburb": "",
                "state": ""
            },
            "createTime": "2018-03-26T05:50:11.000",
            "updateTime": "2018-03-26T05:50:11.000",
            "driverList": {},
            "locale": "en_US",
            "timeZoneId": "Asia/Calcutta"
        },
        {
            "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02",
            "organisationId": "9704ff99-1336-4931-807f-7b61c6ebd2a0",
            "fleetName": "gourav",
            "vehicleIdList": [
                "44b1effb-265f-44dd-9f22-8f49c4abc9c6",
                "78f277b3-6fd6-4478-b5e6-76154c551547",
                "0659897f-9fc1-4c26-86e8-a121551bc3d5",
                "51377997-152e-45a2-95e2-f6b246f6c75f",
                "7727852a-264e-4916-9d86-421a919352f4",
                "edd8b86b-0d8f-4176-a6be-40d20bc06934",
                "9168885a-8fde-4083-abad-7afcce80e7af",
                "0eb90085-8e02-40ef-b453-a05127277a54",
                "86ff6338-c7e1-4f9a-b7c3-02de3d50bde6",
                "be8a8175-6483-44db-877c-1a3e0dec3c54",
                "5949bb93-3006-4c84-b246-a41fdc364ca6",
                "32e6de41-3eb3-4f48-a745-718bd9a9f7db",
                "09107dac-dff3-4e17-8ec9-a7270ffe24f0",
                "a83591c6-bb95-492f-9433-52c1b1d6332a",
                "2e220bcd-1763-4847-913d-d8fc78b0839b",
                "fa580b18-d1a8-4827-9234-238311a4cce8",
                "be828875-78b5-45c9-9bff-023e87da5522",
                "f176abac-01d7-44c8-8072-afa0921889f0",
                "20964711-f656-4263-a3c4-f3b7b13dc82e",
                "b5e00a3c-b3a6-4d16-b417-a6ea1d1a67b2",
                "6c16e201-ebc8-4dfd-9dcd-33462b86ce98",
                "3a3da8b7-ae1d-4a30-bba0-c89bfd72c0e3",
                "1eeae74b-b263-4dcf-b1b2-afeb3a23098b",
                "e54aee71-df0a-4761-a8d6-59928f4824ae",
                "38c76bda-a5ef-4308-9302-64d12fa343d0",
                "b6d6d56f-134f-450a-b243-de72c7d7513c",
                "0065a821-f798-4a75-bceb-a6bdd93fc47a",
                "72c8bcd6-b047-4e23-9031-320d8affa21f",
                "c7fd2bc5-10df-4410-82c5-530e110b9789",
                "1e2a6ba4-e918-46bb-bb36-58a86676f99a",
                "4d6644c5-fc6c-4bed-bc03-6c2eff474358",
                "633999df-3db3-43c2-beb9-94f505d1a917",
                "8ae82bc0-9149-4109-8f8f-4ffd658eb9cb",
                "4e834ea3-a86b-4839-bdf1-0b9235aeeb1e",
                "d67db439-df1c-427a-ae2a-25044a096a9c",
                "0f20f589-3b11-4ea1-a033-571af14eb0aa",
                "63a72c52-4bf3-4460-a84f-519fa07eea99"
            ],
            "managerIdList": [
                "84813efe-55f5-47ee-8981-ac47590c3665"
            ],
            "vehicleView": [
                {
                    "vehicleId": "44b1effb-265f-44dd-9f22-8f49c4abc9c6",
                    "ownerId": "84813efe-55f5-47ee-8981-ac47590c3665",
                    "name": "Beggar's Car NeW",
                    "numberPlate": {
                        "strLicense": "KA 05 JV 3173",
                        "locale": "en_IN"
                    },
                    "make": "Maruti-Suzuki",
                    "model": "Alto 800 VXI (AIRBAG)",
                    "variant": "",
                    "responseType": "ACCEPTED",
                    "vehicleRejected": false,
                    "freeStatus": false,
                    "currentDriver": "e7ac552f-cd54-4af2-b0b5-c5b014cc1db2",
                    "driverList": [
                        "4b7bf08e-a4aa-4da0-ba30-ad0020e80418",
                        "84813efe-55f5-47ee-8981-ac47590c3665",
                        "73c8d168-0bd8-490c-b1d7-c40fb7e69a4f",
                        "01de2025-3cec-4213-943f-55d60e24fc00",
                        "e7ac552f-cd54-4af2-b0b5-c5b014cc1db2",
                        "ab322224-4095-4e41-9983-61dc70a8f861",
                        "711f9905-4b94-49df-9cca-e4f22ade2b28",
                        "62a0a5cf-17ac-4220-bf3d-4e3df09ba0bf",
                        "00270646-1f06-467b-944d-92f347a8b441",
                        "efd0eced-3f4e-4bb5-95a4-4df805380cba"
                    ]
                },
                {
                    "vehicleId": "78f277b3-6fd6-4478-b5e6-76154c551547",
                    "ownerId": "4b7bf08e-a4aa-4da0-ba30-ad0020e80418",
                    "name": "ram car",
                    "numberPlate": {
                        "strLicense": "ram",
                        "locale": "en_IN"
                    },
                    "make": "Honda",
                    "model": "Jazz",
                    "variant": "V Diesel",
                    "vehicleRejected": false,
                    "freeStatus": true,
                    "driverList": [
                        "4b7bf08e-a4aa-4da0-ba30-ad0020e80418",
                        "84813efe-55f5-47ee-8981-ac47590c3665",
                        "01de2025-3cec-4213-943f-55d60e24fc00",
                        "ab322224-4095-4e41-9983-61dc70a8f861"
                    ]
                },
                {
                    "vehicleId": "0659897f-9fc1-4c26-86e8-a121551bc3d5",
                    "ownerId": "4b7bf08e-a4aa-4da0-ba30-ad0020e80418",
                    "name": "KA 6688",
                    "numberPlate": {
                        "strLicense": "KA 6688",
                        "locale": "en_IN"
                    },
                    "make": "Tata",
                    "model": "Zest",
                    "variant": "XE Petrol",
                    "vehicleRejected": false,
                    "freeStatus": true,
                    "driverList": [
                        "4b7bf08e-a4aa-4da0-ba30-ad0020e80418",
                        "84813efe-55f5-47ee-8981-ac47590c3665",
                        "ab322224-4095-4e41-9983-61dc70a8f861",
                        "01de2025-3cec-4213-943f-55d60e24fc00"
                    ]
                },
                {
                    "vehicleId": "51377997-152e-45a2-95e2-f6b246f6c75f",
                    "ownerId": "84813efe-55f5-47ee-8981-ac47590c3665",
                    "name": "GOD1",
                    "numberPlate": {
                        "strLicense": "GOD",
                        "locale": "en_IN"
                    },
                    "make": "",
                    "model": "",
                    "variant": "",
                    "responseType": "ACCEPTED",
                    "vehicleRejected": false,
                    "freeStatus": true,
                    "currentDriver": "10211f21-7f62-4a44-9cd9-3b8ab34dc078",
                    "driverList": [
                        "4b7bf08e-a4aa-4da0-ba30-ad0020e80418",
                        "ab322224-4095-4e41-9983-61dc70a8f861",
                        "84813efe-55f5-47ee-8981-ac47590c3665",
                        "01de2025-3cec-4213-943f-55d60e24fc00"
                    ]
                },
                {
                    "vehicleId": "7727852a-264e-4916-9d86-421a919352f4",
                    "ownerId": "84813efe-55f5-47ee-8981-ac47590c3665",
                    "name": "Jupiter",
                    "numberPlate": {
                        "strLicense": "KA 01 HV 5774",
                        "locale": "en_IN"
                    },
                    "make": "Chevrolet",
                    "model": "Tavera",
                    "variant": "LT 9 STR",
                    "profilePictureUrl": "",
                    "responseType": "ACCEPTED",
                    "vehicleRejected": false,
                    "freeStatus": true
                },
                {
                    "vehicleId": "edd8b86b-0d8f-4176-a6be-40d20bc06934",
                    "ownerId": "84813efe-55f5-47ee-8981-ac47590c3665",
                    "name": "Pride",
                    "numberPlate": {
                        "strLicense": "KA 01 HA 4411",
                        "locale": "en_IN"
                    },
                    "make": "Tata",
                    "model": "Aria",
                    "variant": "Pride 4x4",
                    "responseType": "ACCEPTED",
                    "vehicleRejected": false,
                    "freeStatus": true
                },
                {
                    "vehicleId": "9168885a-8fde-4083-abad-7afcce80e7af",
                    "ownerId": "2930d832-ffdd-4ef0-94f4-38444395fe02",
                    "name": "gourav",
                    "numberPlate": {
                        "strLicense": "ka 01 56567899",
                        "locale": "en_IN"
                    },
                    "make": "Volkswagen",
                    "model": "Jetta",
                    "variant": "Trendline TDI",
                    "responseType": "PENDING",
                    "vehicleRejected": false,
                    "freeStatus": true
                },
                {
                    "vehicleId": "0eb90085-8e02-40ef-b453-a05127277a54",
                    "ownerId": "2930d832-ffdd-4ef0-94f4-38444395fe02",
                    "name": "Buggati",
                    "numberPlate": {
                        "strLicense": "KA 21 5567",
                        "locale": "en_IN"
                    },
                    "make": "Bugatti",
                    "model": "Veyron",
                    "variant": "16.4 Grand Sport",
                    "responseType": "ACCEPTED",
                    "vehicleRejected": false,
                    "freeStatus": true
                },
                {
                    "vehicleId": "86ff6338-c7e1-4f9a-b7c3-02de3d50bde6",
                    "ownerId": "2930d832-ffdd-4ef0-94f4-38444395fe02",
                    "name": "Vehicle",
                    "numberPlate": {
                        "strLicense": "KA 24 6789",
                        "locale": "en_IN"
                    },
                    "make": "Chevrolet",
                    "model": "Beat",
                    "variant": "PS Petrol",
                    "responseType": "ACCEPTED",
                    "vehicleRejected": false,
                    "freeStatus": true
                },
                {
                    "vehicleId": "be8a8175-6483-44db-877c-1a3e0dec3c54",
                    "ownerId": "2930d832-ffdd-4ef0-94f4-38444395fe02",
                    "name": "My Vehicle",
                    "numberPlate": {
                        "strLicense": "KA 45 1233",
                        "locale": "en_IN"
                    },
                    "make": "Jaguar",
                    "model": "XE",
                    "variant": "Portfolio",
                    "responseType": "ACCEPTED",
                    "vehicleRejected": false,
                    "freeStatus": true
                },
                {
                    "vehicleId": "5949bb93-3006-4c84-b246-a41fdc364ca6",
                    "ownerId": "2930d832-ffdd-4ef0-94f4-38444395fe02",
                    "name": "Swift",
                    "numberPlate": {
                        "strLicense": "KA 34 5678",
                        "locale": "en_IN"
                    },
                    "make": "Ferrari",
                    "model": "California",
                    "variant": "T",
                    "responseType": "ACCEPTED",
                    "vehicleRejected": false,
                    "freeStatus": true
                },
                {
                    "vehicleId": "32e6de41-3eb3-4f48-a745-718bd9a9f7db",
                    "ownerId": "ab322224-4095-4e41-9983-61dc70a8f861",
                    "name": "Zoom car",
                    "numberPlate": {
                        "strLicense": "KA 25 6688",
                        "locale": "en_IN"
                    },
                    "make": "Volvo",
                    "model": "S60",
                    "variant": "Polestar",
                    "responseType": "ACCEPTED",
                    "vehicleRejected": false,
                    "freeStatus": true
                },
                {
                    "vehicleId": "09107dac-dff3-4e17-8ec9-a7270ffe24f0",
                    "ownerId": "ab322224-4095-4e41-9983-61dc70a8f861",
                    "name": "mh vehicle",
                    "numberPlate": {
                        "strLicense": "MH 28 6789",
                        "locale": "en_IN"
                    },
                    "make": "Volvo",
                    "model": "XC60",
                    "variant": "Inscription",
                    "responseType": "PENDING",
                    "vehicleRejected": false,
                    "freeStatus": true
                },
                {
                    "vehicleId": "a83591c6-bb95-492f-9433-52c1b1d6332a",
                    "ownerId": "2930d832-ffdd-4ef0-94f4-38444395fe02",
                    "name": "FZR",
                    "numberPlate": {
                        "strLicense": "KA 20 1234",
                        "locale": "en_IN"
                    },
                    "responseType": "ACCEPTED",
                    "vehicleRejected": false,
                    "freeStatus": true
                },
                {
                    "vehicleId": "2e220bcd-1763-4847-913d-d8fc78b0839b",
                    "ownerId": "c7ec8c17-8a09-4689-b428-4325eec9f328",
                    "name": "mH vehicle",
                    "numberPlate": {
                        "strLicense": "MH 20 1869",
                        "locale": "en_IN"
                    },
                    "make": "PIAGGIO",
                    "model": " PORTER 700 ",
                    "variant": "FBV/SEMI DECK",
                    "responseType": "ACCEPTED",
                    "vehicleRejected": false,
                    "freeStatus": true
                },
                {
                    "vehicleId": "fa580b18-d1a8-4827-9234-238311a4cce8",
                    "ownerId": "d2f0a3da-787a-4774-871f-c2734fcc4220",
                    "name": "Ap vehicle",
                    "numberPlate": {
                        "strLicense": "AP 1788",
                        "locale": "en_IN"
                    },
                    "make": "VOLVO",
                    "model": "FH 520",
                    "variant": "POWERTRONIC PULLER",
                    "responseType": "PENDING",
                    "vehicleRejected": false,
                    "freeStatus": true
                },
                {
                    "vehicleId": "be828875-78b5-45c9-9bff-023e87da5522",
                    "ownerId": "4836db69-4205-4bb9-8e82-f0333c273a4b",
                    "name": "TE vehicle",
                    "numberPlate": {
                        "strLicense": "TE 12 8900",
                        "locale": "en_IN"
                    },
                    "make": "Porsche",
                    "model": "911",
                    "variant": "Turbo Cabriolet",
                    "responseType": "PENDING",
                    "vehicleRejected": false,
                    "freeStatus": true
                },
                {
                    "vehicleId": "f176abac-01d7-44c8-8072-afa0921889f0",
                    "ownerId": "95642b90-19f3-4b47-a1e8-eb04f5c18073",
                    "name": "TN 12 vehicle",
                    "numberPlate": {
                        "strLicense": "TN 12 7890",
                        "locale": "en_IN"
                    },
                    "make": "VOLVO",
                    "model": "FH 520",
                    "variant": "POWERTRONIC PULLER",
                    "responseType": "PENDING",
                    "vehicleRejected": false,
                    "freeStatus": true
                },
                {
                    "vehicleId": "20964711-f656-4263-a3c4-f3b7b13dc82e",
                    "ownerId": "47659022-803d-4520-9f22-8f561ac39a55",
                    "name": "AP vehicle",
                    "numberPlate": {
                        "strLicense": "AP 29 8800",
                        "locale": "en_IN"
                    },
                    "make": "Porsche",
                    "model": "Macan",
                    "variant": "R4",
                    "responseType": "PENDING",
                    "vehicleRejected": false,
                    "freeStatus": true
                },
                {
                    "vehicleId": "b5e00a3c-b3a6-4d16-b417-a6ea1d1a67b2",
                    "ownerId": "ce809076-04e5-41cd-a993-6f849a6b1dbb",
                    "name": "GA vehicle",
                    "numberPlate": {
                        "strLicense": "GA 12 9800",
                        "locale": "en_IN"
                    },
                    "make": "Ferrari",
                    "model": "458",
                    "variant": "Speciale",
                    "responseType": "PENDING",
                    "vehicleRejected": false,
                    "freeStatus": true
                },
                {
                    "vehicleId": "6c16e201-ebc8-4dfd-9dcd-33462b86ce98",
                    "ownerId": "bd8e67c2-50ec-450a-8344-d2d1b38d0c23",
                    "name": "TE vehicle",
                    "numberPlate": {
                        "strLicense": "TE 00 5678",
                        "locale": "en_IN"
                    },
                    "make": "Hyundai",
                    "model": "Santa Fe",
                    "variant": "2 WD AT",
                    "responseType": "PENDING",
                    "vehicleRejected": false,
                    "freeStatus": true
                },
                {
                    "vehicleId": "3a3da8b7-ae1d-4a30-bba0-c89bfd72c0e3",
                    "ownerId": "711f9905-4b94-49df-9cca-e4f22ade2b28",
                    "name": "GA vehicle",
                    "numberPlate": {
                        "strLicense": "GA 21 8999",
                        "locale": "en_IN"
                    },
                    "make": "Ferrari",
                    "model": "458",
                    "variant": "Speciale",
                    "responseType": "PENDING",
                    "vehicleRejected": false,
                    "freeStatus": true
                },
                {
                    "vehicleId": "1eeae74b-b263-4dcf-b1b2-afeb3a23098b",
                    "ownerId": "a53cb2c1-63e0-4e44-bed0-a63ff48f1865",
                    "name": "QW vehicle",
                    "numberPlate": {
                        "strLicense": "QW 23 8889",
                        "locale": "en_IN"
                    },
                    "make": "Ferrari",
                    "model": "458",
                    "variant": "Speciale",
                    "responseType": "PENDING",
                    "vehicleRejected": false,
                    "freeStatus": true
                },
                {
                    "vehicleId": "e54aee71-df0a-4761-a8d6-59928f4824ae",
                    "ownerId": "5fc5e4e0-0527-41b9-a100-108a474a5a78",
                    "name": "TH vehicle",
                    "numberPlate": {
                        "strLicense": "TH 12 0067",
                        "locale": "en_IN"
                    },
                    "make": "Ferrari",
                    "model": "488",
                    "variant": "Spider",
                    "responseType": "PENDING",
                    "vehicleRejected": false,
                    "freeStatus": true
                },
                {
                    "vehicleId": "38c76bda-a5ef-4308-9302-64d12fa343d0",
                    "ownerId": "6f201db9-d76f-495b-9e67-cec43deb0d50",
                    "name": "UT vehicle",
                    "numberPlate": {
                        "strLicense": "UT 12 0045",
                        "locale": "en_IN"
                    },
                    "make": "Ferrari",
                    "model": "458",
                    "variant": "Speciale",
                    "responseType": "PENDING",
                    "vehicleRejected": false,
                    "freeStatus": true
                },
                {
                    "vehicleId": "b6d6d56f-134f-450a-b243-de72c7d7513c",
                    "ownerId": "10211f21-7f62-4a44-9cd9-3b8ab34dc078",
                    "name": "GS vehicle\nGS 12 8900",
                    "numberPlate": {
                        "strLicense": "GS 12 8900",
                        "locale": "en_IN"
                    },
                    "make": "Toyota",
                    "model": "Fortuner",
                    "variant": "2.8 4x4 MT",
                    "profilePictureUrl": "",
                    "responseType": "PENDING",
                    "vehicleRejected": false,
                    "freeStatus": true
                },
                {
                    "vehicleId": "0065a821-f798-4a75-bceb-a6bdd93fc47a",
                    "ownerId": "204b1161-ef19-457a-8997-217bd8ea39ef",
                    "name": "MD vehicle",
                    "numberPlate": {
                        "strLicense": "MD 23 0011",
                        "locale": "en_IN"
                    },
                    "make": "Ferrari",
                    "model": "458",
                    "variant": "Speciale",
                    "responseType": "PENDING",
                    "vehicleRejected": false,
                    "freeStatus": true
                },
                {
                    "vehicleId": "72c8bcd6-b047-4e23-9031-320d8affa21f",
                    "ownerId": "00270646-1f06-467b-944d-92f347a8b441",
                    "name": "AM vehicle",
                    "numberPlate": {
                        "strLicense": "AM 89 7799",
                        "locale": "en_IN"
                    },
                    "make": "Jaguar",
                    "model": "XJ L",
                    "variant": "3.0 Portfolio",
                    "responseType": "ACCEPTED",
                    "vehicleRejected": false,
                    "freeStatus": true
                },
                {
                    "vehicleId": "c7fd2bc5-10df-4410-82c5-530e110b9789",
                    "ownerId": "62a0a5cf-17ac-4220-bf3d-4e3df09ba0bf",
                    "name": "AP vehicle",
                    "numberPlate": {
                        "strLicense": "AP 12 9900",
                        "locale": "en_IN"
                    },
                    "make": "Hyundai",
                    "model": "Santa Fe",
                    "variant": "2 WD AT",
                    "responseType": "ACCEPTED",
                    "vehicleRejected": false,
                    "freeStatus": true
                },
                {
                    "vehicleId": "1e2a6ba4-e918-46bb-bb36-58a86676f99a",
                    "ownerId": "bfba0834-844a-4fa6-8d51-058a8a254b53",
                    "name": "UP vehicle",
                    "numberPlate": {
                        "strLicense": "UP 34 6600",
                        "locale": "en_IN"
                    },
                    "make": "Ferrari",
                    "model": "458",
                    "variant": "Speciale",
                    "responseType": "ACCEPTED",
                    "vehicleRejected": false,
                    "freeStatus": true
                },
                {
                    "vehicleId": "4d6644c5-fc6c-4bed-bc03-6c2eff474358",
                    "ownerId": "548e8d50-e962-4f9b-bf17-4fe738cb4c25",
                    "name": "LK vehicle",
                    "numberPlate": {
                        "strLicense": "LK 12 8800",
                        "locale": "en_IN"
                    },
                    "make": "Porsche",
                    "model": "Panamera",
                    "variant": "Turbo Executive",
                    "responseType": "ACCEPTED",
                    "vehicleRejected": false,
                    "freeStatus": true
                },
                {
                    "vehicleId": "633999df-3db3-43c2-beb9-94f505d1a917",
                    "ownerId": "45617f22-d8f3-4e53-9380-2d69f29abfc2",
                    "name": "KA vehicle",
                    "numberPlate": {
                        "strLicense": "KA 09 6644",
                        "locale": "en_IN"
                    },
                    "make": "Maruti",
                    "model": " Zen Estilo",
                    "variant": "Lxi",
                    "responseType": "ACCEPTED",
                    "vehicleRejected": false,
                    "freeStatus": true
                },
                {
                    "vehicleId": "8ae82bc0-9149-4109-8f8f-4ffd658eb9cb",
                    "ownerId": "8421aac4-516c-4853-ae95-e3d08bacecaa",
                    "name": "AL vehicle",
                    "numberPlate": {
                        "strLicense": "AL 12 9966",
                        "locale": "en_IN"
                    },
                    "make": "Audi",
                    "model": "A6",
                    "variant": "35 TFSI Matrix",
                    "responseType": "ACCEPTED",
                    "vehicleRejected": false,
                    "freeStatus": true
                },
                {
                    "vehicleId": "4e834ea3-a86b-4839-bdf1-0b9235aeeb1e",
                    "ownerId": "2930d832-ffdd-4ef0-94f4-38444395fe02",
                    "name": "GJ 935",
                    "numberPlate": {
                        "strLicense": "GJ 935",
                        "locale": "en_IN"
                    },
                    "make": "Tata",
                    "model": "Zest",
                    "variant": "XE Petrol",
                    "responseType": "ACCEPTED",
                    "vehicleRejected": false,
                    "freeStatus": true
                },
                {
                    "vehicleId": "d67db439-df1c-427a-ae2a-25044a096a9c",
                    "ownerId": "2930d832-ffdd-4ef0-94f4-38444395fe02",
                    "name": "testing",
                    "numberPlate": {
                        "strLicense": "ka 01 hg 6547",
                        "locale": "en_IN"
                    },
                    "make": "Honda",
                    "model": "Mobilio",
                    "variant": "V Petrol",
                    "responseType": "ACCEPTED",
                    "vehicleRejected": false,
                    "freeStatus": true
                },
                {
                    "vehicleId": "0f20f589-3b11-4ea1-a033-571af14eb0aa",
                    "ownerId": "2930d832-ffdd-4ef0-94f4-38444395fe02",
                    "name": "hghgh",
                    "numberPlate": {
                        "strLicense": "hhgh",
                        "locale": "en_IN"
                    },
                    "make": "Honda",
                    "model": "Mobilio",
                    "variant": "S Diesel",
                    "responseType": "ACCEPTED",
                    "vehicleRejected": false,
                    "freeStatus": true
                },
                {
                    "vehicleId": "63a72c52-4bf3-4460-a84f-519fa07eea99",
                    "ownerId": "2930d832-ffdd-4ef0-94f4-38444395fe02",
                    "name": "vehicle 555",
                    "numberPlate": {
                        "strLicense": "Ka 01 5555",
                        "locale": "in"
                    },
                    "make": "Maruti-Suzuki",
                    "model": "Dzire",
                    "variant": "VDI",
                    "responseType": "ACCEPTED",
                    "vehicleRejected": false,
                    "freeStatus": true
                }
            ],
            "fleetType": "FLEET_BASIC",
            "fieldForceId": "65e13c21-0466-457e-8de0-50561f677abf",
            "address": {
                "city": "Bengaluru",
                "postcode": "",
                "street": "",
                "housenumber": "",
                "countrycode": "IN",
                "county": "India",
                "suburb": "",
                "state": "Karnataka",
                "geopoint": {
                    "lon": 77.6762463,
                    "lat": 12.9260308,
                    "alt": 0
                }
            },
            "description": "hi",
            "createTime": "2018-01-16T10:50:31.000",
            "updateTime": "2018-01-16T10:50:31.000",
            "driverList": {
                "62a0a5cf-17ac-4220-bf3d-4e3df09ba0bf": "ACTIVE",
                "73c8d168-0bd8-490c-b1d7-c40fb7e69a4f": "REMOVED",
                "ab322224-4095-4e41-9983-61dc70a8f861": "INACTIVE",
                "8421aac4-516c-4853-ae95-e3d08bacecaa": "ACTIVE",
                "ff374aa1-a502-4dca-bfaf-d77eca8f0fcf": "ACTIVE",
                "01de2025-3cec-4213-943f-55d60e24fc00": "REMOVED",
                "efd0eced-3f4e-4bb5-95a4-4df805380cba": "REMOVED",
                "e7ac552f-cd54-4af2-b0b5-c5b014cc1db2": "ACTIVE",
                "00270646-1f06-467b-944d-92f347a8b441": "ACTIVE"
            },
            "locale": "en_IN",
            "timeZoneId": "Asia/Calcutta"
        },
        {
            "fleetId": "e3b669d3-dec9-4e7e-94db-a0681dac5b5a",
            "organisationId": "dd51dabb-1477-4674-8529-ae33a11a238a",
            "fleetName": "Test fleet",
            "vehicleIdList": [
                "785579af-5842-4866-bf17-d7acd51bae14"
            ],
            "managerIdList": [],
            "vehicleView": [
                {
                    "vehicleId": "785579af-5842-4866-bf17-d7acd51bae14",
                    "ownerId": "e3b669d3-dec9-4e7e-94db-a0681dac5b5a",
                    "name": "Maruti suzuki",
                    "numberPlate": {
                        "strLicense": "KA 23 5156",
                        "locale": "en_IN"
                    },
                    "make": "Maruti",
                    "model": " Zen Estilo",
                    "variant": "Lxi",
                    "responseType": "ACCEPTED",
                    "vehicleRejected": false,
                    "freeStatus": true
                }
            ],
            "fleetType": "FLEET_BASIC",
            "fieldForceId": "0183b1a0-2836-4517-bddf-f2d2eb4454c9",
            "address": {
                "city": "Bengaluru",
                "postcode": "590096",
                "street": "",
                "housenumber": "",
                "countrycode": "IN",
                "county": "India",
                "suburb": "",
                "state": "Karnataka",
                "geopoint": {
                    "lon": 77.59456269999998,
                    "lat": 12.9715987,
                    "alt": 0
                }
            },
            "description": "New flett",
            "createTime": "2018-01-14T02:24:40.000",
            "updateTime": "2018-01-14T02:24:40.000",
            "driverList": {},
            "locale": "en_IN",
            "timeZoneId": "Asia/Calcutta"
        },
        {
            "fleetId": "53585192-c299-4ba6-9a6b-ae20b3ad57d1",
            "organisationId": "dd51dabb-1477-4674-8529-ae33a11a238a",
            "fleetName": "Test 3",
            "managerIdList": [],
            "vehicleView": [],
            "fleetType": "FLEET_BASIC",
            "fieldForceId": "f44a1de6-5eb3-4a1d-965c-8c78b3e7e26a",
            "address": {
                "city": "",
                "postcode": "",
                "street": "",
                "housenumber": "",
                "countrycode": "IN",
                "county": "India",
                "suburb": "",
                "state": ""
            },
            "createTime": "2018-03-26T07:45:59.000",
            "updateTime": "2018-03-26T07:45:59.000",
            "driverList": {},
            "locale": "en_US",
            "timeZoneId": "Asia/Calcutta"
        },
        {
            "fleetId": "d8ab3995-114b-404c-b93c-a95e9fa539a3",
            "organisationId": "dd51dabb-1477-4674-8529-ae33a11a238a",
            "fleetName": "fleet 2",
            "vehicleIdList": [
                "145ea5de-eaa9-437d-b92a-88574c71604f",
                "57b6795c-538c-4890-9190-a92e26001471",
                "bde76845-aed5-43c8-8bed-f8c0dae5b20d",
                "ff90a027-840f-428b-8c0b-3cfc7626aaae",
                "52723dd4-3ad7-4173-9e5c-f208b04477cb",
                "eafd6285-dc7f-40a6-9ef6-0eb35b645d87",
                "e7fe17f6-99d4-48e5-8bc3-d4052dc144ab"
            ],
            "managerIdList": [],
            "vehicleView": [
                {
                    "vehicleId": "145ea5de-eaa9-437d-b92a-88574c71604f",
                    "ownerId": "d8ab3995-114b-404c-b93c-a95e9fa539a3",
                    "name": "Vehicle 5",
                    "numberPlate": {
                        "strLicense": "KA 233 3 4 4 4 ",
                        "locale": "en_IN"
                    },
                    "make": "BMW",
                    "model": "5 Series",
                    "variant": "525d Sedan",
                    "responseType": "ACCEPTED",
                    "vehicleRejected": false,
                    "freeStatus": true,
                    "currentDriver": "5de81e4b-e899-4afb-a346-2cea99e5261a",
                    "driverList": [
                        "5de81e4b-e899-4afb-a346-2cea99e5261a",
                        "01de2025-3cec-4213-943f-55d60e24fc00",
                        "a82d5a09-8403-4c18-b171-cc176e9ec984",
                        "a53cb2c1-63e0-4e44-bed0-a63ff48f1865",
                        "65d9796d-b2f8-4090-9198-4ffc5b2665ac"
                    ]
                },
                {
                    "vehicleId": "57b6795c-538c-4890-9190-a92e26001471",
                    "ownerId": "d8ab3995-114b-404c-b93c-a95e9fa539a3",
                    "name": "Vehicle 6",
                    "numberPlate": {
                        "strLicense": "JP 12 3333",
                        "locale": "en_IN"
                    },
                    "responseType": "ACCEPTED",
                    "vehicleRejected": false,
                    "freeStatus": true,
                    "currentDriver": "65d9796d-b2f8-4090-9198-4ffc5b2665ac",
                    "driverList": [
                        "a82d5a09-8403-4c18-b171-cc176e9ec984",
                        "b44422c8-1197-402d-939d-3ccf061dd5fe",
                        "01de2025-3cec-4213-943f-55d60e24fc00",
                        "a53cb2c1-63e0-4e44-bed0-a63ff48f1865",
                        "65d9796d-b2f8-4090-9198-4ffc5b2665ac"
                    ]
                },
                {
                    "vehicleId": "bde76845-aed5-43c8-8bed-f8c0dae5b20d",
                    "ownerId": "d8ab3995-114b-404c-b93c-a95e9fa539a3",
                    "name": "UP 12 3455",
                    "numberPlate": {
                        "strLicense": "KA 34 4444",
                        "locale": "en_IN"
                    },
                    "responseType": "ACCEPTED",
                    "vehicleRejected": false,
                    "freeStatus": true
                },
                {
                    "vehicleId": "ff90a027-840f-428b-8c0b-3cfc7626aaae",
                    "ownerId": "d8ab3995-114b-404c-b93c-a95e9fa539a3",
                    "name": "Audi ",
                    "numberPlate": {
                        "strLicense": "KA 34 1234",
                        "locale": "en_IN"
                    },
                    "make": "Audi",
                    "model": "A6",
                    "variant": "35 TFSI Matrix",
                    "responseType": "ACCEPTED",
                    "vehicleRejected": false,
                    "freeStatus": true
                },
                {
                    "vehicleId": "52723dd4-3ad7-4173-9e5c-f208b04477cb",
                    "ownerId": "d8ab3995-114b-404c-b93c-a95e9fa539a3",
                    "name": "Vehicle test 2",
                    "numberPlate": {
                        "strLicense": "KA 32 7788",
                        "locale": "en_IN"
                    },
                    "make": "Audi",
                    "model": "Q5",
                    "variant": "2.0 TDI quattro Premium Plus",
                    "responseType": "ACCEPTED",
                    "vehicleRejected": false,
                    "freeStatus": true,
                    "driverList": [
                        "a53cb2c1-63e0-4e44-bed0-a63ff48f1865"
                    ]
                },
                {
                    "vehicleId": "eafd6285-dc7f-40a6-9ef6-0eb35b645d87",
                    "ownerId": "d8ab3995-114b-404c-b93c-a95e9fa539a3",
                    "name": "GE vehicle",
                    "numberPlate": {
                        "strLicense": "GE AR 1244",
                        "locale": "en_IN"
                    },
                    "make": "Porsche",
                    "model": "911",
                    "variant": "Carrera 4 Cabriolet",
                    "responseType": "ACCEPTED",
                    "vehicleRejected": false,
                    "freeStatus": true,
                    "driverList": [
                        "65d9796d-b2f8-4090-9198-4ffc5b2665ac",
                        "a53cb2c1-63e0-4e44-bed0-a63ff48f1865"
                    ]
                },
                {
                    "vehicleId": "e7fe17f6-99d4-48e5-8bc3-d4052dc144ab",
                    "ownerId": "d8ab3995-114b-404c-b93c-a95e9fa539a3",
                    "name": "AH vehicle",
                    "numberPlate": {
                        "strLicense": "AH 0078",
                        "locale": "en_IN"
                    },
                    "make": "Porsche",
                    "model": "718",
                    "variant": "Boxster",
                    "responseType": "ACCEPTED",
                    "vehicleRejected": false,
                    "freeStatus": true,
                    "driverList": [
                        "a53cb2c1-63e0-4e44-bed0-a63ff48f1865"
                    ]
                }
            ],
            "fleetType": "FLEET_BASIC",
            "fieldForceId": "d6f8af83-6b57-4cc4-8060-69f389a5b1f9",
            "description": "fleet 2description",
            "createTime": "2018-01-30T11:06:55.000",
            "updateTime": "2018-01-30T11:06:55.000",
            "driverList": {
                "a53cb2c1-63e0-4e44-bed0-a63ff48f1865": "ACTIVE",
                "b4b41c0f-0bd5-48bc-b04f-5288a86a26a8": "REMOVED",
                "a82d5a09-8403-4c18-b171-cc176e9ec984": "REMOVED",
                "ab322224-4095-4e41-9983-61dc70a8f861": "REMOVED",
                "5de81e4b-e899-4afb-a346-2cea99e5261a": "REMOVED",
                "01de2025-3cec-4213-943f-55d60e24fc00": "REMOVED",
                "cc2ce774-55e4-4616-8abf-3169b55bf39b": "REMOVED",
                "b44422c8-1197-402d-939d-3ccf061dd5fe": "REMOVED",
                "65d9796d-b2f8-4090-9198-4ffc5b2665ac": "ACTIVE"
            },
            "locale": "en_IN",
            "timeZoneId": "Asia/Calcutta"
        }
    ],
    "noFleetFound": []
}

const createFleetResData = {
    "creationDate": "2018-03-26T07:35:55.171",
    "reportObjId": "53585192-c299-4ba6-9a6b-ae20b3ad57d1",
    "updatedFields": 10
}

const deleteVehicleFromFleetRes = {
    "status": "Vehicles deleted successfully!"
}

const updateFleetDriverRes = {
    "status": "Driver status updated successfully!"
}

const addVehiclesToFleetRes={
    "status":"Vehicles added successfully"
}

const getAddressForLatLngRes={
    "results": [
        {
            "address_components": [
                {
                    "long_name": "Zero Milestone",
                    "short_name": "Zero Milestone",
                    "types": [
                        "establishment",
                        "point_of_interest",
                        "premise"
                    ]
                },
                {
                    "long_name": "Ellipse Road Northwest",
                    "short_name": "Ellipse Rd NW",
                    "types": [
                        "route"
                    ]
                },
                {
                    "long_name": "Northwest Washington",
                    "short_name": "Northwest Washington",
                    "types": [
                        "neighborhood",
                        "political"
                    ]
                },
                {
                    "long_name": "Washington",
                    "short_name": "Washington",
                    "types": [
                        "locality",
                        "political"
                    ]
                },
                {
                    "long_name": "District of Columbia",
                    "short_name": "DC",
                    "types": [
                        "administrative_area_level_1",
                        "political"
                    ]
                },
                {
                    "long_name": "United States",
                    "short_name": "US",
                    "types": [
                        "country",
                        "political"
                    ]
                },
                {
                    "long_name": "20502",
                    "short_name": "20502",
                    "types": [
                        "postal_code"
                    ]
                }
            ],
            "formatted_address": "Zero Milestone, Ellipse Rd NW, Washington, DC 20502, USA",
            "geometry": {
                "location": {
                    "lat": 38.8951037,
                    "lng": -77.03655259999999
                },
                "location_type": "ROOFTOP",
                "viewport": {
                    "northeast": {
                        "lat": 38.8964526802915,
                        "lng": -77.0352036197085
                    },
                    "southwest": {
                        "lat": 38.8937547197085,
                        "lng": -77.0379015802915
                    }
                }
            },
            "place_id": "ChIJNyXLJqO3t4kRH6CaxKyZb_w",
            "types": [
                "establishment",
                "point_of_interest",
                "premise"
            ]
        },
        {
            "address_components": [
                {
                    "long_name": "Ellipse Road Northwest",
                    "short_name": "Ellipse Rd NW",
                    "types": [
                        "route"
                    ]
                },
                {
                    "long_name": "Northwest Washington",
                    "short_name": "Northwest Washington",
                    "types": [
                        "neighborhood",
                        "political"
                    ]
                },
                {
                    "long_name": "Washington",
                    "short_name": "Washington",
                    "types": [
                        "locality",
                        "political"
                    ]
                },
                {
                    "long_name": "District of Columbia",
                    "short_name": "DC",
                    "types": [
                        "administrative_area_level_1",
                        "political"
                    ]
                },
                {
                    "long_name": "United States",
                    "short_name": "US",
                    "types": [
                        "country",
                        "political"
                    ]
                },
                {
                    "long_name": "20502",
                    "short_name": "20502",
                    "types": [
                        "postal_code"
                    ]
                }
            ],
            "formatted_address": "Ellipse Rd NW, Washington, DC 20502, USA",
            "geometry": {
                "bounds": {
                    "northeast": {
                        "lat": 38.895195,
                        "lng": -77.03622399999999
                    },
                    "southwest": {
                        "lat": 38.8951704,
                        "lng": -77.0370209
                    }
                },
                "location": {
                    "lat": 38.8951942,
                    "lng": -77.03662319999999
                },
                "location_type": "GEOMETRIC_CENTER",
                "viewport": {
                    "northeast": {
                        "lat": 38.8965316802915,
                        "lng": -77.0352734697085
                    },
                    "southwest": {
                        "lat": 38.8938337197085,
                        "lng": -77.03797143029152
                    }
                }
            },
            "place_id": "ChIJs3rGJqO3t4kRdErqu7J8hD0",
            "types": [
                "route"
            ]
        },
        {
            "address_components": [
                {
                    "long_name": "Northwest Washington",
                    "short_name": "Northwest Washington",
                    "types": [
                        "neighborhood",
                        "political"
                    ]
                },
                {
                    "long_name": "Fort Lesley J. McNair",
                    "short_name": "Fort Lesley J. McNair",
                    "types": [
                        "political",
                        "sublocality",
                        "sublocality_level_1"
                    ]
                },
                {
                    "long_name": "Washington",
                    "short_name": "Washington",
                    "types": [
                        "locality",
                        "political"
                    ]
                },
                {
                    "long_name": "7",
                    "short_name": "7",
                    "types": [
                        "administrative_area_level_3",
                        "political"
                    ]
                },
                {
                    "long_name": "District of Columbia",
                    "short_name": "DC",
                    "types": [
                        "administrative_area_level_1",
                        "political"
                    ]
                },
                {
                    "long_name": "United States",
                    "short_name": "US",
                    "types": [
                        "country",
                        "political"
                    ]
                }
            ],
            "formatted_address": "Northwest Washington, Washington, DC, USA",
            "geometry": {
                "bounds": {
                    "northeast": {
                        "lat": 38.9955566,
                        "lng": -77.00605969999999
                    },
                    "southwest": {
                        "lat": 38.8891955,
                        "lng": -77.1197502
                    }
                },
                "location": {
                    "lat": 38.9380912,
                    "lng": -77.04493269999999
                },
                "location_type": "APPROXIMATE",
                "viewport": {
                    "northeast": {
                        "lat": 38.9955566,
                        "lng": -77.00605969999999
                    },
                    "southwest": {
                        "lat": 38.8891955,
                        "lng": -77.1197502
                    }
                }
            },
            "place_id": "ChIJi7U4CaS3t4kR0m_KoPJ00Bw",
            "types": [
                "neighborhood",
                "political"
            ]
        },
        {
            "address_components": [
                {
                    "long_name": "Washington",
                    "short_name": "Washington",
                    "types": [
                        "locality",
                        "political"
                    ]
                },
                {
                    "long_name": "District of Columbia",
                    "short_name": "District of Columbia",
                    "types": [
                        "administrative_area_level_2",
                        "political"
                    ]
                },
                {
                    "long_name": "District of Columbia",
                    "short_name": "DC",
                    "types": [
                        "administrative_area_level_1",
                        "political"
                    ]
                },
                {
                    "long_name": "United States",
                    "short_name": "US",
                    "types": [
                        "country",
                        "political"
                    ]
                }
            ],
            "formatted_address": "Washington, DC, USA",
            "geometry": {
                "bounds": {
                    "northeast": {
                        "lat": 38.995548,
                        "lng": -76.90939299999999
                    },
                    "southwest": {
                        "lat": 38.7916449,
                        "lng": -77.119759
                    }
                },
                "location": {
                    "lat": 38.9071923,
                    "lng": -77.03687069999999
                },
                "location_type": "APPROXIMATE",
                "viewport": {
                    "northeast": {
                        "lat": 38.995548,
                        "lng": -76.90939299999999
                    },
                    "southwest": {
                        "lat": 38.7916449,
                        "lng": -77.119759
                    }
                }
            },
            "place_id": "ChIJW-T2Wt7Gt4kRKl2I1CJFUsI",
            "types": [
                "locality",
                "political"
            ]
        },
        {
            "address_components": [
                {
                    "long_name": "56945",
                    "short_name": "56945",
                    "types": [
                        "postal_code"
                    ]
                },
                {
                    "long_name": "Northwest Washington",
                    "short_name": "Northwest Washington",
                    "types": [
                        "neighborhood",
                        "political"
                    ]
                },
                {
                    "long_name": "PARCEL RETURN SERVICE",
                    "short_name": "PARCEL RETURN SERVICE",
                    "types": [
                        "locality",
                        "political"
                    ]
                },
                {
                    "long_name": "District of Columbia",
                    "short_name": "DC",
                    "types": [
                        "administrative_area_level_1",
                        "political"
                    ]
                },
                {
                    "long_name": "United States",
                    "short_name": "US",
                    "types": [
                        "country",
                        "political"
                    ]
                }
            ],
            "formatted_address": "PARCEL RETURN SERVICE, DC 56945, USA",
            "geometry": {
                "location": {
                    "lat": 38.89509230000001,
                    "lng": -77.03655499999999
                },
                "location_type": "APPROXIMATE",
                "viewport": {
                    "northeast": {
                        "lat": 38.89644128029151,
                        "lng": -77.0352060197085
                    },
                    "southwest": {
                        "lat": 38.89374331970851,
                        "lng": -77.0379039802915
                    }
                }
            },
            "place_id": "ChIJ4f00IaO3t4kRofTlnR3L6bs",
            "postcode_localities": [
                "PARCEL RETURN SERVICE",
                "PRS"
            ],
            "types": [
                "postal_code"
            ]
        },
        {
            "address_components": [
                {
                    "long_name": "56902",
                    "short_name": "56902",
                    "types": [
                        "postal_code"
                    ]
                },
                {
                    "long_name": "Northwest Washington",
                    "short_name": "Northwest Washington",
                    "types": [
                        "neighborhood",
                        "political"
                    ]
                },
                {
                    "long_name": "PARCEL RETURN SERVICE",
                    "short_name": "PARCEL RETURN SERVICE",
                    "types": [
                        "locality",
                        "political"
                    ]
                },
                {
                    "long_name": "District of Columbia",
                    "short_name": "DC",
                    "types": [
                        "administrative_area_level_1",
                        "political"
                    ]
                },
                {
                    "long_name": "United States",
                    "short_name": "US",
                    "types": [
                        "country",
                        "political"
                    ]
                }
            ],
            "formatted_address": "PARCEL RETURN SERVICE, DC 56902, USA",
            "geometry": {
                "location": {
                    "lat": 38.895094,
                    "lng": -77.03655719999999
                },
                "location_type": "APPROXIMATE",
                "viewport": {
                    "northeast": {
                        "lat": 38.8964429802915,
                        "lng": -77.03520821970848
                    },
                    "southwest": {
                        "lat": 38.8937450197085,
                        "lng": -77.03790618029149
                    }
                }
            },
            "place_id": "ChIJOxs1IaO3t4kRxjEu9ske85A",
            "postcode_localities": [
                "PARCEL RETURN SERVICE",
                "PRS"
            ],
            "types": [
                "postal_code"
            ]
        },
        {
            "address_components": [
                {
                    "long_name": "56904",
                    "short_name": "56904",
                    "types": [
                        "postal_code"
                    ]
                },
                {
                    "long_name": "Northwest Washington",
                    "short_name": "Northwest Washington",
                    "types": [
                        "neighborhood",
                        "political"
                    ]
                },
                {
                    "long_name": "PARCEL RETURN SERVICE",
                    "short_name": "PARCEL RETURN SERVICE",
                    "types": [
                        "locality",
                        "political"
                    ]
                },
                {
                    "long_name": "District of Columbia",
                    "short_name": "DC",
                    "types": [
                        "administrative_area_level_1",
                        "political"
                    ]
                },
                {
                    "long_name": "United States",
                    "short_name": "US",
                    "types": [
                        "country",
                        "political"
                    ]
                }
            ],
            "formatted_address": "PARCEL RETURN SERVICE, DC 56904, USA",
            "geometry": {
                "location": {
                    "lat": 38.8950956,
                    "lng": -77.03655929999999
                },
                "location_type": "APPROXIMATE",
                "viewport": {
                    "northeast": {
                        "lat": 38.89644458029149,
                        "lng": -77.03521031970848
                    },
                    "southwest": {
                        "lat": 38.8937466197085,
                        "lng": -77.0379082802915
                    }
                }
            },
            "place_id": "ChIJvRY1IaO3t4kRS3pdJ2A0MfQ",
            "postcode_localities": [
                "PARCEL RETURN SERVICE",
                "PRS"
            ],
            "types": [
                "postal_code"
            ]
        },
        {
            "address_components": [
                {
                    "long_name": "56999",
                    "short_name": "56999",
                    "types": [
                        "postal_code"
                    ]
                },
                {
                    "long_name": "Northwest Washington",
                    "short_name": "Northwest Washington",
                    "types": [
                        "neighborhood",
                        "political"
                    ]
                },
                {
                    "long_name": "PARCEL RETURN SERVICE",
                    "short_name": "PARCEL RETURN SERVICE",
                    "types": [
                        "locality",
                        "political"
                    ]
                },
                {
                    "long_name": "District of Columbia",
                    "short_name": "DC",
                    "types": [
                        "administrative_area_level_1",
                        "political"
                    ]
                },
                {
                    "long_name": "United States",
                    "short_name": "US",
                    "types": [
                        "country",
                        "political"
                    ]
                }
            ],
            "formatted_address": "PARCEL RETURN SERVICE, DC 56999, USA",
            "geometry": {
                "location": {
                    "lat": 38.8953912,
                    "lng": -77.03665649999999
                },
                "location_type": "APPROXIMATE",
                "viewport": {
                    "northeast": {
                        "lat": 38.8967401802915,
                        "lng": -77.03530751970848
                    },
                    "southwest": {
                        "lat": 38.8940422197085,
                        "lng": -77.03800548029149
                    }
                }
            },
            "place_id": "ChIJoQIIJqO3t4kRPXJoYB3cqJc",
            "postcode_localities": [
                "PARCEL RETURN SERVICE",
                "PRS"
            ],
            "types": [
                "postal_code"
            ]
        },
        {
            "address_components": [
                {
                    "long_name": "56965",
                    "short_name": "56965",
                    "types": [
                        "postal_code"
                    ]
                },
                {
                    "long_name": "Northwest Washington",
                    "short_name": "Northwest Washington",
                    "types": [
                        "neighborhood",
                        "political"
                    ]
                },
                {
                    "long_name": "PARCEL RETURN SERVICE",
                    "short_name": "PARCEL RETURN SERVICE",
                    "types": [
                        "locality",
                        "political"
                    ]
                },
                {
                    "long_name": "District of Columbia",
                    "short_name": "DC",
                    "types": [
                        "administrative_area_level_1",
                        "political"
                    ]
                },
                {
                    "long_name": "United States",
                    "short_name": "US",
                    "types": [
                        "country",
                        "political"
                    ]
                }
            ],
            "formatted_address": "PARCEL RETURN SERVICE, DC 56965, USA",
            "geometry": {
                "location": {
                    "lat": 38.8953947,
                    "lng": -77.03666609999999
                },
                "location_type": "APPROXIMATE",
                "viewport": {
                    "northeast": {
                        "lat": 38.89674368029149,
                        "lng": -77.03531711970848
                    },
                    "southwest": {
                        "lat": 38.89404571970849,
                        "lng": -77.03801508029149
                    }
                }
            },
            "place_id": "ChIJuyz9JaO3t4kRVjJ5dLuZel4",
            "postcode_localities": [
                "PARCEL RETURN SERVICE",
                "PRS"
            ],
            "types": [
                "postal_code"
            ]
        },
        {
            "address_components": [
                {
                    "long_name": "56950",
                    "short_name": "56950",
                    "types": [
                        "postal_code"
                    ]
                },
                {
                    "long_name": "Northwest Washington",
                    "short_name": "Northwest Washington",
                    "types": [
                        "neighborhood",
                        "political"
                    ]
                },
                {
                    "long_name": "PARCEL RETURN SERVICE",
                    "short_name": "PARCEL RETURN SERVICE",
                    "types": [
                        "locality",
                        "political"
                    ]
                },
                {
                    "long_name": "District of Columbia",
                    "short_name": "DC",
                    "types": [
                        "administrative_area_level_1",
                        "political"
                    ]
                },
                {
                    "long_name": "United States",
                    "short_name": "US",
                    "types": [
                        "country",
                        "political"
                    ]
                }
            ],
            "formatted_address": "PARCEL RETURN SERVICE, DC 56950, USA",
            "geometry": {
                "location": {
                    "lat": 38.8954105,
                    "lng": -77.0366573
                },
                "location_type": "APPROXIMATE",
                "viewport": {
                    "northeast": {
                        "lat": 38.8967594802915,
                        "lng": -77.03530831970849
                    },
                    "southwest": {
                        "lat": 38.8940615197085,
                        "lng": -77.0380062802915
                    }
                }
            },
            "place_id": "ChIJA_f9JaO3t4kR13cdL_xFqmQ",
            "postcode_localities": [
                "PARCEL RETURN SERVICE",
                "PRS"
            ],
            "types": [
                "postal_code"
            ]
        },
        {
            "address_components": [
                {
                    "long_name": "20502",
                    "short_name": "20502",
                    "types": [
                        "postal_code"
                    ]
                },
                {
                    "long_name": "Northwest Washington",
                    "short_name": "Northwest Washington",
                    "types": [
                        "neighborhood",
                        "political"
                    ]
                },
                {
                    "long_name": "Washington",
                    "short_name": "Washington",
                    "types": [
                        "locality",
                        "political"
                    ]
                },
                {
                    "long_name": "District of Columbia",
                    "short_name": "DC",
                    "types": [
                        "administrative_area_level_1",
                        "political"
                    ]
                },
                {
                    "long_name": "United States",
                    "short_name": "US",
                    "types": [
                        "country",
                        "political"
                    ]
                }
            ],
            "formatted_address": "Washington, DC 20502, USA",
            "geometry": {
                "bounds": {
                    "northeast": {
                        "lat": 38.898761,
                        "lng": -77.03386789999999
                    },
                    "southwest": {
                        "lat": 38.8926099,
                        "lng": -77.03848579999999
                    }
                },
                "location": {
                    "lat": 38.8967584,
                    "lng": -77.03701629999999
                },
                "location_type": "APPROXIMATE",
                "viewport": {
                    "northeast": {
                        "lat": 38.898761,
                        "lng": -77.03386789999999
                    },
                    "southwest": {
                        "lat": 38.8926099,
                        "lng": -77.03848579999999
                    }
                }
            },
            "place_id": "ChIJFfZlI6O3t4kRT21JVHxrwx4",
            "types": [
                "postal_code"
            ]
        },
        {
            "address_components": [
                {
                    "long_name": "District of Columbia",
                    "short_name": "DC",
                    "types": [
                        "administrative_area_level_1",
                        "political"
                    ]
                },
                {
                    "long_name": "United States",
                    "short_name": "US",
                    "types": [
                        "country",
                        "political"
                    ]
                }
            ],
            "formatted_address": "District of Columbia, USA",
            "geometry": {
                "bounds": {
                    "northeast": {
                        "lat": 38.995548,
                        "lng": -76.90939299999999
                    },
                    "southwest": {
                        "lat": 38.7916449,
                        "lng": -77.119759
                    }
                },
                "location": {
                    "lat": 38.9059849,
                    "lng": -77.03341790000002
                },
                "location_type": "APPROXIMATE",
                "viewport": {
                    "northeast": {
                        "lat": 38.995548,
                        "lng": -76.90939299999999
                    },
                    "southwest": {
                        "lat": 38.7916449,
                        "lng": -77.119759
                    }
                }
            },
            "place_id": "ChIJW-T2Wt7Gt4kRmKFUAsCO4tY",
            "types": [
                "administrative_area_level_1",
                "political"
            ]
        },
        {
            "address_components": [
                {
                    "long_name": "Washington-Arlington-Alexandria, DC-VA-MD-WV",
                    "short_name": "Washington-Arlington-Alexandria, DC-VA-MD-WV",
                    "types": [
                        "political"
                    ]
                },
                {
                    "long_name": "United States",
                    "short_name": "US",
                    "types": [
                        "country",
                        "political"
                    ]
                }
            ],
            "formatted_address": "Washington-Arlington-Alexandria, DC-VA-MD-WV, USA",
            "geometry": {
                "bounds": {
                    "northeast": {
                        "lat": 39.720018,
                        "lng": -76.38622889999999
                    },
                    "southwest": {
                        "lat": 37.9911599,
                        "lng": -78.38668199999999
                    }
                },
                "location": {
                    "lat": 39.1289725,
                    "lng": -77.3783789
                },
                "location_type": "APPROXIMATE",
                "viewport": {
                    "northeast": {
                        "lat": 39.720018,
                        "lng": -76.38622889999999
                    },
                    "southwest": {
                        "lat": 37.9911599,
                        "lng": -78.38668199999999
                    }
                }
            },
            "place_id": "ChIJy25QE7lFtokRgaAnbc9iMr8",
            "types": [
                "political"
            ]
        },
        {
            "address_components": [
                {
                    "long_name": "Washington Metropolitan Area",
                    "short_name": "Washington Metropolitan Area",
                    "types": [
                        "political"
                    ]
                },
                {
                    "long_name": "United States",
                    "short_name": "US",
                    "types": [
                        "country",
                        "political"
                    ]
                }
            ],
            "formatted_address": "Washington Metropolitan Area, USA",
            "geometry": {
                "bounds": {
                    "northeast": {
                        "lat": 39.720045,
                        "lng": -76.32190779999999
                    },
                    "southwest": {
                        "lat": 37.991157,
                        "lng": -78.3866819
                    }
                },
                "location": {
                    "lat": 39.1289725,
                    "lng": -77.3783789
                },
                "location_type": "APPROXIMATE",
                "viewport": {
                    "northeast": {
                        "lat": 39.720045,
                        "lng": -76.32190779999999
                    },
                    "southwest": {
                        "lat": 37.991157,
                        "lng": -78.3866819
                    }
                }
            },
            "place_id": "ChIJgUbYn4i3t4kRBwT_p0uw078",
            "types": [
                "political"
            ]
        },
        {
            "address_components": [
                {
                    "long_name": "United States",
                    "short_name": "US",
                    "types": [
                        "country",
                        "political"
                    ]
                }
            ],
            "formatted_address": "United States",
            "geometry": {
                "bounds": {
                    "northeast": {
                        "lat": 71.5388001,
                        "lng": -66.885417
                    },
                    "southwest": {
                        "lat": 18.7763,
                        "lng": 170.5957
                    }
                },
                "location": {
                    "lat": 37.09024,
                    "lng": -95.712891
                },
                "location_type": "APPROXIMATE",
                "viewport": {
                    "northeast": {
                        "lat": 49.38,
                        "lng": -66.94
                    },
                    "southwest": {
                        "lat": 25.82,
                        "lng": -124.39
                    }
                }
            },
            "place_id": "ChIJCzYy5IS16lQRQrfeQ5K5Oxw",
            "types": [
                "country",
                "political"
            ]
        }
    ],
    "status": "OK"
}

const fleetRole='TestRole';

@Injectable()
export class FakeFleetService extends ShareCacheService {


    getFleetView() {
        return this.getCache('FLEET_VIEW');
    }

    setFleetView(payload) {
        return this.setCache('FLEET_VIEW', payload);
    }

    fetchLanguage(): Observable<any> {
        return Observable.from("test");
    }

    checkOrganisationNameExists(name) {
        return Observable.from("test");
    }

    createOrganisation(body) {
        return Observable.from("test");

    }

    updateOrganisation(org) {
        return Observable.from("test");
    }

    fetchOrganisationInfo(orgId) {
        return Observable.from("test");
    }

    setOrgId(orgId) {
        localStorage.setItem('orgID', orgId);
    }

    getOrgId() {
        return localStorage.getItem('orgID');
    }

    createFleet(body) {
        return Observable.of(createFleetResData);
    }

    fetchFleetInOrganisation(orgId) {
        return Observable.from("test");
    }

    fetchFleet(fleetId) {
        return Observable.from("test");

    }

    fetchFleetView(fleetId) {
        return Observable.of(fleetViewMockData);
    }

    updateFleet(fleet) {
        return Observable.from("test");
    }

    setFleetId(fleetId) {
        localStorage.setItem('fleetID', fleetId);
    }

    getFleetId() {
        return localStorage.getItem('fleetID');
    }

    getFleetName() {
        return localStorage.getItem('fleetName');
    }

    setFleetName(fleetName) {
        localStorage.setItem('fleetName', fleetName);
    }

    setFleetRole(role) {
        localStorage.setItem('fleetRole', role);
    }

    getFleetRole() {
        return fleetRole;
    }

    fetchVehicleInFleet(fleetId) {
        return Observable.from("test");
    }

    addVehiclesToFleet(fleetId, body) {
        return Observable.of(addVehiclesToFleetRes);

    }

    deleteVehicleFromFleet(fleetId, vehicleIds) {
        return Observable.of(deleteVehicleFromFleetRes);
    }

    getAddressForLatLng(lat, lng) {
        return Observable.of(getAddressForLatLngRes);
    }

    getPlacesPrediction(query) {
        return Observable.from("test");
    }

    getFleetProfileForIds(ids: any[]) {
        return Observable.of(fleetProfileIds);
    }

    updateFleetDriver(fleetId, body) {
        return Observable.of(updateFleetDriverRes);
    }
}
