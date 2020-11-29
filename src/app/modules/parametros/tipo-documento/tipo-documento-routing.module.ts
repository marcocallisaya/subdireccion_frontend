import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipoDocumentoComponent } from './components/tipo-documento/tipo-documento.component';
import { TipoDocumentoFormComponent } from './components/tipo-documento-form/tipo-documento-form.component';
import { ModalComponent } from './components/modal/modal.component';
import { ReporteDetallesComponent } from './components/reporte-detalles/reporte-detalles.component';
import { AfterLoginService } from 'src/app/core/guards/after-login.service';

const routes: Routes = [
  {path: '', component: TipoDocumentoComponent, canActivate: [AfterLoginService], data: {permiso: 'listar_tipo_documento' }},
  {path: 'form', component: TipoDocumentoFormComponent, canActivate: [AfterLoginService], data: {permiso: 'crear_tipo_documento' }},
  {path: 'form/:id', component: TipoDocumentoFormComponent, canActivate: [AfterLoginService], data: {permiso: 'editar_tipo_documento' }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoDocumentoRoutingModule { }

export const componentes = [TipoDocumentoComponent, TipoDocumentoFormComponent, ModalComponent, ReporteDetallesComponent];
