import { InviteService } from 'app/service/invite.service';
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";

const inviteesMockRes = [
    {
        "id": "d24d1b14-4151-4a46-a2b9-7a5bb0cf9b33",
        "receiverEmail": "test@sanjana.com",
        "receiverPh": "254631970",
        "receiverUserId": null,
        "receiverName": "sanjana",
        "senderEmail": "gourav.sharma@widas.in",
        "senderUserId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "senderName": "Gourav Sharma",
        "responseType": "ABORTED",
        "createTime": 1515056814860,
        "updateTime": 1515056814860,
        "groupId": "2930d832-ffdd-4ef0-94f4-38444395fe02",
        "groupName": "gourav",
        "groupType": "FLEET",
        "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/2930d832-ffdd-4ef0-94f4-38444395fe02",
        "roles": [
            "DRIVER"
        ],
        "organisationId": "9704ff99-1336-4931-807f-7b61c6ebd2a0",
        "cidaasInviteId": null,
        "cidaasViewType": null
    },
    {
        "id": "ba8d54f3-f1b5-41bd-a25e-dd8f9686eb78",
        "receiverEmail": "kinnari@test.com",
        "receiverPh": "4563217980",
        "receiverUserId": null,
        "receiverName": "kinnari",
        "senderEmail": "gourav.sharma@widas.in",
        "senderUserId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "senderName": "Gourav Sharma",
        "responseType": "ABORTED",
        "createTime": 1515056901812,
        "updateTime": 1515056901812,
        "groupId": "2930d832-ffdd-4ef0-94f4-38444395fe02",
        "groupName": "gourav",
        "groupType": "FLEET",
        "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/2930d832-ffdd-4ef0-94f4-38444395fe02",
        "roles": [
            "ACCOUNTANT"
        ],
        "organisationId": "9704ff99-1336-4931-807f-7b61c6ebd2a0",
        "cidaasInviteId": null,
        "cidaasViewType": null
    },
    {
        "id": "2043613e-adfe-4094-be84-3a497f3b73e2",
        "receiverEmail": "gourav.sharma@widas.in",
        "receiverPh": null,
        "receiverUserId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "receiverName": "gourav",
        "senderEmail": "gourav.sharma@widas.in",
        "senderUserId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "senderName": "Gourav Sharma",
        "responseType": "ABORTED",
        "createTime": 1516088318314,
        "updateTime": 1516088318314,
        "groupId": "2930d832-ffdd-4ef0-94f4-38444395fe02",
        "groupName": "gourav",
        "groupType": "FLEET",
        "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/2930d832-ffdd-4ef0-94f4-38444395fe02",
        "roles": [
            "MANAGER"
        ],
        "organisationId": "9704ff99-1336-4931-807f-7b61c6ebd2a0",
        "cidaasInviteId": "ef62154e-d012-49d2-b240-ce7bd8b0054b",
        "cidaasViewType": "login"
    },
    {
        "id": "0ff594ed-d778-4028-897e-e4dd3a7a4dfb",
        "receiverEmail": "gourav.sharma@widas.in",
        "receiverPh": null,
        "receiverUserId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "receiverName": "gourav",
        "senderEmail": "gourav.sharma@widas.in",
        "senderUserId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "senderName": "Gourav Sharma",
        "responseType": "ABORTED",
        "createTime": 1516094361524,
        "updateTime": 1516094361524,
        "groupId": "2930d832-ffdd-4ef0-94f4-38444395fe02",
        "groupName": "gourav",
        "groupType": "FLEET",
        "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/2930d832-ffdd-4ef0-94f4-38444395fe02",
        "roles": [
            "MANAGER"
        ],
        "organisationId": "9704ff99-1336-4931-807f-7b61c6ebd2a0",
        "cidaasInviteId": "79afc635-7c43-4cb6-8ebc-590e6bf78fd8",
        "cidaasViewType": "login"
    },
    {
        "id": "0953f576-6cf9-4769-ba77-05b351457fd0",
        "receiverEmail": "gourav.sharma@widas.in",
        "receiverPh": null,
        "receiverUserId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "receiverName": "gourav",
        "senderEmail": "gourav.sharma@widas.in",
        "senderUserId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "senderName": "Gourav Sharma",
        "responseType": "ABORTED",
        "createTime": 1516094477675,
        "updateTime": 1516094477675,
        "groupId": "2930d832-ffdd-4ef0-94f4-38444395fe02",
        "groupName": "gourav",
        "groupType": "FLEET",
        "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/2930d832-ffdd-4ef0-94f4-38444395fe02",
        "roles": [
            "MANAGER"
        ],
        "organisationId": "9704ff99-1336-4931-807f-7b61c6ebd2a0",
        "cidaasInviteId": "da9aaa6c-2a2b-4f5b-a8f6-ae5b56d33b89",
        "cidaasViewType": "login"
    },
    {
        "id": "facf9aaf-e2ea-494b-9d1b-a7016d81a063",
        "receiverEmail": "gourav.sharma@widas.in",
        "receiverPh": null,
        "receiverUserId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "receiverName": "gourav",
        "senderEmail": "gourav.sharma@widas.in",
        "senderUserId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "senderName": "Gourav Sharma",
        "responseType": "ABORTED",
        "createTime": 1516095739190,
        "updateTime": 1516095739190,
        "groupId": "2930d832-ffdd-4ef0-94f4-38444395fe02",
        "groupName": "gourav",
        "groupType": "FLEET",
        "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/2930d832-ffdd-4ef0-94f4-38444395fe02",
        "roles": [
            "MANAGER"
        ],
        "organisationId": "9704ff99-1336-4931-807f-7b61c6ebd2a0",
        "cidaasInviteId": "f19a252a-9035-40b0-9960-ce4cd48243cf",
        "cidaasViewType": "login"
    },
    {
        "id": "6690287b-8b2c-438b-8d32-a03868a6de96",
        "receiverEmail": "gourav.sharma@widas.in",
        "receiverPh": null,
        "receiverUserId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "receiverName": "gourav",
        "senderEmail": "gourav.sharma@widas.in",
        "senderUserId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "senderName": "Gourav Sharma",
        "responseType": "ABORTED",
        "createTime": 1516095928062,
        "updateTime": 1516095928062,
        "groupId": "2930d832-ffdd-4ef0-94f4-38444395fe02",
        "groupName": "gourav",
        "groupType": "FLEET",
        "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/2930d832-ffdd-4ef0-94f4-38444395fe02",
        "roles": [
            "MANAGER"
        ],
        "organisationId": "9704ff99-1336-4931-807f-7b61c6ebd2a0",
        "cidaasInviteId": "58aa0b5b-4b25-42b6-8628-efc8e6b8febc",
        "cidaasViewType": "login"
    },
    {
        "id": "80503d0a-b7e4-4890-8e2c-87fae01d093e",
        "receiverEmail": "gourav.sharma@widas.in",
        "receiverPh": null,
        "receiverUserId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "receiverName": "gourav",
        "senderEmail": "gourav.sharma@widas.in",
        "senderUserId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "senderName": "Gourav Sharma",
        "responseType": "ABORTED",
        "createTime": 1516096322883,
        "updateTime": 1516096322883,
        "groupId": "2930d832-ffdd-4ef0-94f4-38444395fe02",
        "groupName": "gourav",
        "groupType": "FLEET",
        "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/2930d832-ffdd-4ef0-94f4-38444395fe02",
        "roles": [
            "MANAGER"
        ],
        "organisationId": "9704ff99-1336-4931-807f-7b61c6ebd2a0",
        "cidaasInviteId": "25206b71-58ac-491e-ab88-175c757441af",
        "cidaasViewType": "login"
    },
    {
        "id": "b7d24279-f1b8-444f-a977-e8b2c5d3461c",
        "receiverEmail": "gourav.sharma@widas.in",
        "receiverPh": null,
        "receiverUserId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "receiverName": "fourav",
        "senderEmail": "gourav.sharma@widas.in",
        "senderUserId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "senderName": "Gourav Sharma",
        "responseType": "ABORTED",
        "createTime": 1516096647840,
        "updateTime": 1516096647840,
        "groupId": "2930d832-ffdd-4ef0-94f4-38444395fe02",
        "groupName": "gourav",
        "groupType": "FLEET",
        "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/2930d832-ffdd-4ef0-94f4-38444395fe02",
        "roles": [
            "MANAGER"
        ],
        "organisationId": "9704ff99-1336-4931-807f-7b61c6ebd2a0",
        "cidaasInviteId": "1499a2be-a065-4958-b1d4-e5fff832d78e",
        "cidaasViewType": "login"
    },
    {
        "id": "9863561a-c385-4e25-94fd-d6b40e6a71dd",
        "receiverEmail": "gourav.sharma@widas.in",
        "receiverPh": null,
        "receiverUserId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "receiverName": "gourav",
        "senderEmail": "gourav.sharma@widas.in",
        "senderUserId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "senderName": "Gourav Sharma",
        "responseType": "ABORTED",
        "createTime": 1516096896296,
        "updateTime": 1516096896296,
        "groupId": "2930d832-ffdd-4ef0-94f4-38444395fe02",
        "groupName": "gourav",
        "groupType": "FLEET",
        "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/2930d832-ffdd-4ef0-94f4-38444395fe02",
        "roles": [
            "MANAGER"
        ],
        "organisationId": "9704ff99-1336-4931-807f-7b61c6ebd2a0",
        "cidaasInviteId": "9d8a421d-11c2-40d8-92a9-3ef64b66209a",
        "cidaasViewType": "login"
    },
    {
        "id": "554d0b2e-fbe7-4362-82cf-3fe093c3038e",
        "receiverEmail": "gouravsharma614@gmail.com",
        "receiverPh": null,
        "receiverUserId": "3ed30f00-19e7-4e89-b03d-a52ad506ccfb",
        "receiverName": "gourav",
        "senderEmail": "gourav.sharma@widas.in",
        "senderUserId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "senderName": "Gourav Sharma",
        "responseType": "ABORTED",
        "createTime": 1516096908549,
        "updateTime": 1516096908549,
        "groupId": "2930d832-ffdd-4ef0-94f4-38444395fe02",
        "groupName": "gourav",
        "groupType": "FLEET",
        "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/2930d832-ffdd-4ef0-94f4-38444395fe02",
        "roles": [
            "MANAGER"
        ],
        "organisationId": "9704ff99-1336-4931-807f-7b61c6ebd2a0",
        "cidaasInviteId": "9143ca47-862f-4e49-94e0-fa78d5a14af5",
        "cidaasViewType": "login"
    },
    {
        "id": "9c88f7c2-9dea-4e9f-b5c3-1860232ff6b4",
        "receiverEmail": "gourav.sharma@widas.in",
        "receiverPh": null,
        "receiverUserId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "receiverName": "gourav",
        "senderEmail": "gourav.sharma@widas.in",
        "senderUserId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "senderName": "Gourav Sharma",
        "responseType": "ABORTED",
        "createTime": 1516097063572,
        "updateTime": 1516097063572,
        "groupId": "2930d832-ffdd-4ef0-94f4-38444395fe02",
        "groupName": "gourav",
        "groupType": "FLEET",
        "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/2930d832-ffdd-4ef0-94f4-38444395fe02",
        "roles": [
            "MANAGER"
        ],
        "organisationId": "9704ff99-1336-4931-807f-7b61c6ebd2a0",
        "cidaasInviteId": "fc681717-6fba-430a-9dd8-6f67a8a7deb4",
        "cidaasViewType": "login"
    },
    {
        "id": "76e9b39a-8e2a-48ae-a28f-65bc007d23ea",
        "receiverEmail": "gourav.sharma@widas.in",
        "receiverPh": null,
        "receiverUserId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "receiverName": "gourav",
        "senderEmail": "gourav.sharma@widas.in",
        "senderUserId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "senderName": "Gourav Sharma",
        "responseType": "ABORTED",
        "createTime": 1516097249453,
        "updateTime": 1516097249453,
        "groupId": "2930d832-ffdd-4ef0-94f4-38444395fe02",
        "groupName": "gourav",
        "groupType": "FLEET",
        "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/2930d832-ffdd-4ef0-94f4-38444395fe02",
        "roles": [
            "MANAGER"
        ],
        "organisationId": "9704ff99-1336-4931-807f-7b61c6ebd2a0",
        "cidaasInviteId": "b69676c3-56cb-43dc-a113-df1cf59cf828",
        "cidaasViewType": "login"
    },
    {
        "id": "82245da0-018a-4130-b21a-542c14dcc3cb",
        "receiverEmail": "gourav.sharma@widas.in",
        "receiverPh": null,
        "receiverUserId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "receiverName": "gourav",
        "senderEmail": "gourav.sharma@widas.in",
        "senderUserId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "senderName": "Gourav Sharma",
        "responseType": "ABORTED",
        "createTime": 1516097402001,
        "updateTime": 1516097402001,
        "groupId": "2930d832-ffdd-4ef0-94f4-38444395fe02",
        "groupName": "gourav",
        "groupType": "FLEET",
        "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/2930d832-ffdd-4ef0-94f4-38444395fe02",
        "roles": [
            "MANAGER"
        ],
        "organisationId": "9704ff99-1336-4931-807f-7b61c6ebd2a0",
        "cidaasInviteId": "81997d1b-00cd-4d84-8a8c-017ab2643da4",
        "cidaasViewType": "login"
    },
    {
        "id": "e9445a8c-3f6e-4eb0-aece-ce623fea1529",
        "receiverEmail": "gourav.sharma@widas.in",
        "receiverPh": null,
        "receiverUserId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "receiverName": "gourav",
        "senderEmail": "gourav.sharma@widas.in",
        "senderUserId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "senderName": "Gourav Sharma",
        "responseType": "ABORTED",
        "createTime": 1516097474899,
        "updateTime": 1516097474899,
        "groupId": "2930d832-ffdd-4ef0-94f4-38444395fe02",
        "groupName": "gourav",
        "groupType": "FLEET",
        "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/2930d832-ffdd-4ef0-94f4-38444395fe02",
        "roles": [
            "MANAGER"
        ],
        "organisationId": "9704ff99-1336-4931-807f-7b61c6ebd2a0",
        "cidaasInviteId": "6ae90ca6-627b-4aae-bd34-ba62a02192ed",
        "cidaasViewType": "login"
    },
    {
        "id": "9ad03de6-40e7-42e9-87ab-9697f7d2a86b",
        "receiverEmail": "gourav.sharma@widas.in",
        "receiverPh": null,
        "receiverUserId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "receiverName": "gourav",
        "senderEmail": "gourav.sharma@widas.in",
        "senderUserId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "senderName": "Gourav Sharma",
        "responseType": "ABORTED",
        "createTime": 1516097600808,
        "updateTime": 1516097600808,
        "groupId": "2930d832-ffdd-4ef0-94f4-38444395fe02",
        "groupName": "gourav",
        "groupType": "FLEET",
        "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/2930d832-ffdd-4ef0-94f4-38444395fe02",
        "roles": [
            "MANAGER"
        ],
        "organisationId": "9704ff99-1336-4931-807f-7b61c6ebd2a0",
        "cidaasInviteId": "885cfc23-f993-45ee-b3fb-4de2d1fe33a7",
        "cidaasViewType": "login"
    },
    {
        "id": "1895ae1b-27f4-4a53-9953-28cfab2aa917",
        "receiverEmail": "gourav.sharma@widas.in",
        "receiverPh": null,
        "receiverUserId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "receiverName": "GOURAV",
        "senderEmail": "gourav.sharma@widas.in",
        "senderUserId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "senderName": "Gourav Sharma",
        "responseType": "ABORTED",
        "createTime": 1516097964709,
        "updateTime": 1516097964709,
        "groupId": "2930d832-ffdd-4ef0-94f4-38444395fe02",
        "groupName": "gourav",
        "groupType": "FLEET",
        "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/2930d832-ffdd-4ef0-94f4-38444395fe02",
        "roles": [
            "MANAGER"
        ],
        "organisationId": "9704ff99-1336-4931-807f-7b61c6ebd2a0",
        "cidaasInviteId": "c1ec1c72-7ece-4666-be41-c8a83a09f65b",
        "cidaasViewType": "login"
    },
    {
        "id": "795358b0-cba0-4800-9729-07ed4cdb9a06",
        "receiverEmail": "gourav.sharma@widas.in",
        "receiverPh": null,
        "receiverUserId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "receiverName": "GOURAV",
        "senderEmail": "gourav.sharma@widas.in",
        "senderUserId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "senderName": "Gourav Sharma",
        "responseType": "ABORTED",
        "createTime": 1516098297915,
        "updateTime": 1516098297915,
        "groupId": "2930d832-ffdd-4ef0-94f4-38444395fe02",
        "groupName": "gourav",
        "groupType": "FLEET",
        "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/2930d832-ffdd-4ef0-94f4-38444395fe02",
        "roles": [
            "MANAGER"
        ],
        "organisationId": "9704ff99-1336-4931-807f-7b61c6ebd2a0",
        "cidaasInviteId": "4b57ae53-6bf6-494f-8a15-6eadea2d052e",
        "cidaasViewType": "login"
    },
    {
        "id": "232a1601-4249-403d-b48a-86960c7084f1",
        "receiverEmail": "gourav.sharma@widas.in",
        "receiverPh": null,
        "receiverUserId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "receiverName": "gourav",
        "senderEmail": "gourav.sharma@widas.in",
        "senderUserId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "senderName": "Gourav Sharma",
        "responseType": "ABORTED",
        "createTime": 1516098522095,
        "updateTime": 1516098522095,
        "groupId": "2930d832-ffdd-4ef0-94f4-38444395fe02",
        "groupName": "gourav",
        "groupType": "FLEET",
        "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/2930d832-ffdd-4ef0-94f4-38444395fe02",
        "roles": [
            "MANAGER"
        ],
        "organisationId": "9704ff99-1336-4931-807f-7b61c6ebd2a0",
        "cidaasInviteId": "dedc4d14-c807-46cf-9312-0b13aca9dd8d",
        "cidaasViewType": "login"
    },
    {
        "id": "d255aa74-f831-4529-873f-b8509cc2bfbf",
        "receiverEmail": "gourav.sharma@widas.in",
        "receiverPh": null,
        "receiverUserId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "receiverName": "gourav",
        "senderEmail": "gourav.sharma@widas.in",
        "senderUserId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "senderName": "Gourav Sharma",
        "responseType": "REJECTED",
        "createTime": 1516098673004,
        "updateTime": 1516098673004,
        "groupId": "2930d832-ffdd-4ef0-94f4-38444395fe02",
        "groupName": "gourav",
        "groupType": "FLEET",
        "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/2930d832-ffdd-4ef0-94f4-38444395fe02",
        "roles": [
            "MANAGER"
        ],
        "organisationId": "9704ff99-1336-4931-807f-7b61c6ebd2a0",
        "cidaasInviteId": "8ea1871e-94cd-4d2a-828e-312e02baa15c",
        "cidaasViewType": "login"
    },
    {
        "id": "fd2e8fd4-d395-43c6-bcff-6cd72a71b0dc",
        "receiverEmail": "kinnari.shah@widas.in",
        "receiverPh": null,
        "receiverUserId": "73c8d168-0bd8-490c-b1d7-c40fb7e69a4f",
        "receiverName": "kinnari",
        "senderEmail": "gourav.sharma@widas.in",
        "senderUserId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "senderName": "Gourav Sharma",
        "responseType": "ABORTED",
        "createTime": 1516098823604,
        "updateTime": 1516098823604,
        "groupId": "2930d832-ffdd-4ef0-94f4-38444395fe02",
        "groupName": "gourav",
        "groupType": "FLEET",
        "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/2930d832-ffdd-4ef0-94f4-38444395fe02",
        "roles": [
            "MANAGER"
        ],
        "organisationId": "9704ff99-1336-4931-807f-7b61c6ebd2a0",
        "cidaasInviteId": "49b76256-e35d-47db-b992-acc392ccd10e",
        "cidaasViewType": "login"
    },
    {
        "id": "cf45b754-2243-4c3f-848a-0ad49be9ac46",
        "receiverEmail": "rameshwari.gopal@widas.in",
        "receiverPh": "7896451203",
        "receiverUserId": "4b7bf08e-a4aa-4da0-ba30-ad0020e80418",
        "receiverName": "Rameshwari",
        "senderEmail": "gourav.sharma@widas.in",
        "senderUserId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "senderName": "Gourav Sharma",
        "responseType": "REJECTED",
        "createTime": 1516337469788,
        "updateTime": 1516337469788,
        "groupId": "2930d832-ffdd-4ef0-94f4-38444395fe02",
        "groupName": "gourav",
        "groupType": "FLEET",
        "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/2930d832-ffdd-4ef0-94f4-38444395fe02",
        "roles": [
            "DRIVER"
        ],
        "organisationId": "9704ff99-1336-4931-807f-7b61c6ebd2a0",
        "cidaasInviteId": "9f99c3a9-debb-4549-ad6e-7d1522b70115",
        "cidaasViewType": "login"
    },
    {
        "id": "940e8fd5-a3f4-419f-8731-4e2c01a3c0ec",
        "receiverEmail": "sanjana.sangmeshwar@widas.in",
        "receiverPh": "8306017784",
        "receiverUserId": null,
        "receiverName": "sanjana",
        "senderEmail": "gourav.sharma@widas.in",
        "senderUserId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "senderName": "Gourav Sharma",
        "responseType": "PENDING",
        "createTime": 1518003097544,
        "updateTime": 1518003097544,
        "groupId": "2930d832-ffdd-4ef0-94f4-38444395fe02",
        "groupName": "gourav",
        "groupType": "FLEET",
        "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/2930d832-ffdd-4ef0-94f4-38444395fe02",
        "roles": [
            "ACCOUNTANT"
        ],
        "organisationId": "9704ff99-1336-4931-807f-7b61c6ebd2a0",
        "cidaasInviteId": "36a70af7-0c2f-4867-bce5-aa113dbb32ae",
        "cidaasViewType": "register"
    },
    {
        "id": "283f6747-e489-4ca2-9c4a-178246c1bacb",
        "receiverEmail": null,
        "receiverPh": null,
        "receiverUserId": null,
        "receiverName": null,
        "senderEmail": "gourav.sharma@widas.in",
        "senderUserId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "senderName": "Gourav Sharma",
        "responseType": "PENDING",
        "createTime": 1519299698588,
        "updateTime": 1519299698588,
        "groupId": "2930d832-ffdd-4ef0-94f4-38444395fe02",
        "groupName": "gourav",
        "groupType": "FLEET",
        "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/2930d832-ffdd-4ef0-94f4-38444395fe02",
        "roles": null,
        "organisationId": "9704ff99-1336-4931-807f-7b61c6ebd2a0",
        "cidaasInviteId": null,
        "cidaasViewType": null
    },
    {
        "id": "dbd5a950-d4da-484a-832b-6ae3c1b3e6a9",
        "receiverEmail": "aaa",
        "receiverPh": "aaa",
        "receiverUserId": null,
        "receiverName": "aaa",
        "senderEmail": "gourav.sharma@widas.in",
        "senderUserId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "senderName": "Gourav Sharma",
        "responseType": "PENDING",
        "createTime": 1519301074228,
        "updateTime": 1519301074228,
        "groupId": "2930d832-ffdd-4ef0-94f4-38444395fe02",
        "groupName": "gourav",
        "groupType": "FLEET",
        "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/2930d832-ffdd-4ef0-94f4-38444395fe02",
        "roles": [
            "CB_ADMIN"
        ],
        "organisationId": "9704ff99-1336-4931-807f-7b61c6ebd2a0",
        "cidaasInviteId": "503eb466-827b-462c-9ea4-a1f97600232f",
        "cidaasViewType": "register"
    },
    {
        "id": "c68b9c22-3129-413c-aeac-f70174dab00e",
        "receiverEmail": "driver17@mailinator.com",
        "receiverPh": null,
        "receiverUserId": "01de2025-3cec-4213-943f-55d60e24fc00",
        "receiverName": "driver17",
        "senderEmail": "gourav.sharma@widas.in",
        "senderUserId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "senderName": "Gourav Sharma",
        "responseType": "ACCEPTED",
        "createTime": 1519394273446,
        "updateTime": 1519394273446,
        "groupId": "2930d832-ffdd-4ef0-94f4-38444395fe02",
        "groupName": "gourav",
        "groupType": "FLEET",
        "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/2930d832-ffdd-4ef0-94f4-38444395fe02",
        "roles": [
            "DRIVER"
        ],
        "organisationId": "9704ff99-1336-4931-807f-7b61c6ebd2a0",
        "cidaasInviteId": "6b941a58-b94c-41ac-999a-bfb9011bb870",
        "cidaasViewType": "login"
    },
    {
        "id": "dae137c1-c88d-4e23-a880-70c34fee93fb",
        "receiverEmail": "kinnari.shah@widas.in",
        "receiverPh": "98306017784",
        "receiverUserId": "73c8d168-0bd8-490c-b1d7-c40fb7e69a4f",
        "receiverName": "kinnari",
        "senderEmail": "gourav.sharma@widas.in",
        "senderUserId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "senderName": "Gourav Sharma",
        "responseType": "PENDING",
        "createTime": 1519539613850,
        "updateTime": 1519539613850,
        "groupId": "2930d832-ffdd-4ef0-94f4-38444395fe02",
        "groupName": "gourav",
        "groupType": "FLEET",
        "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/2930d832-ffdd-4ef0-94f4-38444395fe02",
        "roles": [
            "CB_ADMIN"
        ],
        "organisationId": "9704ff99-1336-4931-807f-7b61c6ebd2a0",
        "cidaasInviteId": "b236d901-28b0-451c-a0b1-3224d871631d",
        "cidaasViewType": "login"
    },
    {
        "id": "0cd5e575-7565-4041-a6dd-3d8b0b29a2a4",
        "receiverEmail": "sanjana.sangameshwar@widas.in",
        "receiverPh": null,
        "receiverUserId": "e7ac552f-cd54-4af2-b0b5-c5b014cc1db2",
        "receiverName": "Sanjana",
        "senderEmail": "gourav.sharma@widas.in",
        "senderUserId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "senderName": "Gourav Sharma",
        "responseType": "ACCEPTED",
        "createTime": 1519736086101,
        "updateTime": 1519736086101,
        "groupId": "2930d832-ffdd-4ef0-94f4-38444395fe02",
        "groupName": "gourav",
        "groupType": "FLEET",
        "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/2930d832-ffdd-4ef0-94f4-38444395fe02",
        "roles": [
            "DRIVER"
        ],
        "organisationId": "9704ff99-1336-4931-807f-7b61c6ebd2a0",
        "cidaasInviteId": "4c6c89ef-3f2b-4dad-a78a-623e78877f2f",
        "cidaasViewType": "login"
    },
    {
        "id": "91b28539-2c5b-42e7-b615-58b7837065dd",
        "receiverEmail": "driver16@mailinator.com",
        "receiverPh": null,
        "receiverUserId": "ab322224-4095-4e41-9983-61dc70a8f861",
        "receiverName": "driver16",
        "senderEmail": "gourav.sharma@widas.in",
        "senderUserId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "senderName": "Gourav Sharma",
        "responseType": "ACCEPTED",
        "createTime": 1519987780549,
        "updateTime": 1519987780549,
        "groupId": "2930d832-ffdd-4ef0-94f4-38444395fe02",
        "groupName": "gourav",
        "groupType": "FLEET",
        "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/2930d832-ffdd-4ef0-94f4-38444395fe02",
        "roles": [
            "DRIVER"
        ],
        "organisationId": "9704ff99-1336-4931-807f-7b61c6ebd2a0",
        "cidaasInviteId": "8a1e05d2-f5c1-4324-8f60-f785231d2d1d",
        "cidaasViewType": "login"
    },
    {
        "id": "2c889b2c-e33d-4320-aa81-b1b8bd3b63e2",
        "receiverEmail": "alics015@yahoo.com",
        "receiverPh": null,
        "receiverUserId": "ff374aa1-a502-4dca-bfaf-d77eca8f0fcf",
        "receiverName": "alics015",
        "senderEmail": "gourav.sharma@widas.in",
        "senderUserId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "senderName": "Gourav Sharma",
        "responseType": "PENDING",
        "createTime": 1520500686054,
        "updateTime": 1520500686054,
        "groupId": "2930d832-ffdd-4ef0-94f4-38444395fe02",
        "groupName": "gourav",
        "groupType": "FLEET",
        "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/2930d832-ffdd-4ef0-94f4-38444395fe02",
        "roles": [
            "Driver"
        ],
        "organisationId": "9704ff99-1336-4931-807f-7b61c6ebd2a0",
        "cidaasInviteId": "954288ed-46b7-40a0-b5d6-309aebebca9b",
        "cidaasViewType": "login"
    },
    {
        "id": "4065bc38-30d9-400d-91b3-f96047ebfe7b",
        "receiverEmail": "driver16@mailinator.com",
        "receiverPh": null,
        "receiverUserId": "ab322224-4095-4e41-9983-61dc70a8f861",
        "receiverName": "aa",
        "senderEmail": "gourav.sharma@widas.in",
        "senderUserId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "senderName": "Gourav Sharma",
        "responseType": "REJECTED",
        "createTime": 1520502263088,
        "updateTime": 1520502263088,
        "groupId": "2930d832-ffdd-4ef0-94f4-38444395fe02",
        "groupName": "gourav",
        "groupType": "FLEET",
        "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/2930d832-ffdd-4ef0-94f4-38444395fe02",
        "roles": [
            "Driver"
        ],
        "organisationId": "9704ff99-1336-4931-807f-7b61c6ebd2a0",
        "cidaasInviteId": "10e302e7-326e-49f7-84e1-548b82f3e312",
        "cidaasViewType": "login"
    },
    {
        "id": "fa3ed7d4-e76d-43d0-baae-9314b6716e91",
        "receiverEmail": "driver18@mailinator.com",
        "receiverPh": null,
        "receiverUserId": "c7ec8c17-8a09-4689-b428-4325eec9f328",
        "receiverName": "Driver 18",
        "senderEmail": "gourav.sharma@widas.in",
        "senderUserId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "senderName": "Gourav Sharma",
        "responseType": "PENDING",
        "createTime": 1520503160562,
        "updateTime": 1520503160562,
        "groupId": "2930d832-ffdd-4ef0-94f4-38444395fe02",
        "groupName": "gourav",
        "groupType": "FLEET",
        "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/2930d832-ffdd-4ef0-94f4-38444395fe02",
        "roles": [
            "Driver"
        ],
        "organisationId": "9704ff99-1336-4931-807f-7b61c6ebd2a0",
        "cidaasInviteId": "1df62146-9aca-4f84-a272-0520744992e3",
        "cidaasViewType": "login"
    },
    {
        "id": "cb362113-9ed7-4133-99fd-c98eeeb60f3a",
        "receiverEmail": "driver19@mailinator.com",
        "receiverPh": null,
        "receiverUserId": "d2f0a3da-787a-4774-871f-c2734fcc4220",
        "receiverName": "Driver 19",
        "senderEmail": "gourav.sharma@widas.in",
        "senderUserId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "senderName": "Gourav Sharma",
        "responseType": "ABORTED",
        "createTime": 1520503786597,
        "updateTime": 1520503786597,
        "groupId": "2930d832-ffdd-4ef0-94f4-38444395fe02",
        "groupName": "gourav",
        "groupType": "FLEET",
        "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/2930d832-ffdd-4ef0-94f4-38444395fe02",
        "roles": [
            "Driver"
        ],
        "organisationId": "9704ff99-1336-4931-807f-7b61c6ebd2a0",
        "cidaasInviteId": "aeb71685-fc3b-4636-9ff8-1a4ccc5748b6",
        "cidaasViewType": "login"
    },
    {
        "id": "548db2d0-c806-4cc1-b8d3-143d2b7f9b10",
        "receiverEmail": "driver10@mailinator.com",
        "receiverPh": null,
        "receiverUserId": "95642b90-19f3-4b47-a1e8-eb04f5c18073",
        "receiverName": "Driver 10",
        "senderEmail": "gourav.sharma@widas.in",
        "senderUserId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "senderName": "Gourav Sharma",
        "responseType": "PENDING",
        "createTime": 1520504706019,
        "updateTime": 1520504706019,
        "groupId": "2930d832-ffdd-4ef0-94f4-38444395fe02",
        "groupName": "gourav",
        "groupType": "FLEET",
        "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/2930d832-ffdd-4ef0-94f4-38444395fe02",
        "roles": [
            "Driver"
        ],
        "organisationId": "9704ff99-1336-4931-807f-7b61c6ebd2a0",
        "cidaasInviteId": "7ac0c49d-2b96-4d60-84fc-93c91217f733",
        "cidaasViewType": "login"
    },
    {
        "id": "5dfeac5a-2d6f-4456-aa1f-74399b6d30b2",
        "receiverEmail": "driver20@mailinator.com",
        "receiverPh": null,
        "receiverUserId": "4836db69-4205-4bb9-8e82-f0333c273a4b",
        "receiverName": "Driver 20",
        "senderEmail": "gourav.sharma@widas.in",
        "senderUserId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "senderName": "Gourav Sharma",
        "responseType": "PENDING",
        "createTime": 1520507683255,
        "updateTime": 1520507683255,
        "groupId": "2930d832-ffdd-4ef0-94f4-38444395fe02",
        "groupName": "gourav",
        "groupType": "FLEET",
        "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/2930d832-ffdd-4ef0-94f4-38444395fe02",
        "roles": [
            "Driver"
        ],
        "organisationId": "9704ff99-1336-4931-807f-7b61c6ebd2a0",
        "cidaasInviteId": "1cec5777-2638-4151-8ed0-b4e580c4bae4",
        "cidaasViewType": "login"
    },
    {
        "id": "1154b719-da9b-4315-86b0-b50ca4645643",
        "receiverEmail": "driver21@mailinator.com",
        "receiverPh": null,
        "receiverUserId": "47659022-803d-4520-9f22-8f561ac39a55",
        "receiverName": "Driver 21",
        "senderEmail": "gourav.sharma@widas.in",
        "senderUserId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "senderName": "Gourav Sharma",
        "responseType": "PENDING",
        "createTime": 1520508808900,
        "updateTime": 1520508808900,
        "groupId": "2930d832-ffdd-4ef0-94f4-38444395fe02",
        "groupName": "gourav",
        "groupType": "FLEET",
        "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/2930d832-ffdd-4ef0-94f4-38444395fe02",
        "roles": [
            "Driver"
        ],
        "organisationId": "9704ff99-1336-4931-807f-7b61c6ebd2a0",
        "cidaasInviteId": "3837d399-b464-4260-8af6-560464e7f19e",
        "cidaasViewType": "login"
    },
    {
        "id": "06cfe373-7174-4511-b732-ab890918c5ab",
        "receiverEmail": "driver22@mailinator.com",
        "receiverPh": null,
        "receiverUserId": "ce809076-04e5-41cd-a993-6f849a6b1dbb",
        "receiverName": "Driver 22",
        "senderEmail": "gourav.sharma@widas.in",
        "senderUserId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "senderName": "Gourav Sharma",
        "responseType": "PENDING",
        "createTime": 1520508928785,
        "updateTime": 1520508928785,
        "groupId": "2930d832-ffdd-4ef0-94f4-38444395fe02",
        "groupName": "gourav",
        "groupType": "FLEET",
        "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/2930d832-ffdd-4ef0-94f4-38444395fe02",
        "roles": [
            "Driver"
        ],
        "organisationId": "9704ff99-1336-4931-807f-7b61c6ebd2a0",
        "cidaasInviteId": "76f343ab-d863-4b91-9120-0fc1eef0229c",
        "cidaasViewType": "login"
    },
    {
        "id": "27146de9-3d81-4a6f-962d-9961fc23e65f",
        "receiverEmail": "driver23@mailinator.com",
        "receiverPh": null,
        "receiverUserId": "bd8e67c2-50ec-450a-8344-d2d1b38d0c23",
        "receiverName": "Driver 23",
        "senderEmail": "gourav.sharma@widas.in",
        "senderUserId": "84813efe-55f5-47ee-8981-ac47590c3665",
        "senderName": "Gourav Sharma",
        "responseType": "PENDING",
        "createTime": 1520510891066,
        "updateTime": 1520510891066,
        "groupId": "2930d832-ffdd-4ef0-94f4-38444395fe02",
        "groupName": "gourav",
        "groupType": "FLEET",
        "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/2930d832-ffdd-4ef0-94f4-38444395fe02",
        "roles": [
            "Driver"
        ],
        "organisationId": "9704ff99-1336-4931-807f-7b61c6ebd2a0",
        "cidaasInviteId": "de8af6cc-8b8b-41e8-a5b9-283308dfb456",
        "cidaasViewType": "login"
    }];

