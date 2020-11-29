import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DerivacionFormComponent } from './components/derivacion-form/derivacion-form.component';
import { DerivacionComponent } from './components/derivacion/derivacion.component';
import { ModalComponent } from './components/modal/modal.component';
import { FuncionarioModalComponent } from './components/funcionario-modal/funcionario-modal.component';
import { ReporteDetallesComponent } from './components/reporte-detalles/reporte-detalles.component';
import { AfterLoginService } from 'src/app/core/guards/after-login.service';

const routes: Routes = [
  {path: '', component: DerivacionComponent, canActivate: [AfterLoginService], data: {permiso: 'listar_derivacion' }},
  {path: 'form', component: DerivacionFormComponent, canActivate: [AfterLoginService], data: {permiso: 'crear_derivacion' }},
  {path: 'form/:id', component: DerivacionFormComponent, canActivate: [AfterLoginService], data: {permiso: 'editar_derivacion' }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DerivacionRoutingModule { }

export const componentes = [DerivacionFormComponent, DerivacionComponent,
                            ModalComponent, FuncionarioModalComponent,
                            ReporteDetallesComponent];
