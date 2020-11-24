import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConvocatoriaComponent } from './components/convocatoria/convocatoria.component';
import { ConvocatoriaFormComponent } from './components/convocatoria-form/convocatoria-form.component';
import { ModalComponent } from './components/modal/modal.component';
import { PublicacionModalComponent } from './components/publicacion-modal/publicacion-modal.component';
import { ReporteDetallesComponent } from './components/reporte-detalles/reporte-detalles.component';

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

export const componentes = [ConvocatoriaComponent, ConvocatoriaFormComponent, ModalComponent,
                            PublicacionModalComponent, ReporteDetallesComponent];


