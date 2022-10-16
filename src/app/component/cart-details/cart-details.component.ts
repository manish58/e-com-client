import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ModelView } from 'src/app/model/model-view';
import { Product } from 'src/app/model/product.model';
import { UserSchema } from 'src/app/model/user.model';
import { ProjectInitliazationService } from 'src/app/services/project-initliazation.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss']
})
export class CartDetailsComponent implements OnInit {

  constructor(private projectService: ProjectInitliazationService, private mvl: ModelView,
    private router: Router) { }
  cartItem = []
  cartProducts: Product[] = []
  totalPrice: number = 0;
  cartInfo: Observable<Product[]>;
  cart = new Map<string, Product>()
  ngOnInit(): void {
    this.cartItem = this.mvl.cartItemData
    this.projectService.getCartDetails(this.cartItem);
    this.cartInfo = this.mvl.cartItemDetails.asObservable();
    this.mvl.cartItemDetails.subscribe((res) => {
      this.totalPrice = 0
      res.map((data: Product) => {
        this.cart.set(data._id, data);
        this.totalPrice += data.price
      })
      this.totalPrice = parseFloat(this.totalPrice.toFixed(2))
    })

  }
  deleteItem(product_id) {
    this.projectService.removeItemFromCart(product_id).subscribe((res) => {
      this.projectService.getCartItems().subscribe((res: any) => {
        localStorage.setItem("cart", JSON.stringify(res))
        this.mvl.setCartItems();
        this.projectService.getCartDetails(this.mvl.cartItemData);
      });
    })
  }
  orderPlaced() {
    let cartItem = []
    this.cart.forEach((value, key) => {
      cartItem.push(value)
    });
    let params = {
      order_status: "pending",
      amount: this.totalPrice,
      cart: cartItem
    }
    this.projectService.placeOrder(params).subscribe((res) => {
      console.log("order placed successfully");
      this.projectService.emptyCart();
      localStorage.setItem('cart', JSON.stringify([]));
      this.mvl.setCartItems();
      this.router.navigate(['./orders'])
    })
  }

}
