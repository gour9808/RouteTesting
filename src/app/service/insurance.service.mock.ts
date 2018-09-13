import { Injectable } from '@angular/core';
import { Constants } from './constants';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';

const insuranceMockData={"id":"0a8d5de9-a264-40c9-8ad1-7ce244c10c75","userId":"84813efe-55f5-47ee-8981-ac47590c3665","vehicleId":"44b1effb-265f-44dd-9f22-8f49c4abc9c6","insurancePolicyHolder":{"name":"Doe","firstName":"John","address":{"city":"","postcode":"","street":"","housenumber":"","countrycode":"","county":"","suburb":"","state":""},"dateOfBirth":"2018-01-16T18:21:29.747","drivingLicenceValidity":"2018-01-16T18:21:29.747"},"insuranceCompany":{"name":"gourav","policyNumber":"123456","certificateCardValidity":{"from":"2018-01-16T18:21:29.747","to":"2018-01-16T18:21:29.747"},"agency":"Creative Agency","agencyContactName":"Agent 007","address":{"city":"","postcode":"","street":"","housenumber":"","countrycode":"","county":"","suburb":"","state":""},"phone":"9632454838","materialDamageCovered":false}};
const createInsuranceRes={"id":"ca789bc0-212a-4450-a6c0-635ff71c5249","userId":"2930d832-ffdd-4ef0-94f4-38444395fe02","vehicleId":"4d6644c5-fc6c-4bed-bc03-6c2eff474358","insuredVehicle":{"motor":{},"trailer":{}},"insurancePolicyHolder":{"address":{"city":"","postcode":"","street":"","housenumber":"","countrycode":"","county":"","suburb":"","state":""},"dateOfBirth":"2018-04-05T05:36:12.751","drivingLicenceValidity":"2018-04-05T05:36:12.751"},"insuranceCompany":{"name":"Star Insurance Ltd.","policyNumber":"Jh1212as","certificateCardValidity":{"from":"2018-04-05T05:36:12.751","to":"2019-04-29T18:30:00.000"},"agency":"Star Agency","agencyContactName":"Star Agent","address":{"city":"","postcode":"","street":"","housenumber":"","countrycode":"","county":"","suburb":"","state":""},"phone":"28372837283","materialDamageCovered":false}};
const updateInsuranceRes={"id":"ca789bc0-212a-4450-a6c0-635ff71c5249","userId":"2930d832-ffdd-4ef0-94f4-38444395fe02","vehicleId":"4d6644c5-fc6c-4bed-bc03-6c2eff474358","insurancePolicyHolder":{"address":{"city":"","postcode":"","street":"","housenumber":"","countrycode":"","county":"","suburb":"","state":""},"dateOfBirth":"2018-04-05T05:36:12.751","drivingLicenceValidity":"2018-04-05T05:36:12.751"},"insuranceCompany":{"name":"Star Insurance Ltd.","policyNumber":"Jh1212as","certificateCardValidity":{"from":"2018-04-05T05:36:12.751","to":"2019-04-29T18:30:00.000"},"agency":"Star Agency","agencyContactName":"Star Agentaaa","address":{"city":"","postcode":"","street":"","housenumber":"","countrycode":"","county":"","suburb":"","state":""},"phone":"28372837283","materialDamageCovered":false}};

@Injectable()
export class InsuranceService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  createInsurance(body) {
    return Observable.of(createInsuranceRes);
  }

  getInsuranceDetails(vehicleId) {
    return Observable.of(insuranceMockData);

  }

  updateInsuranceDetails(body) {
    return Observable.of(updateInsuranceRes);
  }

  getPicureUrl(body) {
    return this.http.post<any>(Constants.GET_PICTURE_URl_srv(), body)
  }
}
