import { Component } from '@angular/core';
import { ControleService } from 'src/app/services/controle.service';

@Component({
  selector: 'app-checkbox-filtro',
  templateUrl: './checkbox-filtro.component.html',
  styleUrls: ['./checkbox-filtro.component.css']
})
export class CheckboxFiltroComponent {
  constructor(private controle: ControleService) { }
  alternar(event: boolean, texto: string) {
    this.controle.alternarFiltro(event, texto);
  }
}
