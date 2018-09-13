import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FleetResolverContainerComponent} from './fleet-resolver-container/fleet-resolver-container.component';
import {FormsModule} from '@angular/forms';
import {PrimengModule} from 'app/module/primeng.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {WidgetsModule} from 'app/widgets/widgets.module';
import {TranslateModule} from '@ngx-translate/core';
import {PipesModule} from 'app/utils/pipes/pipes.module';
import {ActivityService} from '../service/activity.service';
import {RouterModule} from '@angular/router';
import {fleetResolverRoutes} from '../app.routes';
import {InviteService} from '../service/invite.service';
import {InviteListComponent} from './invite-list/invite-list.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(fleetResolverRoutes),
        FormsModule,
        PrimengModule,
        FlexLayoutModule,
        TranslateModule.forChild({isolate: false}),
        WidgetsModule,
        PipesModule],
    declarations: [FleetResolverContainerComponent, InviteListComponent],
    providers: [ActivityService, InviteService],
    exports: [RouterModule, FleetResolverContainerComponent, InviteListComponent],
})
export class FleetResolverModule {
}
