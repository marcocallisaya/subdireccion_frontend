import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstructivoRoutingModule, components } from './instructivo-routing.module';
import { MaterialModule } from '../../../shared/material.module';
import {SharedModule} from '../../../shared/shared.module';




@NgModule({
  declarations: [components],
  imports: [
    CommonModule,
    InstructivoRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class InstructivoModule { }
