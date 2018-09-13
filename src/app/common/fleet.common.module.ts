import {NgModule} from '@angular/core';
import {DriverListComponent} from '../drivers/driver-list/driver-list.component';
import {VehicleTableComponent} from '../vehicle/vehicle-table/vehicle-table.component';
import {TranslateModule} from '@ngx-translate/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {WidgetsModule} from '../widgets/widgets.module';
import {PrimengModule} from "../module/primeng.module";
import {DriverSearchComponent} from "../drivers/driver-search/driver-search.component";
import {ToastyModule} from "ng2-toasty";
import {PipesModule} from "../utils/pipes/pipes.module";
import {VehicleDriverListComponent} from "../vehicle/vehicle-driver-list/vehicle-driver-list.component";
import { VehicleSearchListComponent } from 'app/vehicle/vehicle-search-list/vehicle-search-list.component';


@NgModule({
    imports: [
        TranslateModule.forChild({isolate: false}),
        CommonModule,
        FlexLayoutModule,
        WidgetsModule,
        PrimengModule,
        ToastyModule,
        PipesModule
    ],
    exports: [DriverListComponent, VehicleTableComponent,
        VehicleDriverListComponent, DriverSearchComponent,VehicleSearchListComponent],
    declarations: [DriverListComponent, VehicleTableComponent, DriverSearchComponent,
        VehicleDriverListComponent,VehicleSearchListComponent],
    providers: [],
})
export class FleetCommonModule {
}
