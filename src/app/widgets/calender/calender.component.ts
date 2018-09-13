import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AutoUnsubscribe} from "../../utils/auto-unsubscribe";

@Component({
    selector: 'cbp-calender',
    templateUrl: './calender.component.html',
    styleUrls: ['./calender.component.scss']
})
@AutoUnsubscribe()
export class CalenderComponent implements OnInit {
    @Input() model: any;
    @Input() title: any;
    @Input() mandatory: boolean;
    @Input() showTime: Date;
    @Input() icon: any;
    @Input() iconColor: any;
    @Output() modelChange: EventEmitter<any> = new EventEmitter<any>();
    @Input() disabled = false;
    currentLocale: any;
    translateService$: any;
    @ViewChild('calendarLabel') calendarLabel: any;

    private en = {
        firstDayOfWeek: 0,
        dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        today: 'Today',
        clear: 'Clear'
    };
    private de = {
        firstDayOfWeek: 0,
        dayNames: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Fritag', 'Samstag'],
        dayNamesShort: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
        dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        monthNames: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', ' Oktober', ' November', ' Dezember'],
        monthNamesShort: ['Jan', 'Feb', 'März', 'Apr', 'Mai', 'Juni', 'Juli', 'Aug', 'Sep', 'Okt', 'Nov', ' Dez'],
        today: 'Today',
        clear: 'Clear'
    };

    constructor(private translateService: TranslateService, private changed: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.switchLocale();
        this.translateService$ = this.translateService.onLangChange.subscribe((event) => {
            console.log('current lang', this.translateService.currentLang);
            this.switchLocale();
        });
    }

    selected(event) {
        this.modelChange.emit(this.model)
    }

    switchLocale() {
        switch (this.translateService.currentLang) {
            case 'lang-en':
                this.currentLocale = this.en;
                break;
            case 'lang-de' :
                this.currentLocale = this.de;
                break;
        }
        this.changed.detectChanges();
    }

}
