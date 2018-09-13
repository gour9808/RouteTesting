import {environment} from '../../environments/environment';

export class Constants {
    public static CLIENT_ID = !environment.production ? 'fb0bd52cc64941b5abed0433190fcbe0' : '743b27ef75144eb78cebf8cbe78dd9c1';
    public static REDIRECT_URI = !environment.production ? 'https://staging.carbookplus.com/carbook-fleet-management/auth/callback' : 'https://fleet.carbookplus.com/carbook-fleet-management/auth/callback';
    public static TEST_URL = 'https://apis-cidaas-staging.test.carbookplus.com/oauth2-login/oauth2/authz?redirect_uri=https://staging.carbookplus.com/carbook-fleet-management/auth/callback&response_type=token&client_id=fb0bd52cc64941b5abed0433190fcbe0';

    public static DEV_URL = `https://apis-cidaas-staging.test.carbookplus.com/oauth2-login/oauth2/authz?redirect_uri=http://${location.hostname}:${location.port}/auth/callback&response_type=token&client_id=fb0bd52cc64941b5abed0433190fcbe0`;
    public static ONE_SIGNAL_APP_ID = !environment.production ? '48394b5a-ccff-4e2c-8621-94da96967bfd' : '21843550-e83a-4cb5-b7b8-e4b9205d59f7';
    public static ONE_SIGNAL_APP_ID_SAFARI = !environment.production ? 'web.onesignal.auto.02fb3e7d-913a-4c9d-837c-ed1a77b6978e' : 'web.onesignal.auto.28be2e0f-48c0-43fd-877a-95cc3c6fc0d9';
    public static PROD_URL = 'https://cidaas.carbookplus.com/oauth2-login/oauth2/authz?redirect_uri=https://fleet.carbookplus.com/carbook-fleet-management/auth/callback&response_type=token&client_id=743b27ef75144eb78cebf8cbe78dd9c1';
    public static MAPS_API_KEY = 'AIzaSyCDAXGspOuqxMX_Ek1Idz5_Yamag1vog4o';
    public static CARBOOK_BASE_URL = !environment.production ? 'https://staging.carbookplus.com/' : 'https://apis.carbookplus.com/';
    public static SEARCH_VEHICLE_URL = Constants.CARBOOK_BASE_URL + 'carbook-vehicle-srv/rest/numberplate/duplicate?numberPlate=';
    public static LOGIN_OAUTH2_URL = 'oauth2-login/oauth2/';
    public static USER_DETAILS = 'carbook-user-srv/rest/user';
    public static SEARCH_USER = 'carbook-user-srv/rest/user/search?email=';
    public static BULK_SEARCH_USER = 'carbook-user-srv/rest/user/bulk/search?ids=';
    public static GET_USER_INFO_BY_ID = 'carbook-user-srv/rest/user/';
    public static UPDATE_USER_INFO_BY_ID = 'carbook-user-srv/rest/user/';
    public static USER_VEHICLES = 'carbook-vehicle-srv/rest/vehicles/';
    public static GET_TRIPS_OF_DRIVER = 'carbook-logbook-srv/rest/logbook?from=0&to=0&lastUpdatedTime=0&userId=';
    public static DRIVER_VEHICLE_ON_DUTY = 'carbook-vehicle-srv/rest/vehicles/${vehicleId}/onduty?driverId=${driverId}';
    public static DRIVER_VEHICLE_OFF_DUTY = 'carbook-vehicle-srv/rest/vehicles/${vehicleId}/offduty?driverId=${driverId}';
    public static ALL_DRIVER_DUTY = 'carbook-vehicle-srv/rest/vehicles/driverduty/fleet/';
    public static ADD_INSURANCE_SRV = 'carbook-incident-report-srv/rest/insurancepolicy';
    public static UPDATE_INSURANCE_SRV = 'carbook-incident-report-srv/rest/insurancepolicy';
    public static GET_INSURANCE_SRV = 'carbook-incident-report-srv/rest/insurancepolicy/vehicle/';
    public static GET_PICTURE_URL = 'carbook-image-srv/rest/image';
    public static VEHICLES = 'carbook-vehicle-srv/rest/vehiclemodels-v1/';
    public static LOGBOOK_SRV_URL = 'carbook-logbook-srv/rest/logbook?from=0&to=0&lastUpdatedTime=0';
    public static LOGBOOK_SUMMARY_SRV_URL = 'carbook-logbook-srv/rest/dailyLogbookSummaries/search?from=0';
    public static LOGBOOK_SRV_DATE_URL = 'carbook-logbook-srv/rest/logbook?from=';
    public static VEHICLE_LOGBOOK_SRV_URL = 'carbook-logbook-srv/rest/fleet/logbook?vehicleId=';
    public static VEHICLE_LOGBOOK_ENTRY_URL = 'carbook-logbook-srv/rest/logbookentry';
    public static VEHICLE_LOGBOOK_SRV_URL_FROMTO = '&from=0&to=0&lastUpdatedTime=0';
    public static LOGBOOK_PRINT_SRV_URL = 'carbook-logbook-print-srv/';
    public static FUEL_TYPE_SRV_URL = 'carbook-fueltype-srv-v1/rest/fueltypes/localizations?locale=';
    public static CREATE_REMINDER = 'carbook-reminder-srv/rest/reminder/save';
    public static REMINDER_READ_URL = 'carbook-reminder-srv/rest/reminder/';
    public static PRINT_LOGBOOK = 'carbook-logbook-print-srv/download/pdf/logbooks';
    public static VEHICLE_PHOTO_UPLOAD = 'carbook-vehicle-srv/rest/vehicles/photo/byte/';
    public static VEHICLE_SEARCH_URL = 'carbook-vehicle-srv/rest/vehiclemodels-v1/';
    public static DELETE_VEHICLES_FROM_FLEET = 'fleet/vehicles/';
    public static VEHICLE_DRIVER_URL = 'carbook-vehicle-srv/rest/vehicles/${vehicleId}/drivers';
    public static VEHICLE_TRACKING_SOCKET_URL = '/carbook-vehicle-subscribe/socket.io';
    public static CREATE_OPENREQUEST = 'carbook-openrequest-srv/rest/pickdrop/request';
    public static UPDATE_OPENREQUEST = 'carbook-openrequest-srv/rest/pickdrop/request/';
    public static ALL_OPEN_REQUESTS_PER_FLEET = 'carbook-openrequest-srv/rest/pickdrop/request/fleet/';
    public static REQUESTOR_URL = 'carbook-requestor-srv/rest/requestor';
    public static GET_REQUESTOR_BASEDON_FLEET = 'carbook-requestor-srv/rest/requestor/fleet/';
    public static DELETE_REQUESTOR = 'carbook-requestor-srv/rest/requestor/delete/';
    public static GET_REQUESTOR_BY_MAIL = 'carbook-requestor-srv/rest/requestor/mailId/';
    public static CIDAAS_BASE_URL = !environment.production ? 'https://apis-cidaas-staging.test.carbookplus.com/' : 'https://cidaas.carbookplus.com/';
    public static CIDAAS_USER_URL = 'oauth2-usermanagement/oauth2/userinfo';
    public static CIDAAS_USER_GROUP_URL = 'oauth2-dashboard/public/mapmultiplegroup';
    public static CIDAAS_USER_GROUPLIST_URL = 'oauth2-usermanagement/group/grouplist/';
    public static LOGBOOK_SRV_URL1 = 'carbook-logbook-srv/rest/logbook?from=';
    public static LOGBOOK_SRV_URL2 = 'to=';
    public static FLEET_BASE_URL = 'carbook-fleet-srv/rest/';
    public static CREATE_FLEET_URL = Constants.FLEET_BASE_URL + 'fleet/';
    public static CREATE_ORGANISATION_URL = Constants.FLEET_BASE_URL + 'organisation/';
    public static GET_FLEET_BULK = Constants.FLEET_BASE_URL + 'fleet/bulk';
    public static OBD_URL = 'carbook-obd-srv/rest';
    public static LAST_KNOWN_LOCATION_URL = Constants.OBD_URL + '/lastknownlocation/address/vehicle';
    public static DEVICE_MAPPING = Constants.OBD_URL + '/devicemapping/register';
    public static DEVICE_MAPPING_GET = Constants.OBD_URL + '/devicemapping/all';
    public static IMAGE_URL = 'carbook-image-srv/rest/image';
    public static GEO_FENCE_BASE_URL = 'carbook-vehicle-tracker-srv/';
    public static GEO_FENCE_DATA = 'rest/geofence';
    public static GET_GEO_FENCE = 'rest/geofence/vehicle/';
    public static EXPENSE_BASE_URL = 'carbook-vehiclecost-srv/';
    public static EXPENSE_DATA = 'rest/vehicles/';
    public static EXPENSE_FLEET = 'rest/fleet/';

