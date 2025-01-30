import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ListaService } from 'src/app/services/lista.service';
import { Item } from 'src/app/shared/models/interfaces/item';
import { Lista } from 'src/app/shared/models/interfaces/lista';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
})
export class ListaComponent implements OnInit, AfterViewInit {
  @Output() pageChange = new EventEmitter();
  novo = '';
  lista: Lista | null = null;
  colunas: string[] = ['checked', 'nome', 'delete'];
  dataSource = new MatTableDataSource<Item>([]);
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private service: ListaService) {}
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
  adicionar() {
    this.service.criarItem(this.novo.toUpperCase());
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
    this.pageChange.emit(1);
  }
}
