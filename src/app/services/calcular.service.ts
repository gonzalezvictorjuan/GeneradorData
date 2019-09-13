import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CPMModel } from '../pages/models/cpm.model';
import Big from 'big.js';


@Injectable({
  providedIn: 'root'
})
export class CalcularService {

  // Bases STATS
  private BaseAtk: number = 0;
  private BaseDef: number = 0;
  private BaseStam: number = 0;

  // IVs STATS
  private AtkIV: number = 0;
  private DefIV: number = 0;
  private StamIV: number = 0;

  // Data Calculada
  private Level: number = 0;
  private CP: number = 0;
  private Attack: number = 0;
  private Defense: number = 0;
  private Stamina: number = 0;
  private PorcentajeIV: number = 0;
  private ProductOfStats: number = 0;

  private CPMultiplier: CPMModel[] = [];

  constructor(private _http: HttpClient) { }

  public reset(): void {
    this.BaseAtk = 0;
    this.BaseDef = 0;
    this.BaseStam = 0;
    this.AtkIV = 0;
    this.DefIV = 0;
    this.StamIV = 0;
    this.Level = 0;
    this.CP = 0;
    this.Attack = 0;
    this.Defense = 0;
    this.Stamina = 0;
    this.ProductOfStats = 0;
    this.PorcentajeIV = 0;
  }

  /**
   * @param {number} BaseAtk
   * @param {number} BaseDef
   * @param {number} BaseStam
   */
  public definirBasesStats(BaseAtk: number, BaseDef: number, BaseStam: number): void {
    this.BaseAtk = Number(BaseAtk);
    this.BaseDef = Number(BaseDef);
    this.BaseStam = Number(BaseStam);
  }

  /**
   * @param {number} AtkIV
   * @param {number} DefIV
   * @param {number} StamIV
   */
  public definirIVsStats(AtkIV, DefIV, StamIV): void {
    this.AtkIV = AtkIV;
    this.DefIV = DefIV;
    this.StamIV = StamIV;
  }

  public getLevel() { // =SI(Q12=1500,// MIN(O12+0.5,40),// O12)
    if ((this.BaseAtk === 0) || (this.BaseDef === 0) || (this.BaseStam === 0)) {
      // // console.log('error, definir Stats Bases');
      return -1;
    }

    if (this._getQ12() === 1500) {
      this.Level = this._getMIN();
      return this._getMIN();

    } else {
      this.Level = this._getO12();
      return this._getO12();
    }
  }

  public getPorcentajeIV() {
    const perfecto = 15 + 15 + 15;
    const actual = this.AtkIV + this.DefIV + this.StamIV;

    const value = ((actual * 100) / perfecto);
    this.PorcentajeIV = value;
    return value;
  }

  public getCP() { // =REDONDEAR.MENOS((($B$8+B23)*(($C$8+C23)^0.5)*(($D$8+D23)^0.5)*BUSCARV(F13,CPM!A:B,2,FALSO)^2)/10)
    const CPBase = this._getCPBase();
    const F12 = (this.Level) ? this.Level : this.getLevel();
    const cpmvalue = this._getCPMValue(F12);
    const value = Math.floor((CPBase * Math.pow(cpmvalue, 2)) / 10);

    this.CP = value;
    // console.log('CP=' + this.CP);
    return value;
  }

  public getAttack() { // =($B$8 + B12) * $N12
    const ataque = this.BaseAtk + this.AtkIV;
    const N12 = this._getN12();
    const value = (ataque * N12);

    this.Attack = value;
    // console.log('Ataque=' + value);
    return value;
  }

  public getDefense() {
    const Defense = this.BaseDef + this.DefIV;
    const N12 = this._getN12();
    const value = (Defense * N12);

    this.Defense = value;
    // console.log('Defensa=' + value);
    return value;
  }

  public getStamina() {
    const Stamina = this.BaseStam + this.StamIV;
    const N12 = this._getN12();
    const value = Math.floor(Stamina * N12);

    this.Stamina = value;
    // console.log('Stamina=' + value);
    return value;
  }

  public getProductOfStats() { // =H12*I12*J12
    const H12 = (this.Attack) ? this.Attack : this.getAttack();
    const I12 = (this.Defense) ? this.Defense : this.getDefense();
    const J12 = (this.Stamina) ? this.Stamina : this.getStamina();
    const value = (H12 * I12 * J12);

    this.ProductOfStats = value;
    // console.log('ProductOfStats=' + value);
    return value;
  }

  /////////////////////////////////////////////////
  // Metodos Privados
  /////////////////////////////////////////////////

  private _getN12() { // =BUSCARV(F12, CPM!A: B, 2, FALSO)
    const level = (this.Level) ? this.Level : this.getLevel();
    return this._getCPMValue(level);
  }

  private _getCPBase() { // (($B$8 + B12) * (($C$8 + C12) ^ 0.5) * (($D$8 + D12) ^ 0.5)))
    const Atk = this.BaseAtk + this.AtkIV;
    const Def = Math.sqrt(this.BaseDef + this.DefIV);
    const Stam = Math.sqrt(this.BaseStam + this.StamIV);
    const value = (Atk * Def * Stam);

    // // console.log('_getCPBase= ' + value);
    return value;
  }

  private _getMIN() { // MIN(O12+0.5,40)
    const aux = this._getO12() + 0.5;
    const aux2 = (40);
    if (aux >= aux2) { // MIN
      return aux2;
    } else {
      return aux;
    }
  }

  private _getO12() { // =BUSCARV(M12, CPM!B: C, 2, VERDADERO)
    const M12 = (this._getM12());
    const value = (this._getCPMLevel(M12));

    // // console.log('O12=' + value);
    return value;
  }

  private _getM12() { // =(15000/(($B$8+B12)*(($C$8+C12)^0.5)*(($D$8+D12)^0.5)))^0.5
    const CPBase = this._getCPBase();
    const value = Math.sqrt(15000 / CPBase);

    // // console.log('M12=' + value);
    return value;
  }

  private _getCPMValue(lvl): number {
    this._defineCPM();
    let value = -1;

    this.CPMultiplier.forEach(element => {
      if (lvl >= element.lvl) {
        value = element.value;
      }
    });

    if (value === -1) {
      value = this.CPMultiplier[this.CPMultiplier.length - 1].value;
    }

    return value;
  }

  private _getCPMLevel(value): number {
    this._defineCPM();
    let lvl = -1;

    this.CPMultiplier.forEach(element => {
      if (value >= element.value) {
        lvl = element.lvl;
      }
    });

    if (lvl === -1) {
      lvl = this.CPMultiplier[this.CPMultiplier.length - 1].lvl;
    }

    return lvl;
  }

  private _defineCPM(): void {
    if (this.CPMultiplier.length !== 0) {
      return;
    }

    this._http.get('api/cpm').subscribe(
      (res: []) => {
        this.CPMultiplier = res;
      }
    );
  }

  private _getQ12() { // =REDONDEAR.MENOS((($B$8+B12)*(($C$8+C12)^0.5)*(($D$8+D12)^0.5)*BUSCARV(MIN(O12+0.5,40),CPM!A:B,2,FALSO)^2)/10)
    const CPBase = this._getCPBase();
    const min = this._getMIN();
    const CPM = this._getCPMValue(min);
    const value = (Math.floor((CPBase * Math.pow(CPM, 2)) / 10));

    // // console.log('Q12=' + value);
    return value;
  }

}
