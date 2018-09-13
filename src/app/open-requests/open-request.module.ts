import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {PrimengModule} from '../module/primeng.module';
import {WidgetsModule} from '../widgets/widgets.module';
import {TranslateModule} from '@ngx-translate/core';
import {LayoutsModule} from '../layouts/layouts.module';
import {PipesModule} from '../utils/pipes/pipes.module';
import {ToastyModule} from 'ng2-toasty';
import {OpenReqConfirmComponent} from './open-req-confirm/open-req-confirm.component';
import {OpenReqListComponent} from './open-req-list/open-req-list.component';
import {OpenReqConfirmFormComponent} from './open-req-confirm-form/open-req-confirm-form.component';
import {OpenReqCreateComponent} from './open-req-create/open-req-create.component';
import {OpenReqCreateFormComponent} from './open-req-create-form/open-req-create-form.component';
import {OpenRequestComponent} from './open-request/open-request.component';
import {OpenRequestDetailComponent} from './open-request-detail/open-request-detail.component';
import {OpenrequestService} from '../service/openrequest.service';
import {FormsModule} from '@angular/forms';
import {openReqRoutes} from '../app.routes';


@NgModule({
    imports: [
        RouterModule.forChild(openReqRoutes),
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        PrimengModule,
        WidgetsModule,
        TranslateModule.forChild({isolate: false}),
        LayoutsModule,
        PipesModule,
        ToastyModule
    ],
    exports: [
        RouterModule,
        OpenReqConfirmComponent,
        OpenReqListComponent,
        OpenReqConfirmFormComponent,
        OpenReqCreateComponent,
        OpenReqCreateFormComponent,
        OpenReqListComponent,
        OpenRequestComponent,
        OpenRequestDetailComponent
    ],
    declarations: [
        OpenReqConfirmComponent,
        OpenReqListComponent,
        OpenReqConfirmFormComponent,
        OpenReqCreateComponent,
        OpenReqCreateFormComponent,
        OpenReqListComponent,
        OpenRequestComponent,
        OpenRequestDetailComponent
    ],
    providers: [OpenrequestService],
})
export class OpenRequestModule { }
