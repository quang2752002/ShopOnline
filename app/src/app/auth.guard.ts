import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from './service/cookie/cookie-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private cookieService: CookieService, private router: Router) {}

  canActivate(): boolean {
    // Check if the token exists in cookies
    if (!this.cookieService.getCookie('token')) {
      // Redirect to the login page if no token is found
      this.router.navigate(['']);
      return false;
    }
    return true; // Allow access if token exists
  }
}
