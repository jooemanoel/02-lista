import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { Item } from '../shared/models/interfaces/item';
import { Lista } from '../shared/models/interfaces/lista';

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
  constructor(private http: HttpClient) {}
  carregarListas() {
    return this.http
      .get<{
        data: string[][];
      }>('https://json-server-seven-alpha.vercel.app/read')
      .pipe(
        map((response) => response.data || []), // Garante que 'data' seja tratado corretamente
        map((data) =>
          data.flatMap((linha) =>
            linha.map((coluna) => JSON.parse(coluna) as Lista),
          ),
        ),
        tap((listas) => console.log('Listas carregadas:', listas)),
        tap((listas) => (this.listas = listas)),
      );
  }
  salvarListas() {
    const save = this.listas.map((lista) => [JSON.stringify(lista)]);
    const requisicao = {
      values: save,
    };
    console.log('Requisição: ', requisicao);
    this.http
      .post('https://json-server-seven-alpha.vercel.app/write', requisicao)
      .subscribe({
        next: (res) => console.log('Dados salvos:', res),
        error: (error) => console.error('Erro ao salvar:', error),
      });
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
