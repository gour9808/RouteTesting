import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {CallbackComponent} from './login/callback.component';
import {FleetComponent} from './fleet/fleet.component';
import {OAuthGuard} from './login/oauthguard.service';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {DataLoaderComponent} from './data-loader/data-loader.component';
import {ErrorComponent} from './500-error/500-error.component';
import {LogbookComponent} from './logbook/logbook.component';
import {TrackingComponent} from './live-tracking/tracking.component';
import {PlaygroundComponent} from './playground/playground.component';
import {VehicleCreateComponent} from './vehicle/vehicle-create/vehicle-create.component';
import {VehicleReminderComponent} from './vehicle/vehicle-reminder/vehicle-reminder.component';
import {DriverSearchComponent} from './drivers/driver-search/driver-search.component';
import {DriverDetailComponent} from './drivers/driver-detail/driver-detail.component';
import {VehicleGridComponent} from './vehicle/vehicle-grid/vehicle-grid.component';
import {LicenseGridComponent} from './drivers/driver-detail/license-info/license-grid/license-grid.component';
import {LicenseAddComponent} from './drivers/driver-detail/license-info/license-add/license-add.component';
import {VehicleTrackingComponent} from './vehicle/vehicle-tracking/vehicle-tracking.component';
import {VehicleInfoComponent} from './vehicle/vehicle-info/vehicle-info.component';
import {DetailsComponent} from './drivers/driver-detail/details/details.component';
import {VehicleInsuranceComponent} from './vehicle/vehicle-insurance/vehicle-insurance.component';
import {VehicleLogbookComponent} from './vehicle/vehicle-logbook/vehicle-logbook.component';
import {OpenRequestDetailComponent} from './open-requests/open-request-detail/open-request-detail.component';
import {OpenReqListComponent} from './open-requests/open-req-list/open-req-list.component';
import {SettingsOrgComponent} from './settings/settings-org/settings-org.component';
import {SettingsFleetComponent} from './settings/settings-fleet/settings-fleet.component';
import {OpenReqConfirmComponent} from './open-requests/open-req-confirm/open-req-confirm.component';
import {AccessDeniedComponent} from './access-denied/access-denied.component';
import {FleetResolverComponent} from './fleet-resolver/fleet-resolver.component';
import {VehicleGeofenceComponent} from './vehicle/vehicle-geofence/vehicle-geofence.component';
import {OpenReqCreateFormComponent} from './open-requests/open-req-create-form/open-req-create-form.component';
import {VehicleExpenseComponent} from './vehicle/vehicle-expense/vehicle-expense.component';
import {ExpenseCreateComponent} from './vehicle/vehicle-expense/expense-create/expense-create.component';
import {AuthRedirectComponent} from './login/auth-redirect.component';
import {VehicleDetailComponent} from './vehicle/vehicle-detail/vehicle-detail.component';
import {VehicleResolver} from './resolves/vehicle.resolver';
import {UserComponent} from './user/user.component';
import {TeamManagementComponent} from './team/team-management/team-management.component';
import {CreateFleetComponent} from './registration/create-fleet.component';
import {FleetResolverContainerComponent} from './fleet-resolver/fleet-resolver-container/fleet-resolver-container.component';
import {InviteListComponent} from './fleet-resolver/invite-list/invite-list.component';
import {InviteResolverComponent} from './invite-resolver/invite-resolver.component';
import {NgModule} from '@angular/core';
import {ReportContainerComponent} from './reports/report-container/report-container.component';
import {SummaryContainerComponent} from 'app/logbook-summaries/summary-container-component/summary-container.component';
import {VehicleReportTableComponent} from './reports/vehicle-report/vehicle-report-table/vehicle-report-table.component';
import {DriverReportTableComponent} from './reports/driver-report-table/driver-report-table.component';
import {DriverTableComponent} from './drivers/driver-table/driver-table.component';
import {SummaryDetailComponent} from './logbook-summaries/summary-detail/summary-detail.component';
import {DashboardAdminComponent} from './dashboard/dashboard-admin/dashboard-admin.component';
import {CarbookRoles} from './service/user.service';
import {DashboardAdminGuard} from './dashboard/dashboard-admin/dashboard-admin.guard';
import {DashboardManagerGuard} from './dashboard/dashboard-manager/dashboard-manager.guard';
import {DashboardDriverGuard} from './dashboard/dashboard-driver/dashboard-driver.guard';
import {DashboardComponent} from './dashboard/dashboard.component';
import {DashboardTeamManagerComponent} from './dashboard/dashboard-team-manager/dashboard-team-manager.component';
import {DashboardTeamManagerGuard} from './dashboard/dashboard-team-manager/dashboard-team-manager-guard';
import {ExpenseReportMainComponent} from './reports/expense-report/expense-report-main/expense-report-main.component';
import {ExpenseReportDetailComponent} from './reports/expense-report/expense-report-detail/expense-report-detail.component';
import {VehicleGeofenceListComponent} from './vehicle/vehicle-geofence/vehicle-geofence-list/vehicle-geofence-list.component';
import {GeoFenceResolver} from './resolves/geo-fence.resolver';
import {ExpenseListComponent} from './vehicle/vehicle-expense/expense-list/expense-list.component';
import {VehicleReportDetailComponent} from './reports/vehicle-report/vehicle-report-detail/vehicle-report-detail.component';

