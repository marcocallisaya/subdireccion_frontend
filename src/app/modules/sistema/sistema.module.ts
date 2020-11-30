import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { SistemaRoutingModule, components } from './sistema-routing.module';
import { MaterialModule } from 'src/app/shared/material.module';



@NgModule({
  declarations: [components],
  imports: [
    CommonModule,
    SistemaRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class SistemaModule { }
