import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermisoRoutingModule, componentes } from './permiso-routing.module';
import { MaterialModule } from '../../../shared/material.module';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
  declarations: [componentes],
  imports: [
    CommonModule,
    PermisoRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class PermisoModule { }
