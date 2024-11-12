import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css']
})
export class CabecalhoComponent {
  paginas = {
    lista: 'Lista de compras',
    tabela: 'Criar nova lista',
    formulario: 'Criar item recorrente',
    configuracoes: 'Configurações'
  }
  paginaAtual = 'Lista de Compras';
  constructor(router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        switch (event.urlAfterRedirects) {
          case '/lista':
            this.paginaAtual = this.paginas.lista;
            break;
          case '/tabela':
            this.paginaAtual = this.paginas.tabela;
            break;
          case '/formulario':
            this.paginaAtual = this.paginas.formulario;
            break;
          case '/configuracoes':
            this.paginaAtual = this.paginas.configuracoes;
            break;
        }
      }
    });
  }
}
