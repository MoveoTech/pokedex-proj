import { Component, Input, OnInit } from '@angular/core';
import { RouteParamsService } from 'src/app/services/route-params.service';
import { IPokemon } from '../models/pokemon.model';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit{
  @Input() pokemons: IPokemon[] = []

  constructor(private routeParamsService: RouteParamsService){}

  ngOnInit(): void {
    this.routeParamsService.pokemonTrackId.next(null)
  }
  
}
