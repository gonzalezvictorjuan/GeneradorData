import { Component, OnInit } from '@angular/core';
import { PokemonesService } from 'app/services/pokemones.service';
import { PokemonModel } from '../models/pokemon.model';
import Swal from 'sweetalert2';
import { CalcularService } from '../../services/calcular.service';
import { GeneradorRankService } from '../../services/generador-rank.service';

@Component({
  selector: 'app-pokemones',
  templateUrl: './pokemones.component.html',
  styleUrls: ['./pokemones.component.scss']
})
export class PokemonesComponent implements OnInit {

  pokemones: PokemonModel[] = [];
  cargando = false;

  constructor(private pokeService: PokemonesService,
              private calcular: CalcularService,
              private generador: GeneradorRankService) { }

  ngOnInit() {
    this.cargando = true;

    this.pokeService.getPokemones().subscribe(
      (resp) => {
        this.pokemones = resp;
        this.cargando = false; },
      (err) => {
        console.log(err);
        this.cargando = false;
       }
    );

  }

  test(p: PokemonModel) {
    this.calcular.reset();
    this.calcular.definirBasesStats(p.baseAttack, p.baseDefense, p.baseHP);
    this.calcular.definirIVsStats(15, 15, 15);

    console.log(this.calcular.getProductOfStats());
  }

  generarRank(poke: PokemonModel): void {
    this.generador.generarRank(poke);
  }


  borrarPoke( poke: PokemonModel, index: number ) {
    Swal.fire({
      title: '¿Está Seguro?',
      text: `Esta Seguro que desea borrar a ${ poke.nombre }`,
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {
      if ( resp.value ) {
        this.pokeService.borrarPokemon(poke.idFirebase).subscribe(
          ( resp => {
            this.pokemones.splice(index, 1); // Borro del arreglo
          })
        );
      }
    });
  }

}
