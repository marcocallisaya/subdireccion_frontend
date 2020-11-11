import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SolicitanteFormComponent } from './components/solicitante-form/solicitante-form.component';
import { SolicitanteComponent } from './components/solicitante/solicitante.component';
import {ModalComponent} from './components/modal/modal.component';

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

export const componentes = [SolicitanteComponent, SolicitanteFormComponent, ModalComponent];
