import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermisoComponent } from './components/permiso/permiso.component';
import { PermisoFormComponent } from './components/permiso-form/permiso-form.component';
import { ModalComponent } from './components/modal/modal.component';
import { ReporteDetallesComponent } from './components/reporte-detalles/reporte-detalles.component';
import { AfterLoginService } from 'src/app/core/guards/after-login.service';

const routes: Routes = [
  {path: '', component: PermisoComponent, canActivate: [AfterLoginService], data: {permiso: 'listar_permiso' }},
  {path: 'form', component: PermisoFormComponent, canActivate: [AfterLoginService], data: {permiso: 'crear_permiso' }},
  {path: 'form/:id', component: PermisoFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermisoRoutingModule { }

export const componentes = [PermisoComponent, PermisoFormComponent, ModalComponent, ReporteDetallesComponent];

