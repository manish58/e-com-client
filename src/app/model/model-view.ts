import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { Product } from './product.model';
import { User, UserSchema } from './user.model';

@Injectable({
    providedIn: 'root'
})
export class ModelView {
    constructor() { }

    public token: string;
    private cartItems = new ReplaySubject<any>(1);
    public cartItemData = [];
    public cartItemDetails = new ReplaySubject<Product[]>(1);
    public userData = new ReplaySubject<UserSchema>(1);
    public allProducts = new ReplaySubject<Product[]>(1);
    public allProductsDetails: Map<string, ReplaySubject<Product>> = new Map<string, ReplaySubject<Product>>();

    setCartItems() {
        let cart = JSON.parse(localStorage.getItem('cart'))
        this.cartItems.next(cart);
        this.cartItemData = cart;
    }
    getCartItems(): Observable<any> {
        return this.cartItems.asObservable();
    }

    isLoggedIn() {
        return localStorage.getItem('token') != null;
    }

    getToken() {
        return localStorage.getItem('token') || '';
    }

}