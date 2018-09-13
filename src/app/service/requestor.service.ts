import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {Constants} from './constants';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class RequestorService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  getMockData() {
    return this.http.get('/assets/requestor-mock.json')
  }

  createRequestor(body) {
    return this.http.post(Constants.CREATE_REQUESTOR_URL_SRV(), body)

  }

    getRequestorByEmail(mailId) {
        return this.http.get(Constants.CARBOOK_BASE_URL + Constants.GET_REQUESTOR_BY_MAIL + mailId);
    }

  getRequestorDetails(requestorId) {
    return this.http.get(Constants.GET_REQUESTOR_URL_SRV(requestorId))

  }

  getRequestorForFleet(fleetId) {
    return this.http.get<any>(Constants.GET_REQUESTOR_FLEET(fleetId))
  }

  updateRequestorDetails(requestorId, body) {
    return this.http.put(Constants.UPDATE_REQUESTOR_URL_SRV(requestorId), body)

  }

  deleteRequestor(requestorId) {
    return this.http.delete(Constants.DELETE_REQUESTOR_URL_SRV(requestorId))

  }

}
