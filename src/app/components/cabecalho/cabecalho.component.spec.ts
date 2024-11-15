import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabecalhoComponent } from './cabecalho.component';
import { AppModule } from 'src/app/app.module';

describe(CabecalhoComponent.name, () => {
  let component: CabecalhoComponent;
  let fixture: ComponentFixture<CabecalhoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [CabecalhoComponent]
    });
    fixture = TestBed.createComponent(CabecalhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
