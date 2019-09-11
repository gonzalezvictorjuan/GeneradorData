import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PokemonComponent } from './pages/pokemon/pokemon.component';
import { PokemonesComponent } from './pages/pokemones/pokemones.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PokemonesService } from './services/pokemones.service';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MockService } from './services/mock.service';

@NgModule({
  declarations: [
    AppComponent,
    PokemonComponent,
    PokemonesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(MockService, {
      delay: 0,
      passThruUnknownUrl: true
    }),
  ],
  providers: [
    PokemonesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
