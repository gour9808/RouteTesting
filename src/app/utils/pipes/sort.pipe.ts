import {Pipe, PipeTransform} from '@angular/core';
import * as _ from 'lodash';

@Pipe({
    name: 'sortBy',
    pure: false
})
export class SortPipe implements PipeTransform {

    transform(array: any, args: string): Array<string> {
        if (array === undefined || !array.length) {
            return array;
        }
        return _.orderBy(array, args, 'desc');
    }


}
