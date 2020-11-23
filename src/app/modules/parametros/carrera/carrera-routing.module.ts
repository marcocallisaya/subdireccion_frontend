import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarreraComponent } from './components/carrera/carrera.component';
import { CarreraFormComponent } from './components/carrera-form/carrera-form.component';
import { ModalComponent } from './components/modal/modal.component';
import { ReporteDetallesComponent } from './components/reporte-detalles/reporte-detalles.component';

const routes: Routes = [
  {path: '', component: CarreraComponent},
  {path: 'form', component: CarreraFormComponent},
  {path: 'form/:id', component: CarreraFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarreraRoutingModule { }

export const componentes = [CarreraComponent, CarreraFormComponent, ModalComponent, ReporteDetallesComponent];
