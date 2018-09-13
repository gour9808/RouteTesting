import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'capitalize'
})
export class Capitalize implements PipeTransform {

  transform(items: any): any {
    if (items === undefined || items === '' || items === null) {
        return items;
    }
    return  _.capitalize(_.startCase(items));
  }

}