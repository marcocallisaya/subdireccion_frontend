import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { componentes } from '../documento/documento-routing.module';
import { SolicitanteFormComponent } from './components/solicitante-form/solicitante-form.component';
import { SolicitanteComponent } from './components/solicitante/solicitante.component';

const routes: Routes = [
  {path: '',  component: SolicitanteComponent},
  {path: 'form', component: SolicitanteFormComponent},
  {path: 'form/:id', component: SolicitanteFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitanteRoutingModule { }
