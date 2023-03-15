import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonListComponent } from './components/pokemons/pokemon-list/pokemon-list.component';
import { PokemonItemComponent } from './components/pokemons/pokemon-list/pokemon-item/pokemon-item.component';
import { PokemonDetailsComponent } from './components/pokemons/pokemon-details/pokemon-details.component';
import { PokemonsComponent } from './components/pokemons/pokemons.component';
import { HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { PokemonFilterComponent } from './components/pokemons/pokemon-filter/pokemon-filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { PokemonSearchListComponent } from './components/pokemons/pokemon-filter/pokemon-search-list/pokemon-search-list.component';
import { PokemonSearchItemComponent } from './components/pokemons/pokemon-filter/pokemon-search-list/pokemon-search-item/pokemon-search-item.component';
import { PokemonSearchLogComponent } from './components/pokemons/pokemon-search-log/pokemon-search-log.component';
import { MapComponent } from './components/map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonsComponent,
    PokemonListComponent,
    PokemonItemComponent,
    PokemonDetailsComponent,
    HeaderComponent,
    PokemonFilterComponent,
    LoginComponent,
    PokemonSearchListComponent,
    PokemonSearchItemComponent,
    PokemonSearchLogComponent,
    MapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
