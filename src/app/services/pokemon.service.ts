import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, Subject } from 'rxjs';
import { IApiObject, IPokemonObj } from '../models/apiObject.model';
import { IMiniPokemon, IPokemon } from '../models/pokemon.model';
import { StorageService } from './storage.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  pokemons: IPokemon[] = [];
  singlePokemon: IPokemon | null = null;
  pokemonsChanged: Subject<IPokemon[]> = new Subject();
  pokemonsSearch: Subject<IPokemon[] | null> = new Subject();
  pokemonsLogSubject: Subject<IMiniPokemon[]> = new Subject();
  recentSearchedPokemons: IMiniPokemon[] = this.loadPokemonSearchLog() || [];
  constructor(private http: HttpClient, private storageService: StorageService) {}

  fetchPokemons() {
    this.http
      .get<IApiObject>(`${environment.pokemonApiUrl}?offset=0&limit=100`)
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
              imageUrl: data.sprites?.other
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
    return this.http.get<IPokemon>(`${environment.pokemonApiUrl}${id}`);
  }

  searchPokemonsByName(term: string) {
    if (!term) {
      this.pokemonsSearch.next(null);
      return;
    }
    const loweredCaseTerm = term.toLowerCase();
    let filteredPokemons: IPokemon[] = [];

    filteredPokemons = this.pokemons.filter((pokemon) =>
      pokemon.name.includes(loweredCaseTerm)
    );
    this.pokemonsSearch.next(filteredPokemons);
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

  savePokemonToSearchLog(miniPokemon: IMiniPokemon) {
    if (this.recentSearchedPokemons.length >= 5) this.recentSearchedPokemons.shift();
    this.recentSearchedPokemons.push(miniPokemon);
    this.storageService.saveToStorage(environment.searchLogKey, this.recentSearchedPokemons)
    this.pokemonsLogSubject.next(this.recentSearchedPokemons)
  }

  loadPokemonSearchLog() {
    return this.storageService.loadFromStorage(environment.searchLogKey)
  }
}
