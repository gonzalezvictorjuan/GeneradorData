import { Component, OnInit } from '@angular/core';
import { PokemonesService } from 'app/services/pokemones.service';
import { PokemonModel } from '../models/pokemon.model';
import Swal from 'sweetalert2';
import { CalcularService } from '../../services/calcular.service';

@Component({
  selector: 'app-pokemones',
  templateUrl: './pokemones.component.html',
  styleUrls: ['./pokemones.component.scss']
})
export class PokemonesComponent implements OnInit {

  pokemones: PokemonModel[] = [];
  cargando = false;

  constructor(private pokeService: PokemonesService,
              private calcular: CalcularService) { }

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

  test() { console.log('test');  }

  calcularLvl(poke: PokemonModel): void {
    this.calcular.reset();

    this.calcular.definirBasesStats(poke.baseAttack, poke.baseDefense, poke.baseHP);
    
    this.calcular.definirIVsStats(0, 13, 14);
    
    this.calcular.getLevel();
    this.calcular.getCP();
    this.calcular.getAttack();
    this.calcular.getDefense();
    this.calcular.getStamina();
    this.calcular.getProductOfStats();
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
