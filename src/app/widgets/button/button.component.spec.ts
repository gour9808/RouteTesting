import {async, ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';
import {ButtonComponent} from './button.component';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs/Observable';
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";

const translations_en: any = {'CANCEL': 'Cancel'};
const translations_de: any = {'CANCEL': 'Cancele'};

class FakeLoader implements TranslateLoader {
    getTranslation(lang: string): Observable<any> {
        switch (lang) {
            case 'en':
                return Observable.of(translations_en);
            case 'de':
                return Observable.of(translations_de);
        }
    }
}


describe('Button Component', () => {

    let component: ButtonComponent;
    let fixture: ComponentFixture<ButtonComponent>;
    let translate: TranslateService;
    let debugElement: DebugElement;
    let element: any;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ButtonComponent],
            imports: [
                TranslateModule.forRoot({
                    loader: {provide: TranslateLoader, useClass: FakeLoader},
                })
            ],
        }).compileComponents();
        fixture = TestBed.createComponent(ButtonComponent);
        translate = TestBed.get(TranslateService);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement.query(By.css('button'));
        element = debugElement.nativeElement;
    }));


    it('button should contain label in english', fakeAsync(() => {
        translate.use('en');
        component.label = 'CANCEL';
        fixture.detectChanges();
        expect(element.innerHTML).toContain('Cancel');
    }));

    it('button should contain label in german', fakeAsync(() => {
        translate.use('de');
        component.label = 'CANCEL';
        fixture.detectChanges();
        expect(element.innerHTML).toContain('Cancele');
    }));

    it('button should be disabled', fakeAsync(() => {
        component.disabled = true;
        fixture.detectChanges();
        expect(element.disabled).toBeTruthy();
    }));

    it('button should be enabled', fakeAsync(() => {
        component.disabled = false;
        fixture.detectChanges();
        expect(element.disabled).toBeFalsy();
    }));
});
