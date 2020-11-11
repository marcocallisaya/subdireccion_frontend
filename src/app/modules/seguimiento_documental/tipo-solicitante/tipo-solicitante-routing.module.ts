import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipoSolicitanteComponent } from './components/tipo-solicitante/tipo-solicitante.component';
import { ModalComponent } from './components/modal/modal.component';
import { TipoSolicitanteFormComponent } from './components/tipo-solicitante-form/tipo-solicitante-form.component';

const routes: Routes = [
  {path: '', component: TipoSolicitanteComponent},
  {path: 'form', component: TipoSolicitanteFormComponent},
  {path: 'form/:id', component: TipoSolicitanteFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoSolicitanteRoutingModule { }

export  const componentes = [TipoSolicitanteComponent, ModalComponent, TipoSolicitanteFormComponent];
