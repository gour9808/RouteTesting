import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs/Observable';
import {CalenderComponent} from './calender.component';
import {PrimengModule} from '../../module/primeng.module';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import * as translations_en from '../../../assets/lang-en.json';
import * as translations_de from '../../../assets/lang-de.json';

class FakeLoader implements TranslateLoader {
    getTranslation(lang: string): Observable<any> {
        switch (lang) {
            case 'lang-en':
                return Observable.of(translations_en);
            case 'lang-de':
                return Observable.of(translations_de);
        }
    }

    onLangChange(lang: string): Observable<any> {
        switch (lang) {
            case 'lang-en':
                return Observable.of('lang-en');
            case 'lang-de':
                return Observable.of('lang-de');
        }
    }
}


describe('Calendar Component', () => {

    let component: CalenderComponent;
    let fixture: ComponentFixture<CalenderComponent>;
    let translate: TranslateService;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CalenderComponent],
            providers: [TranslateService],
            imports: [
                PrimengModule,
                FormsModule,
                BrowserAnimationsModule,
                TranslateModule.forRoot({
                    loader: {provide: TranslateLoader, useClass: FakeLoader},
                })
            ],
        }).compileComponents();
        fixture = TestBed.createComponent(CalenderComponent);
        translate = TestBed.get(TranslateService);
        component = fixture.componentInstance;
    }));

    // beforeEach(fakeAsync(() => {
    //     component.ngOnInit();
    //     tick();
    //     fixture.detectChanges();
    // }));

    it('title should be in english', fakeAsync(() => {
        translate.use('lang-en');
        component.ngOnInit(); // call ngOnInit
        tick(); // simulate the promise being resolved
        component.title = 'CANCEL';
        fixture.detectChanges();
        const ele = component.calendarLabel.nativeElement;
        expect(ele.innerHTML).toContain((<any>translations_en).CANCEL);
    }));

    it('should switch date locale to english', (() => {
        translate.use('lang-en');
        component.switchLocale();
        fixture.detectChanges();
        console.log('Locale', component.currentLocale);
        expect(component.currentLocale).toBeTruthy();
        expect(component.currentLocale.firstDayOfWeek).toEqual(0);
        expect(component.currentLocale.dayNames).toEqual(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']);
        expect(component.currentLocale.dayNamesShort).toEqual(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
        expect(component.currentLocale.dayNamesMin).toEqual(['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']);
        expect(component.currentLocale.monthNames).toEqual(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);
        expect(component.currentLocale.monthNamesShort).toEqual(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);
    }));

    it('should switch date locale to german', (() => {
        translate.use('lang-de');
        component.switchLocale();
        fixture.detectChanges();
        console.log('Locale', component.currentLocale);
        expect(component.currentLocale).toBeTruthy();
        expect(component.currentLocale.firstDayOfWeek).toEqual(0);
        expect(component.currentLocale.dayNames).toEqual(['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Fritag', 'Samstag']);
        expect(component.currentLocale.dayNamesShort).toEqual(['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa']);
        expect(component.currentLocale.dayNamesMin).toEqual(['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']);
        expect(component.currentLocale.monthNames).toEqual(['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', ' Oktober', ' November', ' Dezember']);
        expect(component.currentLocale.monthNamesShort).toEqual(['Jan', 'Feb', 'März', 'Apr', 'Mai', 'Juni', 'Juli', 'Aug', 'Sep', 'Okt', 'Nov', ' Dez']);
    }));

});
