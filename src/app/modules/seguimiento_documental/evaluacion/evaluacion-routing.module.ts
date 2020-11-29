import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModalComponent } from './components/modal/modal.component';
import { EvaluacionComponent } from './components/evaluacion/evaluacion.component';
import { EvaluacionFormComponent } from './components/evaluacion-form/evaluacion-form.component';
import { ReporteDetallesComponent } from './components/reporte-detalles/reporte-detalles.component';
import { AfterLoginService } from 'src/app/core/guards/after-login.service';

const routes: Routes = [
  {path: '', component: EvaluacionComponent, canActivate: [AfterLoginService], data: {permiso: 'listar_evaluacion' }},
  {path: 'form', component: EvaluacionFormComponent, canActivate: [AfterLoginService], data: {permiso: 'crear_evaluacion' }},
  {path: 'form/:id', component: EvaluacionFormComponent, canActivate: [AfterLoginService], data: {permiso: 'editar_evalaucion' }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvaluacionRoutingModule { }

export const componentes = [ModalComponent, EvaluacionComponent, EvaluacionFormComponent, ReporteDetallesComponent];
