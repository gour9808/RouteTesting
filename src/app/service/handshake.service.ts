import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import * as HS from '../models/handshake';
import { Constants } from './constants';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HandshakeService {

  constructor(private http: HttpClient) { }

  addDriverToVehicle(vehicleId: string, handshake: HS.HandShake.HandshakeRequest) {
    return this.http.post(Constants.ADD_DRIVER_TO_VEHICLE(vehicleId), handshake)
  }

  checkIfHandshakePending(email: string) {
    return this.http.get(Constants.CHECK_HANDSHAKE_STATE(email))
  }
}
