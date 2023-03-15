import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { mapStyles } from 'src/app/constants/mapStyle';
import { ILocation } from 'src/app/models/mapOptions.model';
import { AuthService } from 'src/app/services/auth.service';
import { MapService } from 'src/app/services/map.service';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnDestroy {
  @ViewChild('mapEl', { static: true }) mapEl!: ElementRef;
  @ViewChild('acInput', { static: true }) inputEl!: ElementRef;
  private map!: google.maps.Map;
  private autocompletion!: google.maps.places.Autocomplete;
  private loginSub: Subscription;
  private directionsService!: google.maps.DirectionsService
  private directionsRequest!: google.maps.DirectionsRequest
  private directionsRenderer!: google.maps.DirectionsRenderer
  acInputTxt: string = '';

  constructor(
    private mapService: MapService,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginSub = Subscription.EMPTY;
  }

  async ngOnInit() {
    const mapEl = this.mapEl.nativeElement;
    let loc: ILocation = {lat: 32.0624536, lng: 34.771485}
    const mapOptions = {
      center: loc,
      zoom: 14,
      styles: mapStyles,
    };
    await this.mapService.initMap(mapEl, mapOptions);
    this.map = this.mapService.getMap();
    this.mapService.addMarker(this.map, loc);
    this.initAutoCompletion();
    this.directionsService = new google.maps.DirectionsService()
    this.directionsRenderer = new google.maps.DirectionsRenderer()
    this.directionsRenderer.setMap(this.map);

    this.loginSub = this.authService.loginStream.subscribe((isLogged) => {
      if (!isLogged) this.router.navigate(['/login']);
    });
    this.authService.isAlreadyLogged();
  }

  initAutoCompletion() {
    const options = {
      fields: ['address_components', 'geometry', 'icon', 'name'],
      strictBounds: false,
      types: ['establishment'],
    };
    this.autocompletion = new google.maps.places.Autocomplete(
      this.inputEl.nativeElement,
      options
    );
    this.autocompletion.addListener('place_changed', () => {
      const locObj = this.autocompletion.getPlace().geometry?.location;
      let locToMark!: ILocation;

      if (locObj) {
        locToMark = {
          lat: locObj?.lat(),
          lng: locObj?.lng(),
        };
      }

      this.map.setCenter(locToMark);
      this.mapService.addMarker(this.map, locToMark);
    });
  }

  onGoToWork() {
    this.directionsRequest = {
      origin: {lat: 32.0624536, lng: 34.771485},
      destination: {lat: 32.0497089, lng: 34.7616289},
      travelMode: google.maps.TravelMode.DRIVING
    }
    this.directionsService.route(this.directionsRequest, (result, status) => {
      if(status === 'OK' ) {
        this.directionsRenderer.setDirections(result);
      }
    })
  }

  ngOnDestroy(): void {
    this.loginSub.unsubscribe()
  }
}
