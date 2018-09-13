import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ValidatorDirective} from './validator.directive';
import {DeepLinkDirective} from './deep-link.directive.directive';
import {DragDropDirective} from './drag-drop.directive';
import {ClickOutsideDirective} from "./click-outside.directive";
import { TranslateArrayDirective } from './translate-array.directive';
import { IsAdminDirective } from 'app/directive/is-admin.directive';
import {PermissionDirective} from "./permission-directive";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        DeepLinkDirective,
        DragDropDirective,
        ValidatorDirective,
        ClickOutsideDirective,
        TranslateArrayDirective,
        IsAdminDirective,
        PermissionDirective
    ],
    exports: [
        DeepLinkDirective,
        DragDropDirective,
        ValidatorDirective,
        ClickOutsideDirective,
        TranslateArrayDirective,
        IsAdminDirective,
        PermissionDirective
    ]
})
export class DirectivesModule {
}
