import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../model/product.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  constructor(private http:HttpClient) { }

  public searchProducts(keyword: string="", page: number, size: number){
    return this.http.get(`http://localhost:8089/products?name_like=${keyword}&_page=${page}&_limit=${size}`, {observe : "response"});
  }

  public checkProduct(product: Product): Observable<Product>{
    return this.http.patch<Product>(`http://localhost:8089/products/${product.id}`,
      {checked:!product.checked});
  }

  public deleteProduct(product: Product){
    return this.http.delete<Product>(`http://localhost:8089/products/${product.id}`);

  }

  saveProduct(product : Product): Observable<Product> {
    return this.http.post<Product>(`http://localhost:8089/products/`,product);
  }

  getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(`http://localhost:8089/products/${productId}`);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`http://localhost:8089/products/${product.id}`,product);
  }
}
