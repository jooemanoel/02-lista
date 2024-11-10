import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ControleService {
  private _filter = signal('');
  get filter() {
    return this._filter();
  }
  alternarFiltro(check: boolean, filtro: string) {
    if (filtro === 'comprado') {
      this._filter.update(value => check ? value.concat('c') : value.replace('c', ''));
    }
    if (filtro === 'essencial') {
      this._filter.update(value => check ? value.concat('e') : value.replace('e', ''));
    }
  }
}
