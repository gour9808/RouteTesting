import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {eventRoutes} from '../app.routes';
import { TableModule } from 'primeng/table';
import { EventsComponent } from './events.component';
import { WidgetsModule } from '../widgets/widget.module';
import { CalendarModule, DropdownModule, Dialog, ButtonModule, DialogModule } from '../../../node_modules/primeng/primeng';
import { FormsModule } from '../../../node_modules/@angular/forms';

@NgModule({
    imports: [
        RouterModule.forChild(eventRoutes),
        CommonModule, CommonModule, FormsModule,
        FlexLayoutModule, TableModule, WidgetsModule, DialogModule, ButtonModule, DropdownModule, WidgetsModule,
 
        FlexLayoutModule, TableModule, WidgetsModule, CalendarModule, DropdownModule
    ],
    exports: [RouterModule, EventsComponent],
    declarations: [ EventsComponent],
    providers: [],
})
export class EventsModule {
}
