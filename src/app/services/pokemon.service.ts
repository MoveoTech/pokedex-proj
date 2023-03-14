import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, Subject } from 'rxjs';
import { IApiObject, IPokemonObj } from '../models/apiObject.model';
import { IPokemon } from '../models/pokemon.model';
import { POKEMON_API_URL } from 'src/environment/environment';
@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  pokemons: IPokemon[] = [];
  singlePokemon: IPokemon | null = null;
  urls = [];
  pokemonsChanged: Subject<IPokemon[]> = new Subject();
  constructor(private http: HttpClient) {}

  fetchPokemons() {
    this.http
      .get<IApiObject>(POKEMON_API_URL + '?offset=0&limit=100')
      .subscribe((res) => {
        const pokemons = res.results;
        const pokemonDataRequests: Observable<any>[] = pokemons.map(
          (pokemon: IPokemonObj) => {
            return this.http.get(pokemon.url);
          }
        );

        forkJoin(pokemonDataRequests).subscribe((pokemonData: IPokemon[]) => {
          const pokemonArray = pokemonData.map((data: IPokemon) => {
            return {
              id: data.id,
              name: data.name,
              image: data.sprites?.other
                ? data.sprites.other['official-artwork'].front_default
                : '',
              height: data.height,
              weight: data.weight,
              types: data.types,
            };
          });
          this.pokemons = pokemonArray;
          this.pokemonsChanged.next(pokemonArray);
        });
      });
  }

  getPokemon(id: number): Observable<IPokemon> {
    return this.http.get<IPokemon>(POKEMON_API_URL + id);
  }

  filterPokemonsByName(term: string) {
    const loweredCaseTerm = term.toLowerCase();
    let filteredPokemons: IPokemon[] = [];

    filteredPokemons = this.pokemons.filter((pokemon) =>
      pokemon.name.includes(loweredCaseTerm)
    );
    this.pokemonsChanged.next(filteredPokemons);
  }

  filterPokemonsByType(typeName: string) {
    if (!typeName) {
      this.pokemonsChanged.next(this.pokemons);
      return;
    }
    const loweredTypeName = typeName.toLowerCase();
    let filteredPokemons: IPokemon[] = [];
    this.pokemons.map((pokemon) => {
      pokemon.types?.map((pokemonType) => {
        if (pokemonType.type.name === loweredTypeName)
          filteredPokemons.push(pokemon);
      });
    });
    this.pokemonsChanged.next(filteredPokemons);
  }
}
