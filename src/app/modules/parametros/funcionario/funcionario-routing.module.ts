import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FuncionarioComponent } from './components/funcionario/funcionario.component';
import { FuncionarioFormComponent } from './components/funcionario-form/funcionario-form.component';
import { ModalComponent } from './components/modal/modal.component';

const routes: Routes = [
  {path: '', component: FuncionarioComponent},
  {path: 'form', component: FuncionarioFormComponent},
  {path: 'form/:id', component: FuncionarioFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FuncionarioRoutingModule { }

export const componentes = [FuncionarioComponent, FuncionarioFormComponent, ModalComponent];