export const openReqRoutes: Routes = [
    {path: '', redirectTo: 'list', pathMatch: 'full'},
    {path: 'list', component: OpenReqListComponent, data: {title: 'OPEN_REQUEST'}},
    {path: 'new', component: OpenReqCreateFormComponent, data: {title: 'NEW_REQUEST'}},
    {path: 'detail/:reqId', component: OpenRequestDetailComponent, data: {title: 'REQUEST_DETAIL'}},
    {path: 'confirm/:requestId', component: OpenReqConfirmComponent, data: {title: 'CONFIRM_REQUEST'}}
];

export const expenseRoutes: Routes = [
    {path: '', redirectTo: 'list', pathMatch: 'full'},
    {path: 'list', component: ExpenseListComponent, data: {title: 'VEHICLE_INFO_EXPENSES'}},
    {path: 'add', component: ExpenseCreateComponent, data: {title: 'ADD_EXPENSE'}},
    {path: 'add/:costId', component: ExpenseCreateComponent, data: {title: 'UPDATE_EXPENSE'}}
];

export const geoFenceRoutes: Routes = [
    {path: '', redirectTo: 'list', pathMatch: 'full'},
    {path: 'list', component: VehicleGeofenceListComponent, data: {title: 'VEHICLE_INFO_GEO_FENCE'}},
    {path: 'detail', component: VehicleGeofenceComponent, data: {title: 'VEHICLE_INFO_GEO_FENCE'}, resolve: {fence: GeoFenceResolver}},
    {path: 'new', component: VehicleGeofenceComponent, data: {title: 'VEHICLE_INFO_GEO_FENCE'}}
];

const settingRoutes: Routes = [
    {path: '', redirectTo: 'org', pathMatch: 'full'},
    {path: 'org', component: SettingsOrgComponent, data: {title: 'ORGANISATION_SETTINGS'}},
    {path: 'fleet', component: SettingsFleetComponent, data: {title: 'FLEETVIEW_SETTINGS'}}
];

export const vehicleDetailRoutes: Routes = [
    {path: '', redirectTo: 'info', pathMatch: 'full'},
    {path: 'insurance', component: VehicleInsuranceComponent, data: {title: 'VEHICLE_INFO_INSURANCE'}},
    {path: 'expenses', component: VehicleExpenseComponent, loadChildren: 'app/vehicle/vehicle-expense/vehicle-expense.module#VehicleExpenseModule'},
    {path: 'info', component: VehicleInfoComponent, data: {title: 'VEHICLE_INFO_OVERVIEW'}},
    {path: 'reminders', component: VehicleReminderComponent, data: {title: 'VEHICLE_INFO_REMINDERS'}},
    {path: 'logbook', component: VehicleLogbookComponent, data: {title: 'VEHICLE_INFO_LOGBOOK'}},
    {path: 'tracking', component: VehicleTrackingComponent, data: {title: 'VEHICLE_INFO_TRACKING'}},
    {path: 'fence', loadChildren: 'app/vehicle/vehicle-geofence/vehicle-geofence.module#VehicleGeofenceModule', data: {title: 'VEHICLE_INFO_GEO_FENCE'}}
];

