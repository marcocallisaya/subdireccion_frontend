import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoDocumentoRoutingModule, componentes } from './tipo-documento-routing.module';
import { MaterialModule } from '../../../shared/material.module';
import {SharedModule} from '../../../shared/shared.module';


@NgModule({
  declarations: [componentes],
  imports: [
    CommonModule,
    TipoDocumentoRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class TipoDocumentoModule { }
