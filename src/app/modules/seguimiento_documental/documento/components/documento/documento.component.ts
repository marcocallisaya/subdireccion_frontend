import { Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorIntl, PageEvent} from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/core/authentication/login.service';
import Swal from 'sweetalert2';
import {DocumentoService} from '../../../../../core/services/documento.service';
import {Documento} from '../../../../../shared/models/documento.model';
import { ModalComponent } from '../modal/modal.component';
import { ReporteDetallesComponent } from '../reporte-detalles/reporte-detalles.component';
import { ReporteReferenciaComponent } from '../reporte-referencia/reporte-referencia.component';

@Component({
  selector: 'app-documento',
  templateUrl: './documento.component.html',
  styleUrls: ['./documento.component.scss']
})
export class DocumentoComponent implements OnInit, OnDestroy{

  // permisos locales
  eliminarPermiso = 'eliminar_documento';
  consultarPermiso = 'consultar_documento';
  editarPermiso = 'editar_documento';
  reportePermiso = 'reporte_documento';
  permisos = JSON.parse(localStorage.getItem('permisos'));

  banderaDatos ;

  documento$: Subscription = new Subscription();

  constructor(private router: Router,
              private servicio: DocumentoService,
              public dialog: MatDialog,
              private token: LoginService,
              private paginator: MatPaginatorIntl) { }

  // lista de atributos del modelo para la tabla
  displayedColumns: string[] = ['nombre', 'estado', 'descripcion'];

  // objeto con los atributos de las opciones de la tabla
  opciones = [{nombre: 'ver', boton: 'accent', icono: 'fas fa-eye'},
              {nombre: 'editar', boton: 'primary', icono: 'fas fa-pen'},
              {nombre: 'habilitar', boton: 'accent', icono: 'fas fa-lock-open'},
              {nombre: 'desabilitar', boton: 'primary', icono: 'fas fa-lock'},
              {nombre: 'eliminar', boton: 'warn', icono: 'fas fa-trash-alt'}];


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

  cargarTabla(size: number, current: number): void {
    this.documento$ =  this.servicio.getPaginated(size, current).subscribe((res: any) =>
      {
       this.dataSource = res.data; console.log(res);
       this.length = res.total;
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
    this.documento$ =  this.servicio.getFiltered(size, current, nombre).subscribe((res: any) =>
    {
     this.dataSource = res.data; console.log(res);
     this.length = res.total;
    });
  }

  ver(documento: Documento): void {
    if (this.verificarPermisos(this.consultarPermiso)) {
      this.dialog.open(ModalComponent, {width: '40vw', data:  documento });
    }
  }

  cargar(data): void {
    switch (data.tipoAccion) {
      case 'ver':
        this.ver(data.informacion);
        break;
      case 'editar':
        const estado = this.verificarEstado(data.informacion.estado);
        if (estado) {
          this.router.navigate(['/sistema/documento/form/' + data.identificador]);
        }
        break;
      case 'eliminar':
        this.eliminar(data);
        break;
      case 'habilitar':
        this.habilitarDocumento(data.identificador);
        break;
      default:
        this.desabilitarDocumento(data.identificador);
    }
  }

  eliminar(data: any): void {
    if (this.verificarPermisos(this.eliminarPermiso)) {
      const estado = this.verificarEstado(data.informacion.estado);
      if (!estado) {
        Swal.fire({
          title: 'Estas Seguro?',
          text: 'Una vez eliminado no se puede recuperar',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText: 'Cancelar',
          confirmButtonText: 'Si, eliminalo!'
        }).then((result) => {
          this.confirmarEliminacion(result, data.identificador);
        });
      }
      else {
        Swal.fire(
          'Error',
          `Debes deshabilitar el documento antes de eliminarlo`,
          'error'
        );
      }
    }
  }

  confirmarEliminacion(result, id: number): void {
    if (result.value) {
      this.servicio.delete(id).subscribe(
        res => {
          Swal.fire(
            'Eliminado ',
            `El documento ha sido eliminado`,
            'error'
          );
          this.cargarTabla(this.pageSize, this.currentPage);
          }, err => {
            console.log(err);
            Swal.fire(
              'Error',
              err.error.message,
              'error'
            );
          }
      );
    }
  }

  habilitarDocumento(id: number): void {
    if (this.verificarPermisos(this.editarPermiso)){
      const data = {estado: 'HABILITADO'};
      this.servicio.changeState(data, id).subscribe(res => {
        console.log(res);
        this.currentPage = 1;
        this.cargarTabla(this.pageSize, this.currentPage); }, err => console.log(err));
    }
  }

  desabilitarDocumento(id: number): void {
    if (this.verificarPermisos(this.editarPermiso)){
      const data = {estado: 'DESAHABILITADO'};
      this.servicio.changeState(data, id).subscribe(res => {
        console.log(res);
        this.currentPage = 1;
        this.cargarTabla(this.pageSize, this.currentPage); }, err => console.log(err));
    }
  }

  verificarEstado(estado: string): boolean {
    return (estado === 'HABILITADO') ? true : false ;
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

  cambiarIdiomaPaginacion(): void {
    this.paginator.itemsPerPageLabel = 'Registros por página';
    this.paginator.previousPageLabel = 'Pagina Anterior';
    this.paginator.nextPageLabel = 'Pagina Siguiente';
  }

  abrirReporteDetalles(): void  {
    if (this.verificarPermisos(this.reportePermiso)) {
      this.dialog.open(ReporteDetallesComponent, {maxWidth:  '80vw', maxHeight: '90vh'});
    }
  }

  abrirReporteReferencia(): void  {
    this.dialog.open(ReporteReferenciaComponent, {maxWidth:  '60vw', maxHeight: '90vh'});
  }

  verificarPermisos(permiso): boolean {
    return (this.permisos.includes(permiso)) ? true : false;
  }

  ngOnDestroy(): void {
    this.documento$.unsubscribe();
  }
}




