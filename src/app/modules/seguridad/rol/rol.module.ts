import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolRoutingModule, componentes } from './rol-routing.module';
import { MaterialModule } from '../../../shared/material.module';
import {SharedModule} from '../../../shared/shared.module';



@NgModule({
  declarations: [componentes],
  imports: [
    CommonModule,
    RolRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class RolModule { }
