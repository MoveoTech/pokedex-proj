import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import {
  destinationLoc,
  homeLoc,
  mapStyles,
} from 'src/app/constants/mapConstants';
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
  @ViewChild('styleSelectorControl', { static: true })
  styleSelectorControlEl!: ElementRef;
  @ViewChild('styleSelector', { static: true }) styleSelectorEl!: ElementRef;
  @ViewChild('travelModeControl', { static: true })
  travelModeControlEl!: ElementRef;
  @ViewChild('travelModeSelector', { static: true })
  travelModeSelectorEl!: ElementRef;

  private map!: google.maps.Map;
  private autocompletion!: google.maps.places.Autocomplete;
  private destory$ = new Subject<void>();
  private directionsService!: google.maps.DirectionsService;
  private directionsRequest!: google.maps.DirectionsRequest;
  private directionsRenderer!: google.maps.DirectionsRenderer;
  isGoingToWork: boolean = false;
  acInputTxt: string = '';

  constructor(
    private mapService: MapService,
    private authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit() {
    const mapEl = this.mapEl.nativeElement;
    let loc: ILocation = { lat: 32.0624536, lng: 34.771485 };

    this.mapService.initMap(mapEl).then(() => {
      this.map = this.mapService.getMap();
      this.mapService.addMarker(this.map, loc);
      this.initAutoCompletion();
      this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(
        this.styleSelectorControlEl.nativeElement
      );
      this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(
        this.travelModeControlEl.nativeElement
      );
      this.map.setOptions({
        styles: mapStyles[this.styleSelectorEl.nativeElement.value],
      });

      this.directionsService = new google.maps.DirectionsService();
      this.directionsRenderer = new google.maps.DirectionsRenderer();
      this.directionsRenderer.setMap(this.map);
    });

    this.authService.loginStream
      .pipe(takeUntil(this.destory$))
      .subscribe((isLogged) => {
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

  onChangeMapStyle() {
    this.map.setOptions({
      styles: mapStyles[this.styleSelectorEl.nativeElement.value],
    });
  }
  onChangeTravelMode() {
    this.goToWork();
  }

  onToggleWorkDirection() {
    this.isGoingToWork = !this.isGoingToWork;
    this.goToWork();
  }

  goToWork() {
    // set the directions request
    const selectedTravelMode: keyof typeof google.maps.TravelMode =
      this.travelModeSelectorEl.nativeElement.value;
    this.directionsRequest = {
      origin: homeLoc,
      destination: destinationLoc,
      travelMode: google.maps.TravelMode[selectedTravelMode],
    };

    // send the directions route with a callback to then toggle it on the map
    this.directionsService.route(this.directionsRequest, (result, status) => {
      if (status === 'OK' && this.isGoingToWork) {
        this.directionsRenderer.setDirections(result);
      } else {
        this.directionsRenderer.set('directions', null);
      }
    });
  }

  ngOnDestroy(): void {
    this.destory$.next();
    this.destory$.complete();
  }
}
