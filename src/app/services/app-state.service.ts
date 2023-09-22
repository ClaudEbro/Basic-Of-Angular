import { Injectable } from '@angular/core';
import {Product} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  public productsState: any = {

    products : [],
    keyword : "",
    totalPages : 0,
    pageSize : 3,
    currentPage: 1,
    totalProducts : 0,
    status : " ",
    errorMessage : " "
  }

  public authState : any = {
    isAuthenticated : false,
    username : undefined,
    password : undefined,
    roles : undefined,
    token : undefined

  }
  constructor() { }

  //To manage product state
  public setProductState(state: any): void {
    this.productsState = {...this.productsState, ...state} //To retrieve all attributes of productState and add them.
  }

  public  setAuthState(state : any) : void {
    this.authState = {...this.authState, ...state}
  }
}
