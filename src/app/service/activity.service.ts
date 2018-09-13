import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ActivityUpdateRequest, CarbookBaseType} from "../models/activity";
import {Constants} from './constants';

const NOTIFICATION_FLEET = "carbook-activity-srv/rest/notification/fleet/";
const ACTIVITY_BASE = 'carbook-activity-srv/rest/activity';
const ACTIVITY_UPDATE = ACTIVITY_BASE + '/update';
@Injectable()
export class ActivityService {

    constructor(private http: HttpClient) { }

    getPendingActivityForType(userId, type?: CarbookBaseType) {
        let Params = new HttpParams();
        Params = type ? Params.append('baseTypes', CarbookBaseType[type]) : Params;
        return this.http.get(Constants.CARBOOK_BASE_URL + ACTIVITY_BASE + `/${userId}`, {params: Params});
    }

    updateActivityForUser(request: ActivityUpdateRequest) {
        return this.http.put(Constants.CARBOOK_BASE_URL + ACTIVITY_UPDATE, request);
    }

    getNotificationForFleet(fleetId) {
        return this.http.get(Constants.CARBOOK_BASE_URL + NOTIFICATION_FLEET + fleetId);
    }
}
