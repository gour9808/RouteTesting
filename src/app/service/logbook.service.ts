import {Injectable} from '@angular/core';
import {Constants} from './constants';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable()
export class LogbookService {

    constructor(private http: HttpClient) {
    }

    fetchLogbookForUser(): Observable<any> {
        return this.http.get(Constants.CARBOOK_BASE_URL + Constants.LOGBOOK_SRV_URL)
    }

    fetchLogbookForDateRange(start, end): Observable<any> {
        return this.http.get(Constants.GET_LOGBOOK_FOR_DATE_RANGE(start, end))
            .map(res => {
                localStorage.setItem('logbookfordaterange', JSON.stringify(res));
                return res;
            });
    }

    fetchLogbookEntry(vehicleId, userId, from, to) {
        const params = new HttpParams()
            .set('userId', userId)
            .set('vehicleId', vehicleId)
            .set('from', from)
            .set('to', to)
            .set('sort', 'ASC');
        const headers = new HttpHeaders().set('user-agent', 'Web');

        return this.http.get(Constants.CARBOOK_BASE_URL + Constants.VEHICLE_LOGBOOK_ENTRY_URL, {params: params, headers: headers});
    }

    printLogbook(vehicleId, fleetId, fleetName, from, to) {
        const params = new HttpParams()
            .set('fleetId', fleetId)
            .set('fleetName', fleetName)
            .set('vehicleId', vehicleId)
            .set('from', from)
            .set('to', to);
        const headers = new HttpHeaders().set('Content-type', 'Web');
        return this.http.get(Constants.CARBOOK_BASE_URL + Constants.PRINT_LOGBOOK, {params: params, responseType: 'blob'});
    }

}
