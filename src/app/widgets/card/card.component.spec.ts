import {async, ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs/Observable';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {CardComponent} from './card.component';
import * as translations_en from '../../../assets/lang-en.json';
import * as translations_de from '../../../assets/lang-de.json';
import {WidgetsModule} from '../widgets.module';

class FakeLoader implements TranslateLoader {
    getTranslation(lang: string): Observable<any> {
        switch (lang) {
            case 'lang-en':
                return Observable.of(translations_en);
            case 'lang-de':
                return Observable.of(translations_de);
        }
    }
}


describe('Card Component', () => {

    let component: CardComponent;
    let fixture: ComponentFixture<CardComponent>;
    let translate: TranslateService;
    let debugElement: DebugElement;
    let element: any;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                WidgetsModule,
                TranslateModule.forRoot({
                    loader: {provide: TranslateLoader, useClass: FakeLoader},
                })
            ],
        }).compileComponents();
        fixture = TestBed.createComponent(CardComponent);
        translate = TestBed.get(TranslateService);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement.query(By.css('.card-title'));
        element = fixture.nativeElement.querySelector('.card-title');
    }));

    it('button should contain label in english', fakeAsync(() => {
        translate.use('lang-en');
        component.label = 'CANCEL';
        fixture.detectChanges();
        element = fixture.nativeElement.querySelector('.card-title');
        expect(element).toBeTruthy();
        expect(element.innerHTML).toContain('Cancel');
    }));

    it('button should contain label in german', fakeAsync(() => {
        translate.use('lang-de');
        component.label = 'CANCEL';
        fixture.detectChanges();
        element = fixture.nativeElement.querySelector('.card-title');
        expect(element.innerHTML).toContain('Abbrechen');
    }));

});
