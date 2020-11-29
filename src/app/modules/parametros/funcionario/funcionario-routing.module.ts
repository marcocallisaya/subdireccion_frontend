import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FuncionarioComponent } from './components/funcionario/funcionario.component';
import { FuncionarioFormComponent } from './components/funcionario-form/funcionario-form.component';
import { ModalComponent } from './components/modal/modal.component';
import { ReporteDetallesComponent } from './components/reporte-detalles/reporte-detalles.component';
import { AfterLoginService } from 'src/app/core/guards/after-login.service';

const routes: Routes = [
  {path: '', component: FuncionarioComponent, canActivate: [AfterLoginService], data: {permiso: 'listar_funcionario' }},
  {path: 'form', component: FuncionarioFormComponent, canActivate: [AfterLoginService], data: {permiso: 'crear_funcionario' }},
  {path: 'form/:id', component: FuncionarioFormComponent, canActivate: [AfterLoginService], data: {permiso: 'editar_funcionario' }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FuncionarioRoutingModule { }

export const componentes = [FuncionarioComponent, FuncionarioFormComponent, ModalComponent, ReporteDetallesComponent];
