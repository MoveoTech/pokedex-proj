import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { RouteParamsService } from 'src/app/services/route-params.service';
import { IPokemon } from '../../../models/pokemon.model';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit, OnDestroy{
  @Input() pokemons: IPokemon[] = []
  loginSub!: Subscription
  constructor(private routeParamsService: RouteParamsService, private authService: AuthService, private router: Router){}

  ngOnInit(): void {
    this.routeParamsService.pokemonTrackId.next(null)
    this.loginSub = this.authService.loginStream.subscribe(isLogged => {
      if(!isLogged) this.router.navigate(['/login'])
    })
    this.authService.isAlreadyLogged()
  }

  ngOnDestroy(): void {
    this.loginSub.unsubscribe()
  }

}
