import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {
  value = '';
  constructor(private router: Router) { }
  adicionar() {
    void this.router.navigateByUrl('tabela');
  }
}