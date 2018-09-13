import { FakeInviteService } from './../../service/invite.service.mock';
import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { AppModule } from 'app/app.module';
import { APP_BASE_HREF } from '@angular/common';
import { HomeModule } from 'app/home/home.module';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { WidgetsModule } from 'app/widgets/widgets.module';
import { FleetCommonModule } from 'app/common/fleet.common.module';
import { PrimengModule } from 'app/module/primeng.module';
import { TeamManagementComponent } from 'app/team/team-management/team-management.component';
import { PipesModule } from 'app/utils/pipes/pipes.module';
import { InviteService } from 'app/service/invite.service';
import { TeamModule } from 'app/team/team.module';
import { Observable } from 'rxjs/Observable';
import { TranslateLoader } from '@ngx-translate/core';
import { FleetService } from '../../service/fleet.service';
import { FakeFleetService } from '../../service/fleet.service.mock';
import { OrganisationService } from '../../service/organisation.service';
import { FakeOrganisationService } from '../../service/organisation.service.mock';

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

describe('Team Component', () => {

    let fixture: ComponentFixture<TeamManagementComponent>;
    let component: TeamManagementComponent;
    let translate: TranslateService;
    let compiled;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [AppModule, PrimengModule, WidgetsModule, TeamModule, TranslateModule.forRoot({
                loader: { provide: TranslateLoader, useClass: FakeLoader },
            })],
            providers: [
                { provide: APP_BASE_HREF, useValue: '/' },
                { provide: InviteService, useClass: FakeInviteService }, { provide: FleetService, useClass: FakeFleetService }, { provide: OrganisationService, useClass: FakeOrganisationService }
            ],
        }).compileComponents();
        fixture = TestBed.createComponent(TeamManagementComponent);
        translate = TestBed.get(TranslateService);
        component = fixture.componentInstance;
    }));

    it('should be created', fakeAsync(() => {
        expect(component).toBeTruthy();
    }));

    it('Function getInvites() should set invitees property', fakeAsync(() => {
        component.getInvites();
        expect(component.invitees.length).toBeGreaterThan(0);
    }));

});
