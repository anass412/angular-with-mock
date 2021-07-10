import { Injectable } from "@angular/core";
import jwt_decode from "jwt-decode";


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    setToken(token) {
        sessionStorage.setItem("token", token)
    }
    getToken() {
        return sessionStorage.getItem("token");
    }

    decodeToken() {
        return jwt_decode(this.getToken());
    }

    removeSesstion(){
        sessionStorage.removeItem("token");
    }
}

