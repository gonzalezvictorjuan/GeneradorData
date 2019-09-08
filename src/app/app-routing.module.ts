import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PokemonComponent } from './pages/pokemon/pokemon.component';
import { PokemonesComponent } from './pages/pokemones/pokemones.component';

const routes: Routes = [
  { path: 'pokemon/:id', component: PokemonComponent },
  { path: 'pokemones', component: PokemonesComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'pokemones' }

];



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
