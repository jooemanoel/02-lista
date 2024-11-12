import { Component } from '@angular/core';
import { ControleService } from 'src/app/services/controle.service';

@Component({
  selector: 'app-checkbox-filtro',
  templateUrl: './checkbox-filtro.component.html',
  styleUrls: ['./checkbox-filtro.component.css']
})
export class CheckboxFiltroComponent {
  categorias = ['alimentos', 'limpeza', 'higiene'];
  private filter: string[] = [];
  constructor(private controle: ControleService) { }
  alternar(checked: boolean, texto: string) {
    checked ? this.filter.push(texto) : this.filter.splice(this.filter.indexOf(texto), 1);
    this.controle.filter = JSON.stringify(this.filter);
  }
}
