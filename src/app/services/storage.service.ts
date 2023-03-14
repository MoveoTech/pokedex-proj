import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  loadFromStorage(key: string) {
    const dataFromStorage = localStorage.getItem(key)
    if (dataFromStorage) return JSON.parse(dataFromStorage)
    else return null

  }

  saveToStorage(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data))
  }

  removeFromStorage(key: string) {
    localStorage.removeItem(key)
  }
}
