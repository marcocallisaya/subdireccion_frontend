import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitudRoutingModule, componentes } from './solicitud-routing.module';
import { MaterialModule } from '../../../shared/material.module';
import {SharedModule} from '../../../shared/shared.module';





@NgModule({
  declarations: [componentes],
  imports: [
    CommonModule,
    SolicitudRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class SolicitudModule { }

