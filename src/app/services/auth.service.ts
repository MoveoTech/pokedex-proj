import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LOGIN_TOKEN } from 'src/environment/environment';
import { LOGIN_STORAGE_KEY } from 'src/environment/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  loginStream: Subject<boolean> = new Subject();
  isLoggedIn: boolean = false;

  isAlreadyLogged() {
    const savedLogIn = localStorage.getItem(LOGIN_STORAGE_KEY);
    if (savedLogIn === 'true') this.isLoggedIn = true;
    else this.isLoggedIn = false;

    this.loginStream.next(this.isLoggedIn);
  }

  login(email: string) {
    if (email === LOGIN_TOKEN) {
      localStorage.setItem(LOGIN_STORAGE_KEY, JSON.stringify(true));
      this.isLoggedIn = true;
    } else this.isLoggedIn = false;

    this.loginStream.next(this.isLoggedIn);
    return this.isLoggedIn
  }

  logout() {
    localStorage.removeItem(LOGIN_STORAGE_KEY);
    this.isLoggedIn = false;
    this.loginStream.next(this.isLoggedIn);
  }
}
