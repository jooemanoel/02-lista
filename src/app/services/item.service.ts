import { Injectable } from '@angular/core';
import { Item } from '../shared/interfaces/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private _lista: Item[] = [];
  private _editar = false;
  get lista() {
    return this._lista;
  }
  set lista(lista: Item[]) {
    this._lista = lista;
  }
  get editar() {
    return this._editar;
  }
  set editar(editar: boolean) {
    this._editar = editar;
  }
  carregarLista() {
    if (!this._lista.length) this._lista = JSON.parse(localStorage.getItem('lista') ?? '[]');
    return this._lista;
  }
  salvarLista() {
    localStorage.setItem('lista', JSON.stringify(this._lista));
  }
}
