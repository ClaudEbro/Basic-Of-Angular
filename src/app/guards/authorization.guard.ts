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
export class AuthorizationGuard {

  constructor(private appState: AppStateService, private route: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.appState.authState.roles.includes(route.data['requiredRoles'])) {
      return true;
    } else {
      this.route.navigateByUrl("/admin/notAuthorized");
      return  false;
    }
  }
}
