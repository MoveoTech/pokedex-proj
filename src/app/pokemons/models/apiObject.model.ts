import { IPokemon } from "./pokemon.model";

export interface IApiObject {
    count: number,
    next: null | string,
    previous: null | string,
    results: []
}

export interface IPokemonObj {
    name: string,
    url: string
}