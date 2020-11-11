import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoTramiteRoutingModule, componentes } from './tipo-tramite-routing.module';
import { MaterialModule } from '../../../shared/material.module';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
  declarations: [componentes],
  imports: [
    CommonModule,
    TipoTramiteRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class TipoTramiteModule { }
