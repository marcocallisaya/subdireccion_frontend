import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UbicacionComponent } from './components/ubicacion/ubicacion.component';
import { ModalComponent } from './components/modal/modal.component';
import { UbicacionFormComponent } from './components/ubicacion-form/ubicacion-form.component';
import { ReporteDetallesComponent } from './components/reporte-detalles/reporte-detalles.component';
import { DocumentoModalComponent } from './components/documento-modal/documento-modal.component';

const routes: Routes = [
  {path: '', component: UbicacionComponent},
  {path: 'form', component: UbicacionFormComponent},
  {path: 'form/:id', component: UbicacionFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UbicacionRoutingModule { }

export const componentes = [UbicacionComponent, ModalComponent, UbicacionFormComponent, ReporteDetallesComponent, DocumentoModalComponent];
