import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Registro } from 'src/app/shared/models/interfaces/registro';
import { Usuario } from 'src/app/shared/models/interfaces/usuario';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  page = 4;
  mudarPagina(x: number) {
    this.page = x;
    if (x === 4) localStorage.removeItem('usuarioAtual');
  }
  constructor(private firebase: FirebaseService) {}
  ngOnInit(): void {
    const str = localStorage.getItem('usuarioAtual');
    if (!str) return;
    const usuarioAtual: Registro<Usuario> = JSON.parse(
      str,
    ) as Registro<Usuario>;
    this.firebase.usuarioAtual = usuarioAtual;
    this.page = 1;
  }
}
