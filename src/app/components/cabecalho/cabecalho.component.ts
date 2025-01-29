import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListaService } from 'src/app/services/lista.service';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css'],
})
export class CabecalhoComponent {
  @Input() titulo = 'Lista de Compras';
  @Output() btnClick = new EventEmitter();
  constructor(private service: ListaService) {}
  get atual() {
    return this.service.listas.find((x) => x.id === this.service.id);
  }
  evento() {
    this.btnClick.emit();
  }
}
