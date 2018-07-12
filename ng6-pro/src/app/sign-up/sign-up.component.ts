import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgForm, FormGroup, FormGroupDirective } from '@angular/forms';
import { Router, ActivatedRoute  } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReCaptcha2Component } from 'ngx-captcha';
import { MatDialog } from '@angular/material';
import { TCDialog } from '../tcPopup/tcPopup.component';

// Services
import { AppAuthService } from '../sharedJs/app.authService';
import { AppCommonService } from '../sharedJs/app.commonService';
import { LocalStorageService } from 'ngx-store';
import { AdminService } from 'src/app/sharedJs/adminService';

// App Constant
import { ErrorMessages, PATTERNS } from '../sharedJs/app.constant';
import Utils from '../sharedJs/utility';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html'
})
export class SignUpComponent implements OnInit {
  @ViewChild('appForm') signupForm: NgForm;
  public emailPattern = PATTERNS.emailPattern;
  public phoneNoPattern = PATTERNS.phoneNoPattern;
  public numberPattern = PATTERNS.numberPattern;
  public spacePattern = PATTERNS.spacePattern;
  public appData: any = {};
  public addressData: any = {};
  public vesselData: any = {};
  public countryList: Array<any> = [];
  public timezoneData: any = {};
  public timezoneList: Array<any> = [];
  public responseData: any = {};
  public tooltipPosition: any = [];
  public errorMsg: any = ErrorMessages;

  public theme: 'light' | 'dark' = 'light';
  public size: 'compact' | 'normal' = 'normal';
  public lang = 'en';
  public type: 'image' | 'audio';
  @ViewChild('captchaElem') captchaElem: ReCaptcha2Component;
  public isCaptchaResponse: boolean;
  public isDisabled: boolean;
  public isNavShow: boolean;
  public queryParams = this.activeRoute.snapshot.queryParams;
  public isResgister: boolean;
  public renderMsg: any;
  public timzoneOffset: any;
  public timzoneString: any;


  constructor(
    private authService: AppAuthService,
    private appCommonService: AppCommonService,
    private router: Router,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private localStorageService: LocalStorageService,
    public dialog: MatDialog,
    private activeRoute: ActivatedRoute,
    private adminService: AdminService,
  ) {
    this.isNavShow = false;
    this.isResgister = false;
    this.isCaptchaResponse = false;
    this.isDisabled = false;
    if (this.localStorageService.get('AuthData')) {
        this.isNavShow = true;
    } else {
        this.isNavShow = false;
    }
    
  }

  isEmpty(obj) {
    for (const prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        return false;
      }
    }
    return JSON.stringify(obj) === JSON.stringify({});
  }

  ngOnInit() {
    this.resetVessleEmails();
    this.getCountryRec();
    this.tooltipPosition = ['right'];    
    if (!Utils.isObjectEmpty(this.queryParams)) {
      this.getTMDetails(this.queryParams.refId);
    }    
    this.timzoneOffset = new Date().getTimezoneOffset();
    this.timzoneString = new Date().toString().match(/\((.*)\)/).pop();
  }

  resetVessleEmails() {
    this.appData.Vessels = [{
      VesselName: '',
      IMONumber: ''
    }, {
      VesselName: '',
      IMONumber: ''
    }, {
      VesselName: '',
      IMONumber: ''
    }, {
      VesselName: '',
      IMONumber: ''
    }, {
      VesselName: '',
      IMONumber: ''
    }, {
      VesselName: '',
      IMONumber: ''
    }];
    this.appData.Emails = [{}];
  }

  getTMDetails(id) {
    const self = this;
    const data = {
      ReferenceNo: id
    };
    this.adminService.TMDetailApi(data).subscribe(res => {
      const responseData: any = res;
      this.appData = responseData.Data;
    }, err => {});
  }

  navigate(): void {
    this.router.navigate(['signin']);                               
  }

  addVessels() {
    this.appData.Vessels.push({});
  }

  removeVessels(idx: number) {
    this.appData.Vessels.splice(idx, 1);
  }

  addEmails() {
    this.appData.Emails.push({});
  }

  removeEmail(idx: number) {
    this.appData.Emails.splice(idx, 1);
  }

  getCountryRec() {
    this.appCommonService.getCountryList().subscribe(res => {
      const countryData: any = res;
      if (countryData && countryData.Data) {
        this.countryList = countryData.Data;
      } else {
        this.countryList = [];
      }
    }, err => {
      console.log('Server Error');
    });
  }

  
  
  onSubmit(data: any) {    
    this.isDisabled = true;
    data.RoleID = 1;
    // data.Timezone = this.timzoneString;
    data.Timezone = this.timzoneOffset;
    if (!Utils.isObjectEmpty(this.queryParams)) {
      data.ReferenceNo = this.queryParams.refId;
    }
     
    if (this.isCaptchaResponse) {
      if (this.signupForm.valid) {
        this.authService.signupApi(data).subscribe(res => {
          this.responseData = res;
          if (this.responseData && this.responseData.Data) {
            // this.toastr.success(this.responseData.Data.Message || 'User Register Successfully');
            this.renderMsg = this.responseData.Data.Message;
            this.signupForm.resetForm(); 
            this.reset();
            this.isCaptchaResponse = false;
            this.appData = {};
            this.resetVessleEmails();
            this.isDisabled = false;
            this.isResgister = true;
            // this.router.navigate(['signin']);
          }
        }, err => {
          this.signupForm.resetForm();
          this.toastr.error(err.error.Message || 'Server Error');
          this.isDisabled = false;
        });
      } else {        
        console.log(this.signupForm);
        this.isDisabled = false;
        this.toastr.error('Please fill the mandatory fields');
      }
    }
  }

  handleCaptchaSuccess(captchaResponse: string): void {
    if (captchaResponse) {
      this.isCaptchaResponse = true;
    } else {
      this.isCaptchaResponse = false;
    }
  }

  handleCaptchaExpire(): void {
    this.cdr.detectChanges();
    this.isCaptchaResponse = false;
  }

  reset(): void {
    this.captchaElem.resetCaptcha();
  }

  openDialog() {
    const dialogRef = this.dialog.open(TCDialog, {
      height: 'auto'
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     this.getTMList();
    //   }
    // });
  }

}

