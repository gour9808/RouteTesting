import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {discussionsRoutes} from '../app.routes';
import { TableModule } from 'primeng/table';
import { DiscussionsComponent } from './discussions.component';
import { WidgetsModule } from '../widgets/widget.module';

@NgModule({
    imports: [
        RouterModule.forChild(discussionsRoutes),WidgetsModule,
        CommonModule,
        FlexLayoutModule,TableModule
    ],
    exports: [RouterModule, DiscussionsComponent],
    declarations: [ DiscussionsComponent],
    providers: [],
})
export class DisscussionsModule {
}
