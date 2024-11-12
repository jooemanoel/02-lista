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
  private _regras = {
    filtrosNoComeco: false,
    removerAposMarcar: false
  }
  get regras() {
    return this._regras;
  }
  constructor() {
    this.carregarRegras();
  }
  carregarRegras() {
    const aux = JSON.parse(localStorage.getItem('regras') ?? '{}');
    if (aux) this._regras = aux;
  }
  salvarRegras() {
    localStorage.setItem('regras', JSON.stringify(this._regras));
  }
}
