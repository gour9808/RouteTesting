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
import { DropdownModule } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';
import { TimeAgoPipe } from '../../../node_modules/time-ago-pipe';

@NgModule({
    imports: [
        RouterModule.forChild(MineRoutes),
        CommonModule, FormsModule,
        FlexLayoutModule, TableModule, WidgetsModule, DialogModule, ButtonModule, DropdownModule, WidgetsModule
    ],
    exports: [RouterModule, MineComponent, FlagComponent, AllComponent],
    declarations: [ AllComponent, MineComponent, FlagComponent, TimeAgoPipe],
    providers: [],
})
export class MineModule {
}
