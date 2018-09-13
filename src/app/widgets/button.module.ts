import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TranslateModule} from '@ngx-translate/core';
import {ButtonComponent} from './button/button.component';
import {FlatButtonComponent} from './flat-button/flat-button.component';
import {IconButtonComponent} from './icon-button/icon-button.component';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
      TranslateModule.forChild({isolate: false}),
  ],
  declarations: [
    ButtonComponent,
    FlatButtonComponent,
    IconButtonComponent
  ],
  exports : [
    ButtonComponent,
    FlatButtonComponent,
    IconButtonComponent
  ]
})
export class CustButtonModule { }
