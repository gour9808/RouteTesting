import {Injectable} from '@angular/core';
import {Constants} from './constants';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {Cache} from '../utils/storage.provider';
import * as _ from 'lodash';
import {ObservableCache} from "../utils/observable.cache";


export enum CarbookRoles {
    CB_ADMIN,
    OWNER,
    ACCOUNTANT,
    TEAM_MANAGER,
    BRANCH_MANAGER,
    FLEET_MANAGER,
    APPROVER,
    MANAGER,
    AGENT,
    COORDINATOR,
    CUSTOMER,
    DRIVER
}

export enum GroupTypes {
    BUSINESS,
    BRANCH,
    FLEET,
    SERVICE_DEPT,
    MARKETING_DEPT,
    CUSTOMER_RELATION_DEPT,
    FIELD_FORCE_DEPT
}

const userInfo = {
    "userId": "84813efe-55f5-47ee-8981-ac47590c3665",
    "carbookIdentifier": "https://apis.carbookplus/com/userprofile/84813efe-55f5-47ee-8981-ac47590c3665",
    "createTime": "2016-12-12T10:26:28.007",
    "currentEMail": "gourav.sharma@widas.in",
    "firstname": "Gourav",
    "displayname": "Gourav Sharma",
    "userAddresses": [
      {
        "label": "OFFICE",
        "addressInfo": {
          "city": "Bengaluru",
          "postcode": "560103",
          "street": "Sarjapur Main Road, Bellandur",
          "housenumber": "37",
          "countrycode": "IN",
          "county": "India",
          "suburb": "",
          "state": "Karnataka",
          "geopoint": {
            "lon": 77.6681727,
            "lat": 12.9194958,
            "alt": 0
          }
        },
        "favorite": true,
        "addressType": "OFFICE"
      },
      {
        "label": "HOME",
        "addressInfo": {
          "city": "Bengaluru",
          "postcode": "560103",
          "street": "",
          "housenumber": "",
          "countrycode": "",
          "county": "India",
          "suburb": "Bellandur",
          "state": "Karnataka",
          "geopoint": {
            "lon": 77.6704598,
            "lat": 12.925854999999999,
            "alt": 0
          }
        },
        "favorite": true,
        "addressType": "HOME"
      }
    ],
    "fcmIds": [
      "c4_QJtGmjFM:APA91bFHoFZp_QRuripRRVfbTVt1_Y8mKqKFqkXFXH7QrR6uSFGdV4TVDgsBiOKlP3J3OucsXz2YlxEcEfLrVGIg4GQ2bdgL0Uo2GBDUHhMLvlrCIHX--zDA9Gol3X1fOPWgHCO7YzG4",
      "cI2CdsBGucU:APA91bGaXEyUkpuFSgRqdzoYwJ-YSYSiVYGZ4f9rd3gQHQM2OrhykYM4oIbN2txo9gAPLpNYu7DB7708BLInGV_UOHYZhBfdyYTZ-VHi8peQJj1YwKle9DQIoYXBGEddcCvgIwi5wHFZ",
      "dkDtixDPHkE:APA91bFJ6uNCi6uLMiSOF-FeZ7z_YhzlLom0GhUZsWte1_WvhggSV21Y7O0lg9aPdEVbiGewqnPqLiDCMuY-cHjeK0mDHa8KMkaBN54ISAy71heCYVINzINzP8Wr6rpnfiPZrAwhmIVL",
      "erWwcn3Hr5o:APA91bFyX4NS0emP-1JQtD1wuWCRt7tlUvnL3hZjpdLQd4yPjMhZsgrt0xXcKyDVTVuKCXFPAyPZ5JUaraInEE_czimWIOsWWYO51Ua4_Z3f0TYMIoEVzrqMhe9gRmWpZg11-ppkxItr"
    ],
    "oneSignalIds": [
      "12bc333b-f5bc-4dce-8872-5c803a3b8884",
      "0494d615-fcc4-4bea-b0d5-7b330531ebdb",
      "05e3dbd0-81e5-4b34-bfc6-45d47c34d39a",
      "cb2f2365-4957-49ae-8e7d-eb7f84ca80c4",
      "dbe87da7-ae29-48f6-a342-c46248a73865",
      "6828af5c-7307-4820-aa1d-0b92d69d1346",
      "a9e86ebb-c8ce-4b11-936b-7b6ee91d6462",
      "38975e27-9ebc-4ceb-93b2-d00bfc0daa2f",
      "409c811d-0b61-4aeb-9eff-1d2ef92b1519",
      "f285e7d5-fcb1-4e56-b087-33c2b36f31e2",
      "b953d4d6-4e5c-4362-8342-e2c8d98ee7a6",
      "9883cefd-8aef-4d78-a639-c0678226b0ef",
      "e89d14b5-e3a5-4c4b-866c-0e490fa49881",
      "b7b51308-0ea3-441c-9e64-9a4e50976087",
      "e0f21f21-7dbc-499c-b74a-a98acd295a0a",
      "a4d8cbc7-3ce3-42f1-b530-ca7b64e80643",
      "e24520da-c570-4207-8339-e062e026482b",
      "5a11bacf-9ffd-4878-a9fd-c80d7fda0914"
    ]
  }

