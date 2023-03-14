import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PokemonDetailsComponent } from './components/pokemons/pokemon-details/pokemon-details.component';
import { PokemonSearchLogComponent } from './components/pokemons/pokemon-search-log/pokemon-search-log.component';
import { PokemonsComponent } from './components/pokemons/pokemons.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'pokemons',
    component: PokemonsComponent,
  },
  {
    path: 'pokemons/search-log',
    component: PokemonSearchLogComponent,
  },
  { path: 'pokemons/:id', component: PokemonDetailsComponent },
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
