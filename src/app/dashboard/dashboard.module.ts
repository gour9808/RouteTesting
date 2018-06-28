import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {dashboardRoutes} from '../app.routes';
import { DashboardComponent } from './dashboard.component';
import { TableModule } from 'primeng/table';

@NgModule({
    imports: [
        RouterModule.forChild(dashboardRoutes),
        CommonModule,
        FlexLayoutModule,TableModule
    ],
    exports: [RouterModule, DashboardComponent],
    declarations: [ DashboardComponent],
    providers: [],
})
export class DashboardModule {
}
