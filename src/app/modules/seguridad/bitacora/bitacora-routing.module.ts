import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BitacoraComponent } from './bitacora/bitacora.component';

const routes: Routes = [
  {path: '', component: BitacoraComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BitacoraRoutingModule { }

export const componentes = [BitacoraComponent];
