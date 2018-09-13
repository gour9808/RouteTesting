import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {PrimengModule} from '../module/primeng.module';
import {WidgetsModule} from '../widgets/widgets.module';
import {TranslateModule} from '@ngx-translate/core';
import {LayoutsModule} from '../layouts/layouts.module';
import {PipesModule} from 'app/utils/pipes/pipes.module';
import {ToastyModule} from 'ng2-toasty';
import {VehicleModule} from '../vehicle/vehicle.module';
import {DriverModule} from '../drivers/drivers.module';

@NgModule({
  imports: [
      CommonModule,
      RouterModule,
      FlexLayoutModule,
      PrimengModule,
      WidgetsModule,
      TranslateModule.forChild({isolate: false}),
      LayoutsModule,
      PipesModule,
      ToastyModule,
      VehicleModule,
      DriverModule
  ]
})
export class HomeModule { }
