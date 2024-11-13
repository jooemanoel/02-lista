import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ControleService } from 'src/app/services/controle.service';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css']
})
export class CabecalhoComponent {
  paginas = {
    lista: 'Lista de compras',
    tabela: 'Criar nova lista',
    tabela2: 'Editar lista atual',
    formulario: 'Criar item recorrente',
    configuracoes: 'Configurações'
  }
  paginaAtual = 'Lista de Compras';
  constructor(private router: Router, private controle: ControleService, private itens: ItemService) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        switch (event.urlAfterRedirects) {
          case '/lista':
            this.paginaAtual = this.paginas.lista;
            break;
          case '/tabela':
            this.paginaAtual = this.itens.editar ? this.paginas.tabela2 : this.paginas.tabela;
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
  editar() {
    this.itens.editar = true;
    void this.router.navigateByUrl('tabela');
  }
}
