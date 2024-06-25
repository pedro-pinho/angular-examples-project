import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router) {
    if (isPlatformBrowser(this.platformId)) {
      const storedEmail = localStorage.getItem('email');
      const storedPassword = localStorage.getItem('password');
      if (storedEmail && storedPassword) {
        this.isLoggedIn = true;
      }
    }
  }
  login(email: string, password: string): boolean {
    if (email !== '' && password !== '') {
      this.isLoggedIn = true;
      //Store values on local storage
      localStorage.setItem('email', email);
      // encrypt password before storing
      const encryptedPassword = btoa(password);
      localStorage.setItem('password', encryptedPassword);
      return true;
    }
    return false;
  }
  logout(): void {
    this.isLoggedIn = false;
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    this.router.navigate(['/login']);
  }
  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}
