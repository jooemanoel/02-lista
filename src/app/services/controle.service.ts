import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ControleService {
  private _filter = signal('');
  get filter() {
    return this._filter();
  }
  set filter(filtro: string) {
    this._filter.set(filtro);
  }
}
