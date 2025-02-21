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
import { Item } from 'src/app/shared/models/interfaces/item';
import { ListaFire } from 'src/app/shared/models/interfaces/ListaFire';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
})
export class ListaComponent implements OnInit, AfterViewInit {
  @Output() pageChange = new EventEmitter();
  novo = '';
  colunas: string[] = ['checked', 'nome', 'delete'];
  dataSource = new MatTableDataSource<Item>([]);
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private firebase: FirebaseService) {}
  get lista() {
    return this.firebase.listaAtual;
  }
  ngOnInit() {
    this.carregarLista();
  }
  carregarLista() {
    this.dataSource.data = this.lista.data.itens;
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  async atualizarLista() {
    await this.firebase.atualizar<ListaFire>(
      this.firebase.usuarioAtual.data.nome,
      this.lista.id,
      this.lista.data,
    );
  }
  async adicionar() {
    const item: Item = { nome: this.novo.toUpperCase(), checked: false };
    this.lista.data.itens = [...this.lista.data.itens, item];
    await this.atualizarLista();
    this.carregarLista();
    this.novo = '';
  }
  async excluir(nome: string) {
    this.lista.data.itens = this.lista.data.itens.filter(
      (x) => x.nome !== nome,
    );
    await this.atualizarLista();
    this.carregarLista();
  }
  async check(checked: boolean, nome: string) {
    console.log(checked, nome);
    const item = this.lista.data.itens.find((x) => x.nome === nome);
    if (!item) return;
    item.checked = checked;
    await this.atualizarLista();
    this.carregarLista();
  }
  homeClick() {
    this.pageChange.emit(1);
  }
}
