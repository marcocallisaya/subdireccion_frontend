import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { PublicoRoutingModule, components } from './publico-routing.module';


@NgModule({
  declarations: [components],
  imports: [
    CommonModule,
    PublicoRoutingModule,
    SharedModule
  ]
})
export class PublicoModule { }
