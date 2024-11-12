import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ControleService } from 'src/app/services/controle.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {
  value = '';
  constructor(private router: Router, private controle: ControleService) { }
  adicionar() {
    void this.router.navigateByUrl('tabela');
  }
}
