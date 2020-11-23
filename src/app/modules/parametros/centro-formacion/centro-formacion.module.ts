import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CentroFormacionRoutingModule, componentes } from './centro-formacion-routing.module';
import { MaterialModule } from '../../../shared/material.module';
import {SharedModule} from '../../../shared/shared.module';



@NgModule({
  declarations: [componentes],
  imports: [
    CommonModule,
    CentroFormacionRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class CentroFormacionModule { }
