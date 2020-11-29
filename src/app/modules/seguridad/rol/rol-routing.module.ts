import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RolComponent } from './components/rol/rol.component';
import { RolFormComponent } from './components/rol-form/rol-form.component';
import { ModalComponent } from './components/modal/modal.component';
import { ReporteDetallesComponent } from './components/reporte-detalles/reporte-detalles.component';
import { PermisoComponent } from './components/permiso/permiso.component';
import { AfterLoginService } from 'src/app/core/guards/after-login.service';

const routes: Routes = [
  {path: '', component: RolComponent, canActivate: [AfterLoginService], data: {permiso: 'listar_rol' }},
  {path: 'form', component: RolFormComponent, canActivate: [AfterLoginService], data: {permiso: 'crear_rol' }},
  {path: 'form/:id', component: RolFormComponent, canActivate: [AfterLoginService], data: {permiso: 'editar_rol' }},
  {path: 'permiso/:id', component: PermisoComponent, canActivate: [AfterLoginService], data: {permiso: 'asignar_permiso_rol' }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolRoutingModule { }

export const componentes = [RolComponent, RolFormComponent, ModalComponent, ReporteDetallesComponent, PermisoComponent];
