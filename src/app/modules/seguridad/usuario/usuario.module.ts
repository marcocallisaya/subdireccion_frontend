import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule, componentes } from './usuario-routing.module';
import { MaterialModule } from '../../../shared/material.module';
import {SharedModule} from '../../../shared/shared.module';



@NgModule({
  declarations: [componentes],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class UsuarioModule { }
