import { APP_BASE_HREF } from '@angular/common';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AppModule } from 'app/app.module';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { DebugElement } from '@angular/core';
import { By } from "@angular/platform-browser";


const translations_en: any = { 'CANCEL': 'Cancel' };
const translations_de: any = { 'CANCEL': 'Cancele' };

import { Observable } from 'rxjs/Observable';
import { FleetService } from 'app/service/fleet.service';
import { FakeFleetService } from 'app/service/fleet.service.mock';
import { OrganisationService } from 'app/service/organisation.service';
import { FakeOrganisationService } from 'app/service/organisation.service.mock';
import { UserService } from 'app/service/user.service';
import { FakeUserService } from 'app/service/user.service.mock';
import { AppComponent } from 'app/app.component';
import { SidebarComponent } from 'app/layouts/sidebar/sidebar.component';


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

fdescribe('AppComponent', () => {

    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let debugElement: DebugElement;
    let element: any;
    let translate: TranslateService;
    let compiled;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [{ provide: APP_BASE_HREF, useValue: '/' }, { provide: FleetService, useClass: FakeFleetService }, { provide: OrganisationService, useClass: FakeOrganisationService }, { provide: UserService, useClass: FakeUserService }],
            imports: [AppModule]
        }).compileComponents();
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
    }));

    it('Component should be defined', fakeAsync(() => {
        expect(component).toBeTruthy();
    }));

    it('should check for default language as english', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        const service = TestBed.get(TranslateService);
        expect(service.getDefaultLang()).toEqual('lang-en');
    }));

});
