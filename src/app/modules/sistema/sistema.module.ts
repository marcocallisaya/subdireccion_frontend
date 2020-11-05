import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { SistemaRoutingModule, components } from './sistema-routing.module';



@NgModule({
  declarations: [components],
  imports: [
    CommonModule,
    SistemaRoutingModule,
    SharedModule
  ]
})
export class SistemaModule { }
