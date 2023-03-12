import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { IApiObject } from '../pokemons/models/apiObject.model';
import { IPokemon } from '../pokemons/models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  pokemons: IPokemon[] = []
  constructor(private http: HttpClient) { }

  fetchPokemons() {
    this.http.get<IApiObject>('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100/').subscribe((resData) => {
      console.log(resData.results)
    })
  }
}
