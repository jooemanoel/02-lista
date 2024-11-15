import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaComponent } from './lista.component';
import { AppModule } from 'src/app/app.module';

describe(ListaComponent.name, () => {
  let component: ListaComponent;
  let fixture: ComponentFixture<ListaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [ListaComponent]
    });
    fixture = TestBed.createComponent(ListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
