import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { RouteParamsService } from 'src/app/services/route-params.service';
import {  NgForm } from '@angular/forms'
import { Router } from '@angular/router';
import { AUTH_ERROR_MSG } from '../pokemons/constants/errorMessages';
import { Subscription } from 'rxjs';
import { FICTIONAL_PARAM_ID } from '../pokemons/constants/fictionalParamId';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy{

  isLoggedIn: boolean = false;
  isShowError: boolean = false
  errorMsg: string = AUTH_ERROR_MSG
  loginSub!: Subscription

  constructor(private authService: AuthService, private rpService: RouteParamsService, private router:Router) {}
  ngOnInit(): void{
    this.rpService.pokemonTrackId.next(FICTIONAL_PARAM_ID)
    this.loginSub = this.authService.loginStream.subscribe(isLogged => {
      this.isLoggedIn = isLogged
      if(this.isLoggedIn) this.router.navigate(['/pokemons'])
    })
    this.authService.isAlreadyLogged()

  }
  onLogin(form: NgForm) {
    const inputEmail = form.value.email
    const isLoginSuccess = this.authService.login(inputEmail)
    if (!isLoginSuccess) this.isShowError = true
    else this.isShowError = false
  }

  ngOnDestroy(): void {
    this.loginSub.unsubscribe()
  }
}
