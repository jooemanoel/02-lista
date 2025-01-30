import { Component, EventEmitter, Output } from '@angular/core';
import { ListaService } from 'src/app/services/lista.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
})
export class FormularioComponent {
  @Output() pageChange = new EventEmitter();
  value = '';
  constructor(private service: ListaService) {}
  update(event: string) {
    this.value = event;
  }
  adicionar() {
    if (!this.value || !this.value.trim()) return;
    this.service.criarLista(this.value.toUpperCase());
    this.pageChange.emit(1);
  }
  homeClick() {
    this.pageChange.emit(1);
  }
}
