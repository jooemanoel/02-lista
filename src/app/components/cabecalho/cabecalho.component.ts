import { Component, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css']
})
export class CabecalhoComponent {
  paginaAtual = 'Lista de Compras';
  private _rota = toSignal(this.router.events);
  get rota() {
    return this._rota();
  }
  constructor(private router: Router, private _itens: ItemService) {
    effect(() => {
      if (this.rota instanceof NavigationEnd) {
        this.alterarTitulo(this.rota.urlAfterRedirects);
      }
    });
    // router.events.subscribe(event => {
    //   if (event instanceof NavigationEnd) {
    //     this.alterarTitulo(event.urlAfterRedirects);
    //   }
    // });
  }
  get itens() {
    return this._itens;
  }
  alterarTitulo(url: string) {
    switch (url) {
      case '/lista':
        this.paginaAtual = 'Lista de compras';
        break;
      case '/tabela':
        this.paginaAtual = this._itens.editar ? 'Editar lista atual' : 'Criar nova lista';
        break;
      case '/formulario':
        this.paginaAtual = 'Criar item recorrente';
        break;
      case '/configuracoes':
        this.paginaAtual = 'Configurações';
        break;
    }
  }
  editar() {
    this._itens.editar = true;
    void this.router.navigateByUrl('tabela');
  }
}
