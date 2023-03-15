import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { RouteParamsService } from '../../services/route-params.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy{
  isUserLogged: boolean = false
  loginSub!: Subscription
  constructor(private routeParamsService: RouteParamsService, private authService: AuthService, private router: Router){}

  ngOnInit(): void {


    this.loginSub = this.authService.loginStream.subscribe(isLogged => {
      this.isUserLogged = isLogged
    })
  }

  onLogout() {
    this.authService.logout()
    this.router.navigate(['login'])
  }

  ngOnDestroy(): void {
    this.loginSub.unsubscribe()
  }
}
