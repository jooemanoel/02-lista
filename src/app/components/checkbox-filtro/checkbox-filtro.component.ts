import { Component } from '@angular/core';
import { ControleService } from 'src/app/services/controle.service';

@Component({
  selector: 'app-checkbox-filtro',
  templateUrl: './checkbox-filtro.component.html',
  styleUrls: ['./checkbox-filtro.component.css']
})
export class CheckboxFiltroComponent {
  private filter = '';
  constructor(private controle: ControleService) { }
  alternar(checked: boolean, texto: string) {
    if (texto === 'comprado') {
      this.filter = checked ? this.filter.concat('c') : this.filter.replace('c', '');
    }
    if (texto === 'essencial') {
      this.filter = checked ? this.filter.concat('e') : this.filter.replace('e', '');
    }
    this.controle.filter = this.filter;
  }
}
