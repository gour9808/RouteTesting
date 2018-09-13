import {Injectable} from '@angular/core';
import {Constants} from './constants';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ShareCacheService} from "../utils/share-cache.service";

@Injectable()
export class FleetService extends ShareCacheService {
    fleet: any;

    constructor(private http: HttpClient) {
        super();
    }

    getFleetView() {
        return this.getCache('FLEET_VIEW');
    }

    setFleetView(payload) {
        return this.setCache('FLEET_VIEW', payload);
    }

    fetchLanguage(): Observable<any> {
        return this.http.get<any>(Constants.CARBOOK_BASE_URL + Constants.CREATE_FLEET_URL)
            .map(res => {
                console.log('language', res);
                localStorage.setItem('language', JSON.stringify(res));
                return res;
            });
    }

    checkOrganisationNameExists(name) {
        return this.http.get<any>(Constants.CHECK_ORGANISATION_NAME_URL(name))
    }

    createOrganisation(body) {
        return this.http.post<any>(Constants.CARBOOK_BASE_URL + Constants.CREATE_ORGANISATION_URL, body)

    }

    updateOrganisation(org) {
        return this.http.put(Constants.CARBOOK_BASE_URL + Constants.CREATE_ORGANISATION_URL, org)
    }

    fetchOrganisationInfo(orgId) {
        return this.http.get<any>(Constants.CARBOOK_BASE_URL + Constants.GET_ORGANISATION_URL(orgId))

    }

    setOrgId(orgId) {
        localStorage.setItem('orgID', orgId);
    }

    getOrgId() {
        return localStorage.getItem('orgID');
    }

    createFleet(body) {
        return this.http.post<any>(Constants.CARBOOK_BASE_URL + Constants.CREATE_FLEET_URL, body)
    }

    fetchFleetInOrganisation(orgId) {
        return this.http.get<any>(Constants.CARBOOK_BASE_URL + Constants.GET_FLEETS_IN_ORG_URL(orgId))
    }

    fetchFleet(fleetId) {
        return this.http.get<any>(Constants.CARBOOK_BASE_URL + Constants.GET_FLEET_URL(fleetId))

    }

    fetchFleetView(fleetId) {
        return this.http.get<any>(Constants.CARBOOK_BASE_URL + Constants.GET_FLEETVIEW_URL(fleetId))

    }

    updateFleet(fleet) {
        return this.http.put(Constants.CARBOOK_BASE_URL + Constants.CREATE_FLEET_URL, fleet)
    }

    setFleetId(fleetId) {
        localStorage.setItem('fleetID', fleetId);
    }

    getFleetId() {
        return localStorage.getItem('fleetID');
    }

    getFleetName() {
        return localStorage.getItem('fleetName');
    }

    setFleetName(fleetName) {
        localStorage.setItem('fleetName', fleetName);
    }

    setFleetRole(role) {
        localStorage.setItem('fleetRole', role);
    }

    getFleetRole() {
        return localStorage.getItem('fleetRole');
    }

    fetchVehicleInFleet(fleetId) {
        return this.http.get<any>(Constants.CARBOOK_BASE_URL + Constants.GET_VEHICLES_IN_FLEET(fleetId))

    }

    addVehiclesToFleet(fleetId, body) {
        return this.http.put(Constants.CARBOOK_BASE_URL + Constants.GET_VEHICLES_IN_FLEET(fleetId), body)

    }

    deleteVehicleFromFleet(fleetId, vehicleIds) {
        return this.http.delete(Constants.CARBOOK_BASE_URL + Constants.GET_VEHICLES_IN_FLEET(fleetId), vehicleIds);
    }

    getAddressForLatLng(lat, lng) {
        const url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&key=' + Constants.MAPS_API_KEY;
        return this.http.get<any>(url)
    }

    getPlacesPrediction(query) {
        const url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + query + '&types=geocode&key=' + Constants.MAPS_API_KEY;
        return this.http.get<any>(url)
    }

    getFleetProfileForIds(ids: any[]) {
        let params = new HttpParams();
        params = params.set('count', '100');
        return this.http.post(Constants.CARBOOK_BASE_URL + Constants.GET_FLEET_BULK, ids, {params: params});
    }

    updateFleetDriver(fleetId,body){
        return this.http.put(Constants.CARBOOK_BASE_URL + Constants.FLEET_BASE_URL + Constants.UPDATE_FLEET_DRIVER + fleetId, body);
    }
}


