import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css'],
})
export class CabecalhoComponent {
  @Input() titulo = 'Lista de Compras';
  @Output() btnClick = new EventEmitter();
  @Output() menuClick = new EventEmitter();
  constructor(private firebase: FirebaseService) {}
  get atual() {
    return this.firebase.listaAtual.data.nome;
  }
  get usuarioAtual() {
    return this.firebase.usuarioAtual;
  }
  evento() {
    this.btnClick.emit();
  }
  menu() {
    this.menuClick.emit();
  }
}
