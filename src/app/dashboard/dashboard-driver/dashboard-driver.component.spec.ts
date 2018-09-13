import { APP_BASE_HREF } from '@angular/common';
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { AppModule } from 'app/app.module';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { DebugElement } from '@angular/core';
import { By } from "@angular/platform-browser";
import { Observable } from 'rxjs/Observable';
import { FleetService } from '../../service/fleet.service';
import { LogbookSummaryService } from '../../service/logbook-summary.service';
import { DashboardModule } from '../dashboard.module';
import { FakeLogbookSummaryService } from '../../service/logbook-summary.service.mock';
import { FakeFleetService } from '../../service/fleet.service.mock';
import { Locale } from '../../models/vehicles';
import { DashboardDriverComponent } from './dashboard-driver.component';

const translations_en: any = { 'CANCEL': 'Cancel' };
const translations_de: any = { 'CANCEL': 'Cancele' };

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

fdescribe('DashboardDriverComponent', () => {

    let component: DashboardDriverComponent;
    let fixture: ComponentFixture<DashboardDriverComponent>;
    let debugElement: DebugElement;
    let element: any;
    let translate: TranslateService;
    let compiled;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [{ provide: APP_BASE_HREF, useValue: '/' }, { provide: FleetService, useClass: FakeFleetService }, { provide: LogbookSummaryService, useClass: FakeLogbookSummaryService }],
            imports: [AppModule, DashboardModule,
                TranslateModule.forRoot({
                    loader: { provide: TranslateLoader, useClass: FakeLoader },
                })
            ],

        }).compileComponents();
        fixture = TestBed.createComponent(DashboardDriverComponent);
        translate = TestBed.get(TranslateService);
        component = fixture.componentInstance;


    }));

    it('should be created', fakeAsync(() => {
        expect(component).toBeTruthy();
    }));

});