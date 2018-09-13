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
import {logbookSummaryRoutes} from '../app.routes';
import {SummaryContainerComponent} from './summary-container-component/summary-container.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {FormsModule} from '@angular/forms';
import {SummaryDetailComponent} from './summary-detail/summary-detail.component';


@NgModule({
    imports: [
        RouterModule.forChild(logbookSummaryRoutes),
        CommonModule,
        FlexLayoutModule,
        PrimengModule,
        WidgetsModule,
        TranslateModule.forChild({isolate: false}),
        LayoutsModule,
        PipesModule,
        ToastyModule,
        NgxChartsModule,
        FormsModule
    ],
    declarations: [SummaryContainerComponent, SummaryDetailComponent],
    exports: [SummaryContainerComponent, RouterModule]
})
export class LogbookSummariesModule {
}
