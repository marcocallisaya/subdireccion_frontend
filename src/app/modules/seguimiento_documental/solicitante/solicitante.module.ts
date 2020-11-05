import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitanteRoutingModule } from './solicitante-routing.module';
import { SolicitanteComponent } from './components/solicitante/solicitante.component';
import { SolicitanteFormComponent } from './components/solicitante-form/solicitante-form.component';


@NgModule({
  declarations: [SolicitanteComponent, SolicitanteFormComponent],
  imports: [
    CommonModule,
    SolicitanteRoutingModule
  ]
})
export class SolicitanteModule { }
