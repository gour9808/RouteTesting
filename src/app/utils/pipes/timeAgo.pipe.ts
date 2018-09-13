import { Pipe, PipeTransform, NgZone, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';

@Pipe({
    name: 'timeAgo',
    pure: false
})

export class TimeAgoPipe implements PipeTransform {
    dateString: any;

    constructor(private changeDetectorRef: ChangeDetectorRef, private ngZone: NgZone, private translateService: TranslateService) { }

    transform(value: string) {
        const d = new Date(value);
        const now = new Date();
        const seconds = Math.round(Math.abs((now.getTime() - d.getTime()) / 1000));
        const minutes = Math.round(Math.abs(seconds / 60));
        this.translateService.currentLang == 'lang-de' ? this.dateString = 'de' : this.dateString = 'en';
        const duration = moment.duration(- minutes, "minutes").locale(this.dateString).humanize(true);
        return duration;
    }
}