import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgxCaptchaModule } from 'ngx-captcha';
import { MaterialModule } from './sharedJs/material.module';

// Services
import { CookieService } from 'ngx-cookie-service';
import { AppAuthService } from './sharedJs/app.authService';
import { AuthInterceptor } from './sharedJs/app.interceptor';
import { AppCookieService } from './sharedJs/app.cookieService';
import { AppDashboardService } from './dashboard/app.dashboardService';
import { AppCommonService } from './sharedJs/app.commonService';
import { WebStorageModule } from 'ngx-store';

// Directive
import { DropdownDirective } from './sharedJs/dropDown/dropDown.directive';
import { OnlyNumber } from './sharedJs/onlyNumber/onlynumber.directive';
import { NoWhitespaceDirective } from './sharedJs/whitespaceValidator/no-whitespace.directive';

// AuthGuard
import { AuthGuard } from './sharedJs/auth-guard.service';
import { LoginAuthGuard } from './sharedJs/beforeLoginauthGuard.service';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { AdminService } from './sharedJs/adminService';
import { AdminAuthGuard } from './sharedJs/adminLoginAuthGuard.service';

// Compononets and modules
import { AppComponent } from './app.component';
import { AppRoutingModule } from 'src/app/app.route.module';
import { LoginComponent } from 'src/app/login/login.component';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { PageNotFoundComponent } from 'src/app/pageNotFound/page404.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FooterComponent } from './footer/footer.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UserDetailDialog } from './admindashboard/userDetailPopup/userPopup.component';
import { HeaderComponent } from './header/header.component';
import { SiteKey } from './sharedJs/app.constant';
import { TCDialog } from './tcPopup/tcPopup.component';
import { AccidentComponent } from './accident/accident.component';
import { ManagementComponent } from './management/management.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    PageNotFoundComponent,
    SignUpComponent,
    FooterComponent,
    ChangePasswordComponent,
    HeaderComponent,
    DropdownDirective,
    AdmindashboardComponent,
    OnlyNumber,
    UserDetailDialog,
    TCDialog,
    AccidentComponent,
    NoWhitespaceDirective,
    ManagementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      preventDuplicates: true
    }),
    MaterialModule,
    NgxCaptchaModule.forRoot({
      reCaptcha2SiteKey: SiteKey
    }),
    WebStorageModule
  ],
  providers : [
    CookieService,
    AppAuthService,
    AppCookieService,
    AppDashboardService,
    AppCommonService,
    AuthGuard,
    LoginAuthGuard,
    AdminAuthGuard,
    AdminService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  entryComponents: [
    UserDetailDialog,
    TCDialog
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
