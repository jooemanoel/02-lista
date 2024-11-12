import { AfterViewInit, Component, effect, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ControleService } from 'src/app/services/controle.service';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/app/shared/interfaces/item';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit, AfterViewInit {
  colunas: string[] = ['comprado', 'name', 'categoria'];
  dataSource = new MatTableDataSource<Item>([]);
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private controle: ControleService, private itens: ItemService, private router: Router) {
    effect(() => {
      this.dataSource.filter = this.controle.filter;
    });
  }
  get lista() {
    return this.itens.lista;
  }
  get regras() {
    return this.controle.regras;
  }
  ngOnInit() {
    this.dataSource.data = this.itens.carregarLista();
    this.dataSource.filterPredicate = (data, filter: string) => {
      const filtros = JSON.parse(filter ?? '[]').join(',');
      return filtros.length ? filtros.includes(data.categoria) : true;
    };
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  alternar(checked: boolean, element: Item) {
    if (this.regras.removerAposMarcar) {
      this.itens.lista.splice(this.itens.lista.indexOf(element), 1);
      this.dataSource.data = this.itens.lista;
      this.itens.salvarLista();
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
    this.itens.lista = [];
    this.itens.salvarLista();
  }
}
