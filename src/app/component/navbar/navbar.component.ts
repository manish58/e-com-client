import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ModelView } from 'src/app/model/model-view';
import { User, UserSchema } from 'src/app/model/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private mvl: ModelView, private router: Router,
    private cdRef: ChangeDetectorRef) { }
  userData: Observable<UserSchema>
  cartItem: Observable<string>
  ngOnInit(): void {
    this.mvl.setCartItems();
    this.mvl.getCartItems().subscribe((res) => {
      this.cartItem = res
    })
    this.userData = this.mvl.userData.asObservable()
  }

  ngAfterViewChecked() {
    // this.userData = JSON.parse(localStorage.getItem("user"));
    // this.cdRef.detectChanges();
  }
  goToCartDetails() {
    this.router.navigate(['/cartdetails'])
  }
  viewOrder() {
    this.router.navigate(['/orders'])
  }
  logout() {
    localStorage.clear();
    this.mvl.setCartItems();
    this.mvl.userData.next()
    this.router.navigate(['']);
  }

}
