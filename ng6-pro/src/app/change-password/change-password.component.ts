import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { PATTERNS } from '../sharedJs/app.constant';
import { LocalStorageService } from 'ngx-store';

// Services
// import { CookieService } from 'ngx-cookie-service';
import { AppAuthService } from '../sharedJs/app.authService';

// Add components
import { HeaderComponent } from '../header/header.component';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  @ViewChild('changePassword') passForm: NgForm;
  public passwordPattern: any;
  public passwordForm: any = {};
  public isDisabled: boolean; 
  public isNotMatched: boolean; 
  public email: string;
  public formData: any = {};
  public responseData: any = {};

  constructor(
    // private cookiesService: CookieService,
    private authService: AppAuthService,
    private toastr: ToastrService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) { 
    this.isDisabled = false;
    this.isNotMatched = false;
  }

  ngOnInit() {
    // console.log(JSON.parse(this.cookiesService.get('AuthData')).Email);
   // this.email = JSON.parse(this.cookiesService.get('AuthData')).Email;
    this.passwordPattern = PATTERNS.passwordPattern;
    this.email = JSON.parse(this.localStorageService.get('UserData')).Email;
  }

  onSubmit(data) {
    this.formData.Email = this.email;
    this.formData.NewPassword = data.NewPassword;
    this.formData.Password = data.Password;
    this.isNotMatched = false;
    if (data.NewPassword === data.confirmPassword) {
      this.authService.changePasswordApi(this.formData).subscribe(res => {
        this.responseData =  res;
        if (this.responseData && this.responseData.Data.Result === 'Fail') {
          this.toastr.error(this.responseData.Data.Message || 'Server Error');
        } else {
          this.passForm.resetForm();
          this.passwordForm = {};
          this.toastr.success(this.responseData.Data.Message || 'Password Update Successfully');
          // this.router.navigate(['dashboard']);
        }
      }, err => {
        this.toastr.error(err.error.error || 'Server Error');
      });
    } else {
      this.isNotMatched = true;
    }
  }

}
