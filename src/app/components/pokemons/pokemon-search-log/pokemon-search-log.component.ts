import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IMiniPokemon } from 'src/app/models/pokemon.model';
import { AuthService } from 'src/app/services/auth.service';
import { PokemonService } from 'src/app/services/pokemon.service';
import { RouteParamsService } from 'src/app/services/route-params.service';

@Component({
  selector: 'app-pokemon-search-log',
  templateUrl: './pokemon-search-log.component.html',
  styleUrls: ['./pokemon-search-log.component.scss']
})
export class PokemonSearchLogComponent implements OnInit, OnDestroy {
  recentPokemons: IMiniPokemon[] = []
  searchTerm: string = ''
  loginSub!: Subscription
  recentPokemonsSub!: Subscription

  constructor(private pokemonService: PokemonService, private routeParamsService: RouteParamsService, private authService: AuthService, private router: Router){}

  ngOnInit(): void {
    this.recentPokemons = this.pokemonService.loadPokemonSearchLog()
    this.recentPokemonsSub = this.pokemonService.pokemonsLogSubject.subscribe(recentPokemons => {
     this.recentPokemons = recentPokemons
    })
    this.loginSub = this.authService.loginStream.subscribe(isLogged => {
      if (!isLogged) this.router.navigate(['login'])
    })
    this.authService.isAlreadyLogged()

    this.routeParamsService.paramTrackSubject.next(true)
    
  }

  onSearchPokemons() {
    this.pokemonService.searchPokemonsByName(this.searchTerm)
  }

  ngOnDestroy(): void {
    this.loginSub.unsubscribe()
  }
}
