import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitanteRoutingModule, componentes } from './solicitante-routing.module';
import { MaterialModule } from '../../../shared/material.module';
import {SharedModule} from '../../../shared/shared.module';



@NgModule({
  declarations: [componentes],
  imports: [
    CommonModule,
    SolicitanteRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class SolicitanteModule { }
