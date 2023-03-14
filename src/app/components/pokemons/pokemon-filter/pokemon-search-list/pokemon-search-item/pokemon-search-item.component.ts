import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPokemon } from 'src/app/models/pokemon.model';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-search-item',
  templateUrl: './pokemon-search-item.component.html',
  styleUrls: ['./pokemon-search-item.component.scss']
})
export class PokemonSearchItemComponent {
  @Input() miniPokemon!: IPokemon
  constructor(private router: Router, private pokemonService: PokemonService) {}

  onSelectPokemonFromSearch() {
    this.pokemonService.savePokemonToSearchLog(this.miniPokemon.id)
    this.router.navigate(['/pokemons', this.miniPokemon.id]);
  }
}
