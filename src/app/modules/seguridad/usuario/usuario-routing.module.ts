import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { UsuarioFormComponent } from './components/usuario-form/usuario-form.component';

const routes: Routes = [
  {path: '', component: UsuarioComponent},
  {path: 'form', component: UsuarioFormComponent},
  {path: 'form/:id', component: UsuarioFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }

export const componentes = [UsuarioComponent, UsuarioFormComponent];
