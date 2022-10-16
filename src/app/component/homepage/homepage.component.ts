import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ModelView } from 'src/app/model/model-view';
import { Product } from 'src/app/model/product.model';
import { ProjectInitliazationService } from 'src/app/services/project-initliazation.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(private projectService: ProjectInitliazationService,
    private mvl: ModelView,
    private router: Router) { }

  allProducts: Observable<Product[]>
  ngOnInit(): void {
    this.mvl.setCartItems();
    this.allProducts = this.mvl.allProducts.asObservable();
    this.projectService.getAllProducts()
  }
  openProductDetail(productDetail) {
    this.router.navigate(['product/view/' + productDetail._id], { queryParams: { id: productDetail._id } })
  }

}
