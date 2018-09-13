import {NgModule} from '@angular/core';
import {DriverCreateComponent} from './driver-create/driver-create.component';
import {DriverDetailComponent} from './driver-detail/driver-detail.component';
import {DriverGridComponent} from './driver-grid/driver-grid.component';
import {LicenseAddComponent} from './driver-detail/license-info/license-add/license-add.component';
import {LicenseGridComponent} from './driver-detail/license-info/license-grid/license-grid.component';
import {DetailsComponent} from './driver-detail/details/details.component';
import {DriversComponent} from 'app/drivers/drivers.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {PrimengModule} from '../module/primeng.module';
import {WidgetsModule} from '../widgets/widgets.module';
import {TranslateModule} from '@ngx-translate/core';
import {LayoutsModule} from 'app/layouts/layouts.module';
import {PipesModule} from '../utils/pipes/pipes.module';
import {ToastyModule} from 'ng2-toasty';
import {FormsModule} from '@angular/forms';
import {driverRoutes} from '../app.routes';
import {FleetCommonModule} from "../common/fleet.common.module";
import { DriverTableComponent } from './driver-table/driver-table.component';


@NgModule({
    imports: [
        RouterModule.forChild(driverRoutes),
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        PrimengModule,
        WidgetsModule,
        TranslateModule.forChild({isolate: false}),
        PipesModule,
        LayoutsModule,
        ToastyModule,
        FleetCommonModule
    ],
    exports: [
        RouterModule,
        DriverCreateComponent,
        DriverDetailComponent,
        DriverGridComponent,
        LicenseAddComponent,
        LicenseGridComponent,
        DetailsComponent,
        DriversComponent,
        DriverTableComponent
    ],
    declarations: [
        DriverCreateComponent,
        DriverDetailComponent,
        DriverGridComponent,
        LicenseAddComponent,
        LicenseGridComponent,
        DetailsComponent,
        DriversComponent,
        DriverTableComponent
    ],
    providers: [],
})
export class DriverModule { }
