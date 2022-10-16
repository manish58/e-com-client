import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartDetailsComponent } from './component/cart-details/cart-details.component';
import { HomepageComponent } from './component/homepage/homepage.component';
import { LoginComponent } from './component/login/login.component';
import { OrdersComponent } from './component/orders/orders.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { ProductDetailComponent } from './component/product-detail/product-detail.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'product/view/:id', component: ProductDetailComponent },
  { path: 'cartdetails', component: CartDetailsComponent, canActivate: [AuthGuard] },
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
