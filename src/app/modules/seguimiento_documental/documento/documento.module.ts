import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentoRoutingModule, componentes} from './documento-routing.module';
import { MaterialModule } from '../../../shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [componentes],
  imports: [
    CommonModule,
    DocumentoRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class DocumentoModule { }
