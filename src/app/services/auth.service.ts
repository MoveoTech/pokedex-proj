import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LOGIN_TOKEN } from 'src/environment/environment';
import { LOGIN_STORAGE_KEY } from 'src/environment/environment';
import { StorageService } from './storage.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private storageService: StorageService) {}

  loginStream: Subject<boolean> = new Subject();
  isLoggedIn: boolean = false;

  isAlreadyLogged() {
    const savedLogIn = this.storageService.loadFromStorage(LOGIN_STORAGE_KEY)
    if (savedLogIn) this.isLoggedIn = true;
    else this.isLoggedIn = false;

    this.loginStream.next(this.isLoggedIn);
  }

  login(email: string) {
    if (email === LOGIN_TOKEN) {
      this.storageService.saveToStorage(LOGIN_STORAGE_KEY, true)
      this.isLoggedIn = true;
    } else this.isLoggedIn = false;

    this.loginStream.next(this.isLoggedIn);
    return this.isLoggedIn
  }

  logout() {
    this.storageService.removeFromStorage(LOGIN_STORAGE_KEY)
    this.isLoggedIn = false;
    this.loginStream.next(this.isLoggedIn);
  }
}
