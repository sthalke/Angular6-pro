import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

// Services
// import { CookieService } from 'ngx-cookie-service';
import { AppAuthService } from '../sharedJs/app.authService';
import { AppDashboardService } from './app.dashboardService';
import { LocalStorageService } from 'ngx-store';

// Add components
import { HeaderComponent } from '../header/header.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  title: string;
  name: string;
  userId: string;
  public rollId;

  constructor(
    private router: Router,
    private authService: AppAuthService,
    private dashService: AppDashboardService,
    private toastr: ToastrService,
   // private cookiesService: CookieService,
    private localStorageService: LocalStorageService,
  ) {}

  ngOnInit() {  
    // this.name  = JSON.parse(this.cookiesService.get('UserData')).FirstName;
    // this.userId  = JSON.parse(this.cookiesService.get('UserData')).UserId;
    // this.rollId = JSON.parse(this.cookiesService.get('UserData')).RoleID;

    this.name  = JSON.parse(this.localStorageService.get('UserData')).FirstName;
    this.userId  = JSON.parse(this.localStorageService.get('UserData')).UserId;
    this.rollId = JSON.parse(this.localStorageService.get('UserData')).RoleID;
    
    this.getDashboardData();
    if (this.rollId === '2') {
      this.router.navigate(['./admin/dashboard']);
    }
  }

  

  getDashboardData() {
    this.dashService.getDashboardData().subscribe(res => {
      this.title = res.toString();
    }, err => {
      console.log(err);
    });
  }

}
