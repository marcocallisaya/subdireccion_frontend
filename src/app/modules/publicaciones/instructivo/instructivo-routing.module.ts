import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstructivoComponent } from './components/instructivo/instructivo.component';
import { InstructivoFormComponent } from './components/instructivo-form/instructivo-form.component';
import { ModalComponent } from './components/modal/modal.component';

const routes: Routes = [
  {path: '', component: InstructivoComponent},
  {path: 'form', component: InstructivoFormComponent},
  {path: 'form/:id', component: InstructivoFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructivoRoutingModule { }

export const components = [InstructivoComponent, InstructivoFormComponent, ModalComponent];
