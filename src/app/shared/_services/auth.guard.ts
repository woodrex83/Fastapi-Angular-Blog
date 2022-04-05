import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private helper = new JwtHelperService();
  constructor (
    private _authService: AuthService,
    private _router: Router,
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let token = this._authService.getToken();
    if (token) {
      if (this.helper.isTokenExpired(token)) {
        return false;
      }
      return true;
    }
    // 可以加點Popup什麽的
    this._router.navigate(['backend/login'])
    return false;
  }
  
  
}
