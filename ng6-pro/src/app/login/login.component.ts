import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReCaptcha2Component } from 'ngx-captcha';

// Services
import { CookieService } from 'ngx-cookie-service';
import { AppAuthService } from '../sharedJs/app.authService';
import { LocalStorageService } from 'ngx-store';

// App Constant
import { PATTERNS } from '../sharedJs/app.constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
  loginData: any = {};
  emailData: any = {};
  responseData: any = {};
  authData: any = {};
  token: string;
  isLoading: boolean;
  isLogin: boolean;
  rememberMe: boolean;
  isRememberMe: boolean;

  public theme: 'light' | 'dark' = 'light';
  public size: 'compact' | 'normal' = 'normal';
  public lang = 'en';
  public type: 'image' | 'audio';
  @ViewChild('captchaElem') captchaElem: ReCaptcha2Component;
  public isCaptchaResponse: boolean;
  public isCheckStatus: boolean;
  public isStatus: string;
  public statusData: any = {};
  public statusResponse: any = {};
  public emailPattern = PATTERNS.emailPattern;

  constructor(
    private authService: AppAuthService,
    private toastr: ToastrService,
    private cookiesService: CookieService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private localStorageService: LocalStorageService,
  ) {
      this.isLoading = false;
      this.isLogin = true;
      this.isRememberMe = this.cookiesService.check('RememberMe');
      this.isRememberMe = this.cookiesService.check('RememberMe');
      this.isCheckStatus = false;
      this.isStatus = 'check';
    }

  ngOnInit() {
    if (this.isRememberMe) {
      this.loginData.username = JSON.parse(this.cookiesService.get('RememberMe')).username;
      this.loginData.password = JSON.parse(this.cookiesService.get('RememberMe')).password;
      this.rememberMe = JSON.parse(this.cookiesService.get('RememberMe')).rememberMe;
    }
  }

  onLogin(): void {
    this.isLoading = true;
    const username = this.loginData.username.trim();
    const password = this.loginData.password.trim();
    if (this.isCaptchaResponse) {
      this.authService.loginApi(username, password).subscribe(res => {
        this.authData = res;
        if (this.authData && this.authData.token_type) {
            this.toastr.success('Login Successfully');
            if (this.authData.RoleID === '2') {
              this.router.navigate(['admin/dashboard']);
            } else {
              this.router.navigate(['dashboard']);
            }
            const token = {
              access_token: this.authData.access_token 
            };
            // this.cookiesService.set('AuthData', JSON.stringify(token));
            // this.cookiesService.set('UserData', JSON.stringify(this.authData));

            this.localStorageService.set('UserData', JSON.stringify(this.authData));
            delete(this.authData.access_token);
            this.localStorageService.set('AuthData', JSON.stringify(token));
            
            this.isLoading = false;
            if (this.rememberMe) {
              this.loginData.rememberMe = this.rememberMe;
              this.cookiesService.set('RememberMe', JSON.stringify(this.loginData));
            }
            this.loginData = {};
            this.reset();
            this.isCaptchaResponse = false;
        } else {
          console.log(this.authData);
        }
      }, err => {
        this.isCaptchaResponse = false;
        this.reset();
        this.isLoading = false;
        this.toastr.error(err.error.error || 'Server Error');
      });
    }
  }

  navigate(isRefNo): void {
    console.log();
    if (isRefNo) {
      this.router.navigate(['register'], { queryParams: { refId: this.statusData.ReferenceNo }});
    } else {
      this.router.navigate(['register']);
    }
    
  }

  toggleScreen() {
    this.isLogin = !this.isLogin;
  }

  checkRemeber(eve) {
    if (eve === false) {
      this.cookiesService.delete('RememberMe');
    }
  }

  onResetCred() {
    this.isLoading = true;
    this.authService.forgotPasswordApi(this.emailData).subscribe(res => {
      this.responseData = res;
        if (this.responseData && this.responseData.Data.Result === 'Success') {
          this.isLogin = true;
          this.emailData = {};
          this.toastr.success(this.responseData.Data.Message);
        }
      this.isLoading = false;
    }, err => {
      this.toastr.error(err.error.Message || 'Server Error');
      this.isLoading = false;
    });
  }

  handleCaptchaSuccess(captchaResponse: string): void {
    if (captchaResponse) {
      this.isCaptchaResponse = true;
    } else {
      this.isCaptchaResponse = false;
    }
  }

  handleCaptchaExpire(captchaResponse: string): void {
    this.cdr.detectChanges();
    this.isCaptchaResponse = false;
    console.log(this.isCaptchaResponse);
  }

  reset(): void {
    this.captchaElem.resetCaptcha();
  }

  onCheckScreen() {
    this.isCheckStatus = true;
  }

  backToLogin() {
    this.isCheckStatus = false;
    this.isStatus = 'check';
  }

  statusNavigation(value) {
    this.isStatus = value;
  }

  checkStatus(data) {
    this.isLoading = true;
    this.authService.checkStatusApi(data).subscribe(res => {
      this.statusResponse = res;
      if (this.statusResponse && this.statusResponse.Data.Result === 'Success') {
        if (this.statusResponse.Data.Message === 'Approved') {
          this.statusNavigation('success');
        } else if (this.statusResponse.Data.Message === 'Review') {
          this.statusNavigation('pending');
        } else {
          this.statusNavigation('reject');
        }
      }
      // this.statusData = {};
      this.isLoading = false;
    }, err => {
      this.isLoading = false;
      console.log(err);
    });
  }
}
