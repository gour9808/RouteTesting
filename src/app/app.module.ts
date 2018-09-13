import {LayoutsModule} from './layouts/layouts.module';
import {WidgetsModule} from './widgets/widgets.module';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {HttpInterceptorService} from './interceptor/http.interceptor.service';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastyModule} from 'ng2-toasty';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';

import {AppRoutingModule} from './app.routes';
import {LoginComponent} from './login/login.component';
import {CallbackComponent} from './login/callback.component';

import {FleetService} from './service/fleet.service';
import {CookieService} from './service/cookie.service';
import {AuthService} from './service/auth.service';
import {WindowService} from './service/window.service';
import {ShareCacheService} from './utils/share-cache.service';

import {FlexLayoutModule} from '@angular/flex-layout';

import {ModalComponent} from './modal/modal.component';
import {ModalService} from './modal/modal.service';

import {OAuthGuard} from './login/oauthguard.service';
import {DataLoaderComponent} from './data-loader/data-loader.component';
import {UserComponent} from './user/user.component';
import {ErrorComponent} from './500-error/500-error.component';
import {FleetGuard} from './guards/fleet-guard';

import {LogbookService} from './service/logbook.service';
import {UserService} from './service/user.service';
import {MapService} from './service/map.service';
import {FuelTypeService} from './service/fuel.service';
import {HandshakeService} from './service/handshake.service';
import {CommunicatorService} from './common/communicator.service';
import {PlaygroundComponent} from './playground/playground.component';

import {InsuranceService} from './service/insurance.service';


import {OpenrequestService} from './service/openrequest.service';
import {RequestorService} from './service/requestor.service';


import {ImageService} from './service/image.service';
import {ComingSoonComponent} from './coming-soon/coming-soon.component';
import {ToastMessageService} from './service/toast-message.service';
import {OpenRequestResolver} from './resolves/openrequest.resolve';

import {TrackingService} from './service/tracking.service';
import {SlimLoadingBarModule, SlimLoadingBarService} from 'ng2-slim-loading-bar';
import {PrimengModule} from './module/primeng.module';
import {StorageService} from './utils/storage.provider';
import {OrganisationService} from './service/organisation.service';
import {AccessDeniedComponent} from './access-denied/access-denied.component';
import {FleetResolverComponent} from './fleet-resolver/fleet-resolver.component';
import {OneSignalService} from 'app/service/one-signal.service';
import {AuthRedirectComponent} from './login/auth-redirect.component';
import {FleetComponent} from './fleet/fleet.component';
import {CreateFleetComponent} from "./registration/create-fleet.component";
import {InviteResolverComponent} from "./invite-resolver/invite-resolver.component";
import {DomService} from "./service/dom.service";
import {VehicleService} from "./service/vehicle.service";
import {LogbookSummaryService} from './service/logbook-summary.service';
import {SettingsMainComponent} from "./settings/settings-main/settings-main.component";
import {SettingsOrgComponent} from "./settings/settings-org/settings-org.component";
import {TimezonePickerService} from "./service/timezone-picker.service";
import {ToolbarTitleService} from "./service/toolbar-title.service";


export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/', '.json');
}


@NgModule({
    declarations: [
        AppComponent,
        AuthRedirectComponent,
        LoginComponent,
        CallbackComponent,
        ModalComponent,
        DataLoaderComponent,
        UserComponent,
        ErrorComponent,
        PlaygroundComponent,
        ComingSoonComponent,
        AccessDeniedComponent,
        FleetResolverComponent,
        FleetComponent,
        CreateFleetComponent,
        InviteResolverComponent,
        SettingsMainComponent,
        SettingsOrgComponent,
    ],
    imports: [
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        ToastyModule.forRoot(),
        SlimLoadingBarModule.forRoot(),
        WidgetsModule,
        PrimengModule,
        LayoutsModule
    ],

    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpInterceptorService,
            multi: true
        },
        ImageService,
        ShareCacheService,
        InsuranceService,
        CookieService,
        LogbookService,
        UserService,
        FuelTypeService,
        MapService,
        AuthService,
        WindowService,
        FleetService,
        ModalService,
        OAuthGuard,
        FleetGuard,
        TranslateService,
        HandshakeService,
        CommunicatorService,
        OpenrequestService,
        RequestorService,
        ToastMessageService,
        OpenRequestResolver,
        TrackingService,
        StorageService,
        SlimLoadingBarService,
        OrganisationService,
        OneSignalService,
        DomService,
        VehicleService,
        LogbookSummaryService,
        TimezonePickerService,
        ToolbarTitleService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
