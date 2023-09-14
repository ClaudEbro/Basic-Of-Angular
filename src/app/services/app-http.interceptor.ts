import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {finalize, Observable} from 'rxjs';
import {AppStateService} from "./app-state.service";
import {LoadingService} from "./loading.service";

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(private appState : AppStateService,
              private loadingService : LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    //First managing state
    /*this.appState.setProductState({
      status : "LOADING"
    })*/

    //Other solution to manage state with a spinner
    this.loadingService.showLoadingSpinner();

    let req = request.clone({
      headers : request.headers.set("Authorization", "Bearer JWT")
    }); //To create a copy of request

    return next.handle(req).pipe(
      finalize(()=>{
        /*this.appState.setProductState({
          status : " "
        })*/

        this.loadingService.hideLoadingSpinner();
      })
    );
  }
}
