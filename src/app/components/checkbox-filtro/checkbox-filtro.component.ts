import { Component } from '@angular/core';
import { ControleService } from 'src/app/services/controle.service';

@Component({
  selector: 'app-checkbox-filtro',
  templateUrl: './checkbox-filtro.component.html',
  styleUrls: ['./checkbox-filtro.component.css']
})
export class CheckboxFiltroComponent {
  categorias = ['alimentos', 'limpeza', 'higiene'];
  constructor(private _controle: ControleService) { }
  get controle() {
    return this._controle;
  }
  alternar(checked: boolean, texto: string) {
    this.controle.filtro = checked
      ? [...this.controle.filtro, texto]
      : this.controle.filtro.filter(x => x !== texto);
  }
}
