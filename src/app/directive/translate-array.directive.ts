import { Directive, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import { TranslateService } from '@ngx-translate/core';

@Directive({
  selector: '[cbpTranslateArray]'
})
export class TranslateArrayDirective {

  @Input() cbpTranslateArray: any;
  @Input() cbpAxis: any;
  @Output() newArray = new EventEmitter();
  dateString: any;
  translateService$;

  constructor(private translateService: TranslateService) {

    this.translateService$ = this.translateService.onLangChange.subscribe((event) => {

      event.lang == 'lang-de' ? this.dateString = 'de-DE' : this.dateString = 'en-US';

      if(this.cbpTranslateArray != undefined) {
        _.map(this.cbpTranslateArray, (data) => this.checkSeries(data));
      }
      if(this.cbpAxis != undefined) {
        _.map(this.cbpAxis, (data) => {
          _.has(data, 'series') == true ? this.convertMonth(data['series']) : this.convertMonth(data);
        });
      }
    });
  }

  ngOnInit() {
    if (this.cbpTranslateArray != undefined) {
      _.map(this.cbpTranslateArray, (data) => this.checkSeries(data));
    }
    this.translateService.currentLang == 'lang-de' ? this.dateString = 'de-DE' : this.dateString = 'en-US';
    if(this.cbpAxis != undefined) {
      _.map(this.cbpAxis, (data) => {
        _.has(data, 'series') == true ? this.convertMonth(data['series']) : this.convertMonth(data);
      });
    }
  }

  convertMonth(array) {
    array.forEach(item => {
      item['name'] = new Date(item['key']).toLocaleString(this.dateString, { month: 'long', day: 'numeric'});
    });
    this.newArray.emit(this.cbpAxis);
  }

  checkSeries(data) {
    _.has(data, 'series') == true ? this.translattion(data['series']) : this.translattion(this.cbpTranslateArray);
  }

  translattion(array) {
    array.forEach(item => {
      this.translateService.get(item['key']).subscribe((res: string) => {
        item['name'] = res;
      });
    });
    this.newArray.emit(this.cbpTranslateArray);
  }

}
