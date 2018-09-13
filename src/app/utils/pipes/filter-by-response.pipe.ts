import {Pipe, PipeTransform} from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'filterByResponse'
})
export class FilterByResponse implements PipeTransform {

  transform(items: any, term: any): any {
    if (term === undefined || term === '' || term === null) { return items; }
      console.log('term', term);
    if(term == "PENDING") {
        return  _.filter(items, ['responseType', term]);
    } else if(term == 'ACCEPTED') {
        return _.filter(items, ['responseType', term]);
    } else if(term == true) {
        return  _.filter(items, ['freeStatus', term]);
    } else {
        return items;
    }
  }
}