export const vehicleRoutes: Routes = [
    {path: '', component: VehicleGridComponent},
    {path: 'create', component: VehicleCreateComponent, data: {title: 'NEW_VEHICLE'}},
    {path: 'detail/:vehicleID', component: VehicleDetailComponent, loadChildren: 'app/vehicle/vehicle-detail/vehicle-detail.module#VehicleDetailModule', resolve: {vehicle: VehicleResolver}},
    {path: 'detail/:vehicleID/expenses', component: VehicleDetailComponent, loadChildren: 'app/vehicle/vehicle-expense/vehicle-expense.module#VehicleExpenseModule'}
];

export const teamRoutes: Routes = [
    {path: '', component: TeamManagementComponent, data: {title: 'TEAM_MANAGEMENT'}}
];

const driverDetailRoutes: Routes = [
    {path: 'info', component: DetailsComponent, data: {title: 'OVERVIEW'}},
    {path: 'license', component: LicenseGridComponent, data: {title: 'LICENSE_INFORMATION'}},
    {path: 'addLicense', component: LicenseAddComponent, data: {title: 'ADD_NEW_LICENSE'}}
];

export const driverRoutes: Routes = [
    {path: '', component: DriverTableComponent},
    {path: 'details/:userId', component: DriverDetailComponent, children: driverDetailRoutes},
    {path: 'search', component: DriverSearchComponent, data: {title: 'SEARCH_DRIVER'}}
];

export const trackingRoutes: Routes = [
    {path: '', component: TrackingComponent, data: {title: 'LIVE_TRACKING'}}
];

export const logbookSummaryRoutes: Routes = [
    {path: '', redirectTo: 'overview', pathMatch: 'full'},
    {path: 'overview', component: SummaryContainerComponent, data: {title: 'LOGBOOK_SUMMARY'}},
    {path: 'detail', component: SummaryDetailComponent, data: {title: 'LOGBOOK_SUMMARY'}}
];

export const dashboardRoutes: Routes = [
    {path: '', component: DashboardComponent},
    {path: 'admin', component: DashboardAdminComponent, data: {role: CarbookRoles.CB_ADMIN}, canActivate: [DashboardAdminGuard]},
    {path: 'team-manager', component: DashboardTeamManagerComponent, data: {role: CarbookRoles.TEAM_MANAGER}, canActivate: [DashboardTeamManagerGuard]},
    {path: 'manager', component: DashboardAdminComponent, data: {role: CarbookRoles.MANAGER}, canActivate: [DashboardManagerGuard]},
    {path: 'driver', component: DashboardAdminComponent, data: {role: CarbookRoles.DRIVER}, canActivate: [DashboardDriverGuard]}
];

export const fleetRoutes: Routes = [
    {path: '', redirectTo: 'dashboard'},
    {path: 'dashboard', loadChildren: 'app/dashboard/dashboard.module#DashboardModule', data: {title: 'Dashboard'}},
    {path: 'vehicle', loadChildren: 'app/vehicle/vehicle.module#VehicleModule', data: {title: 'ALL_VEHICLES'}},
    {path: 'team', loadChildren: 'app/team/team.module#TeamModule', data: {title: 'ALL_TEAM'}},
    {path: 'drivers', loadChildren: 'app/drivers/drivers.module#DriverModule', data: {title: 'ALL_DRIVERS'}},
    {path: 'requests', loadChildren: 'app/open-requests/open-request.module#OpenRequestModule', data: {title: 'ALL_REQUESTS'}},
    {path: 'tracking', loadChildren: 'app/live-tracking/tracking.module#TrackingModule', data: {title: 'LIVE_TRACKING'}},
    {path: 'reports', loadChildren: 'app/reports/reports.module#ReportsModule', data: {title: 'REPORTS'}},
    {path: 'settings', component: SettingsFleetComponent, data: {title: 'SETTINGS'}}
];

