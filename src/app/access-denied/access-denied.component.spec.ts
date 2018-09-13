import { APP_BASE_HREF } from '@angular/common';
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { AppModule } from 'app/app.module';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { DebugElement } from '@angular/core';
import { By } from "@angular/platform-browser";
const translations_en: any = { 'CANCEL': 'Cancel' };
const translations_de: any = { 'CANCEL': 'Cancele' };
import { Observable } from 'rxjs/Observable';
import { AccessDeniedComponent } from './access-denied.component';


fdescribe('AccessDeniedComponent ', () => {

    let component: AccessDeniedComponent;
    let fixture: ComponentFixture<AccessDeniedComponent>;
    let debugElement: DebugElement;
    let element: any;
    let translate: TranslateService;
    let compiled;

    beforeEach(async(() => {

        TestBed.configureTestingModule({

            providers: [{ provide: APP_BASE_HREF, useValue: '/' },],

            imports: [AppModule]

        }).compileComponents();

        fixture = TestBed.createComponent(AccessDeniedComponent);
        component = fixture.componentInstance;

    }));


    it('template should contain 401', fakeAsync(() => {
        debugElement = fixture.debugElement.query(By.css('h1'));
        element = debugElement.nativeElement;
        fixture.detectChanges();
        expect(element.innerHTML).toContain('401');
    }));
});


