import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DerivacionRoutingModule, componentes } from './derivacion-routing.module';
import { MaterialModule } from '../../../shared/material.module';
import {SharedModule} from '../../../shared/shared.module';




@NgModule({
  declarations: [componentes],
  imports: [
    CommonModule,
    DerivacionRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class DerivacionModule { }
