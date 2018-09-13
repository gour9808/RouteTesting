import { APP_BASE_HREF } from '@angular/common';
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { AppModule } from 'app/app.module';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { SidebarComponent } from './sidebar.component';
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
import { FakeUserService} from './../../service/user.service.mock';

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

describe('SidebarComponent', () => {

    let component: SidebarComponent;
    let fixture: ComponentFixture<SidebarComponent>;
    let debugElement: DebugElement;
    let element: any;
    let translate: TranslateService;
    let compiled;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [{ provide: APP_BASE_HREF, useValue: '/' }, { provide: FleetService, useClass: FakeFleetService }, { provide: OrganisationService, useClass: FakeOrganisationService },{ provide: UserService, useClass: FakeUserService }],
            imports: [AppModule,
                TranslateModule.forRoot({
                    loader: { provide: TranslateLoader, useClass: FakeLoader },
                })
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(SidebarComponent);
        translate = TestBed.get(TranslateService);
        component = fixture.componentInstance;


    }));

    it('template should contain fleetname as testFleet', fakeAsync(() => {
        debugElement = fixture.debugElement.query(By.css('.active-fleet-name'));
        element = debugElement.nativeElement;
        component.fleetName = "testFleet";
        fixture.detectChanges();
        expect(element.innerHTML).toContain('testFleet');
    }));

    it('template should contain fleetRole as driver', fakeAsync(() => {
        debugElement = fixture.debugElement.query(By.css('.active-fleet-role'));
        element = debugElement.nativeElement;
        component.role = "driver";
        fixture.detectChanges();
        expect(element.innerHTML).toContain('driver');
    }));

    it('template should contain fleetRole as driver', fakeAsync(() => {
        debugElement = fixture.debugElement.query(By.css('.active-fleet-role'));
        element = debugElement.nativeElement;
        component.role = "Admin";
        fixture.detectChanges();
        expect(element.innerHTML).toContain('Admin');
    }));

    it('Role should contain driver role in english', fakeAsync(() => {
        debugElement = fixture.debugElement.query(By.css('.active-fleet-role'));
        element = debugElement.nativeElement;
        translate.use('en');
        component.role = "Driver";
        fixture.detectChanges();
        expect(element.innerHTML).toContain('Driver');
    }));

    it('Role should contain driver role in german', fakeAsync(() => {
        debugElement = fixture.debugElement.query(By.css('.active-fleet-role'));
        element = debugElement.nativeElement;
        translate.use('de');
        component.role = "Fahrer";
        fixture.detectChanges();
        expect(element.innerHTML).toContain('Fahrer');
    }));

});
