import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Constants } from './constants';
import { Cache } from '../utils/storage.provider';

@Injectable()
export class SchemaService {
  @Cache({ pool: 'Session' }) userSession: any;
  @Cache({ pool: 'LogUserId' }) logUserId: any;
  @Cache({ pool: 'LastSeenTime' }) lastSeenTime: any;
  @Cache({ pool: 'instance' }) instanceUrl: any;


  constructor(private http: HttpClient) { }

  getAllObjects(): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Api-User-Agent', 'Example/1.0');
    console.log("mine logs services", this.userSession.token);
    console.log("current URL", this.instanceUrl.currentURL);

    headers.append("Authorization", "Bearer " + this.userSession.token);
    headers.append('Accept', "application/json")
    let BASE_URL = this.instanceUrl.currentURL + "/services/data/v35.0/sobjects/";
    return this.http.get(BASE_URL, { headers: headers });
  }

  getObjectFields(objectName): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Api-User-Agent', 'Example/1.0');
    console.log("mine logs services", this.userSession.token);
    console.log("current URL", this.instanceUrl.currentURL);

    headers.append("Authorization", "Bearer " + this.userSession.token);
    headers.append('Accept', "application/json")
    let BASE_URL = this.instanceUrl.currentURL + "/services/data/v35.0/sobjects/"+objectName+'/describe';
    return this.http.get(BASE_URL, { headers: headers });
  }
}
