import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RouteParamsService } from '../services/route-params.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentRouteId: number | null = null

  constructor(private routeParamsService: RouteParamsService){}

  ngOnInit(): void {
    this.routeParamsService.pokemonTrackId.subscribe(id => {
      this.currentRouteId = id
    })
  }
}
