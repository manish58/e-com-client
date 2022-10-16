import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ModelView } from '../model/model-view';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectInitliazationService {

  apiURL: string = "http://localhost:8800/api/v1/"
  constructor(private http: HttpClient, private mvl: ModelView) { }

  getAllProducts() {
    return this.http.get(this.apiURL + "product").subscribe((res: Product[]) => {
      this.mvl.allProducts.next(res);
      res.map((data) => {
        let temp = new ReplaySubject<Product>();
        temp.next(data);
        this.mvl.allProductsDetails.set(data._id, temp);
      })
    })
  }
  getProductdetails(id) {
    return this.http.get(this.apiURL + "product/" + id);
  }
  registerUser(formValue) {
    return this.http.post(this.apiURL + "users/signup", formValue)
  }
  loginUser(formValue) {
    return this.http.post(this.apiURL + "users/login", formValue)
  }
  getLoginUserDetails() {

  }
  addToCart(productId) {
    return this.http.patch(this.apiURL + 'users/' + productId + '/addProduct', {})
  }
  removeItemFromCart(productId) {
    return this.http.patch(this.apiURL + 'users/' + productId + '/removeProduct', {})
  }
  getCartDetails(productArray) {
    let params = {
      "product": productArray
    }
    return this.http.post(this.apiURL + "product/cartproducts", params).subscribe((res: Product[]) => {
      this.mvl.cartItemDetails.next(res);
    })
  }
  getCartItems() {
    return this.http.get(this.apiURL + "users/getCartItems")
  }

  placeOrder(params) {
    return this.http.post(this.apiURL + 'order/', params)
  }
  emptyCart() {
    this.http.patch(this.apiURL + 'users/emptyCart', {}).subscribe((res) => {
      this.getCartItems();
    })
  }

  getOrdersDetail() {
    return this.http.get(this.apiURL + 'order/viewOrder');
  }
}
