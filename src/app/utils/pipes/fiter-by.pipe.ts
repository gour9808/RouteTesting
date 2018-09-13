import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'filterByAny'
})
export class FiterByPipe implements PipeTransform {

  transform(items: any, term: any): any {
    if (term === undefined || term === '' || term === null) { return items; }
    console.log('term', term);
    return items.filter(function(item) {
      for (const field in item) {
       console.log('field', field);
          if (item[field] === term) {
            return true;
          }

      }
    })
  }

}
