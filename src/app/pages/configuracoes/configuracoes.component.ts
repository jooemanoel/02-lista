import { Component, OnInit } from '@angular/core';
import { ControleService } from 'src/app/services/controle.service';

@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes.component.html',
  styleUrls: ['./configuracoes.component.css']
})
export class ConfiguracoesComponent implements OnInit {
  constructor(private _controle: ControleService) { }
  get regras() {
    return this._controle.regras;
  }
  ngOnInit(): void {
    this._controle.carregarRegras();
  }
  alternarFiltrosNoComeco(checked: boolean) {
    this._controle.regras.filtrosNoComeco = checked;
    this._controle.salvarRegras();
  }
  removerAposMarcar(checked: boolean) {
    this._controle.regras.removerAposMarcar = checked;
    this._controle.salvarRegras();
  }
}
