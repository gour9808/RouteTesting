import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Constants } from './constants';
import { Cache } from '../utils/storage.provider';

@Injectable()
export class DebugLevelService {
  @Cache({ pool: 'Session' }) userSession: any;
  @Cache({ pool: 'LogUserId' }) logUserId: any

  constructor(private http: HttpClient) { }


  getDebugLevel(): Observable<any> {
    let headers = new HttpHeaders();
    let url = "Select Id, DeveloperName, ApexCode, ApexProfiling, Callout ,Database,  System ,Validation ,Visualforce, Workflow  from DebugLevel  order by LastModifiedDate DESC "
    headers.append('Api-User-Agent', 'Example/1.0');
    headers.append("Authorization", "Bearer " + this.userSession.token);
    headers.append('Accept', "application/json")
    return this.http.get(Constants.BASE_URL + encodeURIComponent(url), { headers: headers });
  }

  createDebugLevel(body) {
    let headers = new HttpHeaders();
    headers.append('Api-User-Agent', 'Example/1.0');
    headers.append("Authorization", "Bearer " + this.userSession.token);
    headers.append('Accept', "application/json")
    return this.http.post(Constants.CREATE_DEBUG_LEVEL_URL, body);
  }

  deleteDebugLogLevelById(debugLevelLogId) {
    let headers = new HttpHeaders();
    headers.append('Api-User-Agent', 'Example/1.0');
    headers.append("Authorization", "Bearer " + this.userSession.token);
    headers.append('Accept', "application/json")
    return this.http.delete(Constants.DELETE_DEBUG_LEVEL_LOG_BY_ID_URL(debugLevelLogId), { headers: headers });
  }

  getparticularDebugLevelData(id): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Api-User-Agent', 'Example/1.0');
    headers.append("Authorization", "Bearer " + this.userSession.token);
    headers.append('Accept', "application/json")
    return this.http.get(Constants.DELETE_DEBUG_LEVEL_LOG_BY_ID_URL(id), { headers: headers });
  }

  updateDebugLevelData(id, body): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Api-User-Agent', 'Example/1.0');
    headers.append("Authorization", "Bearer " + this.userSession.token);
    headers.append('Accept', "application/json")
    return this.http.patch(Constants.UPDATE_DEBUG_LEVEL_LOG_BY_ID_URL(id), body);
  }


}