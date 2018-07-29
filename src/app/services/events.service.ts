import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Constants } from './constants';
import { Cache } from '../utils/storage.provider';


@Injectable()
export class EventsService {
  @Cache({ pool: 'Session' }) userSession: any;
  @Cache({ pool: 'LogUserId' }) logUserId: any;
  @Cache({ pool: 'LastSeenTime' }) lastSeenTime: any;

  constructor(private http: HttpClient) { }

  fetchEventData(): Observable<any> {
    let today = new Date();
    today.setDate(today.getDate())
    new Date(today.toString().split('GMT')[0] + 'UTC').toISOString();
    console.log("today", new Date(today.toString().split('GMT')[0] + ' UTC').toISOString());

    let date = new Date();
    date.setDate(date.getDate() - 15);

    console.log(new Date(date.toString().split('GMT')[0] + ' UTC').toISOString());
    console.log("15 din baad date", date);
    let url = "SELECT Id, EventType, LogDate, LogFileLength, LogFile From EventLogFile  where  LogDate >= " + new Date(date.toString().split('GMT')[0] + ' UTC').toISOString() + " and  LogDate <= " + new Date(today.toString().split('GMT')[0] + ' UTC').toISOString() + " ORDER BY LogDate DESC LIMIT 20"
    console.log("https://ap5.salesforce.com/services/data/v35.0/query/?q=" + encodeURIComponent(url));
    console.log(Constants.FETCH_EVENTS_URL + encodeURIComponent(url));
    let headers = new HttpHeaders();
    headers.append('Api-User-Agent', 'Example/1.0');
    headers.append("Authorization", "Bearer " + this.userSession.token);
    return this.http.get(Constants.FETCH_EVENTS_URL + encodeURIComponent(url))
  }

  fetchFilteredDataForDate(from, to) {
    let headers = new HttpHeaders();
    headers.append('Api-User-Agent', 'Example/1.0');
    headers.append("Authorization", "Bearer " + this.userSession.token);
  }

  fetchFilteredDataForEventType() {
    let headers = new HttpHeaders();
    headers.append('Api-User-Agent', 'Example/1.0');
    headers.append("Authorization", "Bearer " + this.userSession.token);
  }


  fetchFilteredDataForEventTypeAndDate(from, to, eventType) {
    let headers = new HttpHeaders();
    headers.append('Api-User-Agent', 'Example/1.0');
    headers.append("Authorization", "Bearer " + this.userSession.token);
  }
}
