import { Injectable } from '@angular/core';
import { Constants } from './constants';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MapService {

  constructor(private http: HttpClient) { }
  getAddressForLatLng(lat, lng) {
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&key=AIzaSyBlNBq34QJflfzeELZSjocZrXLqLbBQnzI';
    return this.http.get<any>(url)
  }

  getPlacesPrediction(query) {
    const url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + query + '&types=geocode&key=AIzaSyBlNBq34QJflfzeELZSjocZrXLqLbBQnzI';
    return this.http.get<any>(url)
  }
  getCountry() {
    //  return this.http.get("https://freegeoip.net/json/").map(res => {
    //   console.log("User Details");
    //   return res.json();
    // })
  }
}
