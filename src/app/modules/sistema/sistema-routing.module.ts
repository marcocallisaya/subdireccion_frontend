import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SistemaComponent } from '../../core/sistema/sistema.component';
import {DatosUsuarioComponent} from '../../core/datos-usuario/datos-usuario.component';
import { DatosPersonalesComponent } from 'src/app/core/datos-personales/datos-personales.component';


const routes: Routes = [
  {path: '', component: SistemaComponent, children: [
    {path: 'datos_personales', component: DatosPersonalesComponent},
    {path: 'datos_usuario', component: DatosUsuarioComponent},
    {path: 'documento', loadChildren: () => import('../seguimiento_documental/documento/documento.module').then(m => m.DocumentoModule)},
    {path: 'tipo_solicitante', loadChildren: () =>
    import('../seguimiento_documental/tipo-solicitante/tipo-solicitante.module').then(m => m.TipoSolicitanteModule)},
    {path: 'solicitante', loadChildren: () =>
    import('../seguimiento_documental/solicitante/solicitante.module').then(m => m.SolicitanteModule)},
    {path: 'tipo_tramite', loadChildren: () =>
    import('../seguimiento_documental/tipo-tramite/tipo-tramite.module').then(m => m.TipoTramiteModule)},
    {path: 'tramite', loadChildren: () =>
    import('../seguimiento_documental/tramite/tramite.module').then(m => m.TramiteModule)},
    {path: 'solicitud', loadChildren: () =>
    import('../seguimiento_documental/solicitud/solicitud.module').then(m => m.SolicitudModule)},
    {path: 'derivacion', loadChildren: () =>
    import('../seguimiento_documental/derivacion/derivacion.module').then(m => m.DerivacionModule)},
    {path: 'evaluacion', loadChildren: () =>
    import('../seguimiento_documental/evaluacion/evaluacion.module').then(m => m.EvaluacionModule)},
    {path: 'devolucion', loadChildren: () =>
    import('../seguimiento_documental/devolucion/devolucion.module').then(m => m.DevolucionModule)},
    {path: 'instructivo', loadChildren: () =>
    import('../publicaciones/instructivo/instructivo.module').then(m => m.InstructivoModule)},
    {path: 'circular', loadChildren: () =>
    import('../publicaciones/circular/circular.module').then(m => m.CircularModule)},
    {path: 'convocatoria', loadChildren: () =>
    import('../publicaciones/convocatoria/convocatoria.module').then(m => m.ConvocatoriaModule)},
    {path: 'reporte_tramite', loadChildren: () =>
    import('../reportes/reporte-tramite/reporte-tramite.module').then(m => m.ReporteTramiteModule)},
    {path: 'reporte_documento', loadChildren: () =>
    import('../reportes/reporte-documento/reporte-documento.module').then(m => m.ReporteDocumentoModule)},
    {path: 'carrera', loadChildren: () =>
    import('../parametros/carrera/carrera.module').then(m => m.CarreraModule)},
    {path: 'centro_formacion', loadChildren: () =>
    import('../parametros/centro-formacion/centro-formacion.module').then(m => m.CentroFormacionModule)},
    {path: 'distrito', loadChildren: () =>
    import('../parametros/distrito/distrito.module').then(m => m.DistritoModule)},
    {path: 'estante', loadChildren: () =>
    import('../parametros/estante/estante.module').then(m => m.EstanteModule)},
    {path: 'funcionario', loadChildren: () =>
    import('../parametros/funcionario/funcionario.module').then(m => m.FuncionarioModule)},
    {path: 'tipo_documento', loadChildren: () =>
    import('../parametros/tipo-documento/tipo-documento.module').then(m => m.TipoDocumentoModule)},
    {path: 'ubicacion', loadChildren: () =>
    import('../parametros/ubicacion/ubicacion.module').then(m => m.UbicacionModule)},
    {path: 'bitacora', loadChildren: () =>
    import('../seguridad/bitacora/bitacora.module').then(m => m.BitacoraModule)},
    {path: 'rol', loadChildren: () =>
    import('../seguridad/rol/rol.module').then(m => m.RolModule)},
    {path: 'permiso', loadChildren: () =>
    import('../seguridad/permiso/permiso.module').then(m => m.PermisoModule)},
    {path: 'usuario', loadChildren: () =>
    import('../seguridad/usuario/usuario.module').then(m => m.UsuarioModule)}
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SistemaRoutingModule { }

export const components = [SistemaComponent, DatosPersonalesComponent, DatosUsuarioComponent];
