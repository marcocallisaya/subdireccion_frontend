import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SistemaComponent } from '../../core/sistema/sistema.component';


const routes: Routes = [
  {path: '', component: SistemaComponent, children: [
    {path: 'documento', loadChildren: () => import('../seguimiento_documental/documento/documento.module').then(m => m.DocumentoModule)},
    {path: 'tipo_solicitante', loadChildren: () =>
    import('../seguimiento_documental/tipo-solicitante/tipo-solicitante.module').then(m => m.TipoSolicitanteModule)},
    {path: 'solicitante', loadChildren: () =>
    import('../seguimiento_documental/solicitante/solicitante.module').then(m => m.SolicitanteModule)}
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SistemaRoutingModule { }

export const components = [SistemaComponent];
