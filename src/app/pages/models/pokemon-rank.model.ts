export class PokemonRankModel {
  idFirebase: string;

  identificador: string;
  nombre: string;

  baseHP: number;
  baseAttack: number;
  baseDefense: number;

  AtkIV: number;
  DefIV: number;
  StamIV: number;
  Level: number;

  CP: number;
  Attack: number;
  Defense: number;
  Stamina: number;
  ProductOfStats: number;
  
  PorcentajeIV: number;

  Rank: number;

  constructor(pokeR?) {
    if (pokeR) {
      this.identificador = pokeR.identificador;
      this.nombre = pokeR.nombre;
      this.baseHP = pokeR.baseHP;
      this.baseDefense = pokeR.baseDefense;
      this.AtkIV = pokeR.AtkIV;
      this.DefIV = pokeR.DefIV;
      this.StamIV = pokeR.StamIV;
      this.Level = pokeR.Level;
      this.CP = pokeR.CP;
      this.Attack = pokeR.Attack;
      this.Defense = pokeR.Defense;
      this.Stamina = pokeR.Stamina;
      this.ProductOfStats = pokeR.ProductOfStats;
      this.Rank = pokeR.Rank;
      this.PorcentajeIV = pokeR.PorcentajeIV;
    }
  }

  /**
   * si el actual es mayor devuelve 1 o mas
   * si el actual es menor devuelve -1 o menos
   * si el actual y el pasado son iguales da 0
   * @param pokeR
   */
  compare(pokeR): number {
    if (this.ProductOfStats > pokeR.ProductOfStats) {
      return -1;
    }

    if (this.ProductOfStats < pokeR.ProductOfStats) {
      return 1;
    }

    if (this.StamIV > pokeR.StamIV) {
      return -1;
    }

    if (this.StamIV < pokeR.StamIV) {
      return 1;
    }

    return 0;
  }

}
