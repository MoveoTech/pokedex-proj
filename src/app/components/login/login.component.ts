import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { RouteParamsService } from 'src/app/services/route-params.service';
import {  NgForm } from '@angular/forms'
import { Router } from '@angular/router';
import { AUTH_ERROR_MSG } from '../pokemons/constants/errorMessages';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit{

  isLoggedIn: boolean = false;
  isShowError: boolean = false
  errorMsg: string = AUTH_ERROR_MSG
  
  constructor(private authService: AuthService, private rpService: RouteParamsService, private router:Router) {}
  ngOnInit(): void{
    this.rpService.pokemonTrackId.next(999)
    this.authService.loginStream.subscribe(isLogged => {
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
}
