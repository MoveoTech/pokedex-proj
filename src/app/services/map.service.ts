import { Injectable } from '@angular/core';
import '@googlemaps/js-api-loader';
import { environment } from 'src/environments/environment';
import { IMapOptions } from '../models/mapOptions.model';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private map!: google.maps.Map;

  constructor() {}

  // Connecting to google api before initializing the map, return
  async initMap(mapEl: HTMLElement, mapOptions: IMapOptions) {
    await this._connectGoogleApi();
    this.map = new google.maps.Map(mapEl, mapOptions);
  }

  getMap(): google.maps.Map {
    return this.map;
  }

  addMarker(map: google.maps.Map, loc: any) {
    new google.maps.Marker({
      position: loc,
      map: map
    })
  }

  // Private method connecting to google maps service
  _connectGoogleApi() {
    if (window.google) return Promise.resolve();
    const API_KEY = environment.mapApiKey;
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
      elGoogleApi.onload = resolve;
      elGoogleApi.onerror = () => reject('Google script failed to load');
    });
  }
}
