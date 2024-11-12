import { Component, OnInit } from '@angular/core';
import { ControleService } from 'src/app/services/controle.service';

@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes.component.html',
  styleUrls: ['./configuracoes.component.css']
})
export class ConfiguracoesComponent implements OnInit {
  constructor(private controle: ControleService) { }
  get regras() {
    return this.controle.regras;
  }
  ngOnInit(): void {
    this.controle.carregarRegras();
  }
  alternarFiltrosNoComeco(checked: boolean) {
    this.controle.regras.filtrosNoComeco = checked;
    this.controle.salvarRegras();
  }
  removerAposMarcar(checked: boolean) {
    this.controle.regras.removerAposMarcar = checked;
    this.controle.salvarRegras();
  }
}
