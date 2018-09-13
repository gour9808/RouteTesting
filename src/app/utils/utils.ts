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

    static everythingToLower(objs) {
        //  return _.mapValues(objs, function(s){ return _.isString(s) ? s.toLowerCase() : s; });
        return JSON.parse(JSON.stringify(objs, function (key, val) {
            // add checks for enum here
            switch (key) {
                case 'chargerType':
                case 'countryCode':
                    return val;
                default:
                    return typeof val === 'string' ? val.toLowerCase() : val;
            }
        }));
    }

    static validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    
    static validateLicence(license) {
        const re = /^[A-Z,0-9 ,-]*$/ ;
        return re.test(license);
    }

    static validateUrl(url) {
        const re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
        return re.test(url);
    }

    static returnNumbers(no) {
        const value = /^[0-9 ,+-]*$/.test(no);
        return value;
    }

    static validateNumbersAreEntered(n) {
        const value = /^[0-9 ,+-]*$/.test(n);
        return value;
    }

    static validatePhoneNumber(number) {
        const _10dig = /^\d{10}$/; // XXXXXXXXXX
        const _charspaces = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;  // XXX-XXX-XXXX | XXX.XXX.XXXX | XXX XXX XXXX
        const _withcountrycode = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/; // +XX XXXX XXXX | +XX-XXXX-XXXX | +XX.XXXX.XXXX

        return _10dig.test(number) || _charspaces.test(number) || _withcountrycode.test(number);
    }

    /**
     *
     * @param obj If you are reading this. go here and upvote the answer:https://stackoverflow.com/questions/18515254/recursively-remove-null-values-from-javascript-object
     */
    static pruneEmpty(obj) {
        return function prune(current) {
            _.forOwn(current, function (value, key) {
                if (_.isUndefined(value) || _.isNull(value) || _.isNaN(value) ||
                    (_.isString(value) && _.isEmpty(value)) ||
                    (_.isObject(value) && _.isEmpty(prune(value)))) {

                    delete current[key];
                }
            });
            // remove any leftover undefined values from the delete
            // operation on an array
            if (_.isArray(current)) {
                _.pull(current, undefined);
            }

            return current;

        }(_.cloneDeep(obj));  // Do not modify the original object, create a clone instead
    }

    static equals(x, y) {
        if (x === y) {
            return true;
        }
        // if both x and y are null or undefined and exactly the same

        if (!(x instanceof Object) || !(y instanceof Object)) {
            return false;
        }
        // if they are not strictly equal, they both need to be Objects

        if (x.constructor !== y.constructor) {
            return false;
        }
        // they must have the exact same prototype chain, the closest we can do is
        // test there constructor.

        for (const p in x) {
            if (!x.hasOwnProperty(p)) {
                continue;
            }
            // other properties were tested using x.constructor === y.constructor

            if (!y.hasOwnProperty(p)) {
                return false;
            }
            // allows to compare x[ p ] and y[ p ] when set to undefined

            if (x[p] === y[p]) {
                continue;
            }
            // if they have the same strict value or identity then they are equal

            if (typeof (x[p]) !== 'object') {
                return false;
            }
            // Numbers, Strings, Functions, Booleans must be strictly equal

            if (!this.equals(x[p], y[p])) {
                return false;
            }
            // Objects and Arrays must be tested recursively
        }

        for (const p in y) {
            if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) {
                return false;
            }
            // allows x[ p ] to be set to undefined
        }
        return true;
    }

    static parseQueryString(str) { // lifted from https://github.com/sindresorhus/query-string
        if (typeof str !== 'string') {
            return {};
        }

        str = str.trim().replace(/^(\?|#|&)/, '');

        if (!str) {
            return {};
        }

        return str.split('&').reduce(function (ret, param) {
            const parts = param.replace(/\+/g, ' ').split('=');
            // Firefox (pre 40) decodes `%3D` to `=`
            // https://github.com/sindresorhus/query-string/pull/37
            let key = parts.shift();
            let val = parts.length > 0 ? parts.join('=') : undefined;

            key = decodeURIComponent(key);

            // missing `=` should be `null`:
            // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
            val = val === undefined ? null : decodeURIComponent(val);

            if (!ret.hasOwnProperty(key)) {
                ret[key] = val;
            } else if (Array.isArray(ret[key])) {
                ret[key].push(val);
            } else {
                ret[key] = [ret[key], val];
            }

            return ret;
        }, {});
    };

    static getExtension(name) {
        return name.slice((name.lastIndexOf('.') - 1 >>> 0) + 2);
    }

    static returnImages(files) {
        return _.filter(files, function (file) {
            return _.includes(['jpeg', 'png', 'jpg', 'gif'], Utils.getExtension(file.name));
        });
    }

    static shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    static getLast10Days() {
        const daysAgo = [];
        for (let i = 7; i > 0; i--) {
            daysAgo.push(moment().subtract(i, 'days').format('Do MMM'));
        }
        return daysAgo;
    }

    static getStartOfCurrentYear() {
        const date = new Date();
        return new Date(date.getFullYear(), 0, 1, 0, 0, 0, 0);
    }

    static getStartOfCurrentDay() {
        const date = new Date();
        date.setHours(0, 0, 0, 0);
        return new Date(date);
    }

    static getEndOfCurrentDay() {
        const date = new Date();
        date.setHours(23, 59, 59, 59);
        return new Date(date);
    }

    static getStartOfCurrentMonth() {
        const date = new Date();
        return new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0);
    }

    static getLastWeek() {
        const date = new Date();
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7, 0, 0, 0, 0);
    }

    static getRandomFromArray(array: any) {
        return array[Math.floor(Math.random() * array.length)];
    }

    static getMonths() {
        const months = _.times(12).map(i => moment().month(i).format('MMM'));
        return months;
    }

    static splitObject(obj) {
        let str = '';
        _.forOwn(obj, (value, key) => {
            if (typeof value === 'object') {
                return Utils.splitObject(value);
            }
            str = _.isEmpty(value) ? str : str + value + ',';
        });
        return str;
    }

    /**
     * Repeat an observable until condition
     * @param interval
     * @param observable
     * @param until
     * @returns {Observable<any>}
     */
    static repeat(interval, observable, until) {
        return Observable.interval(interval * 1000)
            .takeWhile(() => until)
            .flatMap(() => observable)
            .catch((err, obs) => {
                console.log('Error in polling', err);
                return obs;
            });
    }

    /**
     * get countrycode from latlng
     * @param latlng
     */
    static getCountry(latlng): Observable<String> {
        let country = '';
        const geocoder = new google.maps.Geocoder();
        return Observable.create(observer => {
            geocoder.geocode({location: latlng}, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    const result = results[0];
                    const filtered_array = result.address_components.filter(function (address_component) {
                        return address_component.types.includes('country');
                    });
                    country = filtered_array.length ? filtered_array[0].short_name : '';
                    observer.next(country);
                    observer.complete();
                }
            });
        });
    }

    static getLocale() {
        return (navigator.languages && navigator.languages.length) ? navigator.languages[0] : navigator.language;
    }

    static getTimezone() {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
    }

    static hasKey(arr, key) {
        console.log('Checking ', _.has(arr, key));
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === key) {
                console.log('Found');
            } else {
                console.log('Not Found');
            }
        }
        return false;
    }

    static hasValue(obj, value) {
        Object.keys(obj).forEach(key => {
            console.log(obj[key], value);
            if (obj[key] == value) {
                return true;
            }
        });
        return false;
    }

    static arrayHasValue(array, key, value) {
        console.log(array);
        console.log(key, value);
        return _.filter(array, (item) => {
            return item[key].toLowerCase().indexOf(value.toLowerCase()) !== -1;
        });
    }

    static flatten(object: Object, separator: string = '_'): Object {
        const isValidObject = (value: {}): boolean => {
            if (!value) {
                return false;
            }

            const isArray = Array.isArray(value);
            const isBuffer = Buffer.isBuffer(value);
            const isΟbject = Object.prototype.toString.call(value) === '[object Object]';
            const hasKeys = !!Object.keys(value).length;

            return !isArray && !isBuffer && isΟbject && hasKeys;
        };

        const walker = (child: {}, path: Array<string> = []): Object => {
            return Object.assign({}, ...Object.keys(child).map(key => isValidObject(child[key])
                ? walker(child[key], path.concat([key]))
                : {[path.concat([key]).join(separator)]: child[key]})
            );
        };

        return Object.assign({}, walker(object));
    }

    static getLocation(result) {
        if (navigator.geolocation) {
            console.log('Getting location');
            return navigator.geolocation.getCurrentPosition(position => {
                console.log(position);
                result(position);
            });
        }
    }

    static displayTime(millisec: number) {
        const normalizeTime = (time: any): any => (time.length === 1) ? time.padStart(2, '0') : time;

        let seconds: string = (millisec / 1000).toFixed(0);
        let minutes: string = Math.floor(parseInt(seconds) / 60).toString();
        let hours = '';

        if (parseInt(minutes) > 59) {
            hours = normalizeTime(Math.floor(parseInt(minutes) / 60).toString());
            minutes = normalizeTime((parseInt(minutes) - (parseInt(hours) * 60)).toString());
        }
        seconds = normalizeTime(Math.floor(parseInt(seconds) % 60).toString());

        if (hours !== '') {
            return `${hours}:${minutes}:${seconds}`;
        }
        return `${minutes}:${seconds}`;
    }

    static getDays(month, year) {
        var ar = [];
        var start = moment(year + '-' + month, 'YYYY-MMM');
        for (var end = moment(start).add(1, 'month'); start.isBefore(end); start.add(1, 'day')) {
            ar.push(start.format('D-ddd'));
        }
        return ar;
    }

    static getRandomDecimalInRange(minimum, maximum, precision) {
        minimum = minimum === undefined ? 0 : minimum;
        maximum = maximum === undefined ? 65535 : maximum;
        precision = precision === undefined ? 0 : precision;

        let random = Math.random() * (maximum - minimum) + minimum;

        return random.toFixed(precision);
    }

    static downloadCSV(title, data) {
        const csv = Papa.unparse(data);
        const blob = new Blob([csv]);
        const csvData = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
        saveAs(csvData, title);
    }
}
