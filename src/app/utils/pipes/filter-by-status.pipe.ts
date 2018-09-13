import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByStatus'
})
export class FilterByStatusPipe implements PipeTransform {

  transform(items: any, term: any): any {
    if (term === undefined || term === '' || term === null) { return items; }
    console.log('term', term);
    return items.filter(function(item) {
      for (const field in item) {
        if (field === 'status') {
          if (item[field] === term) {
            return true;
          }
        }
      }
    })
  }

}
