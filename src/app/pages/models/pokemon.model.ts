export class PokemonModel {
  idFirebase: string;
  identificador: string;
  nombre: string;
  baseHP: number;
  baseAttack: number;
  baseDefense: number;

  evoluciones: [];
  greatHighProduct: number;

  constructor(poke?) {
    if (poke) {
      this.idFirebase = poke.idFirebase;
      this.identificador = poke.identificador;
      this.nombre = poke.nombre;
      this.baseHP = Number(poke.baseHP);
      this.baseAttack = Number(poke.baseAttack);
      this.baseDefense = Number(poke.baseDefense);
      this.greatHighProduct = poke.greatHighProduct;
      this.evoluciones = poke.evoluciones || null;
    }
  }

}
