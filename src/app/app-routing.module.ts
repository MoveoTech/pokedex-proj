import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonDetailsComponent } from './pokemons/pokemon-details/pokemon-details.component';
import { PokemonsComponent } from './pokemons/pokemons.component';

const routes: Routes = [];

const appRoutes: Routes = [
  { path: '', redirectTo: '/pokemons', pathMatch: 'full' },
  {
    path: 'pokemons',
    component: PokemonsComponent,
    children: [
      { path: ':id', component: PokemonDetailsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
