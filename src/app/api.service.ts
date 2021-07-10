import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";


@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private http: HttpClient) { }
    login(obj): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}login`, { ...obj })
    }

    logout(): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}logout` , {})
    }
}