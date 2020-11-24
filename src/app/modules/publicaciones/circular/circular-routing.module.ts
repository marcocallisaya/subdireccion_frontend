import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModalComponent } from './components/modal/modal.component';
import { CircularComponent } from './components/circular/circular.component';
import { CircularFormComponent } from './components/circular-form/circular-form.component';
import { ReporteDetallesComponent } from './components/reporte-detalles/reporte-detalles.component';
import { PublicacionModalComponent } from './components/publicacion-modal/publicacion-modal.component';

const routes: Routes = [
  {path: '', component: CircularComponent},
  {path: 'form', component: CircularFormComponent},
  {path: 'form/:id', component: CircularFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CircularRoutingModule { }

export const componentes = [ModalComponent, CircularComponent, CircularFormComponent,
                            ReporteDetallesComponent, PublicacionModalComponent];
