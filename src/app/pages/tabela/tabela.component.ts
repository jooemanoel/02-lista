import { DataSource } from '@angular/cdk/collections';
import { Component, effect } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ControleService } from 'src/app/services/controle.service';
import { Item, ELEMENT_DATA } from 'src/app/shared/interfaces/item';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.css']
})
export class TabelaComponent {
  colunas: string[] = ['comprado', 'name', 'essencial'];
  listaItens: Item[] = [];
  dataSource = new ExampleDataSource(this.listaItens);
  constructor(private controle: ControleService) {
    effect(() => {
      this.listaItens = ELEMENT_DATA.filter(item => {
        return (!this.filtros.comprado || item.comprado === this.filtros.comprado) && (!this.filtros.essencial || item.essencial === this.filtros.essencial);
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
}

export class ExampleDataSource extends DataSource<Item> {
  /** Stream of data that is provided to the table. */
  data = new BehaviorSubject<Item[]>([]);
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  constructor(data: Item[]) {
    super();
    this.data = new BehaviorSubject<Item[]>(data);
  }
  connect(): Observable<Item[]> {
    return this.data;
  }
  disconnect() { }
}
