import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AppAuthService } from '../sharedJs/app.authService';
import { LocalStorageService } from 'ngx-store';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  public rollId;
  
  constructor(
    private authService: AppAuthService,
    private router: Router,  
    private localStorageService: LocalStorageService ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {   
    if (JSON.parse(this.localStorageService.get('UserData'))) {
        if (JSON.parse(this.localStorageService.get('UserData')).RoleID === '2') {
            return true;
        } else {
            this.router.navigate(['/signin'], { queryParams: { returnUrl: state.url } });
            return false;
        }   
    } else {
        this.router.navigate(['/signin'], { queryParams: { returnUrl: state.url } });
        return false;
    } 
  }
}
