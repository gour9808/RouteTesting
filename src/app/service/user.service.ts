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

@Injectable()
export class UserService extends ObservableCache {

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

        return this.http.get<any>(Constants.CARBOOK_BASE_URL + Constants.USER_DETAILS)
            .map(res => {
                this.userInfo = res;
                return res;
            })
    }

    fetchUserByEmail(email) {
        return this.http.get<any>(Constants.CARBOOK_BASE_URL + Constants.SEARCH_USER + email)

    }

    fetchUserById(id) {
        return this.http.get<any>(Constants.CARBOOK_BASE_URL + Constants.GET_USER_INFO_BY_ID + id)

    }

    updateUserInfoById(id, body: any) {
        return this.http.put(Constants.CARBOOK_BASE_URL + Constants.UPDATE_USER_INFO_BY_ID + id, body)
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