    public static SENDNOTIFICATION = 'fleet/sendNotification/';
    public static UPDATE_FLEET_DRIVER = 'fleet/driver/';

    public static SET_USER_ONE_SIGNAL_ID = function (userId, oneSignalId) {
        return Constants.CARBOOK_BASE_URL + Constants.USER_DETAILS + '/group/onesignal/' + userId + '?oneSignalId=' + oneSignalId + '&groupType=FLEET';
    };

    public static CHECK_ORGANISATION_NAME_URL = function (name) {
        return Constants.CARBOOK_BASE_URL + Constants.FLEET_BASE_URL + 'organisation?organisationName=' + name;
    };
    public static GET_ORGANISATION_URL = function (orgId) {
        return Constants.FLEET_BASE_URL + 'organisation/' + orgId;
    };
    public static GET_FLEETS_IN_ORG_URL = function (orgId) {
        return Constants.FLEET_BASE_URL + 'organisation/activeFleets/' + orgId;
    };
    public static GET_FLEET_URL = function (fleetId) {
        return Constants.FLEET_BASE_URL + 'fleet/' + fleetId;
    };
    public static GET_FLEETVIEW_URL = function (fleetId) {
        return Constants.FLEET_BASE_URL + 'fleet/fleetView/' + fleetId;
    };
    public static GET_VEHICLES_IN_FLEET = function (fleetId) {
        return Constants.FLEET_BASE_URL + 'fleet/vehicles/' + fleetId;
    };
    public static GET_VEHICLE_INFO = function (vehicleId) {
        return Constants.USER_VEHICLES + vehicleId;
    };

