import { AfterViewInit, Component, effect, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ControleService } from 'src/app/services/controle.service';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/app/shared/models/interfaces/item';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit, AfterViewInit {
  colunas: string[] = ['comprado', 'name', 'categoria'];
  dataSource = new MatTableDataSource<Item>([]);
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private _controle: ControleService, private _itens: ItemService) {
    effect(() => {
      this.dataSource.filter = this._controle.filtro.join(',');
    });
  }
  get lista() {
    return this._itens.lista;
  }
  get regras() {
    return this._controle.regras;
  }
  ngOnInit() {
    this.dataSource.data = this._itens.carregarLista();
    this.dataSource.filterPredicate = (data, filter: string) => {
      return filter.includes(data.categoria);
    };
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  alternar(checked: boolean, element: Item) {
    if (this.regras.removerAposMarcar) {
      this._itens.lista = this._itens.lista.filter(x => x !== element);
      this.dataSource.data = this._itens.lista;
      this._itens.salvarLista();
    }
    else {
      element.selecionado = checked;
    }
  }
  alternarTudo(checked: boolean) {
    this.dataSource.data.forEach((item) => {
      this.alternar(checked, item);
    });
  }
  concluir() {
    this._itens.lista = [];
    this._itens.salvarLista();
  }
}
