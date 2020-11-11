import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReporteDocumentoRoutingModule, componentes } from './reporte-documento-routing.module';
import { MaterialModule } from '../../../shared/material.module';
import {SharedModule} from '../../../shared/shared.module';


@NgModule({
  declarations: [componentes],
  imports: [
    CommonModule,
    ReporteDocumentoRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class ReporteDocumentoModule { }
