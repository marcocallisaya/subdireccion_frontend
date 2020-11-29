import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarreraComponent } from './components/carrera/carrera.component';
import { CarreraFormComponent } from './components/carrera-form/carrera-form.component';
import { ModalComponent } from './components/modal/modal.component';
import { ReporteDetallesComponent } from './components/reporte-detalles/reporte-detalles.component';
import { AfterLoginService } from 'src/app/core/guards/after-login.service';

const routes: Routes = [
  {path: '', component: CarreraComponent, canActivate: [AfterLoginService], data: {permiso: 'listar_carrera' }},
  {path: 'form', component: CarreraFormComponent, canActivate: [AfterLoginService], data: {permiso: 'crear_carrera' }},
  {path: 'form/:id', component: CarreraFormComponent, canActivate: [AfterLoginService], data: {permiso: 'editar_carrera' }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarreraRoutingModule { }

export const componentes = [CarreraComponent, CarreraFormComponent, ModalComponent, ReporteDetallesComponent];
