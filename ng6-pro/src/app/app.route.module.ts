import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './pageNotFound/page404.component';
import { ChangePasswordComponent } from 'src/app/change-password/change-password.component';
import { AdmindashboardComponent } from 'src/app/admindashboard/admindashboard.component';
import { AccidentComponent } from './accident/accident.component';
import { ManagementComponent } from './management/management.component';

// AuthGuard
import { AuthGuard } from './sharedJs/auth-guard.service';
import { LoginAuthGuard } from './sharedJs/beforeLoginauthGuard.service';
import { AdminAuthGuard } from './sharedJs/adminLoginAuthGuard.service';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo : '/signin',
        pathMatch: 'full'
    }, {
        path: 'signin',
        component: LoginComponent,
        canActivate: [LoginAuthGuard]
    }, {
        path: 'register',
        component: SignUpComponent
    }, {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
    }, {
        path: 'accident',
        component: AccidentComponent,
        canActivate: [AuthGuard]
    }, {
        path: 'change-password',
        component: ChangePasswordComponent,
        canActivate: [AuthGuard]
    }, {
        path: 'admin/change-password',
        component: ChangePasswordComponent,
        canActivate: [AdminAuthGuard]
    }, {
        path: 'admin/dashboard',
        component: AdmindashboardComponent,
        canActivate: [AdminAuthGuard]
    }, {
        path: 'admin/tm-management',
        component: ManagementComponent,
        canActivate: [AdminAuthGuard]
    }, {
        path: 'not-found',
        component: PageNotFoundComponent
    }, {
        path: '**',
        redirectTo: '/not-found'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {
    constructor() {}
}
