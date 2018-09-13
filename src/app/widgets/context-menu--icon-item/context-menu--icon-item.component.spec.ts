import {async, ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs/Observable';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import * as translations_en from '../../../assets/lang-en.json';
import * as translations_de from '../../../assets/lang-de.json';
import {WidgetsModule} from '../widgets.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ContextMenuIconItemComponent} from "./context-menu--icon-item.component";

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


describe('Context Menu Item Component', () => {

    let component: ContextMenuIconItemComponent;
    let fixture: ComponentFixture<ContextMenuIconItemComponent>;
    let translate: TranslateService;
    let debugElement: DebugElement;
    let element: any;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserAnimationsModule,
                WidgetsModule,
                TranslateModule.forRoot({
                    loader: {provide: TranslateLoader, useClass: FakeLoader},
                })
            ],
        }).compileComponents();
        fixture = TestBed.createComponent(ContextMenuIconItemComponent);
        translate = TestBed.get(TranslateService);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement.query(By.css('.card-title'));
        element = fixture.nativeElement.querySelector('.card-title');
    }));

    it('item should contain label in english', fakeAsync(() => {
        translate.use('lang-en');
        component.label = 'CANCEL';
        fixture.detectChanges();
        element = fixture.nativeElement.querySelector('.label');
        expect(element).toBeTruthy();
        expect(element.innerHTML).toContain('Cancel');
    }));

    it('item should contain label in german', fakeAsync(() => {
        translate.use('lang-de');
        component.label = 'CANCEL';
        fixture.detectChanges();
        element = fixture.nativeElement.querySelector('.label');
        expect(element.innerHTML).toContain('Abbrechen');
    }));

});
