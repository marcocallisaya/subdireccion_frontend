import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReporteTramiteRoutingModule, componentes } from './reporte-tramite-routing.module';
import { MaterialModule } from '../../../shared/material.module';
import {SharedModule} from '../../../shared/shared.module';



@NgModule({
  declarations: [componentes],
  imports: [
    CommonModule,
    ReporteTramiteRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class ReporteTramiteModule { }
