import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AnalisaTexto } from '../analisaTexto/analisaTexto';
import { AnalisaImagem } from '../analisaImagem/analisaImagem';
import { MatchImagens } from '../matchImagens/matchImagens';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	constructor(public navCtrl: NavController) {}

	analisa_texto(){
		this.navCtrl.push(AnalisaTexto);
	}
	analisa_imagem(){
		this.navCtrl.push(AnalisaImagem);
	}
  match_imagem(){
    this.navCtrl.push(MatchImagens);
  }
}
