import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioComponent } from './formulario.component';
import { AppModule } from 'src/app/app.module';

describe(FormularioComponent.name, () => {
  let component: FormularioComponent;
  let fixture: ComponentFixture<FormularioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [FormularioComponent]
    });
    fixture = TestBed.createComponent(FormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
