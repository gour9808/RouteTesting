import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {eventRoutes} from '../app.routes';
import { TableModule } from 'primeng/table';
import { EventsComponent } from './events.component';

@NgModule({
    imports: [
        RouterModule.forChild(eventRoutes),
        CommonModule,
        FlexLayoutModule,TableModule
    ],
    exports: [RouterModule, EventsComponent],
    declarations: [ EventsComponent],
    providers: [],
})
export class EventsModule {
}
