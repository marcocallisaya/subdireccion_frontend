import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RolComponent } from './components/rol/rol.component';
import { RolFormComponent } from './components/rol-form/rol-form.component';
import { ModalComponent } from './components/modal/modal.component';
import { ReporteDetallesComponent } from './components/reporte-detalles/reporte-detalles.component';

const routes: Routes = [
  {path: '', component: RolComponent},
  {path: 'form', component: RolFormComponent},
  {path: 'form/:id', component: RolFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolRoutingModule { }

export const componentes = [RolComponent, RolFormComponent, ModalComponent, ReporteDetallesComponent];
