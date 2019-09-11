import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PokemonModel } from '../pages/models/pokemon.model';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonesService {

  private url = 'https://generatedatarankpvpgo.firebaseio.com';

  // Bases STATS
  private BaseAtk: number;
  private BaseDef: number;
  private BaseStam: number;

  // IVs STATS
  private AtkIV: number;
  private DefIV: number;
  private StamIV: number;

  // tslint:disable-next-line: variable-name
  constructor(private _httpClient: HttpClient ) { }

  borrarPokemon( idFirebase: string ) {
    return this._httpClient.delete(`${this.url}/pokemones/${idFirebase}.json`);
  }

  getPokemonById( idFirebase: string ){
    return this._httpClient.get(`${this.url}/pokemones/${idFirebase}.json`);
  }

  getPokemones() {
    return this._httpClient.get(`${this.url}/pokemones.json`).pipe(
      map( this._crearArrPokemones ), // Forma pipicucu de poner lo mismo
      delay(1500)
    );
  }

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

  crearPokemon( poke: PokemonModel) {
    const url = `${this.url}/pokemones.json`;

    return this._httpClient.post(url, poke)
              .pipe(
                map( (resp: any) => {
                  console.log(resp);
                  poke.idFirebase = resp.name;
                  return poke;
                })
              );
  }

  actualizarPokemon( poke: PokemonModel ) {

    const pokeTemp = {
      ...poke
    };

    delete pokeTemp.idFirebase;

    const url = `${this.url}/pokemones/${ poke.idFirebase }.json`;

    return this._httpClient.put(url, pokeTemp);
  }

  getLevel(): number {
    if (this._getM12() === 1500) {
      const aux = this._getO12() + 0.5;
      const aux2 = 40;

      if (aux >= aux2) {
        return aux2;
      } else {
        return aux;
      }

    } else {
      return this._getO12();
    }

    return -1;
  }

  _getO12(): number {
    return -1;
  }





  _getQ12(): number {
    return -1;
  }

  _getM12(): number {
    // tslint:disable-next-line: no-bitwise
    return ((15000 / this._getCPAux()) ^ 0.5);
  }



  _getCPAux(): number {
    // tslint:disable-next-line: no-bitwise
    return ((this.BaseAtk + this.AtkIV) * ((this.BaseDef + this.DefIV) ^ 0.5) * ((this.BaseStam + this.StamIV) ^ 0.5));
  }

  _buscar(): number {
    return 0;
  }






}
