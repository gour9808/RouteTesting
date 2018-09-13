import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Constants } from './constants';
import { Cache } from '../utils/storage.provider';
import * as _ from 'lodash';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CommunicatorService } from "../common/communicator.service";

const ORGANISATION = 'carbook-organization-srv/rest/organisation';
const GET_ORGANIZATION_DETAILS = 'carbook-organization-srv/rest/organisation/';
const ORGANISATION_FLEET = ORGANISATION + '/activeFleets/';
const ORGANISATION_BULK = ORGANISATION + '/bulk';
const ORGANISATION_SEARCH = ORGANISATION + '/groups/group/search';
const GET_USER_GROUP_INFO = ORGANISATION + '/groups/user/';
const GET_GROUP_TYPE_ROLE = ORGANISATION + '/groups/type/';
const DELETE_USER = ORGANISATION + '/groups/map/user/';

const userGroups = {
    "success": true, "status": 200, "data": {
        "groupMetaData": [{ "_id": "28141b80-abc9-4751-8620-e678f6d5be6e", "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/008f977f-9607-4f59-85a5-4721bd44a3da/", "groupName": "gaurav 123", "groupType": "BRANCH", "groupId": "008f977f-9607-4f59-85a5-4721bd44a3da" }, { "_id": "a8ddb181-bd9a-440f-bc45-ff59bf1f5711", "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/0295a832-ddae-4d51-a6c5-c9a8681ff4c2/", "groupName": "giri", "groupType": "BRANCH", "groupId": "0295a832-ddae-4d51-a6c5-c9a8681ff4c2" }, { "_id": "61d46def-fe64-4588-9cab-f9752777e2c5", "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/0a40064d-12a5-4c58-b693-8cea8b6484b3/", "groupName": "sanjana", "groupType": "FLEET", "groupId": "0a40064d-12a5-4c58-b693-8cea8b6484b3" }, { "_id": "0ba273ed-f1c5-4847-b011-89e6cea646ed", "path": "/1f59bb39-6507-4de4-b688-a177fd0af36e/", "groupId": "1f59bb39-6507-4de4-b688-a177fd0af36e" }, { "_id": "1d6c43ea-90cc-4200-8040-835a674cbf44", "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/240af606-725b-4eed-976d-0f129a1bbaad/", "groupName": "Widas UI Fleet", "groupType": "FLEET", "groupId": "240af606-725b-4eed-976d-0f129a1bbaad" }, { "_id": "3d886112-1726-402d-b67b-2a13a1e2dc82", "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/2930d832-ffdd-4ef0-94f4-38444395fe02/", "groupName": "gourav", "groupType": "FLEET", "groupId": "2930d832-ffdd-4ef0-94f4-38444395fe02" }, { "_id": "ce560f41-8107-49f8-9576-3c3d12361cda", "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/342aedd0-14d8-4a4a-8403-4d8e1b5e84e0/", "groupType": "FLEET", "groupName": "Role fleet", "groupId": "342aedd0-14d8-4a4a-8403-4d8e1b5e84e0" }, { "_id": "3ab6b8ee-7e23-4973-b97c-1a2adbef13d0", "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/362cbd9e-6c64-4cc6-acb8-7a7d0f8a5fe2/", "groupName": "rameshwari", "groupType": "FLEET", "groupId": "362cbd9e-6c64-4cc6-acb8-7a7d0f8a5fe2" }, { "_id": "b9eb3d82-b565-4ec3-9c3c-2706f19c7b76", "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/3fddf4c5-972e-4f81-bd98-9d831bd16be0/", "groupName": "Nimbus", "groupType": "FLEET", "groupId": "3fddf4c5-972e-4f81-bd98-9d831bd16be0" }, { "_id": "a7266d66-3ad2-4a2c-a6ac-82014d44906a", "path": "/45c9493b-2984-472f-9506-0d639dee053f/", "groupName": "Organisation", "groupId": "45c9493b-2984-472f-9506-0d639dee053f" }, { "_id": "3fff0f49-fb78-47c0-8895-97652763bd23", "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/48051c28-17b4-4b77-939a-7de8734f71b7/", "groupName": "gaurav sharma", "groupType": "BRANCH", "groupId": "48051c28-17b4-4b77-939a-7de8734f71b7" }, { "_id": "f759d58a-8bde-4d53-afe8-0ee1f2c946be", "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/526d7655-8fa7-4286-b04f-77cb5e909c15/", "groupName": "giri fleet", "groupType": "FLEET", "groupId": "526d7655-8fa7-4286-b04f-77cb5e909c15" }, { "_id": "db17a613-49ce-4531-9079-73afe6113854", "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/54f16706-4244-4d73-ae39-c3d33dbe89d8/", "groupName": "sanjana", "groupType": "BRANCH", "groupId": "54f16706-4244-4d73-ae39-c3d33dbe89d8" }, { "_id": "5c4b4dbd-8043-4366-bfa1-23c1ccbacb7c", "path": "/94fc591d-25af-4e6b-8707-6eb4723d0c58/5c885851-5360-4a6d-8f5e-474c339ef710/", "groupName": "ss_new_fleet", "groupType": "FLEET", "groupId": "5c885851-5360-4a6d-8f5e-474c339ef710" }, { "_id": "2741f238-7756-4c07-9b62-73e2ac4eb64a", "path": "/e34dcc1c-d9f5-4adb-8bc4-79c095ec20b9/5cb8f5b6-dd5b-4507-982f-fa1736a267ee/", "groupName": "RGH Fleet", "groupType": "FLEET", "groupId": "5cb8f5b6-dd5b-4507-982f-fa1736a267ee" }, { "_id": "fd50f467-94b1-4128-bcea-6986f530eedf", "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/76e39667-9640-4065-819a-71a8eee18998/", "groupName": "kshah", "groupType": "BRANCH", "groupId": "76e39667-9640-4065-819a-71a8eee18998" }, { "_id": "d1a52c4b-69ca-49a8-a483-4cdb68238067", "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/7dd41e51-c224-4a34-a047-7c8abdae9b31/", "groupName": "kinnari  shah", "groupType": "FLEET", "groupId": "7dd41e51-c224-4a34-a047-7c8abdae9b31" }, { "_id": "a0dc778f-e41f-4e95-9943-66b4e31b0c21", "path": "/8de065ca-2084-44f3-ac51-33e13ee29512/", "groupName": "Dealer", "groupId": "8de065ca-2084-44f3-ac51-33e13ee29512" }, { "_id": "62623e16-991e-4037-a29a-cd2e9ca00639", "path": "/94fc591d-25af-4e6b-8707-6eb4723d0c58/", "groupName": "Bangalore Fleet", "groupType": "BUSINESS", "groupId": "94fc591d-25af-4e6b-8707-6eb4723d0c58" }, { "_id": "d3907fa0-b0f4-4d85-98a7-e97249271d53", "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/", "groupName": "gourav sharma", "groupType": "BUSINESS", "groupId": "9704ff99-1336-4931-807f-7b61c6ebd2a0" }, { "_id": "1f91759e-17fc-4d48-85e9-e07b15337ba2", "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/98c18658-6f72-4802-8856-2422dfd0f2f3/", "groupName": "harini", "groupType": "BRANCH", "groupId": "98c18658-6f72-4802-8856-2422dfd0f2f3" }, { "_id": "1fe779e5-2efd-4b46-9a68-7385ac0dc004", "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/a2e8343b-463f-4bb5-b184-56917431f26f/", "groupName": "vikey", "groupType": "BRANCH", "groupId": "a2e8343b-463f-4bb5-b184-56917431f26f" }, { "_id": "48ef8763-333b-45b3-b4cf-0c48ad2bc4d1", "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/b09abe0a-2c83-49e5-a2d7-0b41bdc5060a/", "groupName": "bangalore fleet", "groupType": "FLEET", "groupId": "b09abe0a-2c83-49e5-a2d7-0b41bdc5060a" }, { "_id": "4a14f2da-9f3b-442d-ad27-fadf66132bdc", "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/b9899b11-f880-4dc3-9a04-93a6fee9867a/", "groupName": "gourav", "groupType": "BRANCH", "groupId": "b9899b11-f880-4dc3-9a04-93a6fee9867a" }, { "_id": "fc31ec91-0bdc-48cb-9fb5-a2ae33196ebe", "path": "/c6a04b52-c7d5-453c-8a5c-4ca91637cea4/", "groupName": "Ali fleet", "groupType": "FLEET", "groupId": "c6a04b52-c7d5-453c-8a5c-4ca91637cea4" }, { "_id": "5fe4ca5d-3983-491d-a6c9-8973cc3add41", "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/c70eb745-e102-44de-a224-8dec340c29a7/", "groupName": "test fleet", "groupType": "FLEET", "groupId": "c70eb745-e102-44de-a224-8dec340c29a7" }, { "_id": "a335354c-21f1-42a8-8e5d-64d80515bc8a", "path": "/cf086aa3-85e6-40fa-8561-e7a14a47a848/", "groupName": "Organisation", "groupId": "cf086aa3-85e6-40fa-8561-e7a14a47a848" }, { "_id": "6cdc87c1-a4bf-4f01-9787-87dd86ac9b6f", "path": "/e34dcc1c-d9f5-4adb-8bc4-79c095ec20b9/", "groupName": "Rameshwari", "groupType": "BUSINESS", "groupId": "e34dcc1c-d9f5-4adb-8bc4-79c095ec20b9" }, { "_id": "8a7b71dd-f5cf-4693-9778-b4c45a954a55", "path": "/e34dcc1c-d9f5-4adb-8bc4-79c095ec20b9/eadad894-f20e-4030-9857-ff99b6776c4f/", "groupName": "Ram Fleet", "groupType": "FLEET", "groupId": "eadad894-f20e-4030-9857-ff99b6776c4f" }, { "_id": "74e2bb60-a196-4b6c-a035-5c3701ca9763", "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/faf7fe63-a64f-49e2-87d6-f951e1bf8e17/", "groupName": "Rameshwari", "groupType": "BRANCH", "groupId": "faf7fe63-a64f-49e2-87d6-f951e1bf8e17" }], "data": [{ "_id": "7abc0d91-5c9b-4bda-a510-f78d90ac5553", "groupId": "45c9493b-2984-472f-9506-0d639dee053f", "groupName": "Organisation", "path": "/45c9493b-2984-472f-9506-0d639dee053f/", "roles": ["USER"], "groupPath": "/undefined:45c9493b-2984-472f-9506-0d639dee053f/" }, { "_id": "521881ea-55e7-4ea6-b06e-4a6316fe6a33", "groupId": "cf086aa3-85e6-40fa-8561-e7a14a47a848", "groupName": "Organisation", "path": "/cf086aa3-85e6-40fa-8561-e7a14a47a848/", "roles": ["USER"], "groupPath": "/undefined:cf086aa3-85e6-40fa-8561-e7a14a47a848/" }, { "_id": "d2d44885-e627-4148-b34f-8385c3095a94", "groupId": "1f59bb39-6507-4de4-b688-a177fd0af36e", "path": "/1f59bb39-6507-4de4-b688-a177fd0af36e/", "roles": ["USER"], "groupPath": "/undefined:1f59bb39-6507-4de4-b688-a177fd0af36e/" }, { "_id": "4a5531ef-e875-4c0b-8a01-56003d0b76e0", "groupId": "8de065ca-2084-44f3-ac51-33e13ee29512", "groupName": "Dealer", "path": "/8de065ca-2084-44f3-ac51-33e13ee29512/", "roles": ["USER"], "groupPath": "/undefined:8de065ca-2084-44f3-ac51-33e13ee29512/" }, { "_id": "18c8a168-a8f4-4869-b907-baedb33ebb38", "groupId": "9704ff99-1336-4931-807f-7b61c6ebd2a0", "groupName": "gourav sharma", "groupType": "BUSINESS", "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/", "roles": ["OWNER", "CB_ADMIN"], "groupPath": "/BUSINESS:9704ff99-1336-4931-807f-7b61c6ebd2a0/" }, { "_id": "a2663a4d-4a9d-4e8d-9e47-d346e17938de", "groupId": "b9899b11-f880-4dc3-9a04-93a6fee9867a", "groupName": "gourav", "groupType": "BRANCH", "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/b9899b11-f880-4dc3-9a04-93a6fee9867a/", "roles": ["CB_ADMIN"], "groupPath": "/BUSINESS:9704ff99-1336-4931-807f-7b61c6ebd2a0/BRANCH:b9899b11-f880-4dc3-9a04-93a6fee9867a/" }, { "_id": "b9cfcbf9-bde2-49c8-a6fb-d695df3f20e0", "groupId": "2930d832-ffdd-4ef0-94f4-38444395fe02", "groupName": "gourav", "groupType": "FLEET", "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/2930d832-ffdd-4ef0-94f4-38444395fe02/", "roles": ["MANAGER", "DRIVER"], "groupPath": "/BUSINESS:9704ff99-1336-4931-807f-7b61c6ebd2a0/FLEET:2930d832-ffdd-4ef0-94f4-38444395fe02/" }, { "_id": "cf18a226-8562-4466-bf7b-52a687912045", "groupId": "76e39667-9640-4065-819a-71a8eee18998", "groupName": "kshah", "groupType": "BRANCH", "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/76e39667-9640-4065-819a-71a8eee18998/", "roles": ["CB_ADMIN"], "groupPath": "/BUSINESS:9704ff99-1336-4931-807f-7b61c6ebd2a0/BRANCH:76e39667-9640-4065-819a-71a8eee18998/" }, { "_id": "364a0b9e-b452-4861-9fb5-3cbf6f16697c", "groupId": "48051c28-17b4-4b77-939a-7de8734f71b7", "groupName": "gaurav sharma", "groupType": "BRANCH", "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/48051c28-17b4-4b77-939a-7de8734f71b7/", "roles": ["CB_ADMIN"], "groupPath": "/BUSINESS:9704ff99-1336-4931-807f-7b61c6ebd2a0/BRANCH:48051c28-17b4-4b77-939a-7de8734f71b7/" }, { "_id": "1e95d41a-045b-4b12-a796-fa11e219d811", "groupId": "008f977f-9607-4f59-85a5-4721bd44a3da", "groupName": "gaurav 123", "groupType": "BRANCH", "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/008f977f-9607-4f59-85a5-4721bd44a3da/", "roles": ["CB_ADMIN"], "groupPath": "/BUSINESS:9704ff99-1336-4931-807f-7b61c6ebd2a0/BRANCH:008f977f-9607-4f59-85a5-4721bd44a3da/" },
        { "_id": "1fa15b35-42e1-4b8d-a6e5-dd9ef47bb72c", "groupId": "54f16706-4244-4d73-ae39-c3d33dbe89d8", "groupName": "sanjana", "groupType": "BRANCH", "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/54f16706-4244-4d73-ae39-c3d33dbe89d8/", "roles": ["CB_ADMIN"], "groupPath": "/BUSINESS:9704ff99-1336-4931-807f-7b61c6ebd2a0/BRANCH:54f16706-4244-4d73-ae39-c3d33dbe89d8/" }, { "_id": "af8f7822-0f07-4197-b464-0665030bd592", "groupId": "7dd41e51-c224-4a34-a047-7c8abdae9b31", "groupName": "kinnari  shah", "groupType": "FLEET", "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/7dd41e51-c224-4a34-a047-7c8abdae9b31/", "roles": ["CB_ADMIN"], "groupPath": "/BUSINESS:9704ff99-1336-4931-807f-7b61c6ebd2a0/FLEET:7dd41e51-c224-4a34-a047-7c8abdae9b31/" }, { "_id": "46a02e40-c409-40d1-ba5a-8a43c47ac670", "groupId": "0a40064d-12a5-4c58-b693-8cea8b6484b3", "groupName": "sanjana", "groupType": "FLEET", "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/0a40064d-12a5-4c58-b693-8cea8b6484b3/", "roles": ["CB_ADMIN"], "groupPath": "/BUSINESS:9704ff99-1336-4931-807f-7b61c6ebd2a0/FLEET:0a40064d-12a5-4c58-b693-8cea8b6484b3/" }, { "_id": "a3868961-7f1b-459b-830d-8993d44f570a", "groupId": "362cbd9e-6c64-4cc6-acb8-7a7d0f8a5fe2", "groupName": "rameshwari", "groupType": "FLEET", "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/362cbd9e-6c64-4cc6-acb8-7a7d0f8a5fe2/", "roles": ["CB_ADMIN"], "groupPath": "/BUSINESS:9704ff99-1336-4931-807f-7b61c6ebd2a0/FLEET:362cbd9e-6c64-4cc6-acb8-7a7d0f8a5fe2/" }, { "_id": "cea479aa-3c4e-414f-a90b-ea4feb2ac94e", "groupId": "faf7fe63-a64f-49e2-87d6-f951e1bf8e17", "groupName": "Rameshwari", "groupType": "BRANCH", "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/faf7fe63-a64f-49e2-87d6-f951e1bf8e17/", "roles": ["CB_ADMIN"], "groupPath": "/BUSINESS:9704ff99-1336-4931-807f-7b61c6ebd2a0/BRANCH:faf7fe63-a64f-49e2-87d6-f951e1bf8e17/" }, { "_id": "c944f78b-ec27-4dbe-b1d3-d707f8e67852", "groupId": "0295a832-ddae-4d51-a6c5-c9a8681ff4c2", "groupName": "giri", "groupType": "BRANCH", "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/0295a832-ddae-4d51-a6c5-c9a8681ff4c2/", "roles": ["CB_ADMIN"], "groupPath": "/BUSINESS:9704ff99-1336-4931-807f-7b61c6ebd2a0/BRANCH:0295a832-ddae-4d51-a6c5-c9a8681ff4c2/" }, { "_id": "04d6a2ba-90d5-4e4d-86b2-be898bfb5693", "groupId": "526d7655-8fa7-4286-b04f-77cb5e909c15", "groupName": "giri fleet", "groupType": "FLEET", "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/526d7655-8fa7-4286-b04f-77cb5e909c15/", "roles": ["CB_ADMIN", "ACCOUNTANT", "DRIVER"], "groupPath": "/BUSINESS:9704ff99-1336-4931-807f-7b61c6ebd2a0/FLEET:526d7655-8fa7-4286-b04f-77cb5e909c15/" }, { "_id": "4134cf4e-28a9-4b6e-b1cd-a6459b7fc6d9", "groupId": "a2e8343b-463f-4bb5-b184-56917431f26f", "groupName": "vikey", "groupType": "BRANCH", "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/a2e8343b-463f-4bb5-b184-56917431f26f/", "roles": ["CB_ADMIN"], "groupPath": "/BUSINESS:9704ff99-1336-4931-807f-7b61c6ebd2a0/BRANCH:a2e8343b-463f-4bb5-b184-56917431f26f/" }, { "_id": "49cc1c63-7a02-4fb7-806a-bcff37286aa2", "groupId": "b09abe0a-2c83-49e5-a2d7-0b41bdc5060a", "groupName": "bangalore fleet", "groupType": "FLEET", "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/b09abe0a-2c83-49e5-a2d7-0b41bdc5060a/", "roles": ["CB_ADMIN", "MANAGER", "DRIVER"], "groupPath": "/BUSINESS:9704ff99-1336-4931-807f-7b61c6ebd2a0/FLEET:b09abe0a-2c83-49e5-a2d7-0b41bdc5060a/" }, { "_id": "c66cc740-cd5b-43f9-83a8-4e085b325cc6", "groupId": "98c18658-6f72-4802-8856-2422dfd0f2f3", "groupName": "harini", "groupType": "BRANCH", "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/98c18658-6f72-4802-8856-2422dfd0f2f3/", "roles": ["CB_ADMIN"], "groupPath": "/BUSINESS:9704ff99-1336-4931-807f-7b61c6ebd2a0/BRANCH:98c18658-6f72-4802-8856-2422dfd0f2f3/" }, { "_id": "b4a8bd92-5b15-4731-9a6a-f7a7556c99f9", "groupId": "eadad894-f20e-4030-9857-ff99b6776c4f", "groupName": "Ram Fleet", "groupType": "FLEET", "path": "/e34dcc1c-d9f5-4adb-8bc4-79c095ec20b9/eadad894-f20e-4030-9857-ff99b6776c4f/", "roles": ["MANAGER"], "groupPath": "/BUSINESS:e34dcc1c-d9f5-4adb-8bc4-79c095ec20b9/FLEET:eadad894-f20e-4030-9857-ff99b6776c4f/" }, { "_id": "1bfcdeda-9a7f-45e5-9264-200631676fe0", "groupId": "5cb8f5b6-dd5b-4507-982f-fa1736a267ee", "groupName": "RGH Fleet", "groupType": "FLEET", "path": "/e34dcc1c-d9f5-4adb-8bc4-79c095ec20b9/5cb8f5b6-dd5b-4507-982f-fa1736a267ee/", "roles": ["DRIVER"], "groupPath": "/BUSINESS:e34dcc1c-d9f5-4adb-8bc4-79c095ec20b9/FLEET:5cb8f5b6-dd5b-4507-982f-fa1736a267ee/" }, { "_id": "7b007785-f941-43b1-8fdf-4eaff354ad73", "groupId": "3fddf4c5-972e-4f81-bd98-9d831bd16be0", "groupName": "Nimbus", "groupType": "FLEET", "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/3fddf4c5-972e-4f81-bd98-9d831bd16be0/", "roles": ["ACCOUNTANT"], "groupPath": "/BUSINESS:9704ff99-1336-4931-807f-7b61c6ebd2a0/FLEET:3fddf4c5-972e-4f81-bd98-9d831bd16be0/" }, { "_id": "7177f50f-163b-4190-880a-66b903419a9c", "groupId": "5c885851-5360-4a6d-8f5e-474c339ef710", "groupName": "ss_new_fleet", "groupType": "FLEET", "path": "/94fc591d-25af-4e6b-8707-6eb4723d0c58/5c885851-5360-4a6d-8f5e-474c339ef710/", "roles": [], "groupPath": "/BUSINESS:94fc591d-25af-4e6b-8707-6eb4723d0c58/FLEET:5c885851-5360-4a6d-8f5e-474c339ef710/" }, { "_id": "e3ce9ecf-ad40-476d-a269-b4e5121ecd52", "groupId": "c70eb745-e102-44de-a224-8dec340c29a7", "groupName": "test fleet", "groupType": "FLEET", "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/c70eb745-e102-44de-a224-8dec340c29a7/", "roles": ["CB_ADMIN"], "groupPath": "/BUSINESS:9704ff99-1336-4931-807f-7b61c6ebd2a0/FLEET:c70eb745-e102-44de-a224-8dec340c29a7/" }, { "_id": "ef4447ae-a4f6-4e71-bf0d-618872453efc", "groupId": "c6a04b52-c7d5-453c-8a5c-4ca91637cea4", "groupName": "Ali fleet", "groupType": "FLEET", "path": "/c6a04b52-c7d5-453c-8a5c-4ca91637cea4/", "roles": ["CB_ADMIN"], "groupPath": "/FLEET:c6a04b52-c7d5-453c-8a5c-4ca91637cea4/" }, { "_id": "4d8f3e80-8b59-4728-97ea-0f98a041c56b", "groupId": "240af606-725b-4eed-976d-0f129a1bbaad", "groupName": "Widas UI Fleet", "groupType": "FLEET", "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/240af606-725b-4eed-976d-0f129a1bbaad/", "roles": ["CB_ADMIN"], "groupPath": "/BUSINESS:9704ff99-1336-4931-807f-7b61c6ebd2a0/FLEET:240af606-725b-4eed-976d-0f129a1bbaad/" }, { "_id": "fe2d8014-dea8-4cfb-a4d9-64763acd29e2", "groupId": "CIDAAS_USERS", "groupName": "CIDAAS_USERS", "path": "/CIDAAS_USERS/", "roles": ["USER"], "groupPath": "/:CIDAAS_USERS/" }, { "_id": "c4b28f31-8fbe-4647-bd91-8e8968ae9715", "groupId": "342aedd0-14d8-4a4a-8403-4d8e1b5e84e0", "groupName": "Role fleet", "groupType": "FLEET", "path": "/9704ff99-1336-4931-807f-7b61c6ebd2a0/342aedd0-14d8-4a4a-8403-4d8e1b5e84e0/", "roles": ["ACCOUNTANT"], "groupPath": "/BUSINESS:9704ff99-1336-4931-807f-7b61c6ebd2a0/FLEET:342aedd0-14d8-4a4a-8403-4d8e1b5e84e0/" }]
    }
}

