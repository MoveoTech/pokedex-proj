import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Subject } from 'rxjs';
import { IApiObject, IPokemonObj } from '../pokemons/models/apiObject.model';
import { IPokemon } from '../pokemons/models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  pokemons: IPokemon[] = []
  urls = []
  pokemonsChanged: Subject<IPokemon[]> = new Subject()
  constructor(private http: HttpClient) { }

  fetchPokemons() {
    this.http.get<IApiObject>('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100/').subscribe(res => {
      const pokemons = res.results;
  const pokemonDataRequests = pokemons.map((pokemon: IPokemonObj) => {
    return this.http.get(pokemon.url);
  });
  forkJoin(pokemonDataRequests).subscribe((pokemonData: any) => {
    console.log('pok data',pokemonData);
    
    const pokemonArray = pokemonData.map((data: any, index: number) => {
      return {
        id: index,
        name: data.name,
        image: data.sprites.other['official-artwork'].front_default,
        weight: data.weight,
        height: data.height,
        stats: data.stats,
        abilities: data.abilities
      };
    });
    this.pokemons = pokemonArray
    this.pokemonsChanged.next(pokemonArray)
    })
  })
}

  getPokemon(id: number): IPokemon {

    return this.pokemons.filter(pokemon => pokemon.id === id)[0]
  }

}
