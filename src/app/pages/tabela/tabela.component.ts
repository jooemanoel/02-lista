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
import { Lista } from 'src/app/shared/models/interfaces/lista';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.css'],
})
export class TabelaComponent implements OnInit, AfterViewInit {
  @Output() pageChange = new EventEmitter();
  colunas: string[] = ['ver', 'nome', 'excluir'];
  dataSource = new MatTableDataSource<Lista>([]);
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private service: ListaService) {}
  ngOnInit() {
    this.dataSource.data = this.service.listas;
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
  criarLista() {
    this.pageChange.emit(3);
  }
  ver(id: number) {
    this.service.id = id;
    this.pageChange.emit(2);
  }
  excluir(id: number) {
    this.service.excluirLista(id);
    this.dataSource.data = this.service.listas;
  }
}
