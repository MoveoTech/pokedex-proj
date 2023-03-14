import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { RouteParamsService } from '../../services/route-params.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy{
  currentRouteId: number | null = null
  isUserLogged: boolean = false
  loginSub!: Subscription
  trackIdSub!: Subscription

  constructor(private routeParamsService: RouteParamsService, private authService: AuthService, private router: Router){}

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
    this.router.navigate(['login'])
  }

  ngOnDestroy(): void {
    this.loginSub.unsubscribe()
    this.trackIdSub.unsubscribe()
  }
}
