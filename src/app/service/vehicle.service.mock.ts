import {Injectable} from '@angular/core';
import {Constants} from './constants';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ShareCacheService} from '../utils/share-cache.service';

const fleetAccuralsMock={
    "0659897f-9fc1-4c26-86e8-a121551bc3d5": [
      {
        "id": "225d4af5-bf24-44a8-8d4a-6bcd51c9e5bb",
        "createTime": "2018-02-21T18:43:57.017",
        "updateTime": "2018-02-21T18:43:57.049",
        "userId": "4b7bf08e-a4aa-4da0-ba30-ad0020e80418",
        "vehicleId": "0659897f-9fc1-4c26-86e8-a121551bc3d5",
        "paymentDate": "2018-02-21T18:43:50.974",
        "currency": "₹",
        "priceperunit": 0,
        "amount": 0,
        "totalprice": 500,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "GARAGE",
        "deleted": false,
        "category": "BUSINESS",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "4036ec13-15b1-41ae-833b-88efc0b04efd",
        "createTime": "2018-02-12T04:55:28.804",
        "updateTime": "2018-02-12T04:55:29.151",
        "userId": "4b7bf08e-a4aa-4da0-ba30-ad0020e80418",
        "vehicleId": "0659897f-9fc1-4c26-86e8-a121551bc3d5",
        "paymentDate": "2018-02-12T04:55:14.540",
        "currency": "$",
        "priceperunit": 0,
        "amount": 0,
        "totalprice": 400,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "VEHICLEDEALER",
        "deleted": false,
        "category": "PRIVATE",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "2a6e523e-335a-45bb-89be-6452ca6a5d95",
        "createTime": "2018-02-12T04:54:01.419",
        "updateTime": "2018-02-12T04:54:01.767",
        "userId": "4b7bf08e-a4aa-4da0-ba30-ad0020e80418",
        "vehicleId": "0659897f-9fc1-4c26-86e8-a121551bc3d5",
        "paymentDate": "2018-02-12T04:53:45.632",
        "currency": "$",
        "priceperunit": 50,
        "amount": 4,
        "totalprice": 200,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "PARKING",
        "unit": "HRS",
        "deleted": false,
        "category": "PRIVATE",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "286b3f55-0aa9-4725-8af4-80e240b0b69f",
        "createTime": "2018-02-22T09:09:10.216",
        "updateTime": "2018-02-22T09:09:10.240",
        "userId": "4b7bf08e-a4aa-4da0-ba30-ad0020e80418",
        "vehicleId": "0659897f-9fc1-4c26-86e8-a121551bc3d5",
        "paymentDate": "2017-08-22T09:08:43.000",
        "currency": "₹",
        "priceperunit": 0,
        "amount": 0,
        "totalprice": 5000,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "INSURANCE",
        "deleted": false,
        "category": "BUSINESS",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "59148106-694c-44b5-aa9a-12a6fc3bab0e",
        "createTime": "2018-03-27T07:24:12.694",
        "updateTime": "2018-03-27T07:24:12.719",
        "userId": "4b7bf08e-a4aa-4da0-ba30-ad0020e80418",
        "vehicleId": "0659897f-9fc1-4c26-86e8-a121551bc3d5",
        "paymentDate": "2017-03-16T07:23:15.000",
        "currency": "₹",
        "priceperunit": 50,
        "amount": 4,
        "totalprice": 200,
        "geopoint": {
          "lon": 77.57474720000005,
          "lat": 12.9770823,
          "alt": 0
        },
        "mileage": 0,
        "costType": "PARKING",
        "unit": "HRS",
        "deleted": false,
        "category": "BUSINESS",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "d01df49c-65ed-4228-ba2c-360eb0ba05fa",
        "createTime": "2018-02-23T10:44:07.107",
        "updateTime": "2018-02-23T10:44:07.202",
        "userId": "4b7bf08e-a4aa-4da0-ba30-ad0020e80418",
        "vehicleId": "0659897f-9fc1-4c26-86e8-a121551bc3d5",
        "paymentDate": "2017-01-18T10:43:26.000",
        "currency": "₹",
        "priceperunit": 0,
        "amount": 0,
        "totalprice": 5000,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "VEHICLEDEALER",
        "deleted": false,
        "category": "BUSINESS",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02",
        "description": "vehicle dealer expense"
      }
    ],
    "51377997-152e-45a2-95e2-f6b246f6c75f": [
      {
        "id": "409d5fd4-d62d-4759-8c89-0cfe9b7627b8",
        "createTime": "2018-04-06T05:54:42.133",
        "updateTime": "2018-04-06T12:07:19.681",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "51377997-152e-45a2-95e2-f6b246f6c75f",
        "paymentDate": "2018-04-06T05:53:52.148",
        "currency": "₹",
        "receiptImage": {
          "costType": "PARKING",
          "pictureURL": "https://apis.test.carbookplus.com/pictures/USER/0/p-00e036f0399311e885776f85a6b86ad2-d06f0196538f48dd93828c63a09cf03d.png"
        },
        "priceperunit": 40,
        "amount": 4,
        "totalprice": 160,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "PARKING",
        "unit": "HRS",
        "deleted": false,
        "category": "BUSINESS",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "b441d8b3-72e2-416b-9cb4-8741ca2d70f7",
        "createTime": "2018-04-05T17:07:47.346",
        "updateTime": "2018-04-05T17:07:47.445",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "51377997-152e-45a2-95e2-f6b246f6c75f",
        "paymentDate": "2018-04-05T17:05:56.848",
        "currency": "₹",
        "receiptImage": {
          "costType": "FUEL",
          "pictureURL": "https://apis.test.carbookplus.com/pictures/USER/0/p-a3ee935038f311e887f66b09a182ed75-54ad6316bc4a4a72b5c15116a0a9c9d3.jpeg"
        },
        "priceperunit": 64,
        "amount": 2,
        "totalprice": 128,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "FUEL",
        "unit": "GALLON",
        "deleted": false,
        "category": "BUSINESS",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "a3f08a58-9870-41f3-9372-4eef379b3d6c",
        "createTime": "2018-04-05T16:57:29.508",
        "updateTime": "2018-04-05T16:57:29.616",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "51377997-152e-45a2-95e2-f6b246f6c75f",
        "paymentDate": "2018-04-05T16:55:49.300",
        "currency": "₹",
        "priceperunit": 50,
        "amount": 4,
        "totalprice": 200,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "PARKING",
        "unit": "HRS",
        "deleted": false,
        "category": "BUSINESS",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "fcdf5007-6b72-4152-a322-ea58b86e029b",
        "createTime": "2018-04-04T11:52:22.607",
        "updateTime": "2018-04-04T11:52:22.628",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "51377997-152e-45a2-95e2-f6b246f6c75f",
        "paymentDate": "2018-04-04T11:50:48.175",
        "currency": "₹",
        "priceperunit": 40,
        "amount": 5,
        "totalprice": 200,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "PARKING",
        "unit": "HRS",
        "deleted": false,
        "category": "BUSINESS",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "8ecf0d5e-19a0-4a75-bef8-2fb4fb2759ba",
        "createTime": "2018-04-03T07:48:01.530",
        "updateTime": "2018-04-03T07:48:27.300",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "51377997-152e-45a2-95e2-f6b246f6c75f",
        "paymentDate": "2018-04-02T16:47:44.000",
        "currency": "₹",
        "priceperunit": 40,
        "amount": 2,
        "totalprice": 80,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "PARKING",
        "unit": "HRS",
        "deleted": false,
        "category": "BUSINESS",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "c74163e0-d822-4d3c-9e22-6152def7c12f",
        "createTime": "2018-03-27T08:39:54.537",
        "updateTime": "2018-04-11T07:05:42.715",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "51377997-152e-45a2-95e2-f6b246f6c75f",
        "paymentDate": "2018-03-27T08:39:37.772",
        "currency": "₹",
        "receiptImage": {
          "costType": "GARAGE",
          "pictureURL": "https://apis.test.carbookplus.com/pictures/USER/0/p-be1e2ad03d5611e8a7d9c5e44df7df60-62424a097ba44038a869b4fe494f0d2d.png"
        },
        "priceperunit": 0,
        "amount": 0,
        "totalprice": 1500,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "GARAGE",
        "deleted": false,
        "category": "BUSINESS",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "93d5cdbb-e6f9-488c-ac35-9463234d36f5",
        "createTime": "2018-03-27T08:39:35.347",
        "updateTime": "2018-03-27T08:39:35.365",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "51377997-152e-45a2-95e2-f6b246f6c75f",
        "paymentDate": "2018-03-27T08:39:22.524",
        "currency": "₹",
        "priceperunit": 80,
        "amount": 5,
        "totalprice": 400,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "FUEL",
        "unit": "GALLON",
        "deleted": false,
        "category": "BUSINESS",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "9c493f4c-ddfd-4523-8848-38fe7dbd8e59",
        "createTime": "2018-03-27T08:39:20.340",
        "updateTime": "2018-03-27T08:42:59.370",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "51377997-152e-45a2-95e2-f6b246f6c75f",
        "paymentDate": "2018-03-27T08:39:15.375",
        "currency": "₹",
        "priceperunit": 0,
        "amount": 0,
        "totalprice": 500,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "GARAGE",
        "deleted": false,
        "category": "BUSINESS",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "69c6e6f1-aaa7-4738-83ca-fc88833fe498",
        "createTime": "2018-03-27T08:37:24.983",
        "updateTime": "2018-03-27T08:37:25.005",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "51377997-152e-45a2-95e2-f6b246f6c75f",
        "paymentDate": "2018-03-27T08:37:05.865",
        "currency": "₹",
        "priceperunit": 65,
        "amount": 4,
        "totalprice": 260,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "FUEL",
        "unit": "GALLON",
        "deleted": false,
        "category": "BUSINESS",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      }
    ],
    "44b1effb-265f-44dd-9f22-8f49c4abc9c6": [
      {
        "id": "c3942972-24a8-4923-bd1e-13ebd611267e",
        "createTime": "2018-04-11T09:52:15.495",
        "updateTime": "2018-04-11T09:52:15.519",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "44b1effb-265f-44dd-9f22-8f49c4abc9c6",
        "paymentDate": "2018-04-11T09:51:30.189",
        "currency": "₹",
        "receiptImage": {
          "costType": "GARAGE",
          "pictureURL": "https://apis.test.carbookplus.com/pictures/USER/0/p-fdb928e03d6d11e8b307b78de9d73cef-9d1fba9f0ae147a6aac6aff7d4e931a8.png"
        },
        "priceperunit": 0,
        "amount": 0,
        "totalprice": 6600,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "GARAGE",
        "deleted": false,
        "category": "BUSINESS",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "b362999c-dbc2-4443-8944-b0f65d2574cc",
        "createTime": "2018-04-11T04:54:56.648",
        "updateTime": "2018-04-11T04:54:56.673",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "44b1effb-265f-44dd-9f22-8f49c4abc9c6",
        "paymentDate": "2018-04-11T04:54:48.467",
        "currency": "₹",
        "priceperunit": 0,
        "amount": 0,
        "totalprice": 500,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "FINE",
        "deleted": false,
        "category": "BUSINESS",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "b7d1c8b0-1975-4747-bc6d-c02a722044da",
        "createTime": "2018-04-10T07:32:08.848",
        "updateTime": "2018-04-11T04:34:17.474",
        "userId": "4b7bf08e-a4aa-4da0-ba30-ad0020e80418",
        "vehicleId": "44b1effb-265f-44dd-9f22-8f49c4abc9c6",
        "paymentDate": "2018-04-10T07:32:06.802",
        "currency": "₹",
        "receiptImage": {
          "costType": "GARAGE",
          "pictureURL": "https://apis.test.carbookplus.com/pictures/USER/0/p-975ccc903d4111e8be04eb3bcf86c61b-8763ed5e21b442399c0aa069485cf976.png"
        },
        "priceperunit": 0,
        "amount": 0,
        "totalprice": 200,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "GARAGE",
        "deleted": false,
        "category": "BUSINESS",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "97c274a8-fca4-4bb3-aef0-8cf06fa9594d",
        "createTime": "2018-04-07T04:30:56.589",
        "updateTime": "2018-04-11T04:46:45.606",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "44b1effb-265f-44dd-9f22-8f49c4abc9c6",
        "paymentDate": "2018-04-07T04:30:36.046",
        "currency": "₹",
        "receiptImage": {
          "costType": "PARKING",
          "pictureURL": "https://apis.test.carbookplus.com/pictures/USER/0/p-52d257a03d4311e8936eab947f82739e-72670323f2784e2fb65fadabcca34b5c.jpeg"
        },
        "priceperunit": 40,
        "amount": 2,
        "totalprice": 80,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "PARKING",
        "unit": "HRS",
        "deleted": false,
        "category": "BUSINESS",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "29d3a7b4-4c6a-4815-9254-7df23041e439",
        "createTime": "2018-04-03T07:45:40.443",
        "updateTime": "2018-04-03T07:45:40.463",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "44b1effb-265f-44dd-9f22-8f49c4abc9c6",
        "paymentDate": "2018-04-03T09:45:12.222",
        "currency": "₹",
        "priceperunit": 50,
        "amount": 5,
        "totalprice": 250,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "FUEL",
        "unit": "LITER",
        "deleted": false,
        "category": "BUSINESS",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "f593084a-6688-42fc-8d5b-99736637feca",
        "createTime": "2018-01-07T10:07:41.389",
        "updateTime": "2018-01-19T07:50:59.236",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "44b1effb-265f-44dd-9f22-8f49c4abc9c6",
        "paymentDate": "2018-02-22T10:07:18.000",
        "currency": "$",
        "priceperunit": 100,
        "amount": 4,
        "totalprice": 400,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "PARKING",
        "unit": "HRS",
        "deleted": false,
        "category": "PRIVATE",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "d9fc1bd8-1185-4407-93ca-2ec53317236e",
        "createTime": "2018-02-21T18:42:50.159",
        "updateTime": "2018-02-21T18:42:50.182",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "44b1effb-265f-44dd-9f22-8f49c4abc9c6",
        "paymentDate": "2018-02-21T18:42:41.438",
        "currency": "₹",
        "priceperunit": 0,
        "amount": 0,
        "totalprice": 200,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "GARAGE",
        "deleted": false,
        "category": "BUSINESS",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "1e3cb3db-1b98-4437-b717-40064d5191ee",
        "createTime": "2018-02-20T07:42:41.812",
        "updateTime": "2018-02-20T07:43:39.693",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "44b1effb-265f-44dd-9f22-8f49c4abc9c6",
        "paymentDate": "2018-02-20T07:42:00.983",
        "currency": "$",
        "priceperunit": 0,
        "amount": 0,
        "totalprice": 50000,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "INSURANCE",
        "deleted": true,
        "category": "PRIVATE",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "7cb300bd-8422-48b4-928b-b734ff5b987b",
        "createTime": "2018-02-20T09:03:44.743",
        "updateTime": "2018-02-20T09:03:44.829",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "44b1effb-265f-44dd-9f22-8f49c4abc9c6",
        "paymentDate": "2018-02-13T09:03:27.000",
        "currency": "$",
        "priceperunit": 70,
        "amount": 3,
        "totalprice": 210,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "FUEL",
        "unit": "LITER",
        "deleted": false,
        "category": "PRIVATE",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "d1e2b476-7d4c-4cfd-8ebf-74962e0cb45d",
        "createTime": "2018-01-22T05:40:20.256",
        "updateTime": "2018-01-22T05:40:20.363",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "44b1effb-265f-44dd-9f22-8f49c4abc9c6",
        "paymentDate": "2018-02-13T05:20:24.000",
        "currency": "$",
        "priceperunit": 70,
        "amount": 3,
        "totalprice": 210,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "FUEL",
        "unit": "LITER",
        "deleted": false,
        "category": "PRIVATE",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "f2881515-a700-4642-abe5-7bea20971fa9",
        "createTime": "2018-02-09T06:05:31.801",
        "updateTime": "2018-03-27T07:12:45.171",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "44b1effb-265f-44dd-9f22-8f49c4abc9c6",
        "paymentDate": "2018-02-09T05:53:57.968",
        "currency": "$",
        "priceperunit": 0,
        "amount": 0,
        "totalprice": 250,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "VEHICLEDEALER",
        "deleted": true,
        "category": "PRIVATE",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "0ddc53d5-6dad-4a36-be38-03b8aa8a85ab",
        "createTime": "2018-02-12T04:54:26.513",
        "updateTime": "2018-03-27T07:12:55.926",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "44b1effb-265f-44dd-9f22-8f49c4abc9c6",
        "paymentDate": "2018-02-09T05:53:57.968",
        "currency": "$",
        "priceperunit": 0,
        "amount": 0,
        "totalprice": 250,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "VEHICLEDEALER",
        "deleted": true,
        "category": "PRIVATE",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "82f753e4-3af9-4ff4-a30c-5b7bb4e30090",
        "createTime": "2018-02-12T04:54:42.464",
        "updateTime": "2018-03-27T07:12:49.574",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "44b1effb-265f-44dd-9f22-8f49c4abc9c6",
        "paymentDate": "2018-02-09T05:53:57.968",
        "currency": "$",
        "priceperunit": 0,
        "amount": 0,
        "totalprice": 250,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "VEHICLEDEALER",
        "deleted": true,
        "category": "PRIVATE",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "bd167529-6e69-4988-885b-15f6646c2400",
        "createTime": "2018-01-19T09:22:48.311",
        "updateTime": "2018-01-19T09:22:48.336",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "44b1effb-265f-44dd-9f22-8f49c4abc9c6",
        "paymentDate": "2018-02-08T09:22:32.000",
        "currency": "$",
        "priceperunit": 67,
        "amount": 2,
        "totalprice": 134,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "FUEL",
        "unit": "LITER",
        "deleted": false,
        "category": "PRIVATE",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "9835a745-6798-4fec-81a4-d155ee528ec0",
        "createTime": "2018-01-19T08:30:58.443",
        "updateTime": "2018-03-21T05:25:12.133",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "44b1effb-265f-44dd-9f22-8f49c4abc9c6",
        "paymentDate": "2018-02-08T08:29:26.000",
        "currency": "$",
        "priceperunit": 67,
        "amount": 2,
        "totalprice": 134,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "FUEL",
        "unit": "LITER",
        "deleted": true,
        "category": "PRIVATE",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "b0ef1d25-e2cc-468c-9cdf-9bb325e520de",
        "createTime": "2018-01-19T11:56:28.253",
        "updateTime": "2018-01-19T11:56:28.301",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "44b1effb-265f-44dd-9f22-8f49c4abc9c6",
        "paymentDate": "2018-01-19T11:56:25.173",
        "currency": "$",
        "priceperunit": 0,
        "amount": 0,
        "totalprice": 600,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "GARAGE",
        "deleted": false,
        "category": "PRIVATE",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "1622cbd6-3d76-4645-b5de-26d6d4402e85",
        "createTime": "2018-01-19T09:13:44.299",
        "updateTime": "2018-01-19T09:13:44.314",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "44b1effb-265f-44dd-9f22-8f49c4abc9c6",
        "paymentDate": "2018-01-19T09:13:37.882",
        "currency": "$",
        "priceperunit": 40,
        "amount": 4,
        "totalprice": 160,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "PARKING",
        "unit": "HRS",
        "deleted": false,
        "category": "PRIVATE",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "065126d5-1b05-4c4f-adf9-087b1c765423",
        "createTime": "2018-01-08T11:05:22.439",
        "updateTime": "2018-03-27T07:14:26.914",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "44b1effb-265f-44dd-9f22-8f49c4abc9c6",
        "paymentDate": "2018-01-06T11:04:57.000",
        "currency": "$",
        "priceperunit": 0,
        "amount": 0,
        "totalprice": 350,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "VEHICLEDEALER",
        "deleted": true,
        "category": "PRIVATE",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "2913e2e2-d96c-4a4f-9614-e35cf8b39b80",
        "createTime": "2018-01-05T12:57:24.138",
        "updateTime": "2018-01-06T18:44:04.806",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "44b1effb-265f-44dd-9f22-8f49c4abc9c6",
        "paymentDate": "2018-01-05T13:57:07.000",
        "currency": "$",
        "priceperunit": 0,
        "amount": 0,
        "totalprice": 600,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "FINANCING",
        "deleted": true,
        "category": "PRIVATE",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "1a064c0b-bef2-4e69-a3dc-0386be16f4ca",
        "createTime": "2018-01-05T13:03:44.025",
        "updateTime": "2018-01-06T18:43:49.472",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "44b1effb-265f-44dd-9f22-8f49c4abc9c6",
        "paymentDate": "2018-01-05T13:03:27.000",
        "currency": "$",
        "priceperunit": 0,
        "amount": 0,
        "totalprice": 500,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "VEHICLEDEALER",
        "deleted": true,
        "category": "PRIVATE",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "c97e89ac-56c1-4487-a3e7-a4567b50c371",
        "createTime": "2018-01-05T13:01:17.286",
        "updateTime": "2018-01-06T18:43:52.144",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "44b1effb-265f-44dd-9f22-8f49c4abc9c6",
        "paymentDate": "2018-01-05T13:00:46.000",
        "currency": "$",
        "priceperunit": 0,
        "amount": 0,
        "totalprice": 650,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "TAX",
        "deleted": true,
        "category": "PRIVATE",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "efca5acd-c44b-4090-8eea-050f3e562483",
        "createTime": "2018-01-05T13:00:10.823",
        "updateTime": "2018-01-19T07:52:22.179",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "44b1effb-265f-44dd-9f22-8f49c4abc9c6",
        "paymentDate": "2018-01-05T12:59:42.000",
        "currency": "$",
        "priceperunit": 57,
        "amount": 3,
        "totalprice": 171,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "FUEL",
        "unit": "LITER",
        "deleted": true,
        "category": "PRIVATE",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "dca5f421-f921-4914-a5e3-4ac242f7575c",
        "createTime": "2018-01-05T12:54:07.483",
        "updateTime": "2018-01-06T18:44:13.928",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "44b1effb-265f-44dd-9f22-8f49c4abc9c6",
        "paymentDate": "2018-01-05T12:53:42.000",
        "currency": "$",
        "priceperunit": 0,
        "amount": 0,
        "totalprice": 60,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "GARAGE",
        "deleted": true,
        "category": "PRIVATE",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "65a94fde-e676-4709-b288-10b760b1443a",
        "createTime": "2018-01-05T12:45:30.495",
        "updateTime": "2018-01-05T12:52:11.481",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "44b1effb-265f-44dd-9f22-8f49c4abc9c6",
        "paymentDate": "2018-01-05T12:45:07.000",
        "currency": "$",
        "priceperunit": 0,
        "amount": 0,
        "totalprice": 450,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "GARAGE",
        "deleted": true,
        "category": "PRIVATE",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "381b64fb-1d5d-447e-afd3-c26f2c39c93b",
        "createTime": "2018-01-05T12:43:31.680",
        "updateTime": "2018-01-06T18:44:11.767",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "44b1effb-265f-44dd-9f22-8f49c4abc9c6",
        "paymentDate": "2018-01-05T12:43:19.633",
        "currency": "$",
        "priceperunit": 0,
        "amount": 0,
        "totalprice": 250,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "TAX",
        "deleted": true,
        "category": "PRIVATE",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "5b955bd8-4446-4043-98bd-9d380e376d03",
        "createTime": "2018-01-05T12:41:42.214",
        "updateTime": "2018-01-06T18:44:09.030",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "44b1effb-265f-44dd-9f22-8f49c4abc9c6",
        "paymentDate": "2018-01-05T12:41:30.142",
        "currency": "$",
        "priceperunit": 0,
        "amount": 0,
        "totalprice": 400,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "FINE",
        "deleted": true,
        "category": "PRIVATE",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "2839904f-e875-4300-a9ad-32a30a4e9603",
        "createTime": "2018-01-05T12:38:33.861",
        "updateTime": "2018-01-05T12:52:15.861",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "44b1effb-265f-44dd-9f22-8f49c4abc9c6",
        "paymentDate": "2018-01-05T12:38:27.391",
        "currency": "$",
        "priceperunit": 0,
        "amount": 0,
        "totalprice": 250,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "FOOD",
        "deleted": true,
        "category": "PRIVATE",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "2e70e077-2ec9-454e-a320-71acfa5e5fb0",
        "createTime": "2018-01-05T09:22:39.720",
        "updateTime": "2018-01-05T12:52:00.228",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "44b1effb-265f-44dd-9f22-8f49c4abc9c6",
        "paymentDate": "2018-01-05T09:22:27.167",
        "currency": "$",
        "priceperunit": 0,
        "amount": 0,
        "totalprice": 250,
        "geopoint": {
          "lon": 77.64760799999999,
          "lat": 12.9081357,
          "alt": 0
        },
        "mileage": 0,
        "costType": "FINE",
        "deleted": true,
        "category": "PRIVATE",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "88de4cea-fffb-446f-b5d7-1741e6173422",
        "createTime": "2018-01-05T07:18:42.650",
        "updateTime": "2018-01-05T07:46:16.257",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "44b1effb-265f-44dd-9f22-8f49c4abc9c6",
        "paymentDate": "2018-01-05T07:18:16.000",
        "currency": "$",
        "priceperunit": 0,
        "amount": 0,
        "totalprice": 300,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "TAX",
        "deleted": true,
        "category": "PRIVATE",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "20ae88e8-37c2-49bb-91e8-757bc572890d",
        "createTime": "2018-01-05T07:18:08.591",
        "updateTime": "2018-01-05T07:45:51.869",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "44b1effb-265f-44dd-9f22-8f49c4abc9c6",
        "paymentDate": "2018-01-05T07:18:01.481",
        "currency": "$",
        "priceperunit": 0,
        "amount": 0,
        "totalprice": 250,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "TAX",
        "deleted": true,
        "category": "PRIVATE",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "c71b08ce-29d6-43b5-8410-08073dff9144",
        "createTime": "2018-01-05T07:15:52.128",
        "updateTime": "2018-01-05T07:47:38.533",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "44b1effb-265f-44dd-9f22-8f49c4abc9c6",
        "paymentDate": "2018-01-05T07:15:35.000",
        "currency": "$",
        "priceperunit": 0,
        "amount": 0,
        "totalprice": 250,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "TOLL",
        "deleted": true,
        "category": "PRIVATE",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "bd870291-1952-497f-ac14-fe13233ada77",
        "createTime": "2018-01-05T07:13:48.708",
        "updateTime": "2018-01-05T07:48:43.745",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "44b1effb-265f-44dd-9f22-8f49c4abc9c6",
        "paymentDate": "2018-01-05T07:13:32.978",
        "currency": "$",
        "priceperunit": 0,
        "amount": 0,
        "totalprice": 250,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "OTHERS",
        "deleted": true,
        "category": "PRIVATE",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "f52d8495-5475-4343-8fa6-965f8646cd70",
        "createTime": "2018-01-05T07:05:54.747",
        "updateTime": "2018-01-05T07:41:27.805",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "44b1effb-265f-44dd-9f22-8f49c4abc9c6",
        "paymentDate": "2018-01-05T07:05:46.492",
        "currency": "$",
        "priceperunit": 0,
        "amount": 0,
        "totalprice": 150,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "FINE",
        "deleted": true,
        "category": "PRIVATE",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "d26357dc-87a6-4d5c-bad1-a7038b786f7f",
        "createTime": "2018-01-05T07:01:45.451",
        "updateTime": "2018-01-05T12:52:02.862",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "44b1effb-265f-44dd-9f22-8f49c4abc9c6",
        "paymentDate": "2018-01-05T07:01:33.554",
        "currency": "$",
        "priceperunit": 60,
        "amount": 3,
        "totalprice": 180,
        "geopoint": {
          "lon": 77.65305009999997,
          "lat": 12.9237982,
          "alt": 0
        },
        "mileage": 0,
        "costType": "PARKING",
        "unit": "HRS",
        "deleted": true,
        "category": "PRIVATE",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "faf765a0-9c45-4f07-92eb-ec52c2973367",
        "createTime": "2018-01-05T06:59:44.162",
        "updateTime": "2018-01-05T12:52:18.835",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "44b1effb-265f-44dd-9f22-8f49c4abc9c6",
        "paymentDate": "2018-01-05T06:59:20.221",
        "currency": "$",
        "priceperunit": 0,
        "amount": 0,
        "totalprice": 150,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "GARAGE",
        "deleted": true,
        "category": "PRIVATE",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "c82a8e98-89f2-4551-a55a-d6acfe54f732",
        "createTime": "2018-01-05T06:20:49.542",
        "updateTime": "2018-01-05T07:44:19.196",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "44b1effb-265f-44dd-9f22-8f49c4abc9c6",
        "paymentDate": "2018-01-05T06:20:45.647",
        "currency": "$",
        "priceperunit": 0,
        "amount": 0,
        "totalprice": 250,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "VEHICLEDEALER",
        "deleted": true,
        "category": "PRIVATE",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "44696c98-48b8-40a1-b199-6015d17620bd",
        "createTime": "2018-01-05T06:18:42.563",
        "updateTime": "2018-01-05T07:42:20.378",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "44b1effb-265f-44dd-9f22-8f49c4abc9c6",
        "paymentDate": "2018-01-05T06:18:32.376",
        "currency": "$",
        "priceperunit": 25,
        "amount": 2,
        "totalprice": 50,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "PARKING",
        "unit": "HRS",
        "deleted": true,
        "category": "PRIVATE",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "e5950686-47ab-4e36-8940-f4faab9da394",
        "createTime": "2018-01-05T06:56:26.271",
        "updateTime": "2018-01-05T12:51:56.706",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "44b1effb-265f-44dd-9f22-8f49c4abc9c6",
        "paymentDate": "2018-01-03T10:00:10.000",
        "currency": "$",
        "priceperunit": 0,
        "amount": 0,
        "totalprice": 650,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "FOOD",
        "deleted": true,
        "category": "PRIVATE",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "6a452c49-6b94-4090-a3cb-956ae32183d0",
        "createTime": "2018-01-19T09:23:33.156",
        "updateTime": "2018-01-19T09:23:33.176",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "44b1effb-265f-44dd-9f22-8f49c4abc9c6",
        "paymentDate": "2018-01-02T09:23:24.000",
        "currency": "$",
        "priceperunit": 0,
        "amount": 0,
        "totalprice": 250,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "FINANCING",
        "deleted": false,
        "category": "PRIVATE",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "101216ca-c05b-4892-9819-6fa4215ec58d",
        "createTime": "2017-12-29T11:22:45.341",
        "updateTime": "2018-01-04T08:54:57.113",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "44b1effb-265f-44dd-9f22-8f49c4abc9c6",
        "paymentDate": "2017-12-30T12:22:30.000",
        "currency": "EUR",
        "priceperunit": 15,
        "amount": 2,
        "totalprice": 30,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "PARKING",
        "unit": "HRS",
        "deleted": true,
        "category": "PRIVATE",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "cd6089ec-2719-403f-867a-b43266124293",
        "createTime": "2017-12-29T11:08:53.176",
        "updateTime": "2018-01-04T08:56:02.147",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "44b1effb-265f-44dd-9f22-8f49c4abc9c6",
        "paymentDate": "2017-12-30T12:08:37.000",
        "currency": "EUR",
        "priceperunit": 150,
        "amount": 2,
        "totalprice": 300,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "PARKING",
        "unit": "HRS",
        "deleted": true,
        "category": "PRIVATE",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "f226c7f9-8e83-4c87-a491-47a2df8e8f32",
        "createTime": "2017-12-29T11:26:47.966",
        "updateTime": "2018-01-04T08:54:42.081",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "44b1effb-265f-44dd-9f22-8f49c4abc9c6",
        "paymentDate": "2017-12-30T11:26:35.000",
        "currency": "EUR",
        "priceperunit": 0,
        "amount": 0,
        "totalprice": 123,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "FINANCING",
        "deleted": true,
        "category": "PRIVATE",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "9389681c-64dc-4ab1-bce1-f4ac49daef09",
        "createTime": "2017-12-28T12:27:14.638",
        "updateTime": "2018-01-04T08:57:33.635",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "44b1effb-265f-44dd-9f22-8f49c4abc9c6",
        "paymentDate": "2017-12-30T11:07:10.000",
        "currency": "$",
        "priceperunit": 0,
        "amount": 0,
        "totalprice": 600,
        "geopoint": {
          "lon": 77.61784490000002,
          "lat": 12.924688,
          "alt": 0
        },
        "mileage": 0,
        "costType": "FINANCING",
        "deleted": true,
        "category": "PRIVATE",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "06b528f2-2fcf-44ab-9f97-2155fe424e70",
        "createTime": "2017-12-14T12:05:05.149",
        "updateTime": "2017-12-29T09:35:21.420",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "44b1effb-265f-44dd-9f22-8f49c4abc9c6",
        "paymentDate": "2017-12-29T09:34:39.341",
        "currency": "EUR",
        "priceperunit": 0,
        "amount": 0,
        "totalprice": 350,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 8.3,
        "costType": "TAX",
        "deleted": true,
        "category": "PRIVATE",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "f5858a5c-7f85-4e0c-b14a-9891ff1edacf",
        "createTime": "2017-12-14T12:05:05.149",
        "updateTime": "2017-12-29T09:35:17.431",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "44b1effb-265f-44dd-9f22-8f49c4abc9c6",
        "paymentDate": "2017-12-29T09:34:16.333",
        "currency": "EUR",
        "priceperunit": 0,
        "amount": 0,
        "totalprice": 350,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 8.3,
        "costType": "TAX",
        "deleted": true,
        "category": "PRIVATE",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "a0b61ef4-7cda-46d9-912d-ef29a2561a25",
        "createTime": "2017-12-14T12:05:05.149",
        "updateTime": "2017-12-29T09:33:31.557",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "44b1effb-265f-44dd-9f22-8f49c4abc9c6",
        "paymentDate": "2017-12-29T09:31:50.488",
        "currency": "EUR",
        "priceperunit": 0,
        "amount": 0,
        "totalprice": 50,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 8.3,
        "costType": "CARWASHING",
        "deleted": true,
        "category": "PRIVATE",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "585637b4-e37a-40ee-820b-5c8117a505b7",
        "createTime": "2017-12-28T12:33:51.966",
        "updateTime": "2017-12-29T09:35:08.792",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "44b1effb-265f-44dd-9f22-8f49c4abc9c6",
        "paymentDate": "2017-12-28T12:33:51.966",
        "currency": "$",
        "priceperunit": 67,
        "amount": 2,
        "totalprice": 134,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "FUEL",
        "unit": "LITER",
        "deleted": true,
        "category": "PRIVATE",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "49847591-d237-4bbe-ab67-314d2eb3ae6b",
        "createTime": "2017-12-28T12:32:50.498",
        "updateTime": "2017-12-29T09:36:13.605",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "44b1effb-265f-44dd-9f22-8f49c4abc9c6",
        "paymentDate": "2017-12-28T12:32:50.498",
        "currency": "$",
        "priceperunit": 40,
        "amount": 2,
        "totalprice": 80,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "PARKING",
        "unit": "HRS",
        "deleted": true,
        "category": "PRIVATE",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "0ce22853-4d4b-4a3b-98a0-861e5c42bbfa",
        "createTime": "2017-12-28T10:53:40.018",
        "updateTime": "2017-12-29T09:33:24.452",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "44b1effb-265f-44dd-9f22-8f49c4abc9c6",
        "paymentDate": "2017-12-28T10:53:34.499",
        "currency": "$",
        "priceperunit": 0,
        "amount": 0,
        "totalprice": 160,
        "geopoint": {
          "lon": 77.64760799999999,
          "lat": 12.9081357,
          "alt": 0
        },
        "mileage": 0,
        "costType": "VEHICLEDEALER",
        "deleted": true,
        "category": "PRIVATE",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "1721377a-8e6f-4a4e-b8cb-06493ce5f48c",
        "createTime": "2017-12-28T10:53:26.287",
        "updateTime": "2017-12-29T09:36:06.624",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "44b1effb-265f-44dd-9f22-8f49c4abc9c6",
        "paymentDate": "2017-12-28T10:53:15.962",
        "currency": "$",
        "priceperunit": 25,
        "amount": 3,
        "totalprice": 85200,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "PARKING",
        "unit": "HRS",
        "deleted": true,
        "category": "PRIVATE",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "0bb011af-007a-4d16-bea7-1373d689ae50",
        "createTime": "2017-12-28T10:46:35.428",
        "updateTime": "2017-12-28T10:48:33.189",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "44b1effb-265f-44dd-9f22-8f49c4abc9c6",
        "paymentDate": "2017-12-28T10:46:28.888",
        "currency": "$",
        "priceperunit": 0,
        "amount": 0,
        "totalprice": 250,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "VEHICLEDEALER",
        "deleted": true,
        "category": "PRIVATE",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "8ee5937c-1084-40b5-98c3-a49e1a4ce974",
        "createTime": "2017-12-28T10:43:18.235",
        "updateTime": "2017-12-29T09:33:19.200",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "44b1effb-265f-44dd-9f22-8f49c4abc9c6",
        "paymentDate": "2017-12-28T10:43:01.715",
        "currency": "$",
        "priceperunit": 67,
        "amount": 2.5,
        "totalprice": 167.5,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "FUEL",
        "unit": "LITER",
        "deleted": true,
        "category": "PRIVATE",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "b8f632da-f748-4897-a6e7-a4808e19964d",
        "createTime": "2017-12-28T10:42:28.811",
        "updateTime": "2017-12-28T10:51:29.355",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "44b1effb-265f-44dd-9f22-8f49c4abc9c6",
        "paymentDate": "2017-12-28T10:41:49.792",
        "currency": "$",
        "priceperunit": 25,
        "amount": 4,
        "totalprice": 100,
        "geopoint": {
          "lon": 77.59207429999992,
          "lat": 12.998728,
          "alt": 0
        },
        "mileage": 0,
        "costType": "PARKING",
        "unit": "HRS",
        "deleted": true,
        "category": "PRIVATE",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "301bf295-a247-42bd-9fbe-bc08c4c97cd4",
        "createTime": "2017-12-28T10:27:55.615",
        "updateTime": "2017-12-28T10:27:55.848",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "44b1effb-265f-44dd-9f22-8f49c4abc9c6",
        "paymentDate": "2017-12-28T05:36:57.661",
        "currency": "EUR",
        "priceperunit": 200,
        "amount": 1,
        "totalprice": 400,
        "mileage": 0,
        "costType": "PARKING",
        "unit": "HRS",
        "deleted": true,
        "category": "PRIVATE",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "dfad8bf1-6029-47b3-89e6-3c4307d8e532",
        "createTime": "2017-12-28T10:24:57.414",
        "updateTime": "2017-12-28T10:24:57.453",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "44b1effb-265f-44dd-9f22-8f49c4abc9c6",
        "paymentDate": "2017-12-28T05:36:57.661",
        "currency": "EUR",
        "priceperunit": 200,
        "amount": 1,
        "totalprice": 400,
        "mileage": 0,
        "costType": "PARKING",
        "unit": "HRS",
        "deleted": true,
        "category": "PRIVATE",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "50722cbb-fac1-426e-8baa-85312d0b5c89",
        "createTime": "2017-12-28T10:25:27.373",
        "updateTime": "2017-12-28T10:25:27.781",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "44b1effb-265f-44dd-9f22-8f49c4abc9c6",
        "paymentDate": "2017-12-28T05:36:57.661",
        "currency": "EUR",
        "priceperunit": 200,
        "amount": 1,
        "totalprice": 400,
        "mileage": 0,
        "costType": "PARKING",
        "unit": "HRS",
        "deleted": true,
        "category": "PRIVATE",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "4956356e-86e6-4abb-a82b-7af8fa4dbf4e",
        "createTime": "2017-12-28T12:36:09.152",
        "updateTime": "2017-12-29T06:24:32.895",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "44b1effb-265f-44dd-9f22-8f49c4abc9c6",
        "paymentDate": "2017-12-26T12:35:57.000",
        "currency": "$",
        "priceperunit": 0,
        "amount": 0,
        "totalprice": 100000,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "INSURANCE",
        "deleted": true,
        "category": "PRIVATE",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "31fd6c0b-cbf9-4bd0-a253-f57707d6b94e",
        "createTime": "2017-12-28T12:34:44.830",
        "updateTime": "2017-12-29T09:33:27.894",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "44b1effb-265f-44dd-9f22-8f49c4abc9c6",
        "paymentDate": "2017-12-26T02:36:32.000",
        "currency": "$",
        "priceperunit": 0,
        "amount": 0,
        "totalprice": 570,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "GARAGE",
        "deleted": true,
        "category": "PRIVATE",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      }
    ],
    "aedcc10a-761b-41cf-aa7e-7b189d829344": [
      {
        "id": "f7d09a2c-461e-4657-947a-542cb5e5b84c",
        "createTime": "2018-02-27T04:53:27.536",
        "updateTime": "2018-02-27T04:55:55.987",
        "userId": "4b7bf08e-a4aa-4da0-ba30-ad0020e80418",
        "vehicleId": "aedcc10a-761b-41cf-aa7e-7b189d829344",
        "paymentDate": "2018-02-27T04:53:27.536",
        "currency": "₹",
        "priceperunit": 73.01,
        "amount": 10,
        "totalprice": 730.1,
        "geopoint": {
          "lon": 77.6699,
          "lat": 12.9232,
          "alt": 0
        },
        "mileage": 0,
        "costType": "FUEL",
        "unit": "LITER",
        "placeId": "2d4c08fa-3980-40ef-9797-632748e7a8a1",
        "deleted": false,
        "category": "BUSINESS",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      }
    ],
    "a7867877-003e-41ac-9acf-b9d41b311a72": [
      {
        "id": "da0c8cec-e05c-4e1f-9875-607332db21ea",
        "createTime": "2018-01-08T10:27:12.722",
        "updateTime": "2018-01-08T10:27:12.740",
        "userId": "4b7bf08e-a4aa-4da0-ba30-ad0020e80418",
        "vehicleId": "a7867877-003e-41ac-9acf-b9d41b311a72",
        "paymentDate": "2018-01-08T10:27:07.758",
        "currency": "$",
        "priceperunit": 0,
        "amount": 0,
        "totalprice": 250,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "VEHICLEDEALER",
        "deleted": false,
        "category": "PRIVATE",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "1acab519-4c05-4d4a-ba58-dbce93b07efd",
        "createTime": "2018-01-08T10:26:26.985",
        "updateTime": "2018-01-08T10:26:27.021",
        "userId": "4b7bf08e-a4aa-4da0-ba30-ad0020e80418",
        "vehicleId": "a7867877-003e-41ac-9acf-b9d41b311a72",
        "paymentDate": "2018-01-08T10:26:21.856",
        "currency": "$",
        "priceperunit": 0,
        "amount": 0,
        "totalprice": 25,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "VEHICLEDEALER",
        "deleted": false,
        "category": "PRIVATE",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      }
    ],
    "78f277b3-6fd6-4478-b5e6-76154c551547": [
      {
        "id": "f08c156b-55d0-4ebc-b30c-222bec88e507",
        "createTime": "2018-02-27T05:33:19.730",
        "updateTime": "2018-02-27T05:34:00.051",
        "userId": "4b7bf08e-a4aa-4da0-ba30-ad0020e80418",
        "vehicleId": "78f277b3-6fd6-4478-b5e6-76154c551547",
        "paymentDate": "2018-02-27T05:33:19.730",
        "currency": "₹",
        "priceperunit": 20,
        "amount": 5,
        "totalprice": 100,
        "mileage": 0,
        "costType": "PARKING",
        "unit": "HRS",
        "placeId": "",
        "deleted": false,
        "category": "BUSINESS",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "283d6dc6-d520-488b-8708-710ec64fa4a3",
        "createTime": "2018-02-27T05:03:30.031",
        "updateTime": "2018-02-27T05:32:06.615",
        "userId": "4b7bf08e-a4aa-4da0-ba30-ad0020e80418",
        "vehicleId": "78f277b3-6fd6-4478-b5e6-76154c551547",
        "paymentDate": "2018-02-27T05:03:30.031",
        "currency": "₹",
        "priceperunit": 200,
        "amount": 1,
        "totalprice": 200,
        "geopoint": {
          "lon": 77.6684412,
          "lat": 12.9196841,
          "alt": 0
        },
        "mileage": 0,
        "costType": "FINE",
        "unit": "HRS",
        "placeId": "",
        "deleted": false,
        "category": "BUSINESS",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "385209bc-93c7-4c11-9237-9894d3e317e6",
        "createTime": "2018-02-27T05:34:48.702",
        "updateTime": "2018-03-27T07:15:03.340",
        "userId": "4b7bf08e-a4aa-4da0-ba30-ad0020e80418",
        "vehicleId": "78f277b3-6fd6-4478-b5e6-76154c551547",
        "paymentDate": "2018-02-27T05:03:30.031",
        "currency": "₹",
        "priceperunit": 2000,
        "amount": 1,
        "totalprice": 2000,
        "geopoint": {
          "lon": 77.6684412,
          "lat": 12.9196841,
          "alt": 0
        },
        "mileage": 0,
        "costType": "VEHICLEDEALER",
        "unit": "HRS",
        "placeId": "",
        "deleted": true,
        "category": "BUSINESS",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02",
        "description": "business trip"
      },
      {
        "id": "62743e1a-e0f3-4761-aacf-5a15a57f165c",
        "createTime": "2018-02-21T10:59:27.282",
        "updateTime": "2018-02-21T10:59:27.291",
        "userId": "4b7bf08e-a4aa-4da0-ba30-ad0020e80418",
        "vehicleId": "78f277b3-6fd6-4478-b5e6-76154c551547",
        "paymentDate": "2018-02-21T10:59:11.463",
        "currency": "₹",
        "priceperunit": 60,
        "amount": 3,
        "totalprice": 180,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "FUEL",
        "unit": "LITER",
        "deleted": false,
        "category": "PRIVATE",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "03683b5b-a3c3-42c7-a14d-5cf6052f3f96",
        "createTime": "2018-02-21T10:49:53.961",
        "updateTime": "2018-02-21T10:49:53.971",
        "userId": "4b7bf08e-a4aa-4da0-ba30-ad0020e80418",
        "vehicleId": "78f277b3-6fd6-4478-b5e6-76154c551547",
        "paymentDate": "2018-02-21T10:49:39.132",
        "currency": "₹",
        "priceperunit": 0,
        "amount": 0,
        "totalprice": 400,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "FINE",
        "deleted": false,
        "category": "PRIVATE",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "956ba842-8896-4f74-ab58-0bc663925a50",
        "createTime": "2018-02-21T10:48:22.254",
        "updateTime": "2018-02-21T10:48:22.262",
        "userId": "4b7bf08e-a4aa-4da0-ba30-ad0020e80418",
        "vehicleId": "78f277b3-6fd6-4478-b5e6-76154c551547",
        "paymentDate": "2018-02-21T10:47:01.786",
        "currency": "₹",
        "priceperunit": 0,
        "amount": 0,
        "totalprice": 2500,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "GARAGE",
        "deleted": false,
        "category": "PRIVATE",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "be059e19-cde7-45bb-afd5-066a73b29eb3",
        "createTime": "2018-02-20T12:12:26.802",
        "updateTime": "2018-02-20T12:12:26.872",
        "userId": "4b7bf08e-a4aa-4da0-ba30-ad0020e80418",
        "vehicleId": "78f277b3-6fd6-4478-b5e6-76154c551547",
        "paymentDate": "2018-02-20T12:11:59.471",
        "currency": "$",
        "priceperunit": 0,
        "amount": 0,
        "totalprice": 2500,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "GARAGE",
        "deleted": false,
        "category": "PRIVATE",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "6c5e970c-17b6-43ac-9543-e98c82f68e93",
        "createTime": "2018-02-20T12:11:24.074",
        "updateTime": "2018-02-20T12:11:24.096",
        "userId": "4b7bf08e-a4aa-4da0-ba30-ad0020e80418",
        "vehicleId": "78f277b3-6fd6-4478-b5e6-76154c551547",
        "paymentDate": "2018-02-20T12:11:21.071",
        "currency": "$",
        "priceperunit": 0,
        "amount": 0,
        "totalprice": 25000,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "INSURANCE",
        "deleted": false,
        "category": "PRIVATE",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "547cfe0e-664c-4b7d-ad6e-b643fc776e84",
        "createTime": "2018-02-20T12:11:15.031",
        "updateTime": "2018-02-20T12:11:15.056",
        "userId": "4b7bf08e-a4aa-4da0-ba30-ad0020e80418",
        "vehicleId": "78f277b3-6fd6-4478-b5e6-76154c551547",
        "paymentDate": "2018-02-20T12:11:09.382",
        "currency": "$",
        "priceperunit": 0,
        "amount": 0,
        "totalprice": 250,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "GARAGE",
        "deleted": false,
        "category": "PRIVATE",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "d754dd15-0a5d-4958-b5fe-11dcf29a4c87",
        "createTime": "2018-02-27T05:11:46.449",
        "updateTime": "2018-03-27T07:15:09.388",
        "userId": "4b7bf08e-a4aa-4da0-ba30-ad0020e80418",
        "vehicleId": "78f277b3-6fd6-4478-b5e6-76154c551547",
        "paymentDate": "2018-02-20T05:11:23.000",
        "currency": "₹",
        "priceperunit": 0,
        "amount": 0,
        "totalprice": 500,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "VEHICLEDEALER",
        "deleted": true,
        "category": "BUSINESS",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02",
        "description": "description"
      },
      {
        "id": "cc4c48f2-372c-4d24-a9b5-0b92319457de",
        "createTime": "2018-02-20T12:17:15.151",
        "updateTime": "2018-02-20T12:17:15.160",
        "userId": "4b7bf08e-a4aa-4da0-ba30-ad0020e80418",
        "vehicleId": "78f277b3-6fd6-4478-b5e6-76154c551547",
        "paymentDate": "2018-02-13T12:17:04.000",
        "currency": "$",
        "priceperunit": 0,
        "amount": 0,
        "totalprice": 1500,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "GARAGE",
        "deleted": false,
        "category": "PRIVATE",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "3ad0b403-fa02-4b53-9cc1-2e071ad19db4",
        "createTime": "2018-02-22T09:07:26.175",
        "updateTime": "2018-02-22T09:07:26.199",
        "userId": "4b7bf08e-a4aa-4da0-ba30-ad0020e80418",
        "vehicleId": "78f277b3-6fd6-4478-b5e6-76154c551547",
        "paymentDate": "2017-10-17T09:07:05.000",
        "currency": "₹",
        "priceperunit": 80,
        "amount": 6,
        "totalprice": 480,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "PARKING",
        "unit": "HRS",
        "deleted": false,
        "category": "BUSINESS",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      }
    ],
    "7727852a-264e-4916-9d86-421a919352f4": [
      {
        "id": "bca2bfa1-afdd-4fec-9e8b-4a39a0875258",
        "createTime": "2018-04-06T10:35:03.024",
        "updateTime": "2018-04-06T11:16:09.781",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "7727852a-264e-4916-9d86-421a919352f4",
        "paymentDate": "2018-04-06T10:33:53.273",
        "currency": "₹",
        "receiptImage": {
          "costType": "PARKING",
          "pictureURL": ""
        },
        "priceperunit": 50,
        "amount": 4,
        "totalprice": 200,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "PARKING",
        "unit": "HRS",
        "deleted": false,
        "category": "BUSINESS",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "e76d07ea-6e34-411c-afdb-56881c197e2a",
        "createTime": "2018-02-22T12:38:09.564",
        "updateTime": "2018-04-06T11:21:51.129",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "7727852a-264e-4916-9d86-421a919352f4",
        "paymentDate": "2018-02-22T12:38:09.564",
        "currency": "$",
        "receiptImage": {
          "costType": "CARWASHING",
          "pictureURL": "https://apis.test.carbookplus.com/pictures/USER/0/p-b0bbc320398c11e8ad5251bc56d8829a-557bd7fe8aaa4b34b79383bf128947dc.png"
        },
        "priceperunit": 100,
        "amount": 1,
        "totalprice": 100,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "CARWASHING",
        "unit": "HRS",
        "placeId": "",
        "deleted": false,
        "category": "BUSINESS",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "822bedc3-cc40-4e6e-a56f-147daedd2db8",
        "createTime": "2018-02-21T09:23:49.730",
        "updateTime": "2018-02-21T09:23:49.743",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "7727852a-264e-4916-9d86-421a919352f4",
        "paymentDate": "2018-02-21T09:23:35.607",
        "currency": "₹",
        "priceperunit": 0,
        "amount": 0,
        "totalprice": 5000,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "GARAGE",
        "deleted": false,
        "category": "PRIVATE",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "e190c95a-50db-42a8-96de-f75fd1a53144",
        "createTime": "2018-02-21T09:22:39.757",
        "updateTime": "2018-02-21T09:22:39.786",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "7727852a-264e-4916-9d86-421a919352f4",
        "paymentDate": "2018-02-21T09:22:23.500",
        "currency": "$",
        "priceperunit": 0,
        "amount": 0,
        "totalprice": 15000,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "FOOD",
        "deleted": false,
        "category": "PRIVATE",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "852be928-4743-4aa6-9e12-73290b295f96",
        "createTime": "2018-02-21T09:15:29.513",
        "updateTime": "2018-02-21T09:15:29.624",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "7727852a-264e-4916-9d86-421a919352f4",
        "paymentDate": "2018-02-21T09:15:25.127",
        "currency": "$",
        "priceperunit": 0,
        "amount": 0,
        "totalprice": 2500,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "FOOD",
        "deleted": false,
        "category": "PRIVATE",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      }
    ],
    "edd8b86b-0d8f-4176-a6be-40d20bc06934": [
      {
        "id": "2e7b1953-9603-4625-ba69-9da56f5b0b6b",
        "createTime": "2018-02-23T06:13:03.750",
        "updateTime": "2018-02-23T06:13:53.065",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "edd8b86b-0d8f-4176-a6be-40d20bc06934",
        "paymentDate": "2018-02-23T06:13:03.750",
        "currency": "$",
        "priceperunit": 1000,
        "amount": 1,
        "totalprice": 1000,
        "mileage": 0,
        "costType": "FOOD",
        "unit": "HRS",
        "placeId": "",
        "deleted": false,
        "category": "BUSINESS",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "e4c6a260-fe77-4968-8168-d91e52bb441e",
        "createTime": "2018-02-23T06:12:39.027",
        "updateTime": "2018-02-23T06:12:39.046",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "edd8b86b-0d8f-4176-a6be-40d20bc06934",
        "paymentDate": "2018-02-23T06:12:34.817",
        "currency": "₹",
        "priceperunit": 0,
        "amount": 0,
        "totalprice": 400,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "FINE",
        "deleted": false,
        "category": "BUSINESS",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "c7254a4a-4999-4f2b-9dae-9f8476aa6ae2",
        "createTime": "2018-02-21T04:57:09.803",
        "updateTime": "2018-02-21T04:57:09.826",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "edd8b86b-0d8f-4176-a6be-40d20bc06934",
        "paymentDate": "2018-02-21T04:56:44.256",
        "currency": "$",
        "priceperunit": 62,
        "amount": 2,
        "totalprice": 124,
        "geopoint": {
          "lon": 77.22739580000007,
          "lat": 28.6618976,
          "alt": 0
        },
        "mileage": 0,
        "costType": "FUEL",
        "unit": "LITER",
        "deleted": false,
        "category": "PRIVATE",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "e5e0e226-a3c6-477f-accf-34065ab71369",
        "createTime": "2018-02-21T04:56:28.362",
        "updateTime": "2018-02-21T04:56:28.379",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "edd8b86b-0d8f-4176-a6be-40d20bc06934",
        "paymentDate": "2018-02-19T04:55:50.000",
        "currency": "$",
        "priceperunit": 25,
        "amount": 4,
        "totalprice": 100,
        "geopoint": {
          "lon": 0,
          "lat": 0,
          "alt": 0
        },
        "mileage": 0,
        "costType": "PARKING",
        "unit": "HRS",
        "deleted": false,
        "category": "PRIVATE",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      },
      {
        "id": "c77a19cf-73c3-42fc-a718-e1ff50727117",
        "createTime": "2018-02-23T06:10:36.280",
        "updateTime": "2018-02-23T10:11:38.875",
        "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "vehicleId": "edd8b86b-0d8f-4176-a6be-40d20bc06934",
        "paymentDate": "2018-02-14T06:10:36.280",
        "currency": "$",
        "priceperunit": 60,
        "amount": 1,
        "totalprice": 60,
        "mileage": 0,
        "costType": "CARWASHING",
        "unit": "HRS",
        "placeId": "",
        "deleted": false,
        "category": "BUSINESS",
        "fleetId": "2930d832-ffdd-4ef0-94f4-38444395fe02"
      }
    ]
  };

