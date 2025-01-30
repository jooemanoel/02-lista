import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabelaComponent } from './pages/tabela/tabela.component';
import { FormularioComponent } from './pages/formulario/formulario.component';
import { ListaComponent } from './pages/lista/lista.component';

const routes: Routes = [
  {
    path: 'lista',
    component: ListaComponent,
  },
  {
    path: 'tabela',
    component: TabelaComponent,
  },
  {
    path: 'formulario',
    component: FormularioComponent,
  },
  {
    path: '**',
    redirectTo: 'tabela',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
