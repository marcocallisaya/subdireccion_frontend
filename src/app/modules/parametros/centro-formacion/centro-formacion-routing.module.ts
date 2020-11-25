import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CentroFormacionComponent } from './components/centro-formacion/centro-formacion.component';
import { CentroFormacionFormComponent } from './components/centro-formacion-form/centro-formacion-form.component';
import { ModalComponent } from './components/modal/modal.component';
import { ReporteDetallesComponent } from './components/reporte-detalles/reporte-detalles.component';
import { MapaModalComponent } from './components/mapa-modal/mapa-modal.component';
import { FotoModalComponent } from './components/foto-modal/foto-modal.component';
import { CarreraModalComponent } from './components/carrera-modal/carrera-modal.component';

const routes: Routes = [
  {path: '', component: CentroFormacionComponent},
  {path: 'form', component: CentroFormacionFormComponent},
  {path: 'form/:id', component: CentroFormacionFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CentroFormacionRoutingModule { }

export const componentes = [CentroFormacionComponent, CentroFormacionFormComponent, ModalComponent, ReporteDetallesComponent, MapaModalComponent, FotoModalComponent, CarreraModalComponent];
