import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ModelView } from '../model/model-view';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private mvl: ModelView, private router: Router) { }
  canActivate() {
    if (this.mvl.isLoggedIn())
      return true;
    else {
      this.router.navigate(['./login'])
      return false;
    }
  }


}