    public static UPDATE_VEHICLE_INFO = function (vehicleId) {
        return Constants.USER_VEHICLES + vehicleId;
    };

    public static IMAGE_UPLOAD_URL = function () {
        return Constants.CARBOOK_BASE_URL + Constants.IMAGE_URL;
    };


    public static GET_VEHICLE_LOGO = function (make, size?) {
        let url = make ? Constants.CARBOOK_BASE_URL + 'pictures/MAKE/' + make.toLowerCase() : '';
        switch (size) {
            case '2x':
                url = url + '_logo2x.png';
                break;
            case '3x':
                url = url + '_logo3x.png';
                break;
            default:
                url = url + '_logo.png';
        }
        return url
    };

    public static GET_VEHICLE_MAKE_MODEL = function (query, country) {
        return Constants.CARBOOK_BASE_URL + Constants.VEHICLES + 'search?searchvalue=' + query;
    };

    public static ADD_DRIVER_TO_VEHICLE = function (vehicleId) {
        return Constants.CARBOOK_BASE_URL + Constants.USER_VEHICLES + vehicleId + '/handshake';
    };

    public static CHECK_HANDSHAKE_STATE = function (email) {
        return Constants.CARBOOK_BASE_URL + Constants.USER_VEHICLES + '/handshake/outstanding?email=' + email;
    };

