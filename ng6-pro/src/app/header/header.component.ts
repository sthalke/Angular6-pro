import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

// Services
// import { CookieService } from 'ngx-cookie-service';
import { AppAuthService } from '../sharedJs/app.authService';
import { LocalStorageService } from 'ngx-store';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public userData: any;
  public userId: string;
  public isOpen: boolean;
  public pathRoll: string;
  public fullName: string;
  public lastLogin: string;
  public rollId;

  constructor(
    private router: Router,
    private authService: AppAuthService,
    private toastr: ToastrService,
    // private cookiesService: CookieService,
    private _el: ElementRef,
    private localStorageService: LocalStorageService
  ) {
    this.isOpen = false;
  }

  ngOnInit() {
    this.userData = JSON.parse(this.localStorageService.get('UserData'));
    this.userId  = this.userData.UserId;
    this.rollId = this.userData.RoleID;
    this.lastLogin = this.userData.LastLogin;
    this.fullName = this.userData.FirstName + ' ' + this.userData.LastName;
  }

  navigation(path) {
    if (path === 'home') {
        this.pathRoll = this.rollId === '1' ? './dashboard' : 'admin/dashboard';
        this.router.navigate([this.pathRoll]);
    } else {
      this.router.navigate([path]);
    }
  }

  logout() {
    const d = new Date();    
    this.localStorageService.clear('decorators');
    this.localStorageService.clear('prefix');
    this.authService.logoutApi(this.userId).subscribe(res => {
      // this.cookiesService.delete('AuthData');
      // this.cookiesService.delete('UserData');
      this.toastr.success('Logout Successfully');
    }, err => {
      this.toastr.error(err.error.Message);
    });          
    this.router.navigate(['signin']);
  }

  responsiveToggle() {
      this.isOpen = !this.isOpen;      
      if (this.isOpen) {
        this._el.nativeElement.querySelector('.navbar-collapse').classList.add('show');
        this._el.nativeElement.querySelector('.navbar-toggler').classList.remove('collapsed');
      } else {
        this._el.nativeElement.querySelector('.navbar-collapse').classList.remove('show');
        this._el.nativeElement.querySelector('.navbar-toggler').classList.add('collapsed');
      }               
  }
  
  deleteCookie(name, value, expires) {
    let cookie = name + '=' + value + ';';  
    if (expires) {
      if (expires instanceof Date) {
        // If it isn't a valid date
        if (isNaN(expires.getTime())) {
          expires = new Date();
        }
      } else {
        expires = new Date(new Date().getTime());
      }
      cookie += 'expires=' + expires.toGMTString() + ';';
    }
    document.cookie = cookie;
  }
}
