import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TramiteService } from 'src/app/core/services/tramite.service';
import { Solicitante } from 'src/app/shared/models/solicitante.model';
import { Tramite } from 'src/app/shared/models/tramite.model';
import { DerivacionModalComponent } from '../derivacion-modal/derivacion-modal.component';
import { DevolucionModalComponent } from '../devolucion-modal/devolucion-modal.component';
import { DocumentoModalComponent } from '../documento-modal/documento-modal.component';
import { EvaluacionModalComponent } from '../evaluacion-modal/evaluacion-modal.component';
import { ModalComponent } from '../modal/modal.component';
import { SolicitanteModalComponent } from '../solicitante-modal/solicitante-modal.component';
import { SolicitudModalComponent } from '../solicitud-modal/solicitud-modal.component';
import {ReporteDetallesComponent} from '../reporte-detalles/reporte-detalles.component';

@Component({
  selector: 'app-tramite',
  templateUrl: './tramite.component.html',
  styleUrls: ['./tramite.component.scss']
})
export class TramiteComponent implements OnInit, OnDestroy {

  // permisos locales
  consultarPermiso = 'consultar_tramite';
  reportePermiso = 'reporte_tramite';
  permisos = JSON.parse(localStorage.getItem('permisos'));

  banderaDatos: string ;

  titulo;
  dias: number;

  tramite$: Subscription = new Subscription();

  tipos = [{codigo: 'Referencia', value: 'referencia'}, {codigo: 'Codigo', value: 'codigo'}];

  constructor(private router: Router,
              private servicio: TramiteService,
              public dialog: MatDialog,
              private paginator: MatPaginatorIntl) { }

  // lista de atributos del modelo para la tabla
  displayedColumns: string[] = [ 'codigo', 'referencia', 'tramite_estado',  'tiempo' ,   'ver', 'solicitante', 'solicitud', 'derivacion', 'evaluacion', 'devolucion', 'documentos' ];

  dataSource; // fuente de datos para la tabla

  BanderaDatos: boolean; // bandera para la carga de datos

  // variables para la paginacion
  length = 100;
  pageSize = 5;
  currentPage = 1;
  pageSizeOptions: number[] = [5, 10, 20];
  pageEvent: PageEvent;

  ngOnInit(): void {
    this.cargarTabla(this.pageSize, this.currentPage);
    this.cambiarIdiomaPaginacion();
  }

  cambiarIdiomaPaginacion(): void {
    this.paginator.itemsPerPageLabel = 'Registros por página';
    this.paginator.previousPageLabel = 'Pagina Anterior';
    this.paginator.nextPageLabel = 'Pagina Siguiente';
  }

  cargarTabla(size: number, current: number): void {
  this.tramite$ =  this.servicio.getPaginated(size, current).subscribe((res: any) =>
    {
     this.dataSource = res.data; console.log(res);
     this.length = res.meta?.pagination.total;
     this.BanderaDatos = true;
    });
  }

  cargarDatosBusqueda(nombre: string, tipo: string): void {
      this.comprobarBuscadorVacio(nombre);
      this.cargarTablaFiltrada(this.pageSize, this.currentPage, nombre, tipo);
      this.banderaDatos = nombre;
  }

  comprobarBuscadorVacio(nombre: string): void {
    if (this.banderaDatos !== nombre) {
      this.pageSize = 5;
      this.currentPage =  1;
    }
  }

  cargarTablaFiltrada(size: number, current: number, nombre: string, tipo: string): void {
    this.tramite$ =  this.servicio.getFiltered(size, current, nombre, tipo).subscribe((res: any) =>
    {
     this.dataSource = res.data; console.log(res);
     this.length = res.meta?.pagination.total;
    });
  }

   // ver modelo
   ver(tramite: Tramite): void {
     if (this.verificarPermisos(this.consultarPermiso)) {
      this.dialog.open(ModalComponent, {width: '40vw', data:  tramite });
     }
  }

  verSolicitante(solicitante: Solicitante): void {
    if (this.verificarPermisos(this.consultarPermiso)) {
      this.dialog.open(SolicitanteModalComponent, {width: '40vw', data:  solicitante });
    }
  }

