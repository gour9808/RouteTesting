
import { APP_BASE_HREF } from '@angular/common';
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppModule } from 'app/app.module';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';

import { DebugElement } from '@angular/core';
import { By } from "@angular/platform-browser";


const translations_en: any = { 'CANCEL': 'Cancel' };
const translations_de: any = { 'CANCEL': 'Cancele' };

import { Observable } from 'rxjs/Observable';
import { DataLoaderComponent } from './data-loader.component';
import { FleetService } from 'app/service/fleet.service';
import { FakeFleetService } from 'app/service/fleet.service.mock';
import { OrganisationService } from 'app/service/organisation.service';
import { FakeOrganisationService } from 'app/service/organisation.service.mock';
import { LogbookSummaryService } from 'app/service/logbook-summary.service';
import { FakeLogbookSummaryService } from 'app/service/logbook-summary.service.mock';
import { UserService } from 'app/service/user.service';
import { FakeUserService } from 'app/service/user.service.mock';
import { FleetResolverModule } from 'app/fleet-resolver/fleet-resolver.module';
import { FleetModule } from './../fleet/fleet.module';


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

xdescribe('DataLoaderComponent', () => {

    let component: DataLoaderComponent;
    let fixture: ComponentFixture<DataLoaderComponent>;
    let debugElement: DebugElement;
    let element: any;
    let translate: TranslateService;
    let compiled;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [{ provide: APP_BASE_HREF, useValue: '/' }, { provide: FleetService, useClass: FakeFleetService }, { provide: OrganisationService, useClass: FakeOrganisationService }, { provide: UserService, useClass: FakeUserService }, { provide: LogbookSummaryService, useClass: FakeLogbookSummaryService }],
            imports: [AppModule,FleetResolverModule,FleetModule,
                TranslateModule.forRoot({
                    loader: { provide: TranslateLoader, useClass: FakeLoader },
                })
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(DataLoaderComponent);
        translate = TestBed.get(TranslateService);
        component = fixture.componentInstance;
    }));

    it('should be created', fakeAsync(() => {
        expect(component).toBeTruthy();
    }));

    
});
