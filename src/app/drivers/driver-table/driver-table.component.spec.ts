import { APP_BASE_HREF } from '@angular/common';
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { AppModule } from 'app/app.module';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { DriverTableComponent } from './driver-table.component';
import { DriverModule } from './../drivers.module';
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
import { WidgetsModule } from '../../widgets/widgets.module';
import { PrimengModule } from '../../module/primeng.module';

import { LogbookSummaryService } from './../../service/logbook-summary.service';
import { FakeLogbookSummaryService } from './../../service/logbook-summary.service.mock';


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

describe('DriverTableComponent', () => {

    let component: DriverTableComponent;
    let fixture: ComponentFixture<DriverTableComponent>;
    let debugElement: DebugElement;
    let element: any;
    let translate: TranslateService;
    let compiled;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [AppModule, DriverModule, WidgetsModule,
                PrimengModule,
                TranslateModule.forRoot({
                    loader: { provide: TranslateLoader, useClass: FakeLoader },
                })
            ],
            providers: [{ provide: APP_BASE_HREF, useValue: '/' }, { provide: FleetService, useClass: FakeFleetService }, { provide: OrganisationService, useClass: FakeOrganisationService }, { provide: UserService, useClass: FakeUserService }, { provide: LogbookSummaryService, useClass: FakeLogbookSummaryService }]

        }).compileComponents();
        fixture = TestBed.createComponent(DriverTableComponent);
        translate = TestBed.get(TranslateService);
        component = fixture.componentInstance;
    }));

    it('Function getSummary() should set $summary', fakeAsync(() => {
        component.getSummary();
        fixture.detectChanges();
        expect(component.summary.length).not.toBe(0);
    }));

    it('Function getDriversInFleet() should set $drivers', fakeAsync(() => {
        component.getDriversInFleet();
        fixture.detectChanges();
        expect(component.drivers.length).not.toBe(0);
    }));


});
