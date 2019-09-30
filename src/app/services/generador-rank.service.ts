import { Injectable } from '@angular/core';
import { CalcularService } from './calcular.service';
import { PokemonModel } from '../pages/models/pokemon.model';
import { PokemonRankModel } from '../pages/models/pokemon-rank.model';

@Injectable({
  providedIn: 'root'
})
export class GeneradorRankService {

  private rank: PokemonRankModel[] = [];
  private perfecto: number = 0;
  private identificador = '';

  constructor(private calcular: CalcularService) { }

  generarRank(poke: PokemonModel) {
    console.log('Inicio del generador de Rank');
    this.generarAllRank(poke);

    this._ordenarRank();

    // this._cortar();

    this._asignarRank();

    // console.log(this.rank);

    this._saveAsProject();
    console.log('Fin del generador de Rank');
  }


  generarAllRank(poke: PokemonModel) {
    this.perfecto = 0;
    this.identificador = poke.identificador.replace(' ', '-');
    for (let A = 0; A < 16; A++) {
      for (let D = 0; D < 16; D++) {
        for (let S = 0; S < 16; S++) {
          this.rank.push(this._getR(poke, A, D, S));
        }
      }
    }

    this._eliminarRepetidos();
  }

  getPerfecto(poke: PokemonModel) {
    this.generarAllRank(poke);

    this.rank.forEach(element => {
      if (element.ProductOfStats >= this.perfecto) {
        this.perfecto = element.ProductOfStats;
      }
    });

    return this.perfecto;
  }

  private _getR(p: PokemonModel, AtkIV: number, DefIV: number, StamIV: number) {
    this.calcular.reset();
    this.calcular.definirBasesStats(p.baseAttack, p.baseDefense, p.baseHP);
    this.calcular.definirIVsStats(AtkIV, DefIV, StamIV);

    let pRank = new PokemonRankModel();

    pRank.identificador = p.identificador;
    pRank.nombre = p.nombre;
    pRank.baseHP = p.baseHP;
    pRank.baseAttack = p.baseAttack;
    pRank.baseDefense = p.baseDefense;
    pRank.AtkIV = AtkIV;
    pRank.DefIV = DefIV;
    pRank.StamIV = StamIV;
    pRank.Level = this.calcular.getLevel();
    pRank.CP = this.calcular.getCP();
    pRank.Attack = this.calcular.getAttack();
    pRank.Defense = this.calcular.getDefense();
    pRank.Stamina = this.calcular.getStamina();
    pRank.ProductOfStats = this.calcular.getProductOfStats();
    pRank.PorcentajeIV = this.calcular.getPorcentajeIV();
    pRank.Rank = 0;

    return pRank;
  }

  private _ordenarRank(): void {
    this.rank = this.rank.sort( this._compare );
  }

  private _compare(a: PokemonRankModel, b: PokemonRankModel) {
    return a.compare(b);
  }

  private _cortar(): void {
    // const limite = 1000;
    const limite = 10;
    this.rank = this.rank.slice(0, limite);
  }

  private _asignarRank(): void {
    for (let index = 0; index < this.rank.length; index++) {
      this.rank[index].Rank = index + 1;
    }
  }

  private _eliminarRepetidos(): void {
    // this.rank = this.rank.from(new Set(this.rank));

      let unique: PokemonRankModel[] = [];
      let pushear = true;

      this.rank.forEach(element => {
        if (unique.length === 0) {
          unique.push(element);
        } else {
          unique.forEach(element2 => {
            if ((element.AtkIV === element2.AtkIV) &&
                (element.DefIV === element2.DefIV) &&
                (element.StamIV === element2.StamIV)
            ) {
              pushear = false;
            }
          });

          if (pushear) {
            unique.push(element);
          }
          pushear = true;
        }
      });
      this.rank = unique;
  }

  private _saveAsProject() {
    // const aux = JSON.stringify(this.rank, null, '\t');
    // const aux = JSON.stringify(this.rank, null, 4);
    const aux = `export class ${this.identificador} { public static info =` + JSON.stringify(this.rank, null, 4) + ';}';
    // `${this.url}/pokemones.json`

    // const aux = JSON.stringify(this.rank);
    // console.log(aux);
    this._writeContents(aux, this.identificador + '.txt', 'text/plain');
  }

  private _writeContents(content, fileName, contentType) {
    let a = document.createElement('a');
    let file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }

}
