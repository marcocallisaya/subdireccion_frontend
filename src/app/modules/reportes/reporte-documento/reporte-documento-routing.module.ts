import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AfterLoginService } from 'src/app/core/guards/after-login.service';
import { ReporteDocumentoComponent } from './reporte-documento/reporte-documento.component';

const routes: Routes = [
  {path: '', component: ReporteDocumentoComponent, canActivate: [AfterLoginService], data: {permiso: 'reporte_general_documento' }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReporteDocumentoRoutingModule { }

export const componentes = [ReporteDocumentoComponent];
