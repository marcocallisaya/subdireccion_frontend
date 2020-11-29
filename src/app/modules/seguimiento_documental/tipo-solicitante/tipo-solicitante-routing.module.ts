import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipoSolicitanteComponent } from './components/tipo-solicitante/tipo-solicitante.component';
import { ModalComponent } from './components/modal/modal.component';
import { TipoSolicitanteFormComponent } from './components/tipo-solicitante-form/tipo-solicitante-form.component';
import { AfterLoginService } from 'src/app/core/guards/after-login.service';

const routes: Routes = [
  {path: '', component: TipoSolicitanteComponent, canActivate: [AfterLoginService], data: {permiso: 'listar_tipo_solicitante' }},
  {path: 'form', component: TipoSolicitanteFormComponent, canActivate: [AfterLoginService], data: {permiso: 'crear_tipo_solicitante' }},
  {path: 'form/:id', component: TipoSolicitanteFormComponent, canActivate: [AfterLoginService], data: {permiso: 'editar_tipo_solicitante' }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoSolicitanteRoutingModule { }

export  const componentes = [TipoSolicitanteComponent, ModalComponent, TipoSolicitanteFormComponent];
