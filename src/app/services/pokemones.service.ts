import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PokemonModel } from '../pages/models/pokemon.model';
import { map, delay } from 'rxjs/operators';
import { GeneradorRankService } from './generador-rank.service';

@Injectable({
  providedIn: 'root'
})
export class PokemonesService {

  private url = 'https://generatedatarankpvpgo.firebaseio.com';

  constructor(private _httpClient: HttpClient,
              private generador: GeneradorRankService ) { }

  /////////////////////////////////////////////////
  // Metodos Publicos
  /////////////////////////////////////////////////

  /**
   * Borra un pokemon mediante el id de firebase
   * @param {string} idFirebase
   */
  borrarPokemon( idFirebase: string ) {
    return this._httpClient.delete(`${this.url}/pokemones/${idFirebase}.json`);
  }

  /**
   * Devuelve un pokemon mediante el id de firebase
   * @param idFirebase
   */
  getPokemonById( idFirebase: string ) {
    return this._httpClient.get(`${this.url}/pokemones/${idFirebase}.json`);
  }

  /**
   * Devuelve todos los pokemones
   */
  getPokemones() {
    return this._httpClient.get(`${this.url}/pokemones.json`).pipe(
      map( this._crearArrPokemones ), // Forma pipicucu de poner lo mismo
      delay(1500)
    );
  }

  /**
   * Crea un pokemon en firebase
   * @param {PokemonModel} poke
   */
  crearPokemon(poke: PokemonModel) {
    const url = `${this.url}/pokemones.json`;

    poke.greatHighProduct = this.generador.getPerfecto(poke);
    
    return this._httpClient.post(url, poke)
      .pipe(
        map((resp: any) => {
          console.log(resp);
          poke.idFirebase = resp.name;
          return poke;
        })
      );
  }

  /**
   * Actualiza un pokemon en especifico
   * @param {PokemonModel} poke
   */
  actualizarPokemon(poke: PokemonModel) {
    poke.greatHighProduct = this.generador.getPerfecto(poke);

    const pokeTemp = {
      ...poke
    };

    delete pokeTemp.idFirebase;

    const url = `${this.url}/pokemones/${poke.idFirebase}.json`;

    return this._httpClient.put(url, pokeTemp);
  }

  /////////////////////////////////////////////////
  // Metodos Privados
  /////////////////////////////////////////////////

  /**
   * Carpinteria del response de firebase para obtener un arreglo de pokemones
   * @param pokemonesObj
   */
  private _crearArrPokemones(pokemonesObj: object) {
    const pokes: PokemonModel[] = [];

    if (pokemonesObj === null) { return []; }

    Object.keys( pokemonesObj ).forEach( key => {
      const poke: PokemonModel = pokemonesObj[key];
      poke.idFirebase = key;

      pokes.push(poke);
    });

    return pokes;
  }

}
