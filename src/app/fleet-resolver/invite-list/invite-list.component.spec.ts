import { APP_BASE_HREF } from '@angular/common';
import { async, TestBed, ComponentFixture, fakeAsync } from '@angular/core/testing';
import { AppModule } from 'app/app.module';
import { InviteListComponent } from 'app/fleet-resolver/invite-list/invite-list.component';
import { Observable } from 'rxjs/Observable';
import { TranslateLoader } from '@ngx-translate/core';
import { DebugElement } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { WidgetsModule } from '../../widgets/widgets.module';
import { PipesModule } from '../../utils/pipes/pipes.module';
import { InviteService } from '../../service/invite.service';
import { FakeInviteService } from '../../service/invite.service.mock';

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


describe('Invite List Component', () => {

    let component: InviteListComponent;
    let fixture: ComponentFixture<InviteListComponent>;
    let debugElement: DebugElement;
    let element: any;
    let translate: TranslateService;
    let compiled;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [InviteListComponent],
            imports: [AppModule, WidgetsModule,
                PipesModule, TranslateModule.forRoot({
                    loader: { provide: TranslateLoader, useClass: FakeLoader },
                })],
            providers: [{ provide: APP_BASE_HREF, useValue: '/' }, { provide: InviteService, useClass: FakeInviteService }],
        }).compileComponents();

        fixture = TestBed.createComponent(InviteListComponent);
        translate = TestBed.get(TranslateService);
        component = fixture.componentInstance;
    }));

    it('should create component', fakeAsync(() => {
        expect(component).toBeTruthy();
    }));



});