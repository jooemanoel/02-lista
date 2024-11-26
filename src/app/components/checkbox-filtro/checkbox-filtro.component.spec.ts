import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CheckboxFiltroComponent } from './checkbox-filtro.component';
import { ControleService } from 'src/app/services/controle.service';

describe(CheckboxFiltroComponent.name, () => {
  let component: CheckboxFiltroComponent;
  let fixture: ComponentFixture<CheckboxFiltroComponent>;
  let controleService: ControleService;

  beforeEach(() => {
    controleService = new ControleService();
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      declarations: [CheckboxFiltroComponent],
      providers: [
        { provide: ControleService, useValue: controleService }
      ]
    });
    fixture = TestBed.createComponent(CheckboxFiltroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it(`#${CheckboxFiltroComponent.prototype.alternar.name} deve trocar o filtro`, () => {
    controleService.filtro = []
    component.alternar(true, 'alimentos');
    expect(controleService.filtro).toEqual(['alimentos']);
  });
  it(`#${CheckboxFiltroComponent.prototype.alternar.name} deve trocar o filtro`, () => {
    controleService.filtro = component.categorias;
    component.alternar(false, component.categorias[0]);
    expect(controleService.filtro).toHaveSize(2);
  });
});
