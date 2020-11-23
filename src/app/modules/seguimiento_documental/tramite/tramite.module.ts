import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TramiteRoutingModule, componentes } from './tramite-routing.module';
import { MaterialModule } from '../../../shared/material.module';
import {SharedModule} from '../../../shared/shared.module';





@NgModule({
  declarations: [componentes],
  imports: [
    CommonModule,
    TramiteRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class TramiteModule { }
