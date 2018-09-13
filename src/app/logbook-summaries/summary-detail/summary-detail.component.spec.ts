import { SummaryContainerComponent } from 'app/logbook-summaries/summary-container-component/summary-container.component';
import { APP_BASE_HREF } from '@angular/common';
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { AppModule } from 'app/app.module';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import {SummaryDetailComponent} from './summary-detail.component';
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

describe('SummaryDetailComponent', () => {

    let component: SummaryDetailComponent;
    let fixture: ComponentFixture<SummaryDetailComponent>;
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
        fixture = TestBed.createComponent(SummaryDetailComponent);
        translate = TestBed.get(TranslateService);
        component = fixture.componentInstance;
    }));

    it('should be created', fakeAsync(() => {
        expect(component).toBeTruthy();
    }));
});
