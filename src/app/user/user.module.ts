import {NgModule} from '@angular/core';
import {UserProfileComponent} from '../user-profile/user-profile.component';
import {LogbookComponent} from '../logbook/logbook.component';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {PrimengModule} from '../module/primeng.module';
import {WidgetsModule} from '../widgets/widgets.module';
import {TranslateModule} from '@ngx-translate/core';
import {LayoutsModule} from '../layouts/layouts.module';
import {PipesModule} from '../utils/pipes/pipes.module';
import {ToastyModule} from 'ng2-toasty';
import {userRoutes} from '../app.routes';

@NgModule({
    imports: [
        RouterModule.forChild(userRoutes),
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        PrimengModule,
        WidgetsModule,
        TranslateModule.forChild({isolate: false}),
        LayoutsModule,
        PipesModule,
        ToastyModule
    ],
    exports: [RouterModule,
        UserProfileComponent,
        LogbookComponent
    ],
    declarations: [
        UserProfileComponent,
        LogbookComponent
    ],
    providers: [],
})
export class UserModule {
}
