import {Pipe, PipeTransform} from '@angular/core';
import * as _ from 'lodash';

@Pipe({
    name: 'limitToPipe'
})

export class LimitPipe implements PipeTransform {

    transform(value: any[], limit: number): any[] {
        if (value.length != 0) {
            return _.slice(value, 0, limit);
        }
    }
}
