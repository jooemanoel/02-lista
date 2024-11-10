import { AfterViewInit, Component, effect, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ControleService } from 'src/app/services/controle.service';
import { ELEMENT_DATA, Item } from 'src/app/shared/interfaces/item';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.css'],
})
export class TabelaComponent implements OnInit, AfterViewInit {
  colunas: string[] = ['comprado', 'name', 'essencial'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private controle: ControleService) {
    effect(() => {
      this.dataSource.filter = this.controle.filter;
    });
  }
  ngOnInit() {
    this.dataSource.filterPredicate = (data, filter: string) => {
      return (
        (filter.includes('c') ? data.comprado : true) &&
        (filter.includes('e') ? data.essencial : true)
      );
    };
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log(this.sort);
    console.log(this.paginator);
  }
  alternarComprado(checked: boolean, element: Item) {
    element.comprado = checked;
  }
  alternarTudo(checked: boolean) {
    this.dataSource.data.forEach((item) => {
      this.alternarComprado(checked, item);
    });
  }
}
