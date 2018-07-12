import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
// import { CookieService } from 'ngx-cookie-service';
import { LocalStorageService } from 'ngx-store';

import { ApiUrl } from '../sharedJs/app.constant';

@Injectable()
export class AppAuthService {
    authToken: boolean;
    data: any;
    constructor(
        private http: HttpClient,
        // private cookiesService: CookieService,
        private localStorageService: LocalStorageService
    ) {
        // this.authToken = this.cookiesService.check('AuthData');
        if (this.localStorageService.get('AuthData')) {
            this.authToken = true;
        } else {
            this.authToken = false;
        }
    }
    // tslint:disable-next-line:no-trailing-whitespace
    loginApi(username: string, password: string) {
        const url = ApiUrl.login;
        const body = `username=${username}&password=${password}&grant_type=${'password'}`;
        return this.http.post(url, body);

    }

    signupApi(data: {}) {
        const url = ApiUrl.signUp;
        const body = data;
        return this.http.post(url, body);
    }

    logoutApi(data: {}) {
        const url = ApiUrl.logout;
        const body = data;
        return this.http.post(url, body);
    }

    forgotPasswordApi(data: {}) {
        const url = ApiUrl.forgotPassword;
        const body = data;
        return this.http.post(url, body);
    }

    changePasswordApi(data: {}) {
        const url = ApiUrl.changePasswordUrl;
        const body = data;
        return this.http.post(url, body);
    }

    checkStatusApi(data: {}) {
        const url = ApiUrl.checkStatusUrl;
        const body = data;
        return this.http.post(url, body);
    }

    isAuthenticated() {
        return this.authToken;
    }
}
