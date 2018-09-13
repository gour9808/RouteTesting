import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {geoFenceRoutes} from '../../app.routes';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {PrimengModule} from '../../module/primeng.module';
import {WidgetsModule} from '../../widgets/widgets.module';
import {TranslateModule} from '@ngx-translate/core';
import {PipesModule} from '../../utils/pipes/pipes.module';
import {LayoutsModule} from '../../layouts/layouts.module';
import {ToastyModule} from 'ng2-toasty';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {FleetCommonModule} from '../../common/fleet.common.module';
import {VehicleGeofenceListComponent} from './vehicle-geofence-list/vehicle-geofence-list.component';
import {VehicleGeofenceComponent} from './vehicle-geofence.component';
import {GeoFenceResolver} from '../../resolves/geo-fence.resolver';

@NgModule({
    imports: [
        RouterModule.forChild(geoFenceRoutes),
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
        VehicleGeofenceListComponent,
        VehicleGeofenceComponent
    ],
    exports: [
        RouterModule,
        VehicleGeofenceListComponent,
        VehicleGeofenceComponent
    ],
    providers: [GeoFenceResolver]
})
export class VehicleGeofenceModule {
}