    public static GET_LOGBOOK_DATE = function (from, to) {
        return Constants.CARBOOK_BASE_URL + Constants.LOGBOOK_SRV_DATE_URL + from + '&to=' + to + '&lastUpdatedTime=0';
    };

    public static GET_LOGBOOK_FOR_VEHICLE_DRIVER = function (vehicleId) {
        return Constants.CARBOOK_BASE_URL + '/rest/fleet/logbook?from=0&to=0&lastUpdatedTime=0&vehicleId=' + vehicleId
    };

    public static GET_REMINDER_VEHICLE = function (vehicleId) {
        return Constants.REMINDER_READ_URL + vehicleId
    };

    public static GET_LOGBOOK_FOR_DATE_RANGE = function (from, to) {
        return Constants.CARBOOK_BASE_URL + Constants.LOGBOOK_SRV_URL1 + from + '&' + Constants.LOGBOOK_SRV_URL2 + to + '&lastUpdatedTime=0';
    };

    public static GET_LOGBOOK_SUMMARIES_FOR_DATE_RANGE = function (from, to, size) {
        return Constants.CARBOOK_BASE_URL + Constants.LOGBOOK_SUMMARY_SRV_URL + '&size=' + size + '&gte=' + from + '&lte=' + to;
    };

    public static GET_TRIPS_FOR_DRIVER = function (driverId) {
        return Constants.CARBOOK_BASE_URL + Constants.GET_TRIPS_OF_DRIVER + driverId;
    };


    // https://swagger-ui.widas.de/swagger-ui.html?url=https://apis.test.carbookplus.com/carbook-fleet-srv/swagger.json#/

    // https://apis.test.carbookplus.com/carbook-vehicle-srv/rest/numberplate/duplicate?numberPlate=cucgi

    public static SET_DRIVER_ON_DUTY = function (driverId, vehicleId) {
        return Constants.CARBOOK_BASE_URL + Constants.DRIVER_VEHICLE_ON_DUTY.replace('${driverId}', driverId).replace('${vehicleId}', vehicleId);
    };

    public static SET_DRIVER_OFF_DUTY = function (driverId, vehicleId) {
        return Constants.CARBOOK_BASE_URL + Constants.DRIVER_VEHICLE_OFF_DUTY.replace('${driverId}', driverId).replace('${vehicleId}', vehicleId);
    };

    public static ALL_DRIVER_VEHICLE_DUTY = function (fleetId) {
        return Constants.CARBOOK_BASE_URL + Constants.ALL_DRIVER_DUTY + fleetId;
    };

    public static UPDATE_PICKUP_DROP_STATUS = function (requestId, status) {
        return Constants.CARBOOK_BASE_URL + Constants.UPDATE_OPENREQUEST + requestId + '/updatedstatus/' + status;
    };

    public static UPDATE_PICKUP_DROP_VEHICLE = function (requestId, vehicleId, driverId) {
        return Constants.CARBOOK_BASE_URL + Constants.UPDATE_OPENREQUEST + requestId + '/vehicle/' + vehicleId + '/driver/' + driverId;
    };

    public static GET_ALL_OPEN_REQUESTS_PER_FLEET = function (fleetId) {
        return Constants.CARBOOK_BASE_URL + Constants.ALL_OPEN_REQUESTS_PER_FLEET + fleetId;
    };

    public static GET_INSURANCE = function (vehicleId) {
        return Constants.CARBOOK_BASE_URL + Constants.GET_INSURANCE_SRV + vehicleId
    };

    public static CREATE_INSURANCE = function () {
        return Constants.CARBOOK_BASE_URL + Constants.ADD_INSURANCE_SRV;
    };

