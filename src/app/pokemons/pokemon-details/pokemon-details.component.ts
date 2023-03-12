import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';
import { IPokemon } from '../models/pokemon.model';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent implements OnInit {
  pokemon: IPokemon | undefined;
  id: number | undefined;


  constructor(private route: ActivatedRoute, private pokemonService: PokemonService){}

    ngOnInit(): void {      
      // if (this.pokemonService.pokemons.length === 0) this.pokemonService.fetchPokemons()
      this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.pokemon = this.pokemonService.getPokemon(this.id);
        }
      );
    }

}
