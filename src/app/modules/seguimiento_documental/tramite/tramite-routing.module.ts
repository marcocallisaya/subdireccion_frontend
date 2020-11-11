import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TramiteComponent } from './components/tramite/tramite.component';
import { TramiteFormComponent } from './components/tramite-form/tramite-form.component';
import { ModalComponent } from './components/modal/modal.component';

const routes: Routes = [
  {path: '', component: TramiteComponent},
  {path: 'form', component: TramiteFormComponent},
  {path: 'form/:id', component: TramiteFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TramiteRoutingModule { }

export const componentes = [TramiteComponent, TramiteFormComponent, ModalComponent];