@Injectable()
export class FakeVehicleService extends ShareCacheService {


    constructor(private http: HttpClient) {
        super();
    }

    getVehicle() {
        return this.getCache('vehicle');
    }

    setVehicle(vehicle) {
        this.setCache('vehicle', vehicle);
    }

    setExpense(expense) {
        this.setCache('expenseReport', expense);
    }

    getExpense() {
        return this.getCache('expenseReport');
    }

    fetchUserVehicles(): Observable<any> {
        return this.http.get(Constants.CARBOOK_BASE_URL + Constants.USER_VEHICLES);

    }

    fetchVehicleByLicense(license) {
        return this.http.get<any>(Constants.SEARCH_VEHICLE_URL + license);

    }

    fetchVehicleInfo(vehicleId) {
        return this.http.get<any>(Constants.CARBOOK_BASE_URL + Constants.GET_VEHICLE_INFO(vehicleId));
    }

    fetchVehicleLogbook(vehicleId): Observable<any> {
        return this.http.get(Constants.CARBOOK_BASE_URL + Constants.VEHICLE_LOGBOOK_SRV_URL + vehicleId + Constants.VEHICLE_LOGBOOK_SRV_URL_FROMTO);

    }

    pollVehicleInfo(vehicleId) {
        return Observable.interval(5000)
            .switchMap(() => this.fetchVehicleInfo(vehicleId));
    }

