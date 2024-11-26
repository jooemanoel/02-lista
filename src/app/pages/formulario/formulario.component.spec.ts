import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormularioComponent } from './formulario.component';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe(FormularioComponent.name, () => {
  let component: FormularioComponent;
  let fixture: ComponentFixture<FormularioComponent>;

  const eventsSubject = new Subject<NavigationEnd>();
  const mockRouter = {
    events: eventsSubject.asObservable(),
    navigateByUrl: jasmine.createSpy('navigateByUrl').and.returnValue(Promise.resolve(true)),
    routerState: { root: {} }, // Adiciona a propriedade 'root' esperada
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      imports: [RouterTestingModule],
      declarations: [FormularioComponent],
      providers: [
        { provide: Router, useValue: mockRouter }
      ]
    });
    fixture = TestBed.createComponent(FormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it(`#${FormularioComponent.prototype.update.name} deve alterar value`, () => {
    component.value = 'asdf';
    component.update('qwer');
    expect(component.value).toEqual('qwer');
  });
  it(`#${FormularioComponent.prototype.adicionar.name} deve chamar o Router`, () => {
    component.adicionar();
    expect(mockRouter.navigateByUrl).toHaveBeenCalled();
  });
});
