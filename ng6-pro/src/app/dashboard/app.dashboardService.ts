import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ApiUrl } from '../sharedJs/app.constant';

@Injectable()
export class AppDashboardService {
    data: any;
    constructor(
        private http: HttpClient,
        private cookiesService: CookieService ) {
    }
    // tslint:disable-next-line:no-trailing-whitespace
    getDashboardData() {
        const url = ApiUrl.dashboard;
        return this.http.get(url);
    }
}