    fetchMakeLogo(make) {
        return Constants.GET_VEHICLE_LOGO(make);
    }

    createNewVehicle(vehicle) {
        return this.http.post(Constants.CARBOOK_BASE_URL + Constants.USER_VEHICLES, vehicle);

    }

    updateVehicleInfo(vehicleId, vehicle) {
        return this.http.put(Constants.CARBOOK_BASE_URL + Constants.UPDATE_VEHICLE_INFO(vehicleId), vehicle);

    }

    createReminder(body) {
        let Params = new HttpParams();
        Params.append('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36');
        return this.http.post(Constants.CARBOOK_BASE_URL + Constants.CREATE_REMINDER, body, {params: Params});
    }

    fetchReminder(vehicleId) {
        return this.http.get(Constants.CARBOOK_BASE_URL + Constants.GET_REMINDER_VEHICLE(vehicleId));

    }

    getMakeAndModel(query, force?: boolean): Observable<any> {
        return this.fetchMakeAndModel(query);
    }

    fetchMakeAndModel(query) {
        return this.http.get(Constants.GET_VEHICLE_MAKE_MODEL(query, 'in'));

    }

    fetchLastKnownLocation(vehicleId) {
        return this.http.get(Constants.GET_LAST_KNOWN_LOCATION(vehicleId));
    }

