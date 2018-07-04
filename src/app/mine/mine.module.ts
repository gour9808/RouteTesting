import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import { MineRoutes} from '../app.routes';
import { TableModule } from 'primeng/table';
import { TabbarComponent } from '../tabbar/tabbar.component';
import { MineComponent } from './mine.component';
import { AllComponent } from '../all/all.component';
import { FlagComponent } from '../flag/flag.component';

@NgModule({
    imports: [
        RouterModule.forChild(MineRoutes),
        CommonModule,
        FlexLayoutModule,TableModule
    ],
    exports: [RouterModule, MineComponent, FlagComponent, AllComponent],
    declarations: [ AllComponent, MineComponent, FlagComponent],
    providers: [],
})
export class MineModule {
}
