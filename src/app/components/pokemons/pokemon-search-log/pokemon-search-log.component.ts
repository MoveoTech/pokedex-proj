import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IMiniPokemon } from 'src/app/models/pokemon.model';
import { AuthService } from 'src/app/services/auth.service';
import { PokemonService } from 'src/app/services/pokemon.service';
import { RouteParamsService } from 'src/app/services/route-params.service';
import { FICTIONAL_PARAM_ID } from '../constants/fictionalParamId';

@Component({
  selector: 'app-pokemon-search-log',
  templateUrl: './pokemon-search-log.component.html',
  styleUrls: ['./pokemon-search-log.component.scss']
})
export class PokemonSearchLogComponent implements OnInit, OnDestroy {
  recentPokemons: IMiniPokemon[] = []
  loginSub!: Subscription
  constructor(private pokemonService: PokemonService, private routeParamsService: RouteParamsService, private authService: AuthService, private router: Router){}

  ngOnInit(): void {

    this.loginSub = this.authService.loginStream.subscribe(isLogged => {
      if (!isLogged) this.router.navigate(['login'])
    })
    this.authService.isAlreadyLogged()

    const recentPokemonIds = this.pokemonService.loadPokemonSearchLog()
    this.routeParamsService.pokemonTrackId.next(FICTIONAL_PARAM_ID)
    recentPokemonIds.map((pokemonId: number) => {
      this.pokemonService.getPokemon(pokemonId).subscribe(pokemon => {
        this.recentPokemons.push({name: pokemon.name, imageUrl: pokemon.sprites?.front_default || ''})
      })
    })

  }

  ngOnDestroy(): void {
    this.loginSub.unsubscribe()
  }
}
