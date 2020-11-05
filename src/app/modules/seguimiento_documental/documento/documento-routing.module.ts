import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentoFormComponent } from './components/documento-form/documento-form.component';
import { DocumentoComponent } from './components/documento/documento.component';
import { ModalComponent } from './components/modal/modal.component';

const routes: Routes = [
  {path: '', component: DocumentoComponent},
  {path: 'form', component: DocumentoFormComponent},
  {path: 'form/:id', component: DocumentoFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentoRoutingModule { }

export const componentes = [DocumentoFormComponent, DocumentoComponent, ModalComponent];