import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @ViewChild('mapEl', {static: true}) mapEl!: ElementRef
  @ViewChild('acInput', {static: true}) inputEl!: ElementRef
  private map!: google.maps.Map
  private autocompletion!: google.maps.places.Autocomplete
  acInputTxt: string = ''
  constructor(private mapService: MapService){}

  async ngOnInit() {
    const el = this.mapEl.nativeElement
    const mapOptions = {
      center: { lat: 32.0624536, lng: 34.771485 },
      zoom: 15,
    }

    await this.mapService.initMap(el, mapOptions)
    this.map = this.mapService.getMap()
    this.mapService.addMarker(this.map,  { lat: 32.0624536, lng: 34.771485 })
    this.initAutoCompletion()
  }

  initAutoCompletion() {
    const options = {
      fields: ["address_components", "geometry", "icon", "name"],
      strictBounds: false,
      types: ["establishment"],
    };
    this.autocompletion = new google.maps.places.Autocomplete(this.inputEl.nativeElement, options)
    this.autocompletion.addListener('place_changed', () => {
      const locObj = this.autocompletion.getPlace().geometry?.location
      const locToMark = {
        lat: locObj?.lat(),
        lng: locObj?.lng()
      }      
      
      this.mapService.addMarker(this.map, locToMark)
    })
    
  }


}
