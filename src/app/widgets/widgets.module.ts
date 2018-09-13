import {CalenderComponent} from './calender/calender.component';
import {CustButtonModule} from './button.module';
import {SizePipe} from '../utils/pipes/size.pipe';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardComponent} from './card/card.component';
import {CircularProgressComponent} from './circular-progress/circular-progress.component';
import {DashTileComponent} from './dash-tile/dash-tile.component';
import {InputFieldBooleanComponent} from './input-field-boolean/input-field-boolean.component';
import {InputFieldMultipleComponent} from './input-field-multiple/input-field-multiple.component';
import {InputFieldNumberComponent} from './input-field-number/input-field-number.component';
import {InputFieldOptionsComponent} from './input-field-options/input-field-options.component';
import {InputFieldTextComponent} from './input-field-text/input-field-text.component';
import {InputFieldCalendarComponent} from './input-field-calendar/input-field-calendar.component';
import {InputFieldChipsComponent} from './input-field-chips/input-field-chips.component';
import {InputFieldInlineTextComponent} from './input-field-inline-text/input-field-inline-text.component';
import {InputFieldRadioGroupComponent} from './input-field-radio-group/input-field-radio-group.component';
import {InputFieldRadioComponent} from './input-field-radio/input-field-radio.component';
import {InputFieldRangeComponent} from './input-field-range/input-field-range.component';
import {InputFieldRangeSliderComponent} from './input-field-range-slider/input-field-range-slider.component';
import {MenuItemComponent} from './menu-item/menu-item.component';
import {ProgressBarComponent} from './progress-bar/progress-bar.component';
import {TextIconItemComponent} from './text-icon-item/text-icon-item.component';
import {LoaderComponent} from './loader/loader.component';
import {PrimengModule} from '../module/primeng.module';
import {FormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/primeng';
import {ListItemComponent} from './list-item/list-item.component';
import {ExpandableListItemComponent} from './expandable-list-item/expandable-list-item.component';
import {FileUploaderComponent} from './file-uploader/file-uploader.component';
import {CalendarDialogComponent} from './calendar-dialog/calendar-dialog.component';
import {SplashLoaderComponent} from './splash-loader/splash-loader.component';
import {InputFieldAutocompleteAddressComponent} from './input-field-autocomplete-address/input-field-autocomplete-address.component';
import {InputFieldAutocompleteVehiclesComponent} from './input-field-autocomplete-vehicles/input-field-autocomplete-vehicles.component';
import {InputActionSwitchComponent} from './input-action-switch/input-action-switch.component';
import {TagInputModule} from 'ngx-chips';
import {NouisliderModule} from 'ng2-nouislider';
import {InputFieldOptionsMultipleComponent} from './input-field-options-multiple/input-field-options-multiple.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TranslateModule} from '@ngx-translate/core';
import {ListItemTwoLineIconComponent} from 'app/widgets/list-item-two-line-icon/list-item-two-line-icon.component';
import {InputDateComponent} from 'app/widgets/input-date/input-date.component';
import {InputFieldSearchComponent} from 'app/widgets/input-field-search/input-field-search.component';
import {SwitchComponent} from 'app/widgets/switch/switch.component';
import {TabBarComponent} from './tab-bar/tab-bar.component';
import {DateEditComponent} from './date-edit/date-edit.component';
import {InputFieldAutocompleteTextComponent} from './input-field-autocomplete-text/input-field-autocomplete-text.component';
import {InputFieldTextRowComponent} from './input-field-text-row/input-field-text-row.component';
import {ListDataComponent} from './list-data/list-data.component';
import {ListcardComponent} from './listcard/listcard.component';
import {MinicardComponent} from './minicard/minicard.component';
import {NotificationComponent} from './notification-overall/notification/notification.component';
import {NotificationPanelComponent} from './notification-overall/notification-panel/notification-panel.component';
import {TextEditComponent} from './text-edit/text-edit.component';
import {DirectivesModule} from '../directive/directive.module';
import {SvgCircularLoaderComponent} from './svg-circular-loader/svg-circular-loader.component';
import {HoverDirective} from '../directive/hover.directive';
import {ContextMenuIconItemComponent} from './context-menu--icon-item/context-menu--icon-item.component';
import {DialogComponent} from './dialog/dialog.component';
import {DomService} from '../service/dom.service';
import {FleetItemComponent} from './fleet-item/fleet-item.component';
import {PipesModule} from '../utils/pipes/pipes.module';
import {IconButtonHorizontalComponent} from './icon-button-horizontal/icon-button-horizontal.component';
import {InputFieldCalendarRangeComponent} from './input-field-calendar-range/input-field-calendar-range.component';
import {SingleFileUploadComponent} from './single-file-upload/single-file-upload.component';
import { InputFieldCalendarHighlightComponent } from './input-field-calendar-hightlight/input-field-calendar-highlight.component';

@NgModule({
    providers: [DomService],
    declarations: [
        CardComponent,
        DashTileComponent,
        InputFieldBooleanComponent,
        InputFieldNumberComponent,
        InputFieldMultipleComponent,
        InputFieldOptionsComponent,
        InputFieldTextComponent,
        InputFieldCalendarComponent,
        InputFieldChipsComponent,
        InputFieldInlineTextComponent,
        InputFieldRadioGroupComponent,
        InputFieldRadioComponent,
        InputFieldRangeComponent,
        InputFieldRangeSliderComponent,
        InputFieldOptionsMultipleComponent,
        InputFieldAutocompleteAddressComponent,
        InputFieldAutocompleteVehiclesComponent,
        InputActionSwitchComponent,
        MenuItemComponent,
        TextIconItemComponent,
        ListItemComponent,
        ExpandableListItemComponent,
        CalendarDialogComponent,
        SplashLoaderComponent,
        ProgressBarComponent,
        LoaderComponent,
        SizePipe,
        CircularProgressComponent,
        ListItemTwoLineIconComponent,
        FileUploaderComponent,
        InputDateComponent,
        InputFieldSearchComponent,
        CalenderComponent,
        SwitchComponent,
        TabBarComponent,
        DateEditComponent,
        InputFieldAutocompleteTextComponent,
        InputFieldTextRowComponent,
        ListDataComponent,
        ListcardComponent,
        MinicardComponent,
        NotificationComponent,
        NotificationPanelComponent,
        TextEditComponent,
        SvgCircularLoaderComponent,
        HoverDirective,
        ContextMenuIconItemComponent,
        DialogComponent,
        FleetItemComponent,
        IconButtonHorizontalComponent,
        InputFieldCalendarRangeComponent,
        SingleFileUploadComponent,
        InputFieldCalendarHighlightComponent,
    ],
    imports: [
        CommonModule,
        TranslateModule.forChild({isolate: false}),
        FormsModule,
        PrimengModule,
        ButtonModule,
        TagInputModule,
        NouisliderModule,
        CustButtonModule,
        FlexLayoutModule, DirectivesModule, PipesModule
    ],
    exports: [
        CardComponent,
        DashTileComponent,
        InputFieldBooleanComponent,
        InputFieldNumberComponent,
        InputFieldMultipleComponent,
        InputFieldOptionsComponent,
        InputFieldTextComponent,
        InputFieldCalendarComponent,
        InputFieldChipsComponent,
        InputFieldInlineTextComponent,
        InputFieldRadioGroupComponent,
        InputFieldRadioComponent,
        InputFieldRangeComponent,
        InputFieldRangeSliderComponent,
        InputFieldOptionsMultipleComponent,
        InputFieldAutocompleteAddressComponent,
        InputFieldAutocompleteVehiclesComponent,
        InputActionSwitchComponent,
        MenuItemComponent,
        TextIconItemComponent,
        ListItemComponent,
        ExpandableListItemComponent,
        FileUploaderComponent,
        CalendarDialogComponent,
        SplashLoaderComponent,
        ProgressBarComponent,
        LoaderComponent,
        SizePipe,
        CustButtonModule,
        CircularProgressComponent,
        ListItemTwoLineIconComponent,
        InputDateComponent,
        InputFieldSearchComponent,
        CalenderComponent,
        SwitchComponent,
        TabBarComponent,
        TabBarComponent,
        DateEditComponent,
        InputFieldAutocompleteTextComponent,
        InputFieldTextRowComponent,
        ListDataComponent,
        ListcardComponent,
        MinicardComponent,
        NotificationComponent,
        NotificationPanelComponent,
        TextEditComponent,
        DirectivesModule,
        SvgCircularLoaderComponent,
        HoverDirective,
        ContextMenuIconItemComponent,
        DialogComponent,
        FleetItemComponent,
        IconButtonHorizontalComponent,
        InputFieldCalendarRangeComponent,
        SingleFileUploadComponent,
        InputFieldCalendarHighlightComponent
    ]

})
export class WidgetsModule {
}
