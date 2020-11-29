import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { UsuarioFormComponent } from './components/usuario-form/usuario-form.component';
import { ReporteDetallesComponent } from './components/reporte-detalles/reporte-detalles.component';
import { ModalComponent } from './components/modal/modal.component';
import { AfterLoginService } from 'src/app/core/guards/after-login.service';

const routes: Routes = [
  {path: '', component: UsuarioComponent, canActivate: [AfterLoginService], data: {permiso: 'listar_usuario' }},
  {path: 'form', component: UsuarioFormComponent, canActivate: [AfterLoginService], data: {permiso: 'crear_usuario' }},
  {path: 'form/:id', component: UsuarioFormComponent, canActivate: [AfterLoginService], data: {permiso: 'editar_usuario' }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }

export const componentes = [UsuarioComponent, UsuarioFormComponent, ReporteDetallesComponent, ModalComponent];
