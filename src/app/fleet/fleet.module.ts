import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {PrimengModule} from '../module/primeng.module';
import {WidgetsModule} from '../widgets/widgets.module';
import {TranslateModule} from '@ngx-translate/core';
import {PipesModule} from '../utils/pipes/pipes.module';
import {LayoutsModule} from '../layouts/layouts.module';
import {ToastyModule} from 'ng2-toasty';
import {fleetRoutes} from '../app.routes';
import {HomeComponent} from '../home/home.component';
import {FleetCommonModule} from '../common/fleet.common.module';
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {SettingsFleetComponent} from "../settings/settings-fleet/settings-fleet.component";

@NgModule({
    imports: [
        RouterModule.forChild(fleetRoutes),
        CommonModule,
        FlexLayoutModule,
        PrimengModule,
        WidgetsModule,
        TranslateModule.forChild({isolate: false}),
        LayoutsModule,
        PipesModule,
        ToastyModule,
        FleetCommonModule,
        NgxChartsModule
    ],
    exports: [RouterModule, HomeComponent, SettingsFleetComponent],
    declarations: [HomeComponent, SettingsFleetComponent],
    providers: [],
})
export class FleetModule {
}
