import { Injectable } from '@angular/core';
import { Constants } from './constants';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class InsuranceService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  createInsurance(body) {
    return this.http.post(Constants.CREATE_INSURANCE(), body)
  }

  getInsuranceDetails(vehicleId) {
    return this.http.get(Constants.GET_INSURANCE(vehicleId))

  }

  updateInsuranceDetails(body) {
    return this.http.post(Constants.UPDATE_INSURANCE(), body)
  }

  getPicureUrl(body) {
    return this.http.post<any>(Constants.GET_PICTURE_URl_srv(), body)
  }
}