    public static UPDATE_INSURANCE = function () {
        return Constants.CARBOOK_BASE_URL + Constants.UPDATE_INSURANCE_SRV;
    };

    public static GET_PICTURE_URl_srv = function () {
        return Constants.CARBOOK_BASE_URL + Constants.GET_PICTURE_URL;
    };

    public static CREATE_REQUESTOR_URL_SRV = function () {
        return Constants.CARBOOK_BASE_URL + Constants.REQUESTOR_URL;
    };

    public static GET_LAST_KNOWN_LOCATION = function (vehicleId) {
        return Constants.CARBOOK_BASE_URL + Constants.LAST_KNOWN_LOCATION_URL + `?vehicleId=${vehicleId}`;
    };

    public static GET_GEO_FENCE_DATA = function (vehicleId) {
        return Constants.CARBOOK_BASE_URL + Constants.GEO_FENCE_BASE_URL + Constants.GET_GEO_FENCE + vehicleId;
    };

    public static GET_GEO_FENCE_DETAIL = function (vehicleId, fenceId) {
        return Constants.CARBOOK_BASE_URL + Constants.GEO_FENCE_BASE_URL + Constants.GET_GEO_FENCE + `${vehicleId}/geofence/${fenceId}`;
    };

    public static GET_REQUESTOR_URL_SRV = function (requestorId) {
        return Constants.CARBOOK_BASE_URL + Constants.REQUESTOR_URL + requestorId;
    };
    public static UPDATE_REQUESTOR_URL_SRV = function (requestorId) {
        return Constants.CARBOOK_BASE_URL + Constants.REQUESTOR_URL + '/' + requestorId;
    };

    public static GET_REQUESTOR_FLEET = function (fleetId) {
        return Constants.CARBOOK_BASE_URL + Constants.GET_REQUESTOR_BASEDON_FLEET + fleetId;
    };

    public static DELETE_REQUESTOR_URL_SRV = function (requestorId) {
        return Constants.CARBOOK_BASE_URL + Constants.DELETE_REQUESTOR + requestorId;
    };

    public static GET_REQUEST_FOR_ID = function (requestId) {
        return Constants.CARBOOK_BASE_URL + Constants.CREATE_OPENREQUEST + '/' + requestId;

    };

    public static MAKE_VEHICLE_BOOKABLE = function (vehicleId) {
        return Constants.CARBOOK_BASE_URL + `carbook-vehicle-srv/rest/vehicle/bookable/${vehicleId}`;
    };

    public static MAKE_VEHICLE_NOT_BOOKABLE = function (vehicleId) {
        return Constants.CARBOOK_BASE_URL + `carbook-vehicle-srv/rest/vehicle/nonbookable/${vehicleId}`;
    };

    public static GET_EXPENSE_DATA = function (vehicleId) {
        return Constants.CARBOOK_BASE_URL + Constants.EXPENSE_BASE_URL + Constants.EXPENSE_DATA + `${vehicleId}`;
    };

    public static GET_EXPENSE_FOR_FLEET = function (fleetId) {
        return Constants.CARBOOK_BASE_URL + Constants.EXPENSE_BASE_URL + Constants.EXPENSE_FLEET + `${fleetId}` + '/accruals';
    };

    public static GET_DRIVER_DATA = function (driverId) {
        return Constants.CARBOOK_BASE_URL + Constants.CREATE_OPENREQUEST + '/driver/' + driverId;
    };

    public static UPDATE_NOTIFICATION = function (fleetId, vehicleId) {
        return Constants.CARBOOK_BASE_URL + Constants.FLEET_BASE_URL + Constants.SENDNOTIFICATION + fleetId + '/' + vehicleId;
    };

    public static REMOVE_DRIVER_FROM_VEHICLE = function (vehicleId, driverId) {
        return Constants.CARBOOK_BASE_URL + Constants.USER_VEHICLES + vehicleId + '/drivers/' + driverId;
    };

}