@Injectable()
export class FakeUserService extends ObservableCache {

    @Cache({pool: 'User'}) userInfo: any;
    @Cache({pool: 'GroupData'}) groupList: any;
    @Cache({pool: 'GroupData'}) businessList: any;
    @Cache({pool: 'GroupData'}) branchList: any;
    @Cache({pool: 'GroupData'}) fleetList: any;

    constructor(private http: HttpClient) {
        super();
    }

    getCountry() {
        return this.http.get('https://freegeoip.net/json/')
    }

    getLocale() {
        return this.get();
    }

    setLocale(locale) {
        this.set(locale);
    }
    /**
     * Check for role
     * @param type Entity type tp determine role for from <link>GroupTypes</link>
     * @param id Entity to check role for
     * @param role Role to check for from <link>CarbookRoles</link>
     */
    hasRole(type, id, role) {
        const groups = _.filter(this.groupList.data, ['groupType', GroupTypes[type]]);
        const groupMeta = _.find(groups, (group) => {
            return _.includes(group.path, id);
        });
        if (groupMeta) {
            console.log('Has Role ', _.includes(groupMeta.roles, CarbookRoles[role]));
            return _.includes(groupMeta.roles, CarbookRoles[role]);
        } else {
            return false;
        }
    }

    /**
     * Get Role for a given groupType and id
     * @param id
     * @returns {string[] | IOptions[]}
     */
    getRole(id) {
        const groupMeta = _.find(this.groupList.data, (group) => {
            return _.includes(group.path, id);
        });
        return groupMeta ? groupMeta.roles : null;
    }

    fetchUserInfo(): Observable<any> {
        return Observable.of(userInfo);
    }

    fetchUserByEmail(email) {
        return Observable.of(userInfo);

    }

    fetchUserById(id) {
        return Observable.of(userInfo);

    }

    updateUserInfoById(id, body: any) {
         return Observable.of(userInfo);
    }

    fetchUserOrgInfo(): Observable<any> {
        return this.http.get<any>(Constants.CIDAAS_BASE_URL + Constants.CIDAAS_USER_URL)

    }

    fetchGroupListForUser(userID: any): Observable<any> {
        return this.http.get<any>(Constants.CIDAAS_BASE_URL + Constants.CIDAAS_USER_GROUPLIST_URL + userID)

    }

    updateUserGroup(body: any): Observable<any> {
        return this.http.post(Constants.CIDAAS_BASE_URL + Constants.CIDAAS_USER_GROUP_URL, body)
    }

    getUserId() {
        console.log('get user by id', this.userInfo['userId']);
        return this.userInfo['userId'];
    }

    getUserEmail() {
        console.log('get user by email', this.userInfo['currentEMail']);
        return this.userInfo['currentEMail'];
    }

    getOneSignalId() {
        return (this.userInfo['oneSignalIdsByGroup'] && this.userInfo['oneSignalIdsByGroup'].FLEET) ? this.userInfo['oneSignalIdsByGroup'].FLEET : [];
    }

    setUserOneSignalId(userId, oneSignalId) {
        return this.http.post(Constants.SET_USER_ONE_SIGNAL_ID(userId, oneSignalId), null);
    }

    getUserProfileForIds(userIds: any[]) {
        return this.http.get(Constants.CARBOOK_BASE_URL + Constants.BULK_SEARCH_USER + userIds);
    }


}


