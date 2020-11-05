import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', loadChildren: () => import(`./modules/publico/publico.module`).then(m => m.PublicoModule) },
  {path: 'publico', loadChildren: () => import(`./modules/publico/publico.module`).then(m => m.PublicoModule) },
  {path: 'sistema', loadChildren: () => import(`./modules/sistema/sistema.module`).then(m => m.SistemaModule) },
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
