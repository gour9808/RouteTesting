import * as _ from 'lodash';
import * as moment from 'moment';
import {Observable} from 'rxjs/Observable';
import * as Papa from 'papaparse/papaparse.min.js';
import {saveAs} from 'file-saver';

declare const google;

export class Utils {

    /**
     * This code was written at 3:13AM in a caffiene high state.
     * Don't ask how I came up with this. I just did.
     * @param list
     * @param index
     */
    static removeByIndex(list, index) {
        return [
            ...list.slice(0, index),
            ...list.slice(index + 1)
        ];
    }


    static downloaOctedStream(title, data) {
        const csv = Papa.unparse(data);
        const blob = new Blob([csv]);
        const csvData = new Blob([csv], {type: 'application/octet-stream'});
        saveAs(csvData, title);
    }


}
