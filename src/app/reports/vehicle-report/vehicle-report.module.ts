import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {PrimengModule} from '../../module/primeng.module';
import {WidgetsModule} from '../../widgets/widgets.module';
import {TranslateModule} from '@ngx-translate/core';
import {LayoutsModule} from '../../layouts/layouts.module';
import {PipesModule} from '../../utils/pipes/pipes.module';
import {ToastyModule} from 'ng2-toasty';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {VehicleReportDetailComponent} from './vehicle-report-detail/vehicle-report-detail.component';
import {VehicleReportTableComponent} from './vehicle-report-table/vehicle-report-table.component';
import {vehicleReportRoute} from '../../app.routes';

@NgModule({
    imports: [
        RouterModule.forChild(vehicleReportRoute),
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
    declarations: [VehicleReportDetailComponent, VehicleReportTableComponent],
    exports: [RouterModule, VehicleReportDetailComponent, VehicleReportTableComponent]
})
export class VehicleReportModule {
}
