import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstanteRoutingModule, components } from './estante-routing.module';
import { MaterialModule } from '../../../shared/material.module';
import {SharedModule} from '../../../shared/shared.module';




@NgModule({
  declarations: [components],
  imports: [
    CommonModule,
    EstanteRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class EstanteModule { }
