import { Injectable } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { environment } from 'src/environments/environment';
import {} from 'google.maps';
import { destinationLoc } from '../constants/mapConstants';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private map!: google.maps.Map;

  constructor() {}

  async initMap(mapEl: HTMLElement) {
    const loader = new Loader({
      apiKey: environment.mapApiKey,
      version: "weekly",
      libraries: ["places", "marker"]
    });

    return loader.load().then(() => {
      this.map = new google.maps.Map(mapEl, {
        center: destinationLoc,
        zoom: 15,
      });
    });
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

}