export interface IData {
    group?: any;
    business?: any;
    fleet?: any;
    branch?: any;
}

@Injectable()
export class FakeOrganisationService {
    @Cache({ pool: 'User' }) userInfo: any;
    @Cache({ pool: 'GroupData' }) groupList: any;
    @Cache({ pool: 'GroupData' }) businessList: any;
    @Cache({ pool: 'GroupData' }) branchList: any;
    @Cache({ pool: 'GroupData' }) fleetList: any;

    data: any = new BehaviorSubject<IData>({});
    reg: any = new BehaviorSubject<boolean>(false);
    constructor(private http: HttpClient, private comms: CommunicatorService) {
    }

    onChange() {
        return this.data.asObservable();
    }

    showRegistration() {
        return this.reg.asObservable();
    }

    change() {
        console.log('Updated Data');
        this.data.next({
            group: this.groupList,
            business: this.businessList,
            fleet: this.fleetList,
            branch: this.branchList,
        });
    }

    getGroupsForUser(userId) {
        return this.http.get(Constants.CARBOOK_BASE_URL + GET_USER_GROUP_INFO + userId);
    }

    getGroupTypeWithRoles(groupType) {
        return this.http.get(Constants.CARBOOK_BASE_URL + GET_GROUP_TYPE_ROLE + groupType);
    }

