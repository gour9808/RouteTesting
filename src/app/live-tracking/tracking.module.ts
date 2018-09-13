import {NgModule} from '@angular/core';

import {TrackingComponent} from './tracking.component';
import {TrackingListComponent} from './tracking-list/tracking-list.component';
import {RouterModule} from '@angular/router';
import {trackingRoutes} from '../app.routes';
import {CommonModule} from '@angular/common';
import {PrimengModule} from '../module/primeng.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {WidgetsModule} from '../widgets/widgets.module';
import {TranslateModule} from '@ngx-translate/core';
import {LayoutsModule} from '../layouts/layouts.module';
import {PipesModule} from '../utils/pipes/pipes.module';
import {FormsModule} from '@angular/forms';
import {ToastyModule} from 'ng2-toasty';
import {TrackingDetailItemComponent} from "./tracking-detail-item/tracking-detail-item.component";

@NgModule({
    imports: [
        RouterModule.forChild(trackingRoutes),
        CommonModule,
        FormsModule,
        RouterModule,
        FlexLayoutModule,
        PrimengModule,
        WidgetsModule,
        TranslateModule.forChild({isolate: false}),
        PipesModule,
        LayoutsModule,
        ToastyModule
    ],
    exports: [RouterModule,
        TrackingComponent,
        TrackingListComponent,
        TrackingDetailItemComponent
    ],
    declarations: [
        TrackingComponent,
        TrackingListComponent,
        TrackingDetailItemComponent
    ],
    providers: [],
})
export class TrackingModule {
}
