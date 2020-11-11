import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReporteDocumentoComponent } from './reporte-documento/reporte-documento.component';

const routes: Routes = [
  {path: '', component: ReporteDocumentoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReporteDocumentoRoutingModule { }

export const componentes = [ReporteDocumentoComponent];
