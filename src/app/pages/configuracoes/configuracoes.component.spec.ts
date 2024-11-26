import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ConfiguracoesComponent } from './configuracoes.component';
import { ControleService } from 'src/app/services/controle.service';

describe(ConfiguracoesComponent.name, () => {
  let component: ConfiguracoesComponent;
  let fixture: ComponentFixture<ConfiguracoesComponent>;
  let controleService: ControleService;

  beforeEach(() => {
    controleService = new ControleService();
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      declarations: [ConfiguracoesComponent],
      providers: [
        { provide: ControleService, useValue: controleService }
      ]
    });
    fixture = TestBed.createComponent(ConfiguracoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it(`#${ConfiguracoesComponent.prototype.alternarFiltrosNoComeco.name} deve alternar filtros no service`, () => {
    controleService.regras.filtrosNoComeco = false;
    component.alternarFiltrosNoComeco(true);
    expect(controleService.regras.filtrosNoComeco).toBeTrue();
  });
  it(`#${ConfiguracoesComponent.prototype.removerAposMarcar.name} deve alternar filtros no service`, () => {
    controleService.regras.removerAposMarcar = false;
    component.removerAposMarcar(true);
    expect(controleService.regras.removerAposMarcar).toBeTrue();
  });
});
