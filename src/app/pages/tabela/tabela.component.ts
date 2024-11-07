import { Component, effect } from '@angular/core';
import { ControleService } from 'src/app/services/controle.service';
import { ExampleDataSource } from 'src/app/shared/classes/example-data-source';
import { ELEMENT_DATA, Item } from 'src/app/shared/interfaces/item';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.css'],
})
export class TabelaComponent {
  colunas: string[] = ['comprado', 'name', 'essencial'];
  listaItens: Item[] = [];
  dataSource = new ExampleDataSource(this.listaItens);
  constructor(private controle: ControleService) {
    effect(() => {
      this.listaItens = ELEMENT_DATA.filter((item) => {
        return (
          (!this.filtros.comprado || item.comprado === this.filtros.comprado) &&
          (!this.filtros.essencial || item.essencial === this.filtros.essencial)
        );
      });
      this.dataSource = new ExampleDataSource(this.listaItens);
    });
  }
  alternar(event: boolean, texto: string) {
    this.controle.alternarFiltro(event, texto as keyof Item);
  }
  get filtros() {
    return this.controle.filtros();
  }
  alternarComprado(checked: boolean, element: Item) {
    element.comprado = checked;
  }
  comprarTudoOuNao(checked: boolean) {
    this.listaItens.forEach((item) => {
      this.alternarComprado(checked, item);
    });
  }
}