    setDriverForVehicle(driverId, vehicleId) {
        return this.http.post(Constants.SET_DRIVER_ON_DUTY(driverId, vehicleId), null);
    }

    unsetDriverForVehicle(driverId, vehicleId) {
        return this.http.post(Constants.SET_DRIVER_OFF_DUTY(driverId, vehicleId), null);
    }

    printLogbook(id, from, to, email, subject) {
        return this.http.get(Constants.CARBOOK_BASE_URL + Constants.PRINT_LOGBOOK + '?vehicleId=' + id + '&from=' + from
            + '&to=' + to + '&emailIds=' + email + '&subject=' + subject);
    }

    getAllDriverDuty(fleetId) {
        return this.http.get(Constants.ALL_DRIVER_VEHICLE_DUTY(fleetId));
    }

    makeBookable(vehicleId) {
        return this.http.put(Constants.MAKE_VEHICLE_BOOKABLE(vehicleId), null);
    }

    makeNonBookable(vehicleId) {
        return this.http.put(Constants.MAKE_VEHICLE_NOT_BOOKABLE(vehicleId), null);
    }

    getMakeModelVariant(query) {
        return this.http.get(Constants.CARBOOK_BASE_URL + Constants.VEHICLE_SEARCH_URL + `search?countryCode=${localStorage.getItem('countryCode')}&searchvalue=` + query);
    }

