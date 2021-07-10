import { Injectable, Injector } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
// import {  } from 'rxjs/Rx';
import { environment } from 'src/environments/environment';
import { InterceptorServiceService } from './interceptor-service.service';
import { tap, catchError } from "rxjs/operators";
import { Observable, of } from 'rxjs';

const login = require('../app/mokeModel/login.json');

const urls = [
    {
        url: `${environment.apiUrl}login`,
        json: login
    },
];
@Injectable()
export class HttpMockRequestInterceptor implements HttpInterceptor {

    constructor(
        private injector: Injector,
        private interceptorServiceService: InterceptorServiceService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        for (const element of urls) {
            if (request.url === element.url) {
                if (element.url.indexOf('login') > -1) {
                    let response = element.json[0];
                    var obj = element.json.filter(obj => obj.userName == request.body.userName && obj.password == request.body.password);
                    if (obj.length > 0) {
                        return of(new HttpResponse({ status: 200, body: response.successResponse }));
                    } else {
                        return of(new HttpResponse({ status: 403, body: response.failedResponse }));
                    }
                }
                let returnData = this.interceptorServiceService.giveRequestAndAuth(request);
                if (returnData.handelAuth) {
                    return next.handle(returnData.auth).pipe(
                        tap(evt => { }),
                        catchError((err: any) => {
                            if (err instanceof HttpErrorResponse) {
                                alert(err.error.msg_ar);
                            }
                            return of(err);
                        }));
                } else {
                    return next.handle(returnData.request).pipe(
                        tap(evt => { }),
                        catchError((err: any) => {
                            if (err instanceof HttpErrorResponse) {
                                alert(err.error.msg_ar);
                            }
                            return of(err);
                        }));
                }
            }
        }
    }
}
