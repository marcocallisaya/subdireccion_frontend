import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DevolucionFormComponent } from './components/devolucion-form/devolucion-form.component';
import { DevolucionComponent } from './components/devolucion/devolucion.component';
import { ModalComponent } from './components/modal/modal.component';

const routes: Routes = [
  {path: '', component: DevolucionComponent},
  {path: 'form', component: DevolucionFormComponent},
  {path: 'form/:id', component: DevolucionFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevolucionRoutingModule { }

export const componentes = [DevolucionFormComponent, DevolucionComponent, ModalComponent];
