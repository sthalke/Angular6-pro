import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';

// import { CookieService } from 'ngx-cookie-service';
import { AppAuthService } from '../sharedJs/app.authService';
import { LocalStorageService } from 'ngx-store';

@Injectable()
export class AuthGuard implements CanActivate {
  public rollId: number;
  
  constructor(
    private authService: AppAuthService,
    private router: Router,
   // private cookiesService: CookieService,
    private localStorageService: LocalStorageService ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // if (this.cookiesService.check('AuthData')) {
    if (this.localStorageService.get('AuthData')) {
      return true;
    } else {
      // this.router.navigate(['signin'], { queryParams: { returnUrl: state.url } });
      this.router.navigate(['signin']);
      return false;
    }
  }
}
