import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevolucionRoutingModule, componentes} from './devolucion-routing.module';
import { MaterialModule } from '../../../shared/material.module';
import {SharedModule} from '../../../shared/shared.module';




@NgModule({
  declarations: [componentes],
  imports: [
    CommonModule,
    DevolucionRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class DevolucionModule { }
