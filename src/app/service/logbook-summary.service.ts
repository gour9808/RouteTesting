import {Injectable} from '@angular/core';
import {Constants} from './constants';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpParams} from '@angular/common/http';
import 'rxjs/add/operator/mergeMap';
import {ShareCacheService} from '../utils/share-cache.service';

@Injectable()
export class LogbookSummaryService extends ShareCacheService {

    constructor(private http: HttpClient) {
        super();
    }

    getSummary() {
        return this.getCache('LOGBOOK_SUMMARY');
    }

    setSummary(payload) {
        this.setCache('LOGBOOK_SUMMARY', payload);
    }

    fetchLogbookSummaryForUser(): Observable<any> {
        return this.http.get(Constants.CARBOOK_BASE_URL + Constants.LOGBOOK_SUMMARY_SRV_URL);
    }

    fetchLogbookSummary(fleetId?, vehicleId?, logbookId?, gte?, lte?, paginateType?, from?, size?): Observable<any> {
        let params = new HttpParams();
        params = vehicleId ? params.set('vehicleId', vehicleId) : params;
        params = fleetId ? params.set('fleetId', fleetId) : params;
        params = logbookId ? params.set('logbookId', logbookId) : params;
        params = gte ? params.set('gte', gte) : params;
        params = lte ? params.set('lte', lte) : params;
        params = paginateType ? params.set('paginationType', paginateType) : params;
        params = from ? params.set('from', from) : params;
        params = size ? params.set('size', size) : params;
        return this.http.get(Constants.CARBOOK_BASE_URL + Constants.LOGBOOK_SUMMARY_SRV_URL, {params: params});
    }

    fetchLogbookSummaryForDateRange(start, end, size): Observable<any> {
        return this.http.get(Constants.GET_LOGBOOK_SUMMARIES_FOR_DATE_RANGE(start, end, size));
    }

}
