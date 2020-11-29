import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AfterLoginService } from 'src/app/core/guards/after-login.service';
import { DevolucionFormComponent } from './components/devolucion-form/devolucion-form.component';
import { DevolucionComponent } from './components/devolucion/devolucion.component';
import { ModalComponent } from './components/modal/modal.component';
import { ReporteDetallesComponent } from './components/reporte-detalles/reporte-detalles.component';

const routes: Routes = [
  {path: '', component: DevolucionComponent, canActivate: [AfterLoginService], data: {permiso: 'listar_devolucion' }},
  {path: 'form', component: DevolucionFormComponent, canActivate: [AfterLoginService], data: {permiso: 'crear_devolucion' }},
  {path: 'form/:id', component: DevolucionFormComponent, canActivate: [AfterLoginService], data: {permiso: 'editar_devolucion' }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevolucionRoutingModule { }

export const componentes = [DevolucionFormComponent, DevolucionComponent, ModalComponent, ReporteDetallesComponent];
