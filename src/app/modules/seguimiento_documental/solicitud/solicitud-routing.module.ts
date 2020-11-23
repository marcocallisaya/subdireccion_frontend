import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModalComponent } from './components/modal/modal.component';
import { SolicitudComponent } from './components/solicitud/solicitud.component';
import { SolicitudFormComponent } from './components/solicitud-form/solicitud-form.component';
import { SolicitanteModalComponent } from './components/solicitante-modal/solicitante-modal.component';
import { CentroFormacionModalComponent } from './components/centro-formacion-modal/centro-formacion-modal.component';
import { TramiteModalComponent } from './components/tramite-modal/tramite-modal.component';
import { ReporteDetallesComponent } from './components/reporte-detalles/reporte-detalles.component';

const routes: Routes = [
  {path: '', component: SolicitudComponent},
  {path: 'form', component: SolicitudFormComponent},
  {path: 'form/:id', component: SolicitudFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudRoutingModule { }

export const componentes = [ModalComponent, SolicitudComponent,
                            SolicitudFormComponent,  SolicitanteModalComponent, CentroFormacionModalComponent, TramiteModalComponent, ReporteDetallesComponent];
