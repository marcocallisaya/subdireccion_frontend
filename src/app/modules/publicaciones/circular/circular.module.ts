import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CircularRoutingModule, componentes } from './circular-routing.module';
import { MaterialModule } from '../../../shared/material.module';
import {SharedModule} from '../../../shared/shared.module';



@NgModule({
  declarations: [componentes],
  imports: [
    CommonModule,
    CircularRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class CircularModule { }
