import { Component, OnInit } from '@angular/core';
import { IPokemon } from 'src/app/models/pokemon.model';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-search-list',
  templateUrl: './pokemon-search-list.component.html',
  styleUrls: ['./pokemon-search-list.component.scss'],
})
export class PokemonSearchListComponent implements OnInit {
  pokemonsToShow: IPokemon[] | null = null
  constructor(private pokemonService: PokemonService) {}
  ngOnInit(): void {
    this.pokemonService.pokemonsSearch.subscribe(searchedPokemons => {
      this.pokemonsToShow = searchedPokemons
      
    })
  }
}
