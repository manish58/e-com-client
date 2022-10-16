import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModelView } from 'src/app/model/model-view';
import { Product } from 'src/app/model/product.model';
import { ProjectInitliazationService } from 'src/app/services/project-initliazation.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  productId: string;
  productData: Product
  cartItems: string[] = [];
  token: string;
  disableBtn: boolean = false;
  constructor(private route: ActivatedRoute, private projectService: ProjectInitliazationService,
    private mvl: ModelView,
    private router: Router) {
    this.route.queryParams.subscribe((res) => {
      this.productId = res.id
    })
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('token')
    this.mvl.getCartItems().subscribe((res) => {
      this.cartItems = res;
    })
    this.projectService.getProductdetails(this.productId).subscribe((res: Product) => {
      this.productData = res;
    })
  }
  addProductToCart() {
    if (localStorage.getItem('token')) {
      this.disableBtn = true;
      this.projectService.addToCart(this.productId).subscribe((res) => {
        this.projectService.getCartItems().subscribe((res: any) => {
          localStorage.setItem("cart", JSON.stringify(res))
          this.mvl.setCartItems();
        });
      })
    }
    else {
      this.router.navigate(['./login'])
    }
  }
  goToHomePage() {
    this.router.navigate([''])
  }

}
