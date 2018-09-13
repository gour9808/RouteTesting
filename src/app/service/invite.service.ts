import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Constants} from './constants';
import {CustomURLEncoder} from '../utils/CustomURLEncoder';

const INVITE_BASE = 'carbook-invite-srv/rest/invite';
const INVITE_SENDER = INVITE_BASE + '/sender/organisation/';
const INVITE_RECEIVER = INVITE_BASE + '/receiver';
const INVITE_UPDATE = INVITE_BASE + '/respond/';
const UNVERIFIED_INVITE = INVITE_BASE + '/unverifieduser';

@Injectable()
export class InviteService {

    constructor(private http: HttpClient) {
    }

    sendInvite(invite) {
        return this.http.post(Constants.CARBOOK_BASE_URL + INVITE_BASE, invite, {params: new HttpParams({encoder: new CustomURLEncoder()}).set('locale', 'en_IN')});
    }

    sendUnverifiedInvite(invite) {
        return this.http.post(Constants.CARBOOK_BASE_URL + UNVERIFIED_INVITE, invite);
    }

    getInvites(orgId, groupId?, senderUserId?, responseType?) {
        let Params = new HttpParams({encoder: new CustomURLEncoder()});
        Params = groupId ? Params.append('groupId', groupId) : Params;
        Params = senderUserId ? Params.append('senderUserId', senderUserId) : Params;
        Params = responseType ? Params.append('responseType', responseType) : Params;
        return this.http.get(Constants.CARBOOK_BASE_URL + INVITE_SENDER + orgId, {params: Params});
    }

    getInvitesForEmail(email) {
        let Params = new HttpParams({encoder: new CustomURLEncoder()});
        Params = email ? Params.append('email', email) : Params;
        return this.http.get(Constants.CARBOOK_BASE_URL + INVITE_RECEIVER, {params: Params});
    }

    updateInvite(invite) {
        console.log("queryparam", invite.responseType);
        let Params = new HttpParams();
        Params = Params.append('locale', 'en_IN');
        Params = Params.append('responseType', invite.responseType);
        return this.http.put(Constants.CARBOOK_BASE_URL + INVITE_UPDATE + invite.id, invite, {params: Params});
    }

}
