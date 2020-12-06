import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TramiteService } from 'src/app/core/services/tramite.service';
import { Devolucion } from 'src/app/shared/models/devolucion.model';
import { Evaluacion } from 'src/app/shared/models/evaluacion.model';
import { Solicitante } from 'src/app/shared/models/solicitante.model';
import { Solicitud } from 'src/app/shared/models/solicitud.model';
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

  tramite$: Subscription = new Subscription();

  constructor(private router: Router,
              private servicio: TramiteService,
              public dialog: MatDialog,
              private paginator: MatPaginatorIntl) { }

  // lista de atributos del modelo para la tabla
  displayedColumns: string[] = ['tramite_estado' , 'referencia', 'codigo'];

  // objeto con los atributos de las opciones de la tabla
  opciones = [{nombre: 'ver', boton: 'accent', icono: 'fas fa-eye'},
              {nombre: 'solicitante', boton: 'warn', icono: 'fas fa-user-alt'},
              {nombre: 'solicitud', boton: 'accent', icono: 'fas fa-clipboard-check'},
              {nombre: 'derivacion', boton: 'primary', icono: 'fas fa-share-square'},
              {nombre: 'evaluacion', boton: 'accent', icono: 'fas fa-glasses'},
              {nombre: 'devolucion', boton: 'primary', icono: 'fas fa-file-alt'},
              {nombre: 'documentos', boton: 'accent', icono: 'fas fa-file-alt'}];


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

  cargarDatosBusqueda(nombre: string): void {
      this.comprobarBuscadorVacio(nombre);
      this.cargarTablaFiltrada(this.pageSize, this.currentPage, nombre);
      this.banderaDatos = nombre;
  }

  comprobarBuscadorVacio(nombre: string): void {
    if (this.banderaDatos !== nombre) {
      this.pageSize = 5;
      this.currentPage =  1;
    }
  }

  cargarTablaFiltrada(size: number, current: number, nombre: string): void {
    this.tramite$ =  this.servicio.getFiltered(size, current, nombre).subscribe((res: any) =>
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

 cargar(data): void {
  switch (data.tipoAccion) {
    case 'ver':
      this.ver(data.informacion);
      break;
    case 'editar':
      this.router.navigate(['/sistema/tramite/form/' + data.identificador]);
      break;
    case 'solicitante':
        this.verSolicitante(data.informacion.solicitud.solicitante);
        break;
    case 'solicitud':
        this.verSolicitud(data.informacion);
        break;
    case 'derivacion':
        this.verDerivacion(data.informacion);
        break;
    case 'evaluacion':
        this.verEvaluacion(data.informacion);
        break;
    case 'devolucion':
        this.verDevolucion(data.informacion);
        break;
    default:
        this.verDocumentos(data.informacion);
  }
}

   // evento de paginacion
   pagination(event: PageEvent, nombre: string): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.verificarTipoTabla(nombre);
  }

  verificarTipoTabla(nombre: string): void {
    if (nombre === '') {
      this.cargarTabla(this.pageSize, this.currentPage);
    }
    else {
      this.cargarTablaFiltrada(this.pageSize, this.currentPage, nombre);
    }
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
