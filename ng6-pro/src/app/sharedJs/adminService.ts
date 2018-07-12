import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { ApiUrl } from '../sharedJs/app.constant';

@Injectable()
export class AdminService {
    authToken: boolean;
    data: any;
    constructor(
        private http: HttpClient,
        private cookiesService: CookieService ) {}

    TMListApi() {
        const url = ApiUrl.getTMList;
        return this.http.get(url);
    }

    AprovedTMListApi() {
        const url = ApiUrl.getAllTMList;
        return this.http.get(url);
    }

    TMDetailApi(data: any) {
        const url = ApiUrl.getTMListDetail;
        const body = data;
        return this.http.post(url, body);
    }

    TMAprovedAndDecline(data: any) {
        const url = ApiUrl.aprovedTM;
        const body = data;
        return this.http.post(url, body);
    }

    TMVerify(data: any) {
        const url = ApiUrl.verifyTM;
        const body = data;
        return this.http.post(url, body);
    }

    approvalContent() {
        const url = ApiUrl.approvalContent;
        return this.http.get(url);
    }

}
