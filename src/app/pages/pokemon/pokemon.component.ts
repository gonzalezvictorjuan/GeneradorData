import { Component, OnInit } from '@angular/core';
import { PokemonModel } from '../models/pokemon.model';
import { NgForm } from '@angular/forms';
import { PokemonesService } from '../../services/pokemones.service';

import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {

  pokemon = new PokemonModel();

  constructor(  private pokeService: PokemonesService,
                private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id !== 'nuevo') {
      this.pokeService.getPokemonById(id)
            .subscribe(
              (resp: PokemonModel) => {
                this.pokemon = resp;
                this.pokemon.idFirebase = id;
              }
            );
    }
  }

  guardar( form: NgForm): void {

    if (form.invalid) { // Formulario no válido
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando Información',
      type: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    if ( this.pokemon.idFirebase ) {
      peticion = this.pokeService.actualizarPokemon(this.pokemon);
    } else {
      peticion = this.pokeService.crearPokemon(this.pokemon);
    }

    peticion.subscribe(resp => {
      Swal.fire({
        title: this.pokemon.nombre,
        text: 'Se Actualizó Correctamente',
        type: 'success',
      });
    });

  }

}
