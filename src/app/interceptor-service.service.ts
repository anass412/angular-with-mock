import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class InterceptorServiceService {
    screen = '';
    classname = '';
    userType = '';
    constructor() { }
    giveRequestAndAuth(req) {
        let data = {
            auth: null,
            request: null,
            handelAuth: false
        }
        data.auth = req.clone({
            headers: new HttpHeaders({
                'Authorization': `Bearer `,
                'Accept-Language': 'en'
            })
        });
        data.handelAuth = true;
        return data;
    }
}
