import { Component, OnInit } from '@angular/core';
import { PokemonModel } from '../models/pokemon.model';
import { NgForm } from '@angular/forms';
import { PokemonesService } from '../../services/pokemones.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {

  pokemon = new PokemonModel();

  constructor( private pokeService: PokemonesService) { }

  ngOnInit() {
  }

  guardar( form: NgForm): void {

    if (form.invalid) {
      console.log('Formulario no válido');
      return;
    }

    if ( this.pokemon.idFirebase ) {
      this.pokeService.actualizarPokemon(this.pokemon)
        .subscribe(
          (resp) => {
            console.log(resp);
          },
          (error) => {
            console.log(error);
          });
    } else {
      this.pokeService.crearPokemon(this.pokemon)
        .subscribe(
          (resp) => {
            this.pokemon = resp;
          },
          (error) => {
            console.log(error);
          });
    }

  }

}
