import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {PrimengModule} from 'app/module/primeng.module';
import {WidgetsModule} from 'app/widgets/widgets.module';
import {TranslateModule} from '@ngx-translate/core';
import {PipesModule} from '../utils/pipes/pipes.module';
import {VehicleCreateComponent} from './vehicle-create/vehicle-create.component';
import {VehicleGridComponent} from './vehicle-grid/vehicle-grid.component';
import {VehicleListComponent} from './vehicle-list/vehicle-list.component';
import {VehicleSearchComponent} from './vehicle-search/vehicle-search.component';
import {LayoutsModule} from '../layouts/layouts.module';
import {FormsModule} from '@angular/forms';
import {ToastyModule} from 'ng2-toasty';
import {vehicleRoutes} from '../app.routes';
import {VehicleDetailComponent} from './vehicle-detail/vehicle-detail.component';
import {VehicleResolver} from '../resolves/vehicle.resolver';
import {VehicleGridItemComponent} from './vehicle-grid-item/vehicle-grid-item.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {FleetCommonModule} from '../common/fleet.common.module';

@NgModule({
    imports: [
        RouterModule.forChild(vehicleRoutes),
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        PrimengModule,
        WidgetsModule,
        TranslateModule.forChild({isolate: false}),
        PipesModule,
        LayoutsModule,
        ToastyModule,
        NgxChartsModule,
        FleetCommonModule
    ],
    declarations: [
        VehicleDetailComponent,
        VehicleCreateComponent,
        VehicleGridComponent,
        VehicleListComponent,
        VehicleSearchComponent,
        VehicleGridItemComponent
    ],
    exports: [
        RouterModule,
        VehicleDetailComponent,
        VehicleCreateComponent,
        VehicleGridComponent,
        VehicleListComponent,
        VehicleSearchComponent,
        VehicleGridItemComponent
    ],
    providers: [VehicleResolver]
})
export class VehicleModule {
}
