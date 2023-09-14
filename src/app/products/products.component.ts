import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {normalizeExtraEntryPoints} from "@angular-devkit/build-angular/src/tools/webpack/utils/helpers";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {AppStateService} from "../services/app-state.service";


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private productService : ProductService,
              private router: Router,
              public appState: AppStateService) {
  }

  ngOnInit() {

    this.searchProducts();
  }

  searchProducts(){

   /* this.appState.setProductState({
      status : "LOADING"
    });*/

    this.productService.searchProducts(
      this.appState.productsState.keyword,
      this.appState.productsState.currentPage,
      this.appState.productsState.pageSize)
      .subscribe({
        next : (resp) => {
          let products = resp.body as Product[];
          let totalProducts: number = parseInt(resp.headers.get('x-total-count')!);

          //this.appState.productsState.totalProducts = totalProducts;

          let totalPages = Math.floor(totalProducts/this.appState.productsState.pageSize);

          if(totalProducts % this.appState.productsState.pageSize !=0){
            ++totalPages;
          }

          this.appState.setProductState({
            products : products,
            totalProducts : totalProducts,
            totalPages: totalPages,
            status : "LOADED"
          })
        },
        error: err => {
          this.appState.setProductState({
            status : "ERROR",
            errorMessage : err
          })
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
          //this.appState.productsState.products = this.appState.productsState.products.filter((p:any)=>p.id!=product.id);

          this.searchProducts(); //To have total Product in the dashboard after deleting a product without loading the page.
        }
      });
  }


  handleGoToPage(page: number) {
    this.appState.productsState.currentPage = page;
    this.searchProducts() ;
  }

  handelEditProduct(product: Product) {
    this.router.navigateByUrl(`/editProduct/${product.id}`)
  }
}
