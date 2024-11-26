import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ListaComponent } from './lista.component';
import { ControleService } from 'src/app/services/controle.service';
import { ItemService } from 'src/app/services/item.service';
import { ITENS_BASICOS } from 'src/app/shared/models/interfaces/item';

describe(ListaComponent.name, () => {
  let component: ListaComponent;
  let fixture: ComponentFixture<ListaComponent>;
  let controleService: ControleService;
  let itemService: ItemService;

  beforeEach(() => {
    controleService = new ControleService();
    itemService = new ItemService();
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      declarations: [ListaComponent],
      providers: [
        { provide: ControleService, useValue: controleService },
        { provide: ItemService, useValue: itemService }
      ]
    });
    fixture = TestBed.createComponent(ListaComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('As regras devem ser lidas', () => {
    controleService.regras.filtrosNoComeco = true;
    fixture.detectChanges();
    expect(component.regras.filtrosNoComeco).toBeTrue();
  });
  it('Os filtros devem ser chamados', () => {
    itemService.lista = ITENS_BASICOS;
    fixture.detectChanges();
    const sizeBefore = component.dataSource.filteredData.length;
    controleService.filtro = ['alimentos', 'limpeza'];
    fixture.detectChanges();
    const sizeAfter = component.dataSource.filteredData.length;
    expect(sizeBefore - sizeAfter).toBeGreaterThan(0);
  });
  it('A exclusão de item deve funcionar', () => {
    controleService.regras.removerAposMarcar = true;
    itemService.lista = ITENS_BASICOS;
    fixture.detectChanges();
    const sizeBefore = component.dataSource.data.length;
    component.alternar(true, component.dataSource.data[0]);
    fixture.detectChanges();
    const sizeAfter = component.dataSource.data.length;
    expect(sizeBefore - sizeAfter).toEqual(1);
  });
  it('A exclusão de item deve funcionar', () => {
    controleService.regras.removerAposMarcar = false;
    itemService.lista = ITENS_BASICOS;
    fixture.detectChanges();
    component.dataSource.data[0].selecionado = false;
    component.alternar(true, component.dataSource.data[0]);
    fixture.detectChanges();
    expect(component.dataSource.data[0].selecionado).toBeTrue();
  });
  it(`#${ListaComponent.prototype.alternarTudo.name} deve marcar todos os itens`, () => {
    controleService.regras.removerAposMarcar = false;
    itemService.lista = ITENS_BASICOS;
    fixture.detectChanges();
    component.alternarTudo(true);
    fixture.detectChanges();
    const aux = component.dataSource.data.every(x => x.selecionado === true);
    expect(aux).toBeTrue();
  });
  it(`#${ListaComponent.prototype.concluir.name} deve limpar a lista`, () => {
    itemService.lista = ITENS_BASICOS;
    fixture.detectChanges();
    component.concluir();
    fixture.detectChanges();
    expect(itemService.lista).toEqual([]);
  });
});
