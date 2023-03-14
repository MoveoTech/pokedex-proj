import { Component } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { POKEMON_TYPES } from '../constants/pokemonTypesData';
@Component({
  selector: 'app-pokemon-filter',
  templateUrl: './pokemon-filter.component.html',
  styleUrls: ['./pokemon-filter.component.scss']
})
export class PokemonFilterComponent {
  searchTerm: string = ''
  pokemonTypes: string[] = POKEMON_TYPES
  selectedType: string = ''
  constructor(private pokemonService: PokemonService){}


  onSearchPokemons() {
    this.pokemonService.filterPokemonsByName(this.searchTerm)
  }

  onSelectPokemonType() {
    this.pokemonService.filterPokemonsByType(this.selectedType)
  }
}
