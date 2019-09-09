import { Component, OnInit } from '@angular/core';
import { PokemonModel } from '../models/pokemon.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {

  pokemon = new PokemonModel({});

  constructor() { }

  ngOnInit() {
  }

  guardar( form: NgForm): void {
    console.log(form);
    console.log(this.pokemon);
  }

}
