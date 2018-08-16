import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import { MineRoutes} from '../app.routes';
import { TableModule } from 'primeng/table';
import { MineComponent } from './mine.component';
import { AllComponent } from '../all/all.component';
import { FlagComponent } from '../flag/flag.component';
import { WidgetsModule } from '../widgets/widget.module';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule, ScrollPanelModule, AutoCompleteModule, TabViewModule, CalendarModule, CardModule } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';
import { TimeAgoPipe } from '../../../node_modules/time-ago-pipe';
import { FilterPipe } from '../utils/filter.pipe';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {DataViewModule} from 'primeng/dataview';
import {PanelModule} from 'primeng/panel';
import {CheckboxModule} from 'primeng/checkbox';
import { ViewLogsByUserComponent } from '../view-logs-by-user/view-logs-by-user.component';


@NgModule({
    imports: [
        RouterModule.forChild(MineRoutes),DataViewModule,PanelModule,CheckboxModule,
        CommonModule, FormsModule,AutoCompleteModule,TabViewModule,CalendarModule,CardModule,ToggleButtonModule,
        FlexLayoutModule, TableModule,ScrollPanelModule, WidgetsModule, DialogModule, ButtonModule, DropdownModule, WidgetsModule
    ],
    exports: [RouterModule, MineComponent, FlagComponent,ViewLogsByUserComponent, AllComponent],
    declarations: [ AllComponent, MineComponent, FlagComponent, TimeAgoPipe, ViewLogsByUserComponent, FilterPipe],
    providers: [],
})
export class MineModule {
}
