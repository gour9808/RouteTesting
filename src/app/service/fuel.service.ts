import { Injectable } from '@angular/core';
import { AuthService } from '../service/auth.service'
import { Constants } from './constants';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class FuelTypeService {

  constructor(private auth: AuthService, private http: HttpClient) { }

  fetchFuelType(locale) {
    return this.http.get(Constants.CARBOOK_BASE_URL + Constants.FUEL_TYPE_SRV_URL + locale)
  }

}
