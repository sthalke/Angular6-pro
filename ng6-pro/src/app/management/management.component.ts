import { Component, OnInit } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';

import { AdminService } from '../sharedJs/adminService';
import { AppCommonService } from '../sharedJs/app.commonService';
import Utils from '../sharedJs/utility';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateY(100%)'}),
        animate('200ms ease-in', style({transform: 'translateY(0%)'}))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({transform: 'translateY(100%)'}))
      ])
    ])
  ],
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {
  public TMListData: any;
  public displayedColumns: any = [];
  public dataSource: any = [];
  public columnsObj: any;
  public isFilter: boolean;
  public isColItem: boolean;
  public countryList: Array<any> = [];
  public filterData: any = {};
  public searchText: string;
  public dataSourceCopy: any;
  public isFilterAction: boolean;
  public isLoading: boolean;
  
  
  constructor(
    private adminService: AdminService,
    private appCommonService: AppCommonService,
  ) { 
    this.displayedColumns = [
    // {label: 'Date of Registration', key: 'CreatedDate', isShow: true},
    {label: 'User Id', key: 'UserId', isShow: false},
    {label: 'Company Name', key: 'CompanyName', isShow: true},
    {label: 'Company Id', key: 'CompanyID', isShow: true},
    {label: 'Country', key: 'Country', isShow: true},
    {label: 'Unique ID', key: 'UniqueID', isShow: false},
    {label: 'First Name', key: 'FirstName', isShow: false},
    {label: 'Last Name', key: 'LastName', isShow: false},
    {label: 'Contact Name', key: 'contactName', isShow: true},
    {label: 'Username', key: 'UserName', isShow: false},
    {label: 'Password', key: 'Password', isShow: false},
    {label: 'NewPassword', key: 'NewPassword', isShow: false},
    {label: 'Contact Email', key: 'Email', isShow: true},
    {label: 'Contact Telephone', key: 'ContactNo', isShow: true},
    {label: 'Address1', key: 'Address1', isShow: false},
    {label: 'Address2', key: 'Address2', isShow: false},
    {label: 'Address3', key: 'Address3', isShow: false},
    {label: 'County/State', key: 'State', isShow: true},
    {label: 'Postal Code', key: 'PostalCode', isShow: false},
    {label: 'City', key: 'City', isShow: true},
    {label: 'Timezone', key: 'Timezone', isShow: false},
    {label: 'Role ID', key: 'RoleID', isShow: false},
    {label: 'Status ID', key: 'StatusID', isShow: false},
    {label: 'Decline Comments', key: 'DeclineComments', isShow: false},
    {label: 'Vessels', key: 'Vessels', isShow: false},
    {label: 'Emails', key: 'Emails', isShow: false}];

    this.isFilter = false;
    this.isFilterAction = false;
  }

  
  ngOnInit() {
    this.getTMList();
    this.getCountryRec();
    const currentDate: any = moment();
    const pastDate: any = moment().day(-90);
    this.filterData.FromDate = pastDate._d;
    this.filterData.ToDate = currentDate._d;
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

  getTMList() {
    const datePipe = new DatePipe('en-US');
    this.isLoading = true;
    const self = this;
    this.adminService.AprovedTMListApi().subscribe(res => {
      const responseData: any = res;
      this.TMListData = responseData.Data;
      this.TMListData.map(function(obj) {
        obj.contactName = obj.FirstName + ' ' + obj.LastName;
        obj.CreatedDate = datePipe.transform(obj.CreatedDate, 'yyyy-MM-dd');  
      });
      this.dataSourceCopy = this.TMListData.map(x => Object.assign({}, x));
      this.dataSource = this.dataSourceCopy; 
      this.isLoading = false;
    }, err => {
      this.isLoading = false;
      console.log(err);
    });
  }

  filterToggle() {
    this.isFilter = !this.isFilter;
  }

  resetFilter() {
    this.getTMList();
    this.filterData = {};
    this.isFilter = false;
    this.searchText = undefined;
    const currentDate: any = moment();
    const pastDate: any = moment().day(-90);
    this.filterData.FromDate = pastDate._d;
    this.filterData.ToDate = currentDate._d;
    this.isFilterAction = false;
  }
  

  onFilter(filterValue) {
    this.isFilterAction = true;
    const datePipe = new DatePipe('en-US');
    const data = {
      FromDate: datePipe.transform(filterValue.FromDate, 'yyyy-MM-dd'),
      ToDate: datePipe.transform(filterValue.ToDate, 'yyyy-MM-dd'),
      CountryID: filterValue.CountryId,
      FreeText: this.searchText
    };
    this.appCommonService.searchListData(data).subscribe(res => {
      const responseData: any = res;
      this.dataSource =  responseData.Data;
      this.dataSource.map(function(obj) {
        obj.contactName = obj.FirstName + ' ' + obj.LastName;
        // obj.CreatedDate = datePipe.transform(obj.CreatedDate, 'yyyy-MM-dd'); 
      });   
      this.isFilter = false;
    }, err => {
      console.log(err);
    });
  }

  searchFilter(searchText: any) {
    if (searchText) {
      const filteredResultSet = Utils.searchRecords(this.dataSourceCopy, searchText);
      this.dataSource = filteredResultSet;
    } else {
      this.dataSource = this.dataSourceCopy;
    }
    this.isFilterAction = false;
  }
}
