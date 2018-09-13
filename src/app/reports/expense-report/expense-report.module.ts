import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {expenseReportRoute} from '../../app.routes';
import {ExpenseReportMainComponent} from './expense-report-main/expense-report-main.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {PrimengModule} from '../../module/primeng.module';
import {WidgetsModule} from '../../widgets/widgets.module';
import {TranslateModule} from '@ngx-translate/core';
import {LayoutsModule} from '../../layouts/layouts.module';
import {PipesModule} from 'app/utils/pipes/pipes.module';
import {ToastyModule} from 'ng2-toasty';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {ExpenseReportDetailComponent} from './expense-report-detail/expense-report-detail.component';

@NgModule({
    imports: [
        RouterModule.forChild(expenseReportRoute),
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
    declarations: [ExpenseReportMainComponent, ExpenseReportDetailComponent],
    exports: [RouterModule, ExpenseReportMainComponent, ExpenseReportDetailComponent]
})
export class ExpenseReportModule {
}
