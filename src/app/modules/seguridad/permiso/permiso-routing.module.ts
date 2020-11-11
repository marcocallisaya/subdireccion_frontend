import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermisoComponent } from './components/permiso/permiso.component';
import { PermisoFormComponent } from './components/permiso-form/permiso-form.component';


const routes: Routes = [
  {path: '', component: PermisoComponent},
  {path: 'form', component: PermisoFormComponent},
  {path: 'form/:id', component: PermisoFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermisoRoutingModule { }

export const componentes = [PermisoComponent, PermisoFormComponent];

