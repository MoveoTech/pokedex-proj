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
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PokemonsComponent,
    PokemonListComponent,
    PokemonItemComponent,
    PokemonDetailsComponent,
    HeaderComponent,
    PokemonFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
