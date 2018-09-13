import {Injectable} from '@angular/core';
import {Constants} from './constants';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ShareCacheService} from '../utils/share-cache.service';

@Injectable()
export class VehicleService extends ShareCacheService {

    constructor(private http: HttpClient) {
        super();
    }

    getVehicle() {
        return this.getCache('vehicle');
    }

    setVehicle(vehicle) {
        this.setCache('vehicle', vehicle);
    }

    setExpense(expense) {
        this.setCache('expenseReport', expense);
    }

    getExpense() {
        return this.getCache('expenseReport');
    }

    fetchUserVehicles(): Observable<any> {
        return this.http.get(Constants.CARBOOK_BASE_URL + Constants.USER_VEHICLES);

    }

    fetchVehicleByLicense(license) {
        return this.http.get<any>(Constants.SEARCH_VEHICLE_URL + license);

    }

    fetchVehicleInfo(vehicleId) {
        return this.http.get<any>(Constants.CARBOOK_BASE_URL + Constants.GET_VEHICLE_INFO(vehicleId));
    }

    fetchVehicleLogbook(vehicleId): Observable<any> {
        return this.http.get(Constants.CARBOOK_BASE_URL + Constants.VEHICLE_LOGBOOK_SRV_URL + vehicleId + Constants.VEHICLE_LOGBOOK_SRV_URL_FROMTO);

    }

    pollVehicleInfo(vehicleId) {
        return Observable.interval(5000)
            .switchMap(() => this.fetchVehicleInfo(vehicleId));
    }

    fetchMakeLogo(make) {
        return Constants.GET_VEHICLE_LOGO(make);
    }

    createNewVehicle(vehicle) {
        return this.http.post(Constants.CARBOOK_BASE_URL + Constants.USER_VEHICLES, vehicle);

    }

    updateVehicleInfo(vehicleId, vehicle) {
        return this.http.put(Constants.CARBOOK_BASE_URL + Constants.UPDATE_VEHICLE_INFO(vehicleId), vehicle);

    }

    createReminder(body) {
        let Params = new HttpParams();
        Params.append('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36');
        return this.http.post(Constants.CARBOOK_BASE_URL + Constants.CREATE_REMINDER, body, {params: Params});
    }

    fetchReminder(vehicleId) {
        return this.http.get(Constants.CARBOOK_BASE_URL + Constants.GET_REMINDER_VEHICLE(vehicleId));

    }

    getMakeAndModel(query, force?: boolean): Observable<any> {
        return this.fetchMakeAndModel(query);
    }

    fetchMakeAndModel(query) {
        return this.http.get(Constants.GET_VEHICLE_MAKE_MODEL(query, 'in'));

    }

    fetchLastKnownLocation(vehicleId) {
        return this.http.get(Constants.GET_LAST_KNOWN_LOCATION(vehicleId));
    }

    setDriverForVehicle(driverId, vehicleId) {
        return this.http.post(Constants.SET_DRIVER_ON_DUTY(driverId, vehicleId), null);
    }

    unsetDriverForVehicle(driverId, vehicleId) {
        return this.http.post(Constants.SET_DRIVER_OFF_DUTY(driverId, vehicleId), null);
    }

    printLogbook(id, from, to, email, subject) {
        return this.http.get(Constants.CARBOOK_BASE_URL + Constants.PRINT_LOGBOOK + '?vehicleId=' + id + '&from=' + from
            + '&to=' + to + '&emailIds=' + email + '&subject=' + subject);
    }

    getAllDriverDuty(fleetId) {
        return this.http.get(Constants.ALL_DRIVER_VEHICLE_DUTY(fleetId));
    }

    makeBookable(vehicleId) {
        return this.http.put(Constants.MAKE_VEHICLE_BOOKABLE(vehicleId), null);
    }

    makeNonBookable(vehicleId) {
        return this.http.put(Constants.MAKE_VEHICLE_NOT_BOOKABLE(vehicleId), null);
    }

