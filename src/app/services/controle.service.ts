import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ControleService {
  private _filtro = signal<string[]>([]);
  get filtro() {
    return this._filtro();
  }
  set filtro(filtro: string[]) {
    this._filtro.set(filtro);
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
