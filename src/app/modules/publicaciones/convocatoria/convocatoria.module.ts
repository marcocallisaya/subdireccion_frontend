import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConvocatoriaRoutingModule, componentes } from './convocatoria-routing.module';
import { MaterialModule } from '../../../shared/material.module';
import {SharedModule} from '../../../shared/shared.module';



@NgModule({
  declarations: [componentes],
  imports: [
    CommonModule,
    ConvocatoriaRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class ConvocatoriaModule { }