    postGeoFenceData(payload) {
        return this.http.post(Constants.CARBOOK_BASE_URL + Constants.GEO_FENCE_BASE_URL + Constants.GEO_FENCE_DATA, payload);
    }

    updateGeoFenceData(payload) {
        return this.http.put(Constants.CARBOOK_BASE_URL + Constants.GEO_FENCE_BASE_URL + Constants.GEO_FENCE_DATA, payload);
    }

    getGeoFenceData(vehicleId, fenceId) {
        return this.http.get<any>(Constants.GET_GEO_FENCE_DETAIL(vehicleId, fenceId));
    }

    getGeoFenceList(vehicleId) {
        return this.http.get<any>(Constants.GET_GEO_FENCE_DATA(vehicleId));
    }

    deleteGeoFenceFromVehicle(payload) {
        return this.http.request('delete', Constants.CARBOOK_BASE_URL + Constants.GEO_FENCE_BASE_URL + Constants.GEO_FENCE_DATA,
            {
                body: payload
            });
    }

    getAccruals(vehicleId, fleetId) {
        let Params = new HttpParams();
        Params = fleetId ? Params.append('fleetId', fleetId) : Params;
        console.log('Params are for cost', Params);
        return this.http.get(Constants.GET_EXPENSE_DATA(vehicleId) + '/accruals', {params: Params});
    }

