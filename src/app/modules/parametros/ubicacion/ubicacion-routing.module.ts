import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UbicacionComponent } from './components/ubicacion/ubicacion.component';
import { ModalComponent } from './components/modal/modal.component';
import { UbicacionFormComponent } from './components/ubicacion-form/ubicacion-form.component';
import { ReporteDetallesComponent } from './components/reporte-detalles/reporte-detalles.component';
import { DocumentoModalComponent } from './components/documento-modal/documento-modal.component';
import { AfterLoginService } from 'src/app/core/guards/after-login.service';

const routes: Routes = [
  {path: '', component: UbicacionComponent, canActivate: [AfterLoginService], data: {permiso: 'listar_ubicacion' }},
  {path: 'form', component: UbicacionFormComponent, canActivate: [AfterLoginService], data: {permiso: 'crear_ubicacion' }},
  {path: 'form/:id', component: UbicacionFormComponent, canActivate: [AfterLoginService], data: {permiso: 'editar_ubicacion' }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UbicacionRoutingModule { }

export const componentes = [UbicacionComponent, ModalComponent, UbicacionFormComponent, ReporteDetallesComponent, DocumentoModalComponent];
