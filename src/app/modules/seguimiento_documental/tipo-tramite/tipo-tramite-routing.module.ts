import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipoTramiteFormComponent } from './components/tipo-tramite-form/tipo-tramite-form.component';
import { TipoTramiteComponent } from './components/tipo-tramite/tipo-tramite.component';
import { ModalComponent } from './components/modal/modal.component';
import { AfterLoginService } from 'src/app/core/guards/after-login.service';


const routes: Routes = [
  {path: '', component: TipoTramiteComponent, canActivate: [AfterLoginService], data: {permiso: 'listar_tipo_tramite' }},
  {path: 'form', component: TipoTramiteFormComponent, canActivate: [AfterLoginService], data: {permiso: 'crear_tipo_tramite' }},
  {path: 'form/:id', component: TipoTramiteFormComponent, canActivate: [AfterLoginService], data: {permiso: 'editar_tipo_tramite' }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoTramiteRoutingModule { }

export const componentes = [TipoTramiteFormComponent, TipoTramiteComponent, ModalComponent];
