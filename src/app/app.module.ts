import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { SignUpComponent } from './component/sign-up/sign-up.component'
import { LoginComponent } from './component/login/login.component';
import { FooterComponent } from './component/footer/footer.component';
import { HomepageComponent } from './component/homepage/homepage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { ProductDetailComponent } from './component/product-detail/product-detail.component';
import { CartDetailsComponent } from './component/cart-details/cart-details.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { OrdersComponent } from './component/orders/orders.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignUpComponent,
    LoginComponent,
    FooterComponent,
    HomepageComponent,
    PageNotFoundComponent,
    ProductDetailComponent,
    CartDetailsComponent,
    OrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