  verSolicitud(solicitud: any): void {
    if (this.verificarPermisos(this.consultarPermiso)) {
      this.dialog.open(SolicitudModalComponent, {width: '40vw', data:  solicitud });
    }
  }

  verDerivacion(derivacion: any): void {
    if (this.verificarPermisos(this.consultarPermiso)) {
      this.dialog.open(DerivacionModalComponent, {width: '40vw', data:  derivacion });
    }
  }

  verEvaluacion(evaluacion: any): void {
    if (this.verificarPermisos(this.consultarPermiso)) {
      this.dialog.open(EvaluacionModalComponent, {width: '40vw', data:  evaluacion });
    }
  }

  verDevolucion(devolucion: any): void {
    if (this.verificarPermisos(this.consultarPermiso)) {
      this.dialog.open(DevolucionModalComponent, {width: '40vw', data:  devolucion });
    }
  }

  verDocumentos(documentos: any): void {
    if (this.verificarPermisos(this.consultarPermiso)) {
      this.dialog.open(DocumentoModalComponent, {width: '40vw', maxHeight: '80vh',  data:  documentos });
    }
 }

  comprobarDerivacion(data: any): boolean {
    return (data.derivacion === null) ? true : false;
  }

  comprobarEvaluacion(data: any): boolean {
    return (data.evaluacion === null) ? true : false;
  }

  comprobarDevolucion(data: any): boolean {
    return (data.devolucion === null) ? true : false;
  }

  comprobarDocumentos(data: any): boolean {
    return (data.documentos.length === 0) ? true : false;
  }

   // evento de paginacion
   pagination(event: PageEvent, nombre: string, tipo): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.verificarTipoTabla(nombre, tipo);
  }

  verificarTipoTabla(nombre: string, tipo): void {
    if (nombre === '') {
      this.cargarTabla(this.pageSize, this.currentPage);
    }
    else {
      this.cargarTablaFiltrada(this.pageSize, this.currentPage, nombre, tipo);
    }
  }

  // metodos para las etiquetas

  colorEstado(element, fechaLimite): string {

    if (element.derivacion === null) {
      this.titulo = 'Sin derivacion';
      return 'badge-info';
    }

    if (element.tramite_estado === 'DEVOLUCION') {
      this.titulo = 'Completado';
      return 'badge-dark';
    }

    const fechaInicial = element.derivacion.created_at;
    const fechaI = new Date();
    const fechaII = new Date(fechaLimite);

    const resta = fechaII.getTime() - fechaI.getTime();

    const dias = Math.round(resta / (1000 * 60 * 60 * 24)) ;
    // this.dias = dias;
    this.tituloEstado(dias + 1);
    if ((dias + 1) < 0) {
      return 'badge-danger';
    }else if ((dias + 1) <= 3) {
      return 'badge-dark';
    } else if ((dias + 1) <= 6) {
      return 'badge-warning';
    } else {
      return 'badge-success';
    }
  }

  tituloEstado(dias): void {
    if (dias < 0) {
      this.titulo =  'Atrasado ' + dias * -1 + ' dia(s)';
    }
    else{
      this.titulo =  dias + ' dias';
    }
    
   /*  if (dias < 0) {
      this.titulo = dias + ' dias';
    }else if (dias <= 3) {
      this.titulo = 'ATRASADO';
    } else if (dias <= 7) {
      this.titulo = 'NO OLVIDAR';
    } else {
      this.titulo = 'A TIEMPO';
    } */
  }

  controlarDias(dias): number {
    return dias < 0 ? 0 : dias;
  }

  abrirReporteDetalles(): void  {
    if (this.verificarPermisos(this.reportePermiso)) {
      this.dialog.open(ReporteDetallesComponent, {maxWidth:  '60vw', maxHeight: '90vh'});
    }
  }

  verificarPermisos(permiso): boolean {
    return (this.permisos.includes(permiso)) ? true : false;
  }

  ngOnDestroy(): void {
    this.tramite$.unsubscribe();
  }

}
