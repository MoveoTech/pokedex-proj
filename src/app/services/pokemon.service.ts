import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, Subject } from 'rxjs';
import { IApiObject, IPokemonObj } from '../pokemons/models/apiObject.model';
import { IPokemon } from '../pokemons/models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  pokemons: IPokemon[] = []
  singlePokemon: IPokemon | null = null
  urls = []
  pokemonsChanged: Subject<IPokemon[]> = new Subject()
  constructor(private http: HttpClient) { }

  fetchPokemons() {
    this.http.get<IApiObject>('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100/').subscribe(res => {
      const pokemons = res.results;
  const pokemonDataRequests: Observable<any>[] = pokemons.map((pokemon: IPokemonObj) => {
    return this.http.get(pokemon.url);
  });
  
  forkJoin(pokemonDataRequests).subscribe((pokemonData: IPokemon[]) => {
    console.log('pok data',pokemonData);
    
    const pokemonArray = pokemonData.map((data: IPokemon) => {
      return {
        id: data.id,
        name: data.name,
        image: data.sprites?.other? data.sprites.other['official-artwork'].front_default : '',
        weight: data.weight,
        height: data.height,
      };
    });
    this.pokemons = pokemonArray
    this.pokemonsChanged.next(pokemonArray)
    })
  })
}

  getPokemon(id: number): Observable<IPokemon> {
      return this.http.get<IPokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`)
  }

}
