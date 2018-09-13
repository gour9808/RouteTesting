import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DriverReportTableComponent} from './driver-report-table/driver-report-table.component';
import {ReportContainerComponent} from './report-container/report-container.component';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {PrimengModule} from '../module/primeng.module';
import {WidgetsModule} from '../widgets/widgets.module';
import {TranslateModule} from '@ngx-translate/core';
import {LayoutsModule} from '../layouts/layouts.module';
import {PipesModule} from '../utils/pipes/pipes.module';
import {ToastyModule} from 'ng2-toasty';
import {reportRoutes} from '../app.routes';
import {NgxChartsModule} from '@swimlane/ngx-charts';

@NgModule({
    imports: [
        RouterModule.forChild(reportRoutes),
        CommonModule,
        FlexLayoutModule,
        PrimengModule,
        WidgetsModule,
        TranslateModule.forChild({isolate: false}),
        LayoutsModule,
        PipesModule,
        ToastyModule,
        NgxChartsModule
    ],
    declarations: [DriverReportTableComponent, ReportContainerComponent],
    exports: [RouterModule, DriverReportTableComponent, ReportContainerComponent],
    providers: []
})
export class ReportsModule {
}
