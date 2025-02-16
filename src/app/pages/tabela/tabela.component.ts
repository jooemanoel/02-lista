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
  titulo = 'CARREGANDO...';
  @Output() pageChange = new EventEmitter();
  colunas: string[] = ['ver', 'nome', 'excluir'];
  dataSource = new MatTableDataSource<Lista>([]);
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private service: ListaService) {}
  ngOnInit() {
    if (!this.service.listas.length) {
      this.service.carregarListas().subscribe({
        next: (res) => {
          this.service.listas = res;
          this.dataSource.data = res;
          this.titulo = this.dataSource.data.length
            ? 'LISTAS ATUAIS'
            : 'NÃO HÁ NENHUMA LISTA';
        },
        error: (error) => {
          this.titulo = 'ERRO NO CARREGAMENTO DA LISTA';
          console.log(error);
        },
      });
    } else {
      this.dataSource.data = this.service.listas;
      this.titulo = this.dataSource.data.length
        ? 'LISTAS ATUAIS'
        : 'NÃO HÁ NENHUMA LISTA';
    }
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
