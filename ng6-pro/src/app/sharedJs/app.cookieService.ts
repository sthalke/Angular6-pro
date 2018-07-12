import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AppUrl } from '../sharedJs/app.constant';

@Injectable()
export class AppCookieService {
    constructor() {}

    setAuthData = function (key, value) {
        this.cookieService.set(key, value);
    };

    getAuthData = function (key) {
        return this.cookieService.get(key);
    };

    removeAuthData = function (key) {
        this.cookieService.delete(key);
    };
}