    getAccrualsFleet(fleetId, options: { from?: null, to?: null, costtype?: null } = {}) {
        return Observable.of(fleetAccuralsMock);
    }

    getCostReceipt(vehicleId, costId) {
        return this.http.get(Constants.GET_EXPENSE_DATA(vehicleId) + '/accruals/' + costId);
    }

    postAccruals(vehicleId, payload) {
        return this.http.post(Constants.GET_EXPENSE_DATA(vehicleId) + '/accruals', payload);
    }

    updateAccruals(vehicleId, payload) {
        return this.http.put(Constants.GET_EXPENSE_DATA(vehicleId) + '/accruals', payload);
    }

    getDriverData(driverId) {
        return this.http.get(Constants.CARBOOK_BASE_URL + Constants.GET_USER_INFO_BY_ID + driverId);
    }

    deleteVehiclesFromFleet(fleetId, payload) {
        return this.http.request('delete', Constants.CARBOOK_BASE_URL + Constants.FLEET_BASE_URL + Constants.DELETE_VEHICLES_FROM_FLEET + fleetId,
            {
                body: payload
            });
    }

    setDriver(vehicleId, payload) {
        return this.http.post(Constants.CARBOOK_BASE_URL + Constants.VEHICLE_DRIVER_URL.replace('${vehicleId}', vehicleId), payload);
    }

    updateNotification(fleetId, vehicleId, response) {
        return this.http.put(Constants.UPDATE_NOTIFICATION(fleetId, vehicleId) + '?responseType=' + response, null);
    }

    fetchTrackingMode(vehicleId) {
        let params = new HttpParams()
            .set('vehicleId', vehicleId)
            .set('deviceType', 'OBD')
            .set('mode', '0');
        return this.http.get(Constants.CARBOOK_BASE_URL + Constants.DEVICE_MAPPING_GET, {params: params});

    }

    updateTrackingMode(payload) {
        return this.http.post(Constants.CARBOOK_BASE_URL + Constants.DEVICE_MAPPING, payload);
    }

    deleteDriverFromVehicle(vehicleId, driverId, driver) {
        return this.http.request('delete', Constants.REMOVE_DRIVER_FROM_VEHICLE(vehicleId, driverId),
            {
                body: driver
            });
    }

}
