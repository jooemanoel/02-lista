import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ControleService } from 'src/app/services/controle.service';
import { ItemService } from 'src/app/services/item.service';
import { ITENS_BASICOS } from 'src/app/shared/models/interfaces/item';
import { TabelaComponent } from './tabela.component';
import { NavigationEnd, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Subject } from 'rxjs';

describe(TabelaComponent.name, () => {
  let component: TabelaComponent;
  let fixture: ComponentFixture<TabelaComponent>;
  let controleService: ControleService;
  let itemService: ItemService;

  const eventsSubject = new Subject<NavigationEnd>();
  const mockRouter = {
    events: eventsSubject.asObservable(),
    navigateByUrl: jasmine.createSpy('navigateByUrl').and.returnValue(Promise.resolve(true)),
    routerState: { root: {} }, // Adiciona a propriedade 'root' esperada
  };

  beforeEach(() => {
    controleService = new ControleService();
    itemService = new ItemService();
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      imports: [RouterTestingModule],
      declarations: [TabelaComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ControleService, useValue: controleService },
        { provide: ItemService, useValue: itemService }
      ]
    });
    fixture = TestBed.createComponent(TabelaComponent);
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
  it('A marcação de item deve funcionar', () => {
    fixture.detectChanges();
    component.dataSource.data[0].selecionado = false;
    component.alternar(true, component.dataSource.data[0]);
    fixture.detectChanges();
    expect(component.dataSource.data[0].selecionado).toBeTrue();
  });
  it(`#${TabelaComponent.prototype.alternarTudo.name} deve marcar todos os itens`, () => {
    fixture.detectChanges();
    component.alternarTudo(true);
    fixture.detectChanges();
    const aux = component.dataSource.data.every(x => x.selecionado === true);
    expect(aux).toBeTrue();
  });
  it(`#${TabelaComponent.prototype.criarLista.name} deve criar uma lista`, () => {
    itemService.lista = [];
    fixture.detectChanges();
    component.alternarTudo(false);
    component.alternar(true, component.dataSource.data[0]);
    fixture.detectChanges();
    component.criarLista();
    expect(itemService.lista).toHaveSize(1);
  });
});
