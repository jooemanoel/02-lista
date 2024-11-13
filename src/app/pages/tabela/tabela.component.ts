import { AfterViewInit, Component, effect, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ControleService } from 'src/app/services/controle.service';
import { ItemService } from 'src/app/services/item.service';
import { ITENS_BASICOS, Item } from 'src/app/shared/interfaces/item';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.css'],
})
export class TabelaComponent implements OnInit, AfterViewInit {
  colunas: string[] = ['comprado', 'name', 'categoria'];
  dataSource = new MatTableDataSource(ITENS_BASICOS);
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private controle: ControleService, private itens: ItemService, private router: Router) {
    effect(() => {
      this.dataSource.filter = this.controle.filter;
    });
  }
  get regras() {
    return this.controle.regras;
  }
  get editar() {
    return this.itens.editar;
  }
  ngOnInit() {
    this.dataSource.filterPredicate = (data, filter: string) => {
      const filtros = JSON.parse(filter ?? '[]').join(',');
      return filtros.length ? filtros.includes(data.categoria) : true;
    };
    if (this.itens.editar) {
      this.itens.lista.forEach(itemLista => {
        const aux = this.dataSource.data.findIndex(itemData => itemData.name === itemLista.name);
        if (aux !== -1) {
          this.dataSource.data[aux].selecionado = true;
        }
      });
    }
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  alternarComprado(checked: boolean, element: Item) {
    element.selecionado = checked;
  }
  alternarTudo(checked: boolean) {
    this.dataSource.data.forEach((item) => {
      this.alternarComprado(checked, item);
    });
  }
  criarLista() {
    this.itens.editar = false;
    this.itens.lista = [];
    this.dataSource.data.forEach(item => {
      if (item.selecionado) {
        item.selecionado = false;
        this.itens.lista.push(structuredClone(item));
      }
    });
    this.itens.salvarLista();
    void this.router.navigateByUrl('lista');
  }
}
