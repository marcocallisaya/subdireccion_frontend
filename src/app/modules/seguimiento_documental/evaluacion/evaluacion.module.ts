import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvaluacionRoutingModule, componentes } from './evaluacion-routing.module';
import { MaterialModule } from '../../../shared/material.module';
import {SharedModule} from '../../../shared/shared.module';



@NgModule({
  declarations: [componentes],
  imports: [
    CommonModule,
    EvaluacionRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class EvaluacionModule { }
