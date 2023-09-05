import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {normalizeExtraEntryPoints} from "@angular-devkit/build-angular/src/tools/webpack/utils/helpers";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Observable} from "rxjs";


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public products : Array<Product> = []; // Or products$! : Observable<Array<Product>>;
  public keyword : string = "";


  constructor(private productService : ProductService) {
  }

  ngOnInit() {

    this.getProduct();
  }

  getProduct(){
    this.productService.getProducts()
      .subscribe({
        next : data => {
          this.products = data
        },
        error: err => {
          console.log(err)
        }
      })

     //this.products$=this.productService.getProducts();

  }


  handleCheckProduct(product: Product) {
    this.productService.checkProduct(product).subscribe( {
          next : updatedProduct => {
            product.checked = !product.checked;
          }
      })
  }

  handelDeleteProduct(product: Product) {
    if(confirm("Do you really want to delete it ?"))
    this.productService.deleteProduct(product)
      .subscribe( {
        next : data => {
          //this.getProduct();
          this.products = this.products.filter(p=>p.id!=product.id);
        }
      });
  }

  searchProducts() {
    this.productService.searchProducts(this.keyword).subscribe({
      next : value=> {
        this.products = value;
      }
    })
  }
}
