import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstructivoComponent } from './components/instructivo/instructivo.component';
import { InstructivoFormComponent } from './components/instructivo-form/instructivo-form.component';
import { ModalComponent } from './components/modal/modal.component';
import { ReporteDetallesComponent } from './components/reporte-detalles/reporte-detalles.component';
import { PublicacionModalComponent } from './components/publicacion-modal/publicacion-modal.component';
import { AfterLoginService } from 'src/app/core/guards/after-login.service';

const routes: Routes = [
  {path: '', component: InstructivoComponent, canActivate: [AfterLoginService], data: {permiso: 'listar_instructivo' }},
  {path: 'form', component: InstructivoFormComponent, canActivate: [AfterLoginService], data: {permiso: 'crear_instructivo' }},
  {path: 'form/:id', component: InstructivoFormComponent, canActivate: [AfterLoginService], data: {permiso: 'editar_instructivo' }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructivoRoutingModule { }

export const components = [InstructivoComponent, InstructivoFormComponent, 
                           ModalComponent, ReporteDetallesComponent, PublicacionModalComponent];
