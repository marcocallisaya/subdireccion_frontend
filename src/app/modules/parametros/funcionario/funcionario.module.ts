import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FuncionarioRoutingModule, componentes} from './funcionario-routing.module';
import { MaterialModule } from '../../../shared/material.module';
import {SharedModule} from '../../../shared/shared.module';


@NgModule({
  declarations: [componentes],
  imports: [
    CommonModule,
    FuncionarioRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class FuncionarioModule { }
