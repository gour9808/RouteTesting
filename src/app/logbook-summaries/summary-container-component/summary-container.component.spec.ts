import { APP_BASE_HREF } from '@angular/common';
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { AppModule } from 'app/app.module';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { SummaryContainerComponent } from './summary-container.component';
import { DebugElement } from '@angular/core';
import { By } from "@angular/platform-browser";


const translations_en: any = { 'CANCEL': 'Cancel' };
const translations_de: any = { 'CANCEL': 'Cancele' };

import { Observable } from 'rxjs/Observable';
import { FleetService } from '../../service/fleet.service';
import { FakeFleetService } from '../../service/fleet.service.mock';
import { OrganisationService } from '../../service/organisation.service';
import { FakeOrganisationService } from '../../service/organisation.service.mock';
import { UserService } from './../../service/user.service';
import { FakeUserService } from './../../service/user.service.mock';
import { FakeLogbookSummaryService } from './../../service/logbook-summary.service.mock';
import { LogbookSummaryService } from './../../service/logbook-summary.service';
import { LogbookSummariesModule } from './../logbook-summaries.module';

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

describe('SummaryContainerComponent', () => {

    let component: SummaryContainerComponent;
    let fixture: ComponentFixture<SummaryContainerComponent>;
    let debugElement: DebugElement;
    let element: any;
    let translate: TranslateService;
    let compiled;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [{ provide: APP_BASE_HREF, useValue: '/' }, { provide: FleetService, useClass: FakeFleetService }, { provide: OrganisationService, useClass: FakeOrganisationService }, { provide: UserService, useClass: FakeUserService }, { provide: LogbookSummaryService, useClass: FakeLogbookSummaryService }],
            imports: [AppModule, LogbookSummariesModule,
                TranslateModule.forRoot({
                    loader: { provide: TranslateLoader, useClass: FakeLoader },
                })
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(SummaryContainerComponent);
        translate = TestBed.get(TranslateService);
        component = fixture.componentInstance;


    }));

    it('should be created', fakeAsync(() => {
        expect(component).toBeTruthy();
    }));

    it('After fetching fleet view vehicle list length should be greater than Zero', fakeAsync(() => {
        component.getFleetView();
        expect(component.vehicleList.length).toBeGreaterThan(0);
    }));

    it('vehicle list length should be Zero', fakeAsync(() => {
        expect(component.vehicleList.length).toEqual(0);
    }));



    it('After fetching logsummary the logs length should be greater than zero', fakeAsync(() => {
        component.getLogbookSummary();
        expect(component.logs.length).toEqual(0);
    }));

    it('logs length should be equal to zero', fakeAsync(() => {
        component.getLogbookSummary();
        expect(component.logs.length).toBeGreaterThan(0);
    }));

    it('logs length should be equal to zero', fakeAsync(() => {
        expect(component.logs.length).toEqual(0);
    }));
});
