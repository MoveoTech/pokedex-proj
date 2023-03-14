import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RouteParamsService } from '../../services/route-params.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentRouteId: number | null = null
  isUserLogged: boolean = false
  constructor(private routeParamsService: RouteParamsService, private authService: AuthService){}

  ngOnInit(): void {
    this.routeParamsService.pokemonTrackId.subscribe(id => {
      this.currentRouteId = id
    })

    this.authService.loginStream.subscribe(isLogged => {
      this.isUserLogged = isLogged
    })
  }

  onLogout() {
    this.authService.logout()
  }
}
