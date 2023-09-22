import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivateFn, Router,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import {Observable} from "rxjs";
import {AppStateService} from "../services/app-state.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn : 'root'
})
export class AuthenticationGuard{

  constructor(private appState : AppStateService, private route : Router) {
  }
  canActivate(
    route : ActivatedRouteSnapshot,
    state : RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(this.appState.authState.isAuthenticated==true){
      return true;
    }
    else {
      return this.route.navigateByUrl("/login");
      return false;
    }
  }

}
