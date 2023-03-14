import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IPokemon } from 'src/app/models/pokemon.model';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-search-list',
  templateUrl: './pokemon-search-list.component.html',
  styleUrls: ['./pokemon-search-list.component.scss'],
})
export class PokemonSearchListComponent implements OnInit, OnDestroy {
  pokemonsToShow: IPokemon[] | null = null
  searchedPokemonSub!: Subscription
  constructor(private pokemonService: PokemonService) {}
  ngOnInit(): void {
    if (!this.pokemonService.pokemons.length) this.pokemonService.fetchPokemons()
    this.searchedPokemonSub = this.pokemonService.pokemonsSearch.subscribe(searchedPokemons => {
      this.pokemonsToShow = searchedPokemons
      
    })
  }

  ngOnDestroy(): void {
    this.searchedPokemonSub.unsubscribe()
  }
}
