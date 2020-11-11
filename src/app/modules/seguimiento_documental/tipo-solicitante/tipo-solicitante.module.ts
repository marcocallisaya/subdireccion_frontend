import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoSolicitanteRoutingModule, componentes } from './tipo-solicitante-routing.module';
import { MaterialModule } from '../../../shared/material.module';
import {SharedModule} from '../../../shared/shared.module';


@NgModule({
  declarations: [componentes],
  imports: [
    CommonModule,
    TipoSolicitanteRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class TipoSolicitanteModule { }
