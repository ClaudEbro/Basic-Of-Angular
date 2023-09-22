import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import jwtDecode from "jwt-decode";
import {AppStateService} from "./app-state.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient, private appState: AppStateService) { }

  async login(username:string, password:string){
    let user:any = await firstValueFrom(this.http.get("http://localhost:8089/users/"+username)); // Just to demonstrate because I should use a post method to send user's information.
    if(password == atob(user.password)){ // I retrieve the password decoded and compare it to one that entered by user.
        let decodedJwt:any = jwtDecode(user.token);
        this.appState.setAuthState({
          isAuthenticated : true,
          username : decodedJwt.sub,
          roles : decodedJwt.roles,
          toke : user.token
        });
        return Promise.resolve(true);
    }
    else {
        return Promise.reject("Bad credentials");
    }
  }
}