    getSubGroupDetails(groupId) {
        return this.http.get(Constants.CARBOOK_BASE_URL + ORGANISATION_SEARCH, { params: new HttpParams().set('groupId', groupId) });
    }

    getOrganisationById(orgId) {
        return this.http.get(Constants.CARBOOK_BASE_URL + GET_ORGANIZATION_DETAILS + orgId);
    }

    getOrganisationByName(orgName) {
        const params: HttpParams = new HttpParams();
        params.set('organisationName', orgName);
        return this.http.get(Constants.CARBOOK_BASE_URL + ORGANISATION, { params: params });
    }

    getFleetsForOrganisation(orgId) {
        return this.http.get(Constants.CARBOOK_BASE_URL + ORGANISATION_FLEET + orgId);
    }

    getOrganisationForIds(orgIds) {
        return this.http.post(Constants.CARBOOK_BASE_URL + ORGANISATION_BULK, orgIds);
    }

    createOrganisation(org) {
        return this.http.post(Constants.CARBOOK_BASE_URL + ORGANISATION, org);
    }

    updateOrganisation(org) {
        return this.http.put(Constants.CARBOOK_BASE_URL + ORGANISATION, org);
    }

    deleteOrganisation(orgId) {
        return this.http.delete(Constants.CARBOOK_BASE_URL + ORGANISATION + orgId);
    }

    deleteUserFromOrganisation(userId, orgId) {
        return this.http.delete(Constants.CARBOOK_BASE_URL + DELETE_USER + userId + '/' + orgId);
    }

    public resolveOrganisation() {
        // this.groupList = userGroups['data'];
        // this.resolveBusiness(userGroups['data'].data);
        // this.resolveBranch(userGroups['data'].data);
        // this.resolveFleet(userGroups['data'].data);
        // this.change();
    }

    private resolveBusiness(data) {
        this.businessList = _.filter(data, item => {
            return item.groupType === 'BUSINESS';
        });
    }

    private resolveBranch(data) {
        this.branchList = _.filter(data, item => {
            return item.groupType === 'BRANCH';
        });
    }

    private resolveFleet(data) {
        this.fleetList = _.filter(data, item => {
            return item.groupType === 'FLEET';
        });
    }

}
