import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AfterLoginService } from 'src/app/core/guards/after-login.service';
import { ReporteTramiteComponent } from './reporte-tramite/reporte-tramite.component';
import { TramiteGeneralComponent } from './tramite-general/tramite-general.component';
import { TramiteIndividualComponent } from './tramite-individual/tramite-individual.component';

const routes: Routes = [
  {path: '', component: ReporteTramiteComponent, canActivate: [AfterLoginService], data: {permiso: 'reporte_tramite' }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReporteTramiteRoutingModule { }

export const componentes = [ReporteTramiteComponent, TramiteGeneralComponent, TramiteIndividualComponent];
