
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ButtonComponent } from './button/button.component';

@NgModule({
    providers: [],
    declarations: [
        CardComponent,
        ButtonComponent,

    ],
    imports: [
        CommonModule,
        FormsModule,
        FlexLayoutModule
    ],
    exports: [
        CardComponent, ButtonComponent
    ]

})
export class WidgetsModule {
}
