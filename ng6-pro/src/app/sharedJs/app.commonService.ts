import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { ApiUrl } from '../sharedJs/app.constant';

@Injectable()
export class AppCommonService {
    constructor(
        private http: HttpClient,
        private cookiesService: CookieService ) {
    }
    
    getCountryList() {
        const url = ApiUrl.countryList;
        return this.http.get(url);

    }
    
    searchListData(data: any) {
        console.log(data);
        const url = ApiUrl.searchData;
        const body = data;
        return this.http.post(url, body);
    }
}
