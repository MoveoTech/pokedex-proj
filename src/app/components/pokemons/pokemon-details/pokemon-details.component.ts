import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';
import { RouteParamsService } from 'src/app/services/route-params.service';
import { IPokemon } from '../../../models/pokemon.model';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent implements OnInit {
  pokemon: IPokemon | undefined;
  id: number | null = null;


  constructor(private route: ActivatedRoute, private pokemonService: PokemonService, private routeParamsService: RouteParamsService){}

    ngOnInit(): void {      
      this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
         this.pokemonService.getPokemon(this.id).subscribe((pokemonData: IPokemon) => {
          const pokemonToShow: IPokemon = {
            id: pokemonData.id,
            name: pokemonData.name,
            imageUrl: pokemonData.sprites?.other? pokemonData.sprites.other['official-artwork'].front_default : '',
            weight: pokemonData.weight,
            height: pokemonData.height,
            types: pokemonData.types
          }
          this.pokemon = pokemonToShow
          this.routeParamsService.paramTrackSubject.next(true)
        })
        }
      );
    }

}
