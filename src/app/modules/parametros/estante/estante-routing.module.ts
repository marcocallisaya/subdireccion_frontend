import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstanteComponent } from './components/estante/estante.component';
import { EstanteFormComponent } from './components/estante-form/estante-form.component';
import { ModalComponent } from './components/modal/modal.component';
import { ReporteDetallesComponent } from './components/reporte-detalles/reporte-detalles.component';
import { UbicacionModalComponent } from './components/ubicacion-modal/ubicacion-modal.component';
import { AfterLoginService } from 'src/app/core/guards/after-login.service';

const routes: Routes = [
  {path: '', component: EstanteComponent, canActivate: [AfterLoginService], data: {permiso: 'listar_estante' }},
  {path: 'form', component: EstanteFormComponent, canActivate: [AfterLoginService], data: {permiso: 'crear_estante' }},
  {path: 'form/:id', component: EstanteFormComponent, canActivate: [AfterLoginService], data: {permiso: 'editar_estante' }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstanteRoutingModule { }

export const components = [EstanteComponent, EstanteFormComponent, ModalComponent, ReporteDetallesComponent, UbicacionModalComponent];
