import { Component } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { CookieService } from 'ngx-cookie-service';
import { LocalStorageService } from 'ngx-store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  public isLogin: boolean;
  constructor(
    private cookiesService: CookieService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {
      // window.onbeforeunload = function() {
      //   localStorage.removeItem('ngx_AuthData');
      //   localStorage.removeItem('ngx_UserData');
      //   return '';
      // };

      if (this.localStorageService.get('AuthData')) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
      router.events.subscribe((val) => {
        if (this.localStorageService.get('AuthData') !== null) {
          this.isLogin = true;
        } else {
          this.isLogin = false;
        }
      });      
    }

    
}