    getMakeModelVariant(query) {
        return this.http.get(Constants.CARBOOK_BASE_URL + Constants.VEHICLE_SEARCH_URL + `search?countryCode=${localStorage.getItem('countryCode')}&searchvalue=` + query);
    }

    postGeoFenceData(payload) {
        return this.http.post(Constants.CARBOOK_BASE_URL + Constants.GEO_FENCE_BASE_URL + Constants.GEO_FENCE_DATA, payload);
    }

    updateGeoFenceData(payload) {
        return this.http.put(Constants.CARBOOK_BASE_URL + Constants.GEO_FENCE_BASE_URL + Constants.GEO_FENCE_DATA, payload);
    }

    getGeoFenceData(vehicleId, fenceId) {
        return this.http.get<any>(Constants.GET_GEO_FENCE_DETAIL(vehicleId, fenceId));
    }

    getGeoFenceList(vehicleId) {
        return this.http.get<any>(Constants.GET_GEO_FENCE_DATA(vehicleId));
    }

    deleteGeoFenceFromVehicle(payload) {
        return this.http.request('delete', Constants.CARBOOK_BASE_URL + Constants.GEO_FENCE_BASE_URL + Constants.GEO_FENCE_DATA,
            {
                body: payload
            });
    }

    getAccruals(vehicleId, fleetId) {
        let Params = new HttpParams();
        Params = fleetId ? Params.append('fleetId', fleetId) : Params;
        console.log('Params are for cost', Params);
        return this.http.get(Constants.GET_EXPENSE_DATA(vehicleId) + '/accruals', {params: Params});
    }

    getAccrualsFleet(fleetId, options: { from?: null, to?: null, costtype?: null } = {}) {
        let Params = new HttpParams();
        Params = options.from ? Params.append('from', options.from) : Params;
        Params = options.to ? Params.append('to', options.to) : Params;
        Params = options.costtype ? Params.append('costtype', options.costtype) : Params;
        console.log('Params are for cost', Params);
        return this.http.get(Constants.GET_EXPENSE_FOR_FLEET(fleetId), {params: Params});
    }

    getCostReceipt(vehicleId, costId) {
        return this.http.get(Constants.GET_EXPENSE_DATA(vehicleId) + '/accruals/' + costId);
    }

    postAccruals(vehicleId, payload) {
        return this.http.post(Constants.GET_EXPENSE_DATA(vehicleId) + '/accruals', payload);
    }

    updateAccruals(vehicleId, payload) {
        return this.http.put(Constants.GET_EXPENSE_DATA(vehicleId) + '/accruals', payload);
    }

    getDriverData(driverId) {
        return this.http.get(Constants.CARBOOK_BASE_URL + Constants.GET_USER_INFO_BY_ID + driverId);
    }

    deleteVehiclesFromFleet(fleetId, payload) {
        return this.http.request('delete', Constants.CARBOOK_BASE_URL + Constants.FLEET_BASE_URL + Constants.DELETE_VEHICLES_FROM_FLEET + fleetId,
            {
                body: payload
            });
    }

    setDriver(vehicleId, payload) {
        return this.http.post(Constants.CARBOOK_BASE_URL + Constants.VEHICLE_DRIVER_URL.replace('${vehicleId}', vehicleId), payload);
    }

    updateNotification(fleetId, vehicleId, response) {
        return this.http.put(Constants.UPDATE_NOTIFICATION(fleetId, vehicleId) + '?responseType=' + response, null);
    }

    fetchTrackingMode(vehicleId) {
        let params = new HttpParams()
            .set('vehicleId', vehicleId)
            .set('deviceType', 'OBD')
            .set('mode', '0');
        return this.http.get(Constants.CARBOOK_BASE_URL + Constants.DEVICE_MAPPING_GET, {params: params});

    }

    updateTrackingMode(payload) {
        return this.http.post(Constants.CARBOOK_BASE_URL + Constants.DEVICE_MAPPING, payload);
    }

    deleteDriverFromVehicle(vehicleId, driverId, driver) {
        return this.http.request('delete', Constants.REMOVE_DRIVER_FROM_VEHICLE(vehicleId, driverId),
            {
                body: driver
            });
    }

}
