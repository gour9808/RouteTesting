import { Injectable } from '@angular/core';
import { Constants } from './constants';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ImageService {

  constructor(private http: HttpClient) { }

  public imageUpload(vehicleId, data) {
    return this.http.post(Constants.CARBOOK_BASE_URL + Constants.VEHICLE_PHOTO_UPLOAD + vehicleId, data)

  }

  public dealerImageUpload(data) {
    return this.http.post(Constants.IMAGE_UPLOAD_URL(), data)
  }
}
