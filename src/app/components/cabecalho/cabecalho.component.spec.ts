import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Subject } from 'rxjs';
import { CabecalhoComponent } from './cabecalho.component';
import { MatMenuModule } from '@angular/material/menu';
import { ItemService } from 'src/app/services/item.service';

describe(CabecalhoComponent.name, () => {
  let component: CabecalhoComponent;
  let fixture: ComponentFixture<CabecalhoComponent>;
  let itemService: ItemService;

  const eventsSubject = new Subject<NavigationEnd>();
  const mockRouter = {
    events: eventsSubject.asObservable(),
    navigateByUrl: jasmine.createSpy('navigateByUrl').and.returnValue(Promise.resolve(true)),
    routerState: { root: {} }, // Adiciona a propriedade 'root' esperada
  };

  beforeEach(() => {
    itemService = new ItemService();
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      imports: [RouterTestingModule, MatMenuModule],
      declarations: [CabecalhoComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ItemService, useValue: itemService }
      ]
    });
    fixture = TestBed.createComponent(CabecalhoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should react to navigation events', () => {
    const func = spyOn(component, 'alterarTitulo');
    const navigationEndEvent = new NavigationEnd(1, '/lista', '/lista');
    eventsSubject.next(navigationEndEvent);
    fixture.detectChanges();
    expect(func).toHaveBeenCalled();
  });
  it(`#${CabecalhoComponent.prototype.alterarTitulo.name} deve alterar a pagina no caso '/lista'`, () => {
    fixture.detectChanges();
    component.alterarTitulo('/lista');
    expect(component.paginaAtual).toEqual('Lista de compras');
  });
  it(`#${CabecalhoComponent.prototype.alterarTitulo.name} deve alterar a pagina no caso '/tabela'`, () => {
    fixture.detectChanges();
    itemService.editar = false;
    component.alterarTitulo('/tabela');
    expect(component.paginaAtual).toEqual('Criar nova lista');
  });
  it(`#${CabecalhoComponent.prototype.alterarTitulo.name} deve alterar a pagina no caso '/tabela'`, () => {
    fixture.detectChanges();
    itemService.editar = true;
    component.alterarTitulo('/tabela');
    expect(component.paginaAtual).toEqual('Editar lista atual');
  });
  it(`#${CabecalhoComponent.prototype.alterarTitulo.name} deve alterar a pagina no caso '/formulario'`, () => {
    fixture.detectChanges();
    component.alterarTitulo('/formulario');
    expect(component.paginaAtual).toEqual('Criar item recorrente');
  });
  it(`#${CabecalhoComponent.prototype.alterarTitulo.name} deve alterar a pagina no caso '/configuracoes'`, () => {
    fixture.detectChanges();
    component.alterarTitulo('/configuracoes');
    expect(component.paginaAtual).toEqual('Configurações');
  });
  it(`#${CabecalhoComponent.prototype.editar.name} deve mudar o valor de editar`, () => {
    fixture.detectChanges();
    itemService.editar = false;
    component.editar();
    expect(itemService.editar).toBeTrue();
  });
});
