import {ActionbarComponent} from './actionbar/actionbar.component';
import {TabbarComponent} from './tabbar/tabbar.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {PipesModule} from '../utils/pipes/pipes.module';
import {WidgetsModule} from '../widgets/widgets.module';
import {PrimengModule} from '../module/primeng.module';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TranslateModule} from '@ngx-translate/core';
import {NotificationsComponent} from './notifications/notifications.component';
import {ActivityService} from '../service/activity.service';
import {InviteService} from '../service/invite.service';
import {ActivityListComponent} from '../fleet-resolver/activity-list/activity-list.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PrimengModule,
        FlexLayoutModule,
        TranslateModule.forChild({isolate: false}),
        WidgetsModule,
        PipesModule
    ],
    declarations: [
        ToolbarComponent,
        SidebarComponent,
        TabbarComponent,
        ActionbarComponent,
        NotificationsComponent,
        ActivityListComponent
    ],
    exports: [
        ToolbarComponent,
        SidebarComponent,
        TabbarComponent,
        ActionbarComponent,
        ActivityListComponent
    ],
    providers: [ActivityService, InviteService],
})
export class LayoutsModule {
}
