import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TabelaComponent } from './tabela.component';

describe(TabelaComponent.name, () => {
  let component: TabelaComponent;
  let fixture: ComponentFixture<TabelaComponent>;

  // const eventsSubject = new Subject<NavigationEnd>();
  // const mockRouter = {
  //   events: eventsSubject.asObservable(),
  //   navigateByUrl: jasmine
  //     .createSpy('navigateByUrl')
  //     .and.returnValue(Promise.resolve(true)),
  //   routerState: { root: {} }, // Adiciona a propriedade 'root' esperada
  // };

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      imports: [],
      declarations: [TabelaComponent],
      providers: [],
    });
    fixture = TestBed.createComponent(TabelaComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
