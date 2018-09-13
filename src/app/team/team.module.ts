import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {teamRoutes} from '../app.routes';
import {LayoutsModule} from '../layouts/layouts.module';
import {FormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {PrimengModule} from 'app/module/primeng.module';
import {WidgetsModule} from 'app/widgets/widgets.module';
import {TranslateModule} from '@ngx-translate/core';
import {PipesModule} from '../utils/pipes/pipes.module';
import {TeamManagementComponent} from './team-management/team-management.component';
import {InviteService} from './../service/invite.service';
import {AddMemberComponent} from './team-management/add-member/add-member.component';
import {InviteMemberComponent} from './team-management/invite-member/invite-member.component';

@NgModule({
  imports: [
    RouterModule.forChild(teamRoutes),
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    PrimengModule,
    WidgetsModule,
    TranslateModule.forChild({isolate: false}),
    PipesModule,
    LayoutsModule
  ],
  declarations: [
      TeamManagementComponent,
      AddMemberComponent,
      InviteMemberComponent
  ],
  exports: [
    RouterModule,
  ],
  providers: [InviteService]
})
export class TeamModule { }
