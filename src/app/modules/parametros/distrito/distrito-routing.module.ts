import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DistritoComponent } from './components/distrito/distrito.component';
import { DistritoFormComponent } from './components/distrito-form/distrito-form.component';
import { ModalComponent } from './components/modal/modal.component';
import { ReporteDetallesComponent } from './components/reporte-detalles/reporte-detalles.component';
import { CentroModalComponent } from './components/centro-modal/centro-modal.component';
import { AfterLoginService } from 'src/app/core/guards/after-login.service';

const routes: Routes = [
  {path: '', component: DistritoComponent, canActivate: [AfterLoginService], data: {permiso: 'listar_distrito' }},
  {path: 'form', component: DistritoFormComponent, canActivate: [AfterLoginService], data: {permiso: 'crear_distrito' }},
  {path: 'form/:id', component: DistritoFormComponent, canActivate: [AfterLoginService], data: {permiso: 'editar_distrito' }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DistritoRoutingModule { }

export const componentes = [DistritoComponent, DistritoFormComponent, ModalComponent, ReporteDetallesComponent, CentroModalComponent];
