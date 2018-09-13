import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Constants} from './constants';
import {Cache} from '../utils/storage.provider';
import * as _ from 'lodash';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {CommunicatorService} from '../common/communicator.service';
import {ReplaySubject} from 'rxjs/ReplaySubject';

const ORGANISATION = 'carbook-organization-srv/rest/organisation';
const GET_ORGANIZATION_DETAILS = 'carbook-organization-srv/rest/organisation/';
const ORGANISATION_FLEET = ORGANISATION + '/activeFleets/';
const ORGANISATION_BULK = ORGANISATION + '/bulk';
const ORGANISATION_SEARCH = ORGANISATION + '/groups/group/search';
const GET_USER_GROUP_INFO = ORGANISATION + '/groups/user/';
const GET_GROUP_TYPE_ROLE = ORGANISATION + '/groups/type/';
const DELETE_USER = ORGANISATION + '/groups/map/user/';

export interface IData {
    group?: any;
    business?: any;
    fleet?: any;
    branch?: any;
}

@Injectable()
export class OrganisationService {
    @Cache({pool: 'User'}) userInfo: any;
    @Cache({pool: 'GroupData'}) groupList: any;
    @Cache({pool: 'GroupData'}) businessList: any;
    @Cache({pool: 'GroupData'}) branchList: any;
    @Cache({pool: 'GroupData'}) fleetList: any;

    data: any = new ReplaySubject<IData>(1);
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
        return this.http.get(Constants.CARBOOK_BASE_URL + ORGANISATION_SEARCH, {params: new HttpParams().set('groupId', groupId)});
    }

    getOrganisationById(orgId) {
        return this.http.get(Constants.CARBOOK_BASE_URL + GET_ORGANIZATION_DETAILS + orgId);
    }

    getOrganisationByName(orgName) {
        return this.http.get(Constants.CARBOOK_BASE_URL + ORGANISATION, {params: new HttpParams().set('organisationName', orgName)});
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
        this.getGroupsForUser(this.userInfo.userId).subscribe(res => {
            console.log('Resolved Org', res);
            if (res) {
                console.log('User Group', res['data']);
                this.groupList = res['data'];
                this.resolveBusiness(res['data'].data);
                this.resolveBranch(res['data'].data);
                this.resolveFleet(res['data'].data);
                this.change();
            } else {
                this.reg.next(true);
            }
        });
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
