import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentoFormComponent } from './components/documento-form/documento-form.component';
import { DocumentoComponent } from './components/documento/documento.component';
import { ModalComponent } from './components/modal/modal.component';
import { ReporteDetallesComponent } from './components/reporte-detalles/reporte-detalles.component';
import { ReporteReferenciaComponent } from './components/reporte-referencia/reporte-referencia.component';
import {AfterLoginService} from 'src/app/core/guards/after-login.service';

const routes: Routes = [
  {path: '', component: DocumentoComponent, canActivate: [AfterLoginService], data: {permiso: 'listar_documento' }},
  {path: 'form', component: DocumentoFormComponent, canActivate: [AfterLoginService], data: {permiso: 'crear_documento' }},
  {path: 'form/:id', component: DocumentoFormComponent, canActivate: [AfterLoginService], data: {permiso: 'editar_documento' }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentoRoutingModule { }

export const componentes = [DocumentoFormComponent, DocumentoComponent,
                            ModalComponent, ReporteDetallesComponent, ReporteReferenciaComponent];
