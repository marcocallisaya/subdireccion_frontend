import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CentroFormacionComponent } from './components/centro-formacion/centro-formacion.component';
import { CentroFormacionFormComponent } from './components/centro-formacion-form/centro-formacion-form.component';
import { ModalComponent } from './components/modal/modal.component';
import { ReporteDetallesComponent } from './components/reporte-detalles/reporte-detalles.component';
import { MapaModalComponent } from './components/mapa-modal/mapa-modal.component';
import { FotoModalComponent } from './components/foto-modal/foto-modal.component';
import { CarreraModalComponent } from './components/carrera-modal/carrera-modal.component';
import { AfterLoginService } from 'src/app/core/guards/after-login.service';

const routes: Routes = [
  {path: '', component: CentroFormacionComponent, canActivate: [AfterLoginService], data: {permiso: 'listar_centro_formacion' }},
  {path: 'form', component: CentroFormacionFormComponent, canActivate: [AfterLoginService], data: {permiso: 'crear_centro_formacion' }},
  {path: 'form/:id', component: CentroFormacionFormComponent, canActivate: [AfterLoginService], data: {permiso: 'editar_centro_formacion' }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CentroFormacionRoutingModule { }

export const componentes = [CentroFormacionComponent, CentroFormacionFormComponent, ModalComponent, ReporteDetallesComponent, MapaModalComponent, FotoModalComponent, CarreraModalComponent];
