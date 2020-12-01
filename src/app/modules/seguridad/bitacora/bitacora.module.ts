import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BitacoraRoutingModule, componentes } from './bitacora-routing.module';
import { MaterialModule } from '../../../shared/material.module';
import {SharedModule} from '../../../shared/shared.module';



@NgModule({
  declarations: [componentes],
  imports: [
    CommonModule,
    BitacoraRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class BitacoraModule { }
