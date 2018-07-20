import {Pipe, PipeTransform} from '@angular/core';
import * as _ from 'lodash';
import {isNullOrUndefined} from "util";

export interface IFilterPipe {
    key: any;
    value: any;
}
@Pipe({
    name: 'filterBy',
    pure: false
})
export class FilterPipe implements PipeTransform {


    transform(items: any, term: IFilterPipe): any {
        if (items === undefined || !items.length) { return items; }
        if (term === undefined) { return items; }
        if (term.value === undefined) { return items; }
        if (term.key === undefined) {
            return items.filter(function (item) {
                for (const property in item) {
                    if (isNullOrUndefined(item[property])) {
                        continue;
                    }
                    if (item[property].toString().toLowerCase().includes(term.value.toLowerCase())) {
                        return true;
                    }
                }
                return false;
            });
        } else {
        return _.filter(items, [term.key, term.value]);
        }
    }

}
