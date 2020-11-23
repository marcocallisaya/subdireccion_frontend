import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoSolicitanteRoutingModule, componentes } from './tipo-solicitante-routing.module';
import { MaterialModule } from '../../../shared/material.module';
import {SharedModule} from '../../../shared/shared.module';
import { ReporteDetallesComponent } from './components/reporte-detalles/reporte-detalles.component';


@NgModule({
  declarations: [componentes, ReporteDetallesComponent],
  imports: [
    CommonModule,
    TipoSolicitanteRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class TipoSolicitanteModule { }
