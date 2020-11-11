import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UbicacionRoutingModule, componentes } from './ubicacion-routing.module';
import { MaterialModule } from '../../../shared/material.module';
import {SharedModule} from '../../../shared/shared.module';


@NgModule({
  declarations: [componentes],
  imports: [
    CommonModule,
    UbicacionRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class UbicacionModule { }
