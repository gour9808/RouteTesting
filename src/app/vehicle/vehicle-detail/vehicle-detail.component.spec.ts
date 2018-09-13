import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { VehicleDetailComponent } from './vehicle-detail.component';
import { DebugElement } from '@angular/core';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import { APP_BASE_HREF } from '@angular/common';
import { FleetService } from '../../service/fleet.service';
import { FakeFleetService } from '../../service/fleet.service.mock';
import { OrganisationService } from '../../service/organisation.service';
import { FakeOrganisationService } from '../../service/organisation.service.mock';
import { AppModule } from '../../app.module';
import { SidebarComponent } from '../../layouts/sidebar/sidebar.component';
import { VehicleModule } from '../vehicle.module';
import { By } from '@angular/platform-browser';

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

describe('VehicleDetailComponent', () => {
    let component: VehicleDetailComponent;
    let fixture: ComponentFixture<VehicleDetailComponent>;
    let debugElement: DebugElement;
    let element: any;
    let translate: TranslateService;
    let compiled;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [{ provide: APP_BASE_HREF, useValue: '/' }, { provide: FleetService, useClass: FakeFleetService }, { provide: OrganisationService, useClass: FakeOrganisationService }],
            imports: [AppModule, VehicleModule,
                TranslateModule.forRoot({
                    loader: { provide: TranslateLoader, useClass: FakeLoader },
                })
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(VehicleDetailComponent);
        translate = TestBed.get(TranslateService);
        component = fixture.componentInstance;

    }));

    it('component should be created', fakeAsync(() => {
        expect(component).toBeTruthy();
    }));

});
