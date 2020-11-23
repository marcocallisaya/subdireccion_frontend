import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModalComponent } from './components/modal/modal.component';
import { EvaluacionComponent } from './components/evaluacion/evaluacion.component';
import { EvaluacionFormComponent } from './components/evaluacion-form/evaluacion-form.component';
import { ReporteDetallesComponent } from './components/reporte-detalles/reporte-detalles.component';

const routes: Routes = [
  {path: '', component: EvaluacionComponent},
  {path: 'form', component: EvaluacionFormComponent},
  {path: 'form/:id', component: EvaluacionFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvaluacionRoutingModule { }

export const componentes = [ModalComponent, EvaluacionComponent, EvaluacionFormComponent, ReporteDetallesComponent];
