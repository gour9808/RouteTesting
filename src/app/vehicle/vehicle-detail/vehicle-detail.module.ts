import {NgModule} from '@angular/core';
import {VehicleInfoComponent} from '../vehicle-info/vehicle-info.component';
import {VehicleInsuranceComponent} from '../vehicle-insurance/vehicle-insurance.component';
import {VehicleLogbookComponent} from '../vehicle-logbook/vehicle-logbook.component';
import {VehicleReminderComponent} from '../vehicle-reminder/vehicle-reminder.component';
import {VehicleTrackingComponent} from '../vehicle-tracking/vehicle-tracking.component';
import {VehicleExpenseComponent} from '../vehicle-expense/vehicle-expense.component';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {PrimengModule} from '../../module/primeng.module';
import {WidgetsModule} from '../../widgets/widgets.module';
import {LayoutsModule} from '../../layouts/layouts.module';
import {TranslateModule} from '@ngx-translate/core';
import {PipesModule} from '../../utils/pipes/pipes.module';
import {ToastyModule} from 'ng2-toasty';
import {vehicleDetailRoutes} from '../../app.routes';
import {FleetCommonModule} from '../../common/fleet.common.module';
import {NgxChartsModule} from '@swimlane/ngx-charts';

@NgModule({
    imports: [
        RouterModule.forChild(vehicleDetailRoutes),
        CommonModule,
        FormsModule,
        RouterModule,
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
    exports: [
        RouterModule,
        VehicleInfoComponent,
        VehicleInsuranceComponent,
        VehicleLogbookComponent,
        VehicleReminderComponent,
        VehicleTrackingComponent,
        VehicleExpenseComponent
    ],
    declarations: [
        VehicleInfoComponent,
        VehicleInsuranceComponent,
        VehicleLogbookComponent,
        VehicleReminderComponent,
        VehicleTrackingComponent,
        VehicleExpenseComponent
    ],
    providers: [],
})
export class VehicleDetailModule {
}