const getInvitesForEmailMockRes = [{ "id": "230cb29e-a8b3-4d41-bf46-c03aee938f4a", "receiverEmail": "gourav.sharma@widas.in", "receiverPh": "316549870", "receiverUserId": "84813efe-55f5-47ee-8981-ac47590c3665", "receiverName": "gourav", "senderEmail": "gourav.sharma@widas.in", "senderUserId": "84813efe-55f5-47ee-8981-ac47590c3665", "senderName": "Gourav Sharma", "responseType": "PENDING", "createTime": 1521616731900, "updateTime": 1521616731900, "groupId": "b09abe0a-2c83-49e5-a2d7-0b41bdc5060a", "groupName": "bangalore fleet", "groupType": "FLEET", "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/b09abe0a-2c83-49e5-a2d7-0b41bdc5060a", "roles": ["MANAGER"], "organisationId": "9704ff99-1336-4931-807f-7b61c6ebd2a0", "cidaasInviteId": "8827c9dd-d4af-48b2-8419-d90b081998de", "cidaasViewType": "login" }];

const updateInviteMockRes = { "id": "26e8a0e5-20d1-4d64-b9a1-e51c4937ae11", "receiverEmail": "alics015@yahoo.com", "receiverPh": "9632454838", "receiverUserId": "ff374aa1-a502-4dca-bfaf-d77eca8f0fcf", "receiverName": "ali", "senderEmail": "fleettestmail@mailinator.com", "senderUserId": "db75e4e0-fe8e-4b60-aefc-9fc54f6182d7", "senderName": "test test", "responseType": "ACCEPTED", "createTime": 1516770095005, "updateTime": 1516770095005, "groupId": "9f81b3f9-4801-4efe-8036-b9f35d72691b", "groupName": "Fleet 2", "groupType": "FLEET", "path": "/a04b9927-8b35-4e66-99dd-fbbf4934574f/9f81b3f9-4801-4efe-8036-b9f35d72691b", "roles": ["MANAGER"], "organisationId": "a04b9927-8b35-4e66-99dd-fbbf4934574f", "cidaasInviteId": "f999bcea-dda4-4919-a3d4-7296d722581b", "cidaasViewType": "login" };
const sendInviteMockRes = { "id": "c2e622c3-aa07-4091-838e-75ed4dccdb31", "receiverEmail": "cyberali015+1@gmail.com", "receiverPh": null, "receiverUserId": "f13d3e28-768f-418a-bd98-c8debf177334", "receiverName": "Mohammedlai", "senderEmail": "alics015@yahoo.com", "senderUserId": "ff374aa1-a502-4dca-bfaf-d77eca8f0fcf", "senderName": "Mohammedali Hanabaratti", "responseType": "PENDING", "createTime": 1523256051959, "updateTime": 1523256051959, "groupId": "53585192-c299-4ba6-9a6b-ae20b3ad57d1", "groupName": "Test 3", "groupType": "FLEET", "path": "/dd51dabb-1477-4674-8529-ae33a11a238a/53585192-c299-4ba6-9a6b-ae20b3ad57d1/", "roles": ["DRIVER"], "organisationId": "dd51dabb-1477-4674-8529-ae33a11a238a", "cidaasInviteId": "9055052c-d007-4c8d-8fe2-d3be0cf44fca", "cidaasViewType": "login" };

@Injectable()
export class FakeInviteService extends InviteService {

    sendInvite(invite) {
        return Observable.of(sendInviteMockRes);
    }

    sendUnverifiedInvite(invite) {
        return Observable.of("test");
    }

    getInvites(orgId, groupId?, senderUserId?, responseType?) {
        return Observable.from(inviteesMockRes);
    }

    getInvitesForEmail(email) {
        return Observable.of(getInvitesForEmailMockRes);
    }

    updateInvite(invite) {
        return Observable.of(updateInviteMockRes);
    }
}