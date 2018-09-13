import { APP_BASE_HREF } from '@angular/common';
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
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
import { ExpenseReportMainComponent } from 'app/reports/expense-report/expense-report-main/expense-report-main.component';
import { ReportsModule } from 'app/reports/reports.module';
import { VehicleModule } from './../vehicle.module';
import { VehicleDetailModule } from '../vehicle-detail/vehicle-detail.module';
import { VehicleReminderComponent } from './vehicle-reminder.component';



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

fdescribe('VehicleReminderComponent', () => {

    let component: VehicleReminderComponent;
    let fixture: ComponentFixture<VehicleReminderComponent>;
    let debugElement: DebugElement;
    let element: any;
    let translate: TranslateService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [{ provide: APP_BASE_HREF, useValue: '/' }, { provide: FleetService, useClass: FakeFleetService }, { provide: OrganisationService, useClass: FakeOrganisationService }, { provide: UserService, useClass: FakeUserService }],
            imports: [AppModule, VehicleDetailModule,
                TranslateModule.forRoot({
                    loader: { provide: TranslateLoader, useClass: FakeLoader },
                })
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(VehicleReminderComponent);
        translate = TestBed.get(TranslateService);
        component = fixture.componentInstance;
    }));

    it('Component should be created', fakeAsync(() => {
        expect(component).toBeTruthy();
    }));

});
