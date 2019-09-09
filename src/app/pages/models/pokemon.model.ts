export class PokemonModel {
  id: string;
  identificador: string;
  nombre: string;
  baseHP: string;
  baseAttack: string;
  baseDefense: string;
  greatHighProduct: number;

  constructor(pokemon) {
    this.id = pokemon.id || '';
    this.identificador = pokemon.identificador || '';
    this.nombre = pokemon.nombre || '';
    this.baseHP = pokemon.baseHP || '';
    this.baseAttack = pokemon.baseAttack || '';
    this.baseDefense = pokemon.baseDefense || '';
    this.greatHighProduct = pokemon.greatHighProduct || 0;
  }

}
