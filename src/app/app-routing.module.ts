import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonDetailsComponent } from './components/pokemons/pokemon-details/pokemon-details.component';
import { PokemonsComponent } from './components/pokemons/pokemons.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/pokemons', pathMatch: 'full' },
  {
    path: 'pokemons',
    component: PokemonsComponent,
  },
  { path: 'pokemons/:id', component: PokemonDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
