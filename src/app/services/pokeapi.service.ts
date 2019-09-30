import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

  private _url = 'https://pokeapi.co/api/v2/';

  private cadenas = [];

  pokemones = [];

  constructor(
    private _http: HttpClient
  ) { }

  generarLista(): any {
    this.getCadenas().subscribe(
      (data) => {
        this.cadenas = data['results'];
        // console.log(this.cadenas);

        if (this.cadenas.length > -1) {

          this.cadenas.forEach(element => {
            this.getCadena(element.url).subscribe(
              (dataCadena) => {
                this.getAnalisis(dataCadena['chain']);
              },
              (erro) => {
                console.log(erro);
              }
              );
            });
        }
      },
      (error) => console.log(error)
    );
  }

  private getAnalisis(cadena: any): void {
    let poke = this.getNombre(cadena);

    let evo = this.getEvoluciones(cadena);

    this.pokemones.push(
       {poke, evo}
    );

    //  siguientes en la cadena
    cadena['evolves_to'].forEach(elem => {
      this.getAnalisis(elem);
    });
  }

  private getEvoluciones(cadena: any): any[] {
    let evos = [];

    if (cadena['evolves_to'].length !== 0) {
      cadena['evolves_to'].forEach(element => {
        evos.push(this.getNombre(element));
      });
    }

    return evos;
  }

  private getNombre(cadena: any): string {
    return cadena['species']['name'];
  }

  private getImagen(pokemon: string): Observable<any> {
    const url = this._url + 'pokemon/' + pokemon;
    return this._http.get(url);
  }

  private getCadenas(): Observable<any> {
    const url = this._url + 'evolution-chain?limit=419';
    return this._http.get(url);
  }

  private getCadena(u: string): Observable<any> {
    return this._http.get(u);
  }
}
