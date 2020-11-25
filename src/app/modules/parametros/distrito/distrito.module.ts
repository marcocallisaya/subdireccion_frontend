import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DistritoRoutingModule, componentes } from './distrito-routing.module';
import { MaterialModule } from '../../../shared/material.module';
import {SharedModule} from '../../../shared/shared.module';



@NgModule({
  declarations: [componentes],
  imports: [
    CommonModule,
    DistritoRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class DistritoModule { }
