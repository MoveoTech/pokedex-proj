import { Component } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-filter',
  templateUrl: './pokemon-filter.component.html',
  styleUrls: ['./pokemon-filter.component.scss']
})
export class PokemonFilterComponent {
  searchTerm: string = ''

  constructor(private pokemonService: PokemonService){}

  onSearchPokemons() {
    this.pokemonService.filterPokemons(this.searchTerm)
  }
}
