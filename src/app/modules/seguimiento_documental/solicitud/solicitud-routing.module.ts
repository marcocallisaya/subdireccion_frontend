import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModalComponent } from './components/modal/modal.component';
import { SolicitudComponent } from './components/solicitud/solicitud.component';
import { SolicitudFormComponent } from './components/solicitud-form/solicitud-form.component';
import { SolicitanteModalComponent } from './components/solicitante-modal/solicitante-modal.component';
import { CentroFormacionModalComponent } from './components/centro-formacion-modal/centro-formacion-modal.component';
import { TramiteModalComponent } from './components/tramite-modal/tramite-modal.component';
import { ReporteDetallesComponent } from './components/reporte-detalles/reporte-detalles.component';
import { AfterLoginService } from 'src/app/core/guards/after-login.service';

const routes: Routes = [
  {path: '', component: SolicitudComponent, canActivate: [AfterLoginService], data: {permiso: 'listar_solicitud' }},
  {path: 'form', component: SolicitudFormComponent, canActivate: [AfterLoginService], data: {permiso: 'crear_solicitud' }},
  {path: 'form/:id', component: SolicitudFormComponent, canActivate: [AfterLoginService], data: {permiso: 'editar_solicitud' }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudRoutingModule { }

export const componentes = [ModalComponent, SolicitudComponent,
                            SolicitudFormComponent,  SolicitanteModalComponent,
                            CentroFormacionModalComponent, TramiteModalComponent, ReporteDetallesComponent];
