import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DistritoComponent } from './components/distrito/distrito.component';
import { DistritoFormComponent } from './components/distrito-form/distrito-form.component';
import { ModalComponent } from './components/modal/modal.component';

const routes: Routes = [
  {path: '', component: DistritoComponent},
  {path: 'form', component: DistritoFormComponent},
  {path: 'form/:id', component: DistritoFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DistritoRoutingModule { }

export const componentes = [DistritoComponent, DistritoFormComponent, ModalComponent];
