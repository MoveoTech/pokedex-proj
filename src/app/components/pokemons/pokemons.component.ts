import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PokemonService } from '../../services/pokemon.service';
import { IPokemonObj } from '../../models/apiObject.model';
import { IPokemon } from '../../models/pokemon.model';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss']
})
export class PokemonsComponent implements OnInit, OnDestroy{
  pokemons: IPokemon[] = []
  Subscription: Subscription
  constructor(private pokemonService: PokemonService){
    this.Subscription = Subscription.EMPTY
  }
  
  ngOnInit(): void {
    this.pokemonService.fetchPokemons()
    this.Subscription = this.pokemonService.pokemonsChanged.subscribe((pokemons: IPokemon[]) => {
      this.pokemons = pokemons
    })
  }

  ngOnDestroy(): void {
    this.Subscription.unsubscribe()
  }
}
