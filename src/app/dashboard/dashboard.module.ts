import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardAdminComponent} from './dashboard-admin/dashboard-admin.component';
import {DashboardManagerComponent} from './dashboard-manager/dashboard-manager.component';
import {DashboardDriverComponent} from './dashboard-driver/dashboard-driver.component';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {PrimengModule} from '../module/primeng.module';
import {WidgetsModule} from '../widgets/widgets.module';
import {TranslateModule} from '@ngx-translate/core';
import {LayoutsModule} from '../layouts/layouts.module';
import {PipesModule} from '../utils/pipes/pipes.module';
import {ToastyModule} from 'ng2-toasty';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {FleetCommonModule} from '../common/fleet.common.module';
import {FormsModule} from '@angular/forms';
import {dashboardRoutes} from '../app.routes';
import {DashboardAdminGuard} from './dashboard-admin/dashboard-admin.guard';
import {DashboardDriverGuard} from './dashboard-driver/dashboard-driver.guard';
import {DashboardManagerGuard} from './dashboard-manager/dashboard-manager.guard';
import {DashboardComponent} from "./dashboard.component";
import { DashboardTeamManagerComponent } from './dashboard-team-manager/dashboard-team-manager.component';
import { DashboardTeamManagerGuard } from './dashboard-team-manager/dashboard-team-manager-guard';

@NgModule({
    imports: [
        RouterModule.forChild(dashboardRoutes),
        CommonModule,
        FormsModule,
        TranslateModule.forChild({isolate: false}),
        FlexLayoutModule,
        PrimengModule,
        LayoutsModule,
        PipesModule,
        ToastyModule,
        NgxChartsModule,
        WidgetsModule,
        FleetCommonModule],
    declarations: [DashboardComponent, DashboardAdminComponent, DashboardManagerComponent, DashboardDriverComponent,DashboardTeamManagerComponent],
    exports: [
        RouterModule,
        DashboardComponent,
        DashboardAdminComponent, DashboardManagerComponent, DashboardDriverComponent,DashboardTeamManagerComponent
    ],
    providers: [DashboardAdminGuard, DashboardDriverGuard, DashboardManagerGuard, DashboardTeamManagerGuard]
})
export class DashboardModule {
}
