import { Component, EventEmitter, Output } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ListaFire } from 'src/app/shared/models/interfaces/ListaFire';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
})
export class FormularioComponent {
  @Output() pageChange = new EventEmitter();
  value = '';
  constructor(private firebase: FirebaseService) {}
  async adicionar() {
    if (!this.value || !this.value.trim()) return;
    const lista: ListaFire = { nome: this.value.toUpperCase(), itens: [] };
    await this.firebase.adicionar<ListaFire>(
      this.firebase.usuarioAtual.data.nome,
      lista,
    );
    this.pageChange.emit(1);
  }
  homeClick() {
    this.pageChange.emit(1);
  }
}
