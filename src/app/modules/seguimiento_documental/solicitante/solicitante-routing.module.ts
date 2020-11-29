import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SolicitanteFormComponent } from './components/solicitante-form/solicitante-form.component';
import { SolicitanteComponent } from './components/solicitante/solicitante.component';
import {ModalComponent} from './components/modal/modal.component';
import { TramiteModalComponent } from './components/tramite-modal/tramite-modal.component';
import { ReporteDetallesComponent } from './components/reporte-detalles/reporte-detalles.component';
import { AfterLoginService } from 'src/app/core/guards/after-login.service';

const routes: Routes = [
  {path: '',  component: SolicitanteComponent, canActivate: [AfterLoginService], data: {permiso: 'listar_solicitante' }},
  {path: 'form', component: SolicitanteFormComponent, canActivate: [AfterLoginService], data: {permiso: 'crear_solicitante' }},
  {path: 'form/:id', component: SolicitanteFormComponent, canActivate: [AfterLoginService], data: {permiso: 'editar_solicitante' }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitanteRoutingModule { }

export const componentes = [SolicitanteComponent, SolicitanteFormComponent,
                            ModalComponent, TramiteModalComponent, ReporteDetallesComponent];
