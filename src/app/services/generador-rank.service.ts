import { Injectable } from '@angular/core';
import { CalcularService } from './calcular.service';
import { PokemonModel } from '../pages/models/pokemon.model';
import { PokemonRankModel } from '../pages/models/pokemon-rank.model';

@Injectable({
  providedIn: 'root'
})
export class GeneradorRankService {

  rank: PokemonRankModel[] = [];
  perfecto: number = 0;

  constructor(private calcular: CalcularService) { }

  generarRank(poke: PokemonModel) {
    this.generarAllRank(poke);
    
    this._ordenarRank();
    this._cortar();

    console.log(this.rank);
  }


  generarAllRank(poke: PokemonModel) {
    this.perfecto = 0;
    for (let A = 0; A < 16; A++) {
      for (let D = 0; D < 16; D++) {
        for (let S = 0; S < 16; S++) {
          this.rank.push(this._getR(poke, A, D, S));
        }
      }
    }
  }

  getPerfecto(poke: PokemonModel) {
    if (this.rank.length === 0) {
      this.generarAllRank(poke);
    }

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

    return pRank;
  }

  private _ordenarRank(): void {
    let aux = this.rank;


  }

  private _cortar(): void {
    // const limite = 1000;
    const limite = 1;
    // console.log(this.rank.length);

    this.rank = this.rank.slice(0, limite);
  }

}
