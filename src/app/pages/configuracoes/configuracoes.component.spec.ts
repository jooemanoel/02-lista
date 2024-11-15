import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracoesComponent } from './configuracoes.component';
import { AppModule } from 'src/app/app.module';

describe(ConfiguracoesComponent.name, () => {
  let component: ConfiguracoesComponent;
  let fixture: ComponentFixture<ConfiguracoesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [ConfiguracoesComponent]
    });
    fixture = TestBed.createComponent(ConfiguracoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
