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
    { path: "flag", component: FlagComponent },
    {path: "debugLevelLog", component : ViewDebugLevelLogComponent}

]

export const dashboardRoutes: Routes = [
    { path: '', redirectTo: 'my' },
    { path: 'my', component: DashboardComponent, loadChildren: "app/mine/mine.module#MineModule" },
    { path: 'events', loadChildren: 'app/events/events.module#EventsModule' },
    { path: 'discussions', loadChildren: 'app/discussions/discussion.module#DisscussionsModule' }
];

export const appRoutes: Routes = [
    { path: '', redirectTo: 'load', pathMatch: 'full' },
    { path: 'auth/callback', component: CallbackComponent },
    { path: 'load', component: DataLoaderComponent, canActivate: [OAuthGuard] },
    { path: 'home', component: ContainerComponent, loadChildren: 'app/dashboard/home.module#HomeModule' }

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

