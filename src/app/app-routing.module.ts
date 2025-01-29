import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabelaComponent } from './pages/tabela/tabela.component';
import { FormularioComponent } from './pages/formulario/formulario.component';
import { ListaComponent } from './pages/lista/lista.component';
import { ConfiguracoesComponent } from './pages/configuracoes/configuracoes.component';

const routes: Routes = [
  {
    path: 'lista',
    component: ListaComponent
  },
  {
    path: 'tabela',
    component: TabelaComponent
  },
  {
    path: 'formulario',
    component: FormularioComponent
  },
  {
    path: 'configuracoes',
    component: ConfiguracoesComponent
  },
  {
    path: '**',
    redirectTo: 'tabela',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
