import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConvocatoriaComponent } from './components/convocatoria/convocatoria.component';
import { ConvocatoriaFormComponent } from './components/convocatoria-form/convocatoria-form.component';
import { ModalComponent } from './components/modal/modal.component';
import { PublicacionModalComponent } from './components/publicacion-modal/publicacion-modal.component';
import { ReporteDetallesComponent } from './components/reporte-detalles/reporte-detalles.component';
import { AfterLoginService } from 'src/app/core/guards/after-login.service';

const routes: Routes = [
  {path: '', component: ConvocatoriaComponent, canActivate: [AfterLoginService], data: {permiso: 'listar_convocatoria' }},
  {path: 'form', component: ConvocatoriaFormComponent, canActivate: [AfterLoginService], data: {permiso: 'crear_convocatoria' }},
  {path: 'form/:id', component: ConvocatoriaFormComponent, canActivate: [AfterLoginService], data: {permiso: 'editar_convocatoria' }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConvocatoriaRoutingModule { }

export const componentes = [ConvocatoriaComponent, ConvocatoriaFormComponent, ModalComponent,
                            PublicacionModalComponent, ReporteDetallesComponent];


