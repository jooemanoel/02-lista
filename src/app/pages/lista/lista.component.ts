import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ListaService } from 'src/app/services/lista.service';
import { Item } from 'src/app/shared/models/interfaces/item';
import { Lista } from 'src/app/shared/models/interfaces/lista';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
})
export class ListaComponent implements OnInit, AfterViewInit {
  novo = '';
  colunas: string[] = ['checked', 'nome', 'delete'];
  dataSource = new MatTableDataSource<Item>([]);
  lista: Lista | null = null;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private service: ListaService,
    private router: Router,
  ) {}
  ngOnInit() {
    this.carregarLista();
  }
  carregarLista() {
    this.lista = this.service.buscarLista() ?? null;
    this.dataSource.data = this.lista?.itens || [];
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  adicionar(value: string) {
    this.service.criarItem(value);
    this.carregarLista();
    this.novo = '';
  }
  excluir(id: number) {
    this.service.excluirItem(id);
    this.carregarLista();
  }
  check(checked: boolean, id: number) {
    console.log(checked, id);
    this.service.check(checked, id);
    this.carregarLista();
  }
  homeClick() {
    void this.router.navigateByUrl('tabela');
  }
}
