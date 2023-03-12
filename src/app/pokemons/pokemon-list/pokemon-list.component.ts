import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { IPokemon } from '../models/pokemon.model';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnChanges{
  @Input() pokemons: IPokemon[] = []

  ngOnChanges(): void {
    console.log(this.pokemons)
  }
  
}
