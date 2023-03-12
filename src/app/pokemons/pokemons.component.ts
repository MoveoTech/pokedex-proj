import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss']
})
export class PokemonsComponent implements OnInit{
  private pokemons: any
  constructor(private pokemonService: PokemonService){}
  ngOnInit(): void {
    this.pokemonService.fetchPokemons()
  }
}
