import { Injectable } from '@angular/core';
import { Constants } from './constants';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class OpenrequestService {

  constructor(private http: HttpClient) { }

  createRequest(request) {
    return this.http.post(Constants.CARBOOK_BASE_URL + Constants.CREATE_OPENREQUEST, request)
  }

  getRequest(requestId) {
    return this.http.get(Constants.GET_REQUEST_FOR_ID(requestId))
  }

  /**
   *
   * @param requestId
   * @param status
   * @param request
   * updates the pick up and drop status
   */
  updateRequestStatus(requestId, status) {
    return this.http.put(Constants.UPDATE_PICKUP_DROP_STATUS(requestId, status), null)

  }

  /**
   *
   * @param requestId
   * @param vehicleId
   * @param request
   * updates the status of the request from received to assigned when a vehicle and driver is assigned
   */
  updateRequestVehicle(requestId, vehicleId, driverId) {
    return this.http.put(Constants.UPDATE_PICKUP_DROP_VEHICLE(requestId, vehicleId, driverId), null)

  }

  fetchAllOpenRequests(fleetId) {
    return this.http.get<any>(Constants.GET_ALL_OPEN_REQUESTS_PER_FLEET(fleetId))

  }

}
