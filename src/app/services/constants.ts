import { Cache } from "../utils/storage.provider";

export class Constants { 
    
    

    public static BASE_URL = "https://ap5.salesforce.com/services/data/v35.0/tooling/query/?q=";
    public static USER_SEARCH_BASE_URL = "https://ap5.salesforce.com/services/data/v35.0/query/?q="
    public static CREATE_USER_URL = "https://ap5.salesforce.com/services/data/v35.0/tooling/sobjects/TraceFlag/";
    public static FETCH_EVENTS_URL = "https://ap5.salesforce.com/services/data/v35.0/query/?q=";
    public static CREATE_DEBUG_LEVEL_URL = "https://ap5.salesforce.com/services/data/v35.0/tooling/sobjects/DebugLevel/";
    public static DELETE_DEBUG_LEVEL_LOG_BY_ID = "https://ap5.salesforce.com/services/data/v35.0/tooling/sobjects/DebugLevel/";
    public static UPDATE_DEBUG_LEVEL_BY_ID = "https://ap5.salesforce.com/services/data/v35.0/tooling/sobjects/DebugLevel/";


    public static GET_MINE_LOGS = function (LogUserId) {
                
        return "SELECT id, Application, Operation, Status, DurationMilliseconds, LogLength, StartTime, LogUser.Name from ApexLog where   LogUserId = " + "'" + LogUserId + "'" + "  ORDER BY StartTime  DESC LIMIT 20"
    };

    public static GET_ALL_LOGS = function () {
        return "SELECT id, Application, Operation, Status, DurationMilliseconds, LogLength, StartTime, LogUser.Name from ApexLog ORDER BY StartTime DESC LIMIT 20"
    }

    public static GET_PARTICULAR_LOG = function (recordId) {
        return "/services/data/v41.0/sobjects/ApexLog/" + recordId + "/Body/"
    }

    public static DOWNLOAD_LOGS = function (recordId) {
        return "/servlet/servlet.FileDownload?file=" + recordId;
    }

    public static DELETE_PARTICULAR_FLAG = function (traceFlagId) {
        return "/services/data/v35.0/tooling/sobjects/TraceFlag/" + traceFlagId;
    }

    public static DELETE_DEBUG_LEVEL_LOG_BY_ID_URL = function (logLevelId) {
        return "/services/data/v35.0/tooling/sobjects/DebugLevel/" + logLevelId;
    }

    public static FETCH_DEBUG_LEVEL_LOG_BY_ID_URL = function (logLevelId) {
        return "/services/data/v35.0/tooling/sobjects/DebugLevel/" + logLevelId;
    }

    public static UPDATE_DEBUG_LEVEL_LOG_BY_ID_URL = function (id) {
        return "/services/data/v35.0/tooling/sobjects/DebugLevel/" + id;
    }


}
