import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { PokemonService } from 'src/app/services/pokemon.service';
import { RouteParamsService } from 'src/app/services/route-params.service';
import { IPokemon } from '../../../models/pokemon.model';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss'],
})
export class PokemonDetailsComponent implements OnInit, OnDestroy {
  pokemon: IPokemon | undefined;
  id: number | null = null;
  private loginSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pokemonService: PokemonService,
    private routeParamsService: RouteParamsService,
    private authService: AuthService
  ) {
    this.loginSub = Subscription.EMPTY;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.pokemonService
        .getPokemon(this.id)
        .subscribe((pokemonData: IPokemon) => {
          const pokemonToShow: IPokemon = {
            id: pokemonData.id,
            name: pokemonData.name,
            imageUrl: pokemonData.sprites?.other
              ? pokemonData.sprites.other['official-artwork'].front_default
              : '',
            weight: pokemonData.weight,
            height: pokemonData.height,
            types: pokemonData.types,
          };
          this.pokemon = pokemonToShow;
          this.routeParamsService.paramTrackSubject.next(true);
        });
    });

    this.loginSub = this.authService.loginStream.subscribe((isLogged) => {
      if (!isLogged) this.router.navigate(['/login']);
    });
    this.authService.isAlreadyLogged();
  }

  ngOnDestroy(): void {
    this.loginSub.unsubscribe()
  }
}
