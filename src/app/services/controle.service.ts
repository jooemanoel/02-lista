import { Injectable, signal } from '@angular/core';
import { Item } from '../shared/interfaces/item';

@Injectable({
  providedIn: 'root'
})
export class ControleService {
  private _filtros = signal<Item>({
    comprado: false, name: '', essencial: false
  });
  get filtros() {
    return this._filtros;
  }
  alternarFiltro(check: boolean, filtro: keyof Item) {
    this.filtros.update(filtros => {
      if (filtro in filtros) {
        filtros[filtro] = check as never;
      }
      return filtros;
    });
  }
}
