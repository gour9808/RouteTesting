import { Routes } from '@angular/router';
import { ExtraOptions, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ContainerComponent } from './container/container.component';
import { EventsComponent } from './events/events.component';
import { DiscussionsComponent } from './discussions/discussions.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DataLoaderComponent } from './data-loader/data-loader.component';
import { OAuthGuard } from './services/oauth-guard.service';
import { CallbackComponent } from './callback/callback.component';
import { MineComponent } from './mine/mine.component';
import { AllComponent } from './all/all.component';
import { FlagComponent } from './flag/flag.component';
import { ViewLogDetailComponent } from './view-log-detail/view-log-detail.component';
import { ViewDebugLevelLogComponent } from './view-debug-level-log/view-debug-level-log.component';
import { CreditsComponent } from './credits/credits.component';
import { ViewLogsByUserComponent } from './view-logs-by-user/view-logs-by-user.component';
import { SchemaBuilderComponent } from './schema-builder/schema-builder.component';

export const eventRoutes: Routes = [
    { path: 'all', component: EventsComponent },
]

export const discussionsRoutes: Routes = [
    { path: 'all', component: DiscussionsComponent }
]

export const MineRoutes: Routes = [

    { path: "", redirectTo: "logs" },
    { path: "logs", component: MineComponent },
    { path: "details/:recordId", component: ViewLogDetailComponent },
    { path: "allLogs", component: AllComponent },
    {path : 'view', component : ViewLogsByUserComponent},
    { path: "flag", component: FlagComponent },
    { path: "debugLevelLog", component: ViewDebugLevelLogComponent },
    { path: "schema", component: SchemaBuilderComponent }

]

export const dashboardRoutes: Routes = [
    { path: '', redirectTo: 'my' },
    { path: 'my', component: DashboardComponent, loadChildren: "app/mine/mine.module#MineModule" },
    { path: 'events', loadChildren: 'app/events/events.module#EventsModule' },
    { path: 'discussions', loadChildren: 'app/discussions/discussion.module#DisscussionsModule' },
    { path: "credits", component: CreditsComponent },

];

export const appRoutes: Routes = [
    { path: '', redirectTo: 'load', pathMatch: 'full' },
    { path: 'auth/callback', component: CallbackComponent },
    { path: 'load', component: DataLoaderComponent, canActivate: [OAuthGuard] },
    { path: 'home', component: ContainerComponent, loadChildren: 'app/dashboard/home.module#HomeModule', canActivate : [OAuthGuard] }

];

export const routingConfiguration: ExtraOptions = {
    paramsInheritanceStrategy: 'always'
};

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, routingConfiguration)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

