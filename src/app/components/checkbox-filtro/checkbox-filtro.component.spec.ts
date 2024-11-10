import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxFiltroComponent } from './checkbox-filtro.component';

describe('CheckboxFiltroComponent', () => {
  let component: CheckboxFiltroComponent;
  let fixture: ComponentFixture<CheckboxFiltroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
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
