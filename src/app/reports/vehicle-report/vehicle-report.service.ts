import {Injectable} from '@angular/core';
import {ShareCacheService} from '../../utils/share-cache.service';

@Injectable()
export class VehicleReportService extends ShareCacheService {

    constructor() {
        super();
    }

    getData() {
        super.getCache('vehicleReportData');
    }

    setData(data) {
        super.setCache('vehicleReportData', data);
    }
}
