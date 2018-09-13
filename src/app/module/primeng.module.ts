import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccordionModule, AutoCompleteModule, ButtonModule, CalendarModule, ChartModule, CheckboxModule, ChipsModule, ConfirmDialogModule, DataGridModule, DataTableModule, DialogModule, DropdownModule, GalleriaModule, GMapModule, InputSwitchModule, ListboxModule, MultiSelectModule, OverlayPanelModule, RadioButtonModule, ScheduleModule, SharedModule, SidebarModule, StepsModule, TooltipModule} from 'primeng/primeng';
import {TableModule} from 'primeng/table';
import {KeyFilterModule} from 'primeng/keyfilter';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        DataTableModule,
        SharedModule,
        InputSwitchModule,
        DialogModule,
        DropdownModule,
        ChipsModule,
        OverlayPanelModule,
        AccordionModule,
        StepsModule,
        CalendarModule,
        ListboxModule,
        CheckboxModule,
        RadioButtonModule,
        AutoCompleteModule,
        TooltipModule,
        ScheduleModule,
        MultiSelectModule,
        ButtonModule,
        GalleriaModule,
        DataGridModule,
        GMapModule,
        ChartModule,
        TableModule,
        ConfirmDialogModule,
        SidebarModule,
        KeyFilterModule,
        TranslateModule.forChild({isolate: false}),
    ],
    declarations: [],
    exports: [DataTableModule,
        SharedModule,
        InputSwitchModule,
        DialogModule,
        DropdownModule,
        ChipsModule,
        OverlayPanelModule,
        AccordionModule,
        StepsModule,
        CalendarModule,
        ListboxModule,
        CheckboxModule,
        RadioButtonModule,
        AutoCompleteModule,
        TooltipModule,
        ScheduleModule,
        MultiSelectModule,
        ButtonModule,
        GalleriaModule,
        DataGridModule,
        GMapModule,
        ChartModule,
        TableModule,
        ConfirmDialogModule,
        SidebarModule,
        KeyFilterModule
    ]
})
export class PrimengModule {
}
