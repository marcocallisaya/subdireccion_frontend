import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModalComponent } from './components/modal/modal.component';
import { CircularComponent } from './components/circular/circular.component';
import { CircularFormComponent } from './components/circular-form/circular-form.component';

const routes: Routes = [
  {path: '', component: CircularComponent},
  {path: 'form', component: CircularComponent},
  {path: 'form/:id', component: CircularComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CircularRoutingModule { }

export const componentes = [ModalComponent, CircularComponent, CircularFormComponent];
