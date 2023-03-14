import { Component } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { POKEMON_TYPES } from '../constants/pokemonTypesData';
@Component({
  selector: 'app-pokemon-filter',
  templateUrl: './pokemon-filter.component.html',
  styleUrls: ['./pokemon-filter.component.scss']
})
export class PokemonFilterComponent {
  pokemonTypes: string[] = POKEMON_TYPES
  selectedType: string = ''
  searchTerm: string = ''
  constructor(private pokemonService: PokemonService){}

  onSelectPokemonType() {
    this.pokemonService.filterPokemonsByType(this.selectedType)
  }

  onSearchPokemons() {
    this.pokemonService.filterPokemonsByName(this.searchTerm)
  }
}
