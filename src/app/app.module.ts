import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { CalendarModule } from 'primeng/calendar';
import { ToastyModule } from 'ng2-toasty';
import { SlimLoadingBarModule, SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ContainerComponent } from './container/container.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { ListItemComponent } from './list-item/list-item.component';
import { ToastMessageService } from './services/toast-message.service';
import { ToolbarTitleService } from './services/toolbar-title.service';
import { CookieService } from './services/cookie.service';
import { AuthService } from './services/auth.service';
import { SplashLoaderComponent } from './spalsh-loader/spalsh-loader.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CommunicatorService } from './services/communicator.service';
import { DataLoaderComponent } from './data-loader/data-loader.component';
import { OAuthGuard } from './services/oauth-guard.service';
import { CallbackComponent } from './callback/callback.component';
import { HttpInterceptorService } from './interceptor/http.interceptor.service';
import { TabMenuModule } from 'primeng/tabmenu';
import { DialogModule } from 'primeng/dialog';
import { WidgetsModule } from './widgets/widget.module';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { MineLogsService } from './services/mine-logs.service';
import { ViewLogDetailComponent } from './view-log-detail/view-log-detail.component';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { DebugLevelService } from './services/debug-level.service';
import { ViewDebugLevelLogComponent } from './view-debug-level-log/view-debug-level-log.component';
import { EventsService } from './services/events.service';
import { CreditsComponent } from './credits/credits.component';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {DataViewModule} from 'primeng/dataview';
import {PanelModule} from 'primeng/panel';
import {CheckboxModule} from 'primeng/checkbox';
import { AccessDeniedComponent } from './access-denied/access-denied.component';


@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    ContainerComponent,
    ListItemComponent,
    SplashLoaderComponent,
    DataLoaderComponent,
    CallbackComponent,
    ViewLogDetailComponent,
    ViewDebugLevelLogComponent,
    CreditsComponent,
    AccessDeniedComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    DataViewModule,
    ScrollPanelModule,PanelModule,
    CheckboxModule,
    CalendarModule,
    TabMenuModule,
    ReactiveFormsModule,
    WidgetsModule,
    ToggleButtonModule,
    DialogModule,
    AutoCompleteModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule, ToastModule.forRoot(),
    HttpModule,
    DataTableModule,
    SharedModule,
    TableModule,
    DropdownModule,
    ButtonModule,
    FlexLayoutModule,
    HttpClientModule,
    ToastyModule.forRoot(),
    SlimLoadingBarModule.forRoot()

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
    ToastMessageService, MineLogsService,
    OAuthGuard,
    SlimLoadingBarService,
    ToolbarTitleService,
    CookieService,
    CommunicatorService,
    AuthService, DebugLevelService,EventsService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
