import {Pipe, PipeTransform} from '@angular/core';
import * as _ from 'lodash';

@Pipe({
    name: 'injectName'
})

export class  InjectNamePipe implements PipeTransform {

    transform(value: string, key: string,name:string): string {
        if (value.length != 0) {
          if(_.includes(value,key)){
              return value=_.replace(value,key,name);
          }  
        }
    }
}
