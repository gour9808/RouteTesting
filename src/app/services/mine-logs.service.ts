import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Constants } from './constants';
import { Cache } from '../utils/storage.provider';
import { ResponseType } from '../../../node_modules/@angular/http';

@Injectable()
export class MineLogsService {
  @Cache({ pool: 'Session' }) userSession: any;
  @Cache({ pool: 'LogUserId' }) logUserId: any

  constructor(private http: HttpClient) { }


  getMineLogs(logUserId): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Api-User-Agent', 'Example/1.0');
    headers.append("Authorization", "Bearer " + this.userSession.token);
    headers.append('Accept', "application/json")
    return this.http.get(Constants.GET_MINE_LOGS(logUserId), { headers: headers });
  }


  getAllLogs(): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Api-User-Agent', 'Example/1.0');
    headers.append("Authorization", "Bearer " + this.userSession.token);
    headers.append('Accept', "application/json")
    return this.http.get(Constants.GET_ALL_LOGS(), { headers: headers });
  }

  getParticularLog(recordId) {
    let headers = new HttpHeaders();
    headers.append('Accept', "*/*");
    headers.append("hi", "1234");
    headers.append('Api-User-Agent', 'Example/1.0');
    headers.append("Authorization", "Bearer " + this.userSession.token);

    return this.http.get<any>(Constants.GET_PARTICULAR_LOG(recordId), { headers: headers })

  }


  deleteMineCached() {
    let date = (new Date(new Date().toString().split('GMT')[0]).toISOString());
    let url = "SELECT id, Application, Operation, Status, DurationMilliseconds, LogLength, StartTime, LogUser.Name from ApexLog where  StartTime > " + date + " and  LogUserId = " + "'" + this.logUserId.userId + "'" + "  ORDER BY StartTime DESC LIMIT 20"
    console.log(Constants.BASE_URL + encodeURIComponent(url));
    let headers = new HttpHeaders();
    headers.append('Api-User-Agent', 'Example/1.0');
    headers.append("Authorization", "Bearer " + this.userSession.token);
    return this.http.get(Constants.BASE_URL + encodeURIComponent(url), { headers: headers })

  }

  downloadLogs(recordId) {
    let headers = new HttpHeaders();
    headers.append('Api-User-Agent', 'Example/1.0');
    headers.append("Authorization", "Bearer " + this.userSession.token);
    return this.http.get(Constants.DOWNLOAD_LOGS(recordId), { headers: headers })


  }

  deleteAllCached() {
    let date = (new Date(new Date().toString().split('GMT')[0]).toISOString());
    let url = "SELECT id, Application, Operation, Status, DurationMilliseconds, LogLength, StartTime, LogUser.Name from ApexLog where  StartTime > " + date + " ORDER BY StartTime DESC LIMIT 20"
    console.log(Constants.BASE_URL + encodeURIComponent(url));
    let headers = new HttpHeaders();
    headers.append('Api-User-Agent', 'Example/1.0');
    headers.append("Authorization", "Bearer " + this.userSession.token);
    return this.http.get(Constants.BASE_URL + encodeURIComponent(url), { headers: headers })

  }


  fetchFlags() {
    let url = "Select Id, LogType, DebugLevelId, DebugLevel.DeveloperName,  TracedEntityId, TracedEntity.Name, ExpirationDate  from TraceFlag  order by ExpirationDate DESC "
    console.log(Constants.BASE_URL + encodeURIComponent(url));
    let headers = new HttpHeaders();
    headers.append('Api-User-Agent', 'Example/1.0');
    headers.append("Authorization", "Bearer " + this.userSession.token);
    return this.http.get(Constants.BASE_URL + encodeURIComponent(url), { headers: headers })

  }
}

