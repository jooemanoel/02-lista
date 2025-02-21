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
import { FirebaseService } from 'src/app/services/firebase.service';
import { ListaFire } from 'src/app/shared/models/interfaces/ListaFire';
import { Registro } from 'src/app/shared/models/interfaces/registro';
import { Usuario } from 'src/app/shared/models/interfaces/usuario';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.css'],
})
export class TabelaComponent implements OnInit, AfterViewInit {
  @Output() pageChange = new EventEmitter();
  titulo = 'CARREGANDO...';
  usuario!: Registro<Usuario>;
  colunas: string[] = ['ver', 'nome', 'excluir'];
  dataSource = new MatTableDataSource<Registro<ListaFire>>([]);
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private firebase: FirebaseService) {}
  ngOnInit() {
    this.usuario = this.firebase.usuarioAtual;
    this.carregarListas();
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
  async carregarListas() {
    const listas: Registro<ListaFire>[] = await this.firebase.listar<ListaFire>(
      this.usuario.data.nome,
    );
    this.dataSource.data = listas;
    this.titulo = this.dataSource.data.length
      ? 'LISTAS ATUAIS'
      : 'NÃO HÁ NENHUMA LISTA';
  }
  criarLista() {
    this.pageChange.emit(3);
  }
  acessar(element: Registro<ListaFire>) {
    this.firebase.listaAtual = element;
    this.pageChange.emit(2);
  }
  async excluir(id: string) {
    await this.firebase.excluir(this.usuario.data.nome, id);
    this.carregarListas();
  }
}
