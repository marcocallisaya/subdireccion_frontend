import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DerivacionFormComponent } from './components/derivacion-form/derivacion-form.component';
import { DerivacionComponent } from './components/derivacion/derivacion.component';
import { ModalComponent } from './components/modal/modal.component';
import { FuncionarioModalComponent } from './components/funcionario-modal/funcionario-modal.component';
import { ReporteDetallesComponent } from './components/reporte-detalles/reporte-detalles.component';

const routes: Routes = [
  {path: '', component: DerivacionComponent},
  {path: 'form', component: DerivacionFormComponent},
  {path: 'form/:id', component: DerivacionFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DerivacionRoutingModule { }

export const componentes = [DerivacionFormComponent, DerivacionComponent, ModalComponent, FuncionarioModalComponent, ReporteDetallesComponent];
