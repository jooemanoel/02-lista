import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxFiltroComponent } from './checkbox-filtro.component';
import { AppModule } from 'src/app/app.module';

describe(CheckboxFiltroComponent.name, () => {
  let component: CheckboxFiltroComponent;
  let fixture: ComponentFixture<CheckboxFiltroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [CheckboxFiltroComponent]
    });
    fixture = TestBed.createComponent(CheckboxFiltroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
