import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipoTramiteFormComponent } from './components/tipo-tramite-form/tipo-tramite-form.component';
import { TipoTramiteComponent } from './components/tipo-tramite/tipo-tramite.component';
import { ModalComponent } from './components/modal/modal.component';


const routes: Routes = [
  {path: '', component: TipoTramiteComponent},
  {path: 'form', component: TipoTramiteFormComponent},
  {path: 'form/:id', component: TipoTramiteFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoTramiteRoutingModule { }

export const componentes = [TipoTramiteFormComponent, TipoTramiteComponent, ModalComponent];
