import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstanteComponent } from './components/estante/estante.component';
import { EstanteFormComponent } from './components/estante-form/estante-form.component';
import { ModalComponent } from './components/modal/modal.component';
import { ReporteDetallesComponent } from './components/reporte-detalles/reporte-detalles.component';
import { UbicacionModalComponent } from './components/ubicacion-modal/ubicacion-modal.component';

const routes: Routes = [
  {path: '', component: EstanteComponent},
  {path: 'form', component: EstanteFormComponent},
  {path: 'form/:id', component: EstanteFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstanteRoutingModule { }

export const components = [EstanteComponent, EstanteFormComponent, ModalComponent, ReporteDetallesComponent, UbicacionModalComponent];
