import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {FormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {PrimengModule} from '../../module/primeng.module';
import {WidgetsModule} from '../../widgets/widgets.module';
import {LayoutsModule} from '../../layouts/layouts.module';
import {TranslateModule} from '@ngx-translate/core';
import {PipesModule} from '../../utils/pipes/pipes.module';
import {ToastyModule} from 'ng2-toasty';
import {FleetCommonModule} from '../../common/fleet.common.module';

import {expenseRoutes} from '../../app.routes';
import {ExpenseCreateComponent} from './expense-create/expense-create.component';
import {VehicleCostResolver} from '../../resolves/vehiclecost.resolve';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {ExpenseListComponent} from './expense-list/expense-list.component';

@NgModule({
    imports: [
        RouterModule.forChild(expenseRoutes),
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        PrimengModule,
        WidgetsModule,
        TranslateModule.forChild({isolate: false}),
        PipesModule,
        LayoutsModule,
        ToastyModule,
        FleetCommonModule,
        NgxChartsModule

    ],
    exports: [RouterModule,
        ExpenseListComponent,
        ExpenseCreateComponent
    ],
    declarations: [
        ExpenseListComponent,
        ExpenseCreateComponent
    ],
    providers: [VehicleCostResolver],
})
export class VehicleExpenseModule {
}
