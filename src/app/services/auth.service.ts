import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { StorageService } from './storage.service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private storageService: StorageService) {}

  loginStream: Subject<boolean> = new Subject();
  isLoggedIn: boolean = false;

  isAlreadyLogged() {
    const savedLogIn = this.storageService.loadFromStorage(environment.loginStorageKey)
    if (savedLogIn) this.isLoggedIn = true;
    else this.isLoggedIn = false;

    this.loginStream.next(this.isLoggedIn);
  }

  login(email: string) {
    if (email === environment.loginToken) {
      this.storageService.saveToStorage(environment.loginStorageKey, true)
      this.isLoggedIn = true;
    } else this.isLoggedIn = false;

    this.loginStream.next(this.isLoggedIn);
    return this.isLoggedIn
  }

  logout() {
    this.storageService.removeFromStorage(environment.loginStorageKey)
    this.isLoggedIn = false;
    this.loginStream.next(this.isLoggedIn);
  }
}
