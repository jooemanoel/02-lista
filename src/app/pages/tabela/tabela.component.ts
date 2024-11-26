import { AfterViewInit, Component, effect, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ControleService } from 'src/app/services/controle.service';
import { ItemService } from 'src/app/services/item.service';
import { ITENS_BASICOS, Item } from 'src/app/shared/models/interfaces/item';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.css'],
})
export class TabelaComponent implements OnInit, AfterViewInit {
  colunas: string[] = ['selecionado', 'name', 'categoria'];
  dataSource = new MatTableDataSource<Item>([]);
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private _controle: ControleService, private _itens: ItemService, private _router: Router) {
    effect(() => {
      this.dataSource.filter = this._controle.filtro.join(',');
    });
  }
  get regras() {
    return this._controle.regras;
  }
  get editar() {
    return this._itens.editar;
  }
  ngOnInit() {
    this.dataSource.data = structuredClone(ITENS_BASICOS);
    this.dataSource.filterPredicate = (data, filter: string) => {
      return filter.includes(data.categoria);
    };
    this._itens.lista.forEach(itemLista => {
      const aux = this.dataSource.data.findIndex(x => x.name === itemLista.name);
      if (aux !== -1) {
        this.dataSource.data[aux].selecionado = this._itens.editar;
      }
    });
    this._itens.editar = false;
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    setTimeout(() => this.sort.sort({ id: 'name', start: 'asc', disableClear: false }), 0);
  }
  alternar(checked: boolean, element: Item) {
    element.selecionado = checked;
  }
  alternarTudo(checked: boolean) {
    this.dataSource.data.forEach((item) => {
      this.alternar(checked, item);
    });
  }
  criarLista() {
    this._itens.lista = [];
    this._itens.lista = this.dataSource.data.filter(x => x.selecionado === true);
    this._itens.lista.forEach(item => item.selecionado = false);
    this._itens.salvarLista();
    void this._router.navigateByUrl('lista');
  }
}
