import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ListaService } from 'src/app/services/lista.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
})
export class FormularioComponent {
  value = '';
  constructor(
    private router: Router,
    private service: ListaService,
  ) {}
  update(event: string) {
    this.value = event;
  }
  adicionar() {
    if (!this.value || !this.value.trim()) return;
    this.service.criarLista(this.value.toUpperCase());
    void this.router.navigateByUrl('tabela');
  }
  homeClick() {
    void this.router.navigateByUrl('tabela');
  }
}
