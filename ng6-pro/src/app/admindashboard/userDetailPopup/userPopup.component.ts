import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { NgForm, FormGroup } from '@angular/forms';
import { AppCommonService } from 'src/app/sharedJs/app.commonService';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'ngx-store';
import { AdminService } from 'src/app/sharedJs/adminService';


@Component({
  selector: 'app-user-dialog',
  templateUrl: 'userPopup.component.html',
  styleUrls: ['./userPopup.component.css']
})
// tslint:disable-next-line:component-class-suffix
export class UserDetailDialog {
  public appData: any;
  public countryData: any = {};
  public countryList: Array<any> = [];
  public isLoad: boolean; 
  private UserId: string;
  public isLoding: boolean;
  public DeclineComments: string;
  public isDeclinePopup: boolean;
  public isApprovePopup: boolean; 
  public compareData: any;
  public compareOption: any;
  public verifyData: any = {};
  public tooltipPosition: any = [];
  public verifyVesselsData: any = [];
  public approvalContent: any;

  constructor(
    private adminService: AdminService, 
    private appCommonService: AppCommonService,
    // private cookiesService: CookieService,
    private localStorageService: LocalStorageService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private mdDialogRef: MatDialogRef<UserDetailDialog>
  ) { 
    this.isLoad = false;
    this.isLoding = false;
    this.isDeclinePopup = false;
    this.isApprovePopup = false;
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit(): void {
    this.tooltipPosition = ['below'];
    this.UserId = JSON.parse(this.localStorageService.get('UserData')).UserId;
    this.getCountryRec();
    this.getTMDetails(this.data.TMRegistrationID);
    this.compareOption = [{
      label: 'SIRE',
      sourceID: '1', 
    }, {
      label: 'LLI',
      sourceID: '2', 
    }, {
      label: 'IHS',
      sourceID: '1', 
    }, {
      label: 'Equasis',
      sourceID: '1', 
    }];
    this.compareData = this.compareOption[0].sourceID;
    this.getApprovalContent();
  }

  getCountryRec() {
    this.appCommonService.getCountryList().subscribe(res => {
      this.countryData = res;
      if (this.countryData && this.countryData.Data) {
        this.countryList = this.countryData.Data;
      } else {
        this.countryList = [];
      }
    }, err => {
      // this.toastr.error('Server Error');
    });
  }

  getApprovalContent() {
    this.adminService.approvalContent().subscribe(res => {
      const response: any = res;
      this.approvalContent = response.Data;
      // console.log(this.approvalContent.Message);
    });
  }

  getTMDetails(id) {
    const self = this;
    const data = {
      TMRegistrationID: id
    };
    this.adminService.TMDetailApi(data).subscribe(res => {
      const responseData: any = res;
      self.appData = responseData.Data;
      this.isLoad = true;
    }, err => {
      this.isLoad = false;
    });
  }

  

  sendStatus(statusId) {
    this.isLoding = true;
    this.appData.StatusID = statusId;
    this.appData.LoggedinID = this.UserId;
    const data: any = {
      StatusID: statusId,
      LoggedinID: this.UserId,
      TMRegistrationID: this.data.TMRegistrationID,
      DeclineComments: this.DeclineComments
    };
    this.adminService.TMAprovedAndDecline(statusId == '1' ? this.appData : data).subscribe(res => {
      let response: any  = {};
          response = res;
      if (response && response.Data.Result === 'Fail') {
        this.toastr.error(response.Data.Detail || 'Server Error');
      } else {
        this.toastr.success(response.Data.Detail);
        this.closeDialog();
        this.isDeclinePopup = false;
      }
      this.isLoding = false;
    }, err => {
      this.isLoding = false;
      this.toastr.error(err.error.error || 'Server Error');
    });
  }

  closeDialog() {
    this.mdDialogRef.close(true);
  }

  openCustomDialog(name) {
    if (name == 'Decline') {
      this.isDeclinePopup = true;
    } else if (name == 'Approve') {
      this.isApprovePopup = true;
    }    
  }

  closeCustomDialog(name) {
    if (name == 'Decline') {
      this.isDeclinePopup = false;
    } else if (name == 'Approve') {
      this.isApprovePopup = false;
    }
  }
  
  onCmpare() {
    const data = {
      TMRegistrationID: this.appData.TMRegistrationID,
      SourceID: this.compareData ,
      FirstName: this.appData.FirstName,
      LastName: this.appData.LastName,
      CompanyName: this.appData.CompanyName
    };
    this.adminService.TMVerify(data).subscribe(res => {
      const resData: any = res;
      this.verifyData = resData.Data;
      this.verifyVesselsData = resData.Data.Vessels;
      console.log(res);
    }, err => {
      console.log(err);
    });
  }

  updateDetail(data) {
    console.log(data);
  }
}
