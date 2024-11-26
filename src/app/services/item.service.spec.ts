import { TestBed } from '@angular/core/testing';

import { Item } from '../shared/models/interfaces/item';
import { ItemService } from './item.service';

describe(ItemService.name, () => {
  let service: ItemService;
  const mockItem: Item = {
    selecionado: false,
    name: 'Ovo',
    categoria: 'alimentos'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it(`Line 14: lista must be set`, () => {
    service.lista = [];
    expect(service.lista).toEqual([]);
  });
  it(`#${ItemService.prototype.carregarLista.name} should not load data if lista have items`, () => {
    service.lista = [mockItem];
    localStorage.setItem('lista', JSON.stringify([]));
    service.carregarLista();
    expect(service.lista.length).toBeGreaterThan(0);
  });
  it(`#${ItemService.prototype.carregarLista.name} should load data`, () => {
    service.lista = [];
    localStorage.setItem('lista', JSON.stringify([mockItem]));
    service.carregarLista();
    expect(service.lista.length).toBeGreaterThan(0);
  });
  it(`#${ItemService.prototype.carregarLista.name} should load [] if no data`, () => {
    service.lista = [];
    localStorage.removeItem('lista');
    service.carregarLista();
    expect(service.lista.length).toEqual(0);
  });
  it(`#${ItemService.prototype.salvarLista.name} should save a valid object into localStorage`, () => {
    service.salvarLista();
    const aux = localStorage.getItem('lista');
    expect(aux).toBeTruthy();
  });
});
