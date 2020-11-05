import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicoComponent } from '../../core/publico/publico.component';

const routes: Routes = [
  {path: '', component: PublicoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule]
})
export class PublicoRoutingModule { }

export const components = [PublicoComponent];
