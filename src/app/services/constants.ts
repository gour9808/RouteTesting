export class Constants {
    public static BASE_URL = "https://ap5.salesforce.com/services/data/v35.0/tooling/query/?q=";
    public static USER_SEARCH_BASE_URL = "https://ap5.salesforce.com/services/data/v35.0/query/?q="
    public static CREATE_USER_URL = "https://ap5.salesforce.com/services/data/v35.0/tooling/sobjects/TraceFlag/";
    public static FETCH_EVENTS_URL = "https://ap5.salesforce.com/services/data/v35.0/query/?q=";

    public static GET_MINE_LOGS = function (LogUserId) {
        return "https://ap5.salesforce.com/services/data/v35.0/tooling/query/?q=SELECT%20id%2C%20Application%2C%20Operation%2C%20Status%2C%20DurationMilliseconds%2C%20LogLength%2C%20StartTime%2C%20LogUser.Name%20from%20ApexLog%20where%20%20LogUserId%20%3D%20%27" + LogUserId + "%27%20%20ORDER%20BY%20StartTime%20DESC%20LIMIT%2020"
    };

    public static GET_ALL_LOGS = function () {
        return "https://ap5.salesforce.com/services/data/v35.0/tooling/query/?q=SELECT%20id%2C%20Application%2C%20Operation%2C%20Status%2C%20DurationMilliseconds%2C%20LogLength%2C%20StartTime%2C%20LogUser.Name%20from%20ApexLog%20ORDER%20BY%20StartTime%20DESC%20LIMIT%2020"
    }

    public static GET_PARTICULAR_LOG = function (recordId) {
        return "https://ap5.salesforce.com/services/data/v35.0/sobjects/ApexLog/" + recordId + "/Body/"
    }

    public static DOWNLOAD_LOGS = function (recordId) {
        return "https://ap5.salesforce.com/servlet/servlet.FileDownload?file=" + recordId;
    }

    public static DELETE_PARTICULAR_FLAG = function (traceFlagId) {
        return "https://ap5.salesforce.com/services/data/v35.0/tooling/sobjects/TraceFlag/" + traceFlagId;
    }
}
