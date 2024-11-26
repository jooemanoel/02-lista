import { TestBed } from '@angular/core/testing';

import { ControleService } from './controle.service';

describe(ControleService.name, () => {
  let service: ControleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`L12: filter must be set`, () => {
    service.filtro = ['alimentos'];
    expect(service.filtro).toEqual(['alimentos']);
  });

  it(`#${ControleService.prototype.salvarRegras.name} should save a valid object into localStorage`, () => {
    service.salvarRegras();
    const aux = localStorage.getItem('regras');
    expect(aux).toBeTruthy();
  });
});