export const userRoutes: Routes = [
    {path: '', redirectTo: 'profile'},
    {path: 'profile', component: UserProfileComponent, data: {title: 'PROFILE'}},
    {path: 'vehicle', loadChildren: 'app/vehicle/vehicle.module#VehicleModule', data: {title: 'ALL_VEHICLES'}},
    {path: 'logbook', component: LogbookComponent, data: {title: 'MY_LOGBOOK'}}
];

export const fleetResolverRoutes: Routes = [
    {path: '', redirectTo: 'fleets'},
    {path: 'fleets', component: FleetResolverContainerComponent, data: {title: 'SELECT_FLEET'}},
    {path: 'invites', component: InviteListComponent, data: {title: 'PENDING_INVITIES'}}
];

export const reportRoutes: Routes = [
    {path: '', redirectTo: 'overview', pathMatch: 'full'},
    {path: 'overview', component: ReportContainerComponent, data: {title: 'REPORTS'}},
    {path: 'logbook', loadChildren: 'app/logbook-summaries/logbook-summaries.module#LogbookSummariesModule', data: {title: 'LOGBOOK_SUMMARY'}},
    {path: 'expense', loadChildren: 'app/reports/expense-report/expense-report.module#ExpenseReportModule', data: {title: 'EXPENSE_REPORT'}},
    {path: 'vehicle', loadChildren: 'app/reports/vehicle-report/vehicle-report.module#VehicleReportModule', data: {title: 'VEHICLE_REPORT'}},
    {path: 'driver', component: DriverReportTableComponent, data: {title: 'DRIVER_REPORT'}}
];

export const expenseReportRoute: Routes = [
    {path: '', redirectTo: 'main', pathMatch: 'full'},
    {path: 'main', component: ExpenseReportMainComponent, data: {title: 'EXPENSE_REPORT'}},
    {path: 'detail', component: ExpenseReportDetailComponent}
];

export const vehicleReportRoute: Routes = [
    {path: '', redirectTo: 'main', pathMatch: 'full'},
    {path: 'main', component: VehicleReportTableComponent, data: {title: 'VEHICLE_REPORT'}},
    {path: 'detail', component: VehicleReportDetailComponent, data: {title: 'VEHICLE_REPORT'}}
];

export const appRoutes: Routes = [
    {path: 'fleet-management-ui', redirectTo: 'load', pathMatch: 'full'},
    {path: 'demo', component: PlaygroundComponent},
    {path: 'server-error', component: ErrorComponent},
    {path: 'access-denied', component: AccessDeniedComponent},
    {path: 'auth', component: LoginComponent},
    {path: 'redirect', component: AuthRedirectComponent},
    {path: 'auth/callback', component: CallbackComponent},
    {path: 'load', component: DataLoaderComponent, canActivate: [OAuthGuard]}, // Get all the basic data like user info and org info here before redirecting to the main screen
    {path: 'invite', component: InviteResolverComponent},
    {path: 'resolver', component: FleetResolverComponent, loadChildren: 'app/fleet-resolver/fleet-resolver.module#FleetResolverModule', canActivate: [OAuthGuard], data: {title: 'ALL_FLEETS'}},
    {path: 'user', component: UserComponent, loadChildren: 'app/user/user.module#UserModule', canActivate: [OAuthGuard]},
    {path: 'fleet', component: FleetComponent, loadChildren: 'app/fleet/fleet.module#FleetModule', canActivate: [OAuthGuard]},
    {path: 'registration', component: CreateFleetComponent, canActivate: [OAuthGuard], data: {title: 'NEW_FLEET_REGISTRATION'}},
    {path: '', redirectTo: 'load', pathMatch: 'full'},
    {path: '**', redirectTo: 'load', pathMatch: 'full'}
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

// The layout will be like so:
// ->Login
// ->Loading
// ->Main Container
//     ->Other Pages
// ->Other Pages which does not encapsulate the Sidebar-Toolbar-Content layout
