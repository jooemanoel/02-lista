import { Injectable } from '@angular/core';
import { Lista } from '../shared/models/interfaces/lista';
import { Item } from '../shared/models/interfaces/item';

@Injectable({
  providedIn: 'root',
})
export class ListaService {
  private _listas: Lista[] = [];
  get listas() {
    return this._listas;
  }
  set listas(x: Lista[]) {
    this._listas = x;
  }
  private _id = 0;
  get id() {
    return this._id;
  }
  set id(x: number) {
    this._id = x;
  }
  constructor() {
    this.carregarListas();
  }
  carregarListas() {
    if (!this._listas.length)
      this._listas = JSON.parse(localStorage.getItem('listas') ?? '[]');
    if (!this._id) {
      this.id = JSON.parse(localStorage.getItem('atual') ?? '0');
    }
  }
  salvarListas() {
    console.log(this._listas);
    localStorage.setItem('listas', JSON.stringify(this._listas));
    if (this.id) localStorage.setItem('atual', JSON.stringify(this.id));
  }
  criarLista(x: string) {
    const lista: Lista = {
      id: this.gerarId(),
      nome: x,
      itens: [],
    };
    this.id = lista.id;
    this._listas = [...this._listas, lista];
    this.salvarListas();
    return lista;
  }
  excluirLista(id: number) {
    if (this._id === id) this._id = 0;
    this._listas = this._listas.filter((x) => x.id !== id);
    this.salvarListas();
  }
  gerarId() {
    let max = 0;
    this.listas.forEach((lista) => (max = lista.id > max ? lista.id : max));
    return max + 1;
  }
  criarItem(x: string) {
    const lista = this.buscarLista();
    if (!lista) return;
    const item: Item = {
      id: this.gerarIdItem(),
      nome: x,
      checked: false,
    };
    lista.itens = [...lista.itens, item];
    this.salvarListas();
  }
  excluirItem(id: number) {
    const lista = this.buscarLista();
    if (!lista) return;
    lista.itens = lista.itens.filter((x) => x.id !== id);
    this.salvarListas();
  }
  buscarLista() {
    return this._listas.find((x) => x.id === this.id);
  }
  gerarIdItem() {
    const lista = this.buscarLista();
    if (!lista) return 0;
    let max = 0;
    lista.itens.forEach((item) => (max = item.id > max ? item.id : max));
    return max + 1;
  }
  check(checked: boolean, id: number) {
    const lista = this.buscarLista();
    if (!lista) return;
    const item = lista.itens.find((x) => x.id === id);
    if (!item) return;
    item.checked = checked;
    this.salvarListas();
  }
}
