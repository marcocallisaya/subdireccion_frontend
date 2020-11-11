import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TramiteRoutingModule, componentes } from './tramite-routing.module';
import { MaterialModule } from '../../../shared/material.module';
import {SharedModule} from '../../../shared/shared.module';
import { SolicitanteModalComponent } from './components/solicitante-modal/solicitante-modal.component';
import { SolicitudModalComponent } from './components/solicitud-modal/solicitud-modal.component';
import { DerivacionModalComponent } from './components/derivacion-modal/derivacion-modal.component';
import { EvaluacionModalComponent } from './components/evaluacion-modal/evaluacion-modal.component';
import { DevolucionModalComponent } from './components/devolucion-modal/devolucion-modal.component';


@NgModule({
  declarations: [componentes, SolicitanteModalComponent, SolicitudModalComponent, DerivacionModalComponent, EvaluacionModalComponent, DevolucionModalComponent],
  imports: [
    CommonModule,
    TramiteRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class TramiteModule { }
