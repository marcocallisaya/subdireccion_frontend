import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipoDocumentoComponent } from './components/tipo-documento/tipo-documento.component';
import { TipoDocumentoFormComponent } from './components/tipo-documento-form/tipo-documento-form.component';
import { ModalComponent } from './components/modal/modal.component';

const routes: Routes = [
  {path: '', component: TipoDocumentoComponent},
  {path: 'form', component: TipoDocumentoFormComponent},
  {path: 'form/:id', component: TipoDocumentoFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoDocumentoRoutingModule { }

export const componentes = [TipoDocumentoComponent, TipoDocumentoFormComponent, ModalComponent];
