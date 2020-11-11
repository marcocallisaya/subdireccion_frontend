import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConvocatoriaComponent } from './components/convocatoria/convocatoria.component';
import { ConvocatoriaFormComponent } from './components/convocatoria-form/convocatoria-form.component';
import { ModalComponent } from './components/modal/modal.component';

const routes: Routes = [
  {path: '', component: ConvocatoriaComponent},
  {path: 'form', component: ConvocatoriaFormComponent},
  {path: 'form/:id', component: ConvocatoriaFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConvocatoriaRoutingModule { }

export const componentes = [ConvocatoriaComponent, ConvocatoriaFormComponent, ModalComponent];


