import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TramiteComponent } from './components/tramite/tramite.component';
import { TramiteFormComponent } from './components/tramite-form/tramite-form.component';
import { ModalComponent } from './components/modal/modal.component';
import { SolicitanteModalComponent } from './components/solicitante-modal/solicitante-modal.component';
import { SolicitudModalComponent } from './components/solicitud-modal/solicitud-modal.component';
import { DerivacionModalComponent } from './components/derivacion-modal/derivacion-modal.component';
import { EvaluacionModalComponent } from './components/evaluacion-modal/evaluacion-modal.component';
import { DevolucionModalComponent } from './components/devolucion-modal/devolucion-modal.component';
import { DocumentoModalComponent } from './components/documento-modal/documento-modal.component';
import { ReporteDetallesComponent } from './components/reporte-detalles/reporte-detalles.component';

const routes: Routes = [
  {path: '', component: TramiteComponent},
  {path: 'form', component: TramiteFormComponent},
  {path: 'form/:id', component: TramiteFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TramiteRoutingModule { }

export const componentes = [TramiteComponent, TramiteFormComponent, ModalComponent,
                            SolicitanteModalComponent, SolicitudModalComponent,
                            DerivacionModalComponent, EvaluacionModalComponent, DevolucionModalComponent, DocumentoModalComponent, ReporteDetallesComponent];
