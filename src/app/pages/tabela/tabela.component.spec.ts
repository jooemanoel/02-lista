import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaComponent } from './tabela.component';
import { AppModule } from 'src/app/app.module';

describe(TabelaComponent.name, () => {
  let component: TabelaComponent;
  let fixture: ComponentFixture<TabelaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [TabelaComponent]
    });
    fixture = TestBed.createComponent(TabelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
