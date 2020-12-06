import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TipoDocumentoService } from 'src/app/core/services/tipo-documento.service';
import { TipoDocumento } from 'src/app/shared/models/tipo_documento.model';
import Swal from 'sweetalert2';
import { ModalComponent } from '../modal/modal.component';
import {ReporteDetallesComponent} from '../reporte-detalles/reporte-detalles.component';

@Component({
  selector: 'app-tipo-documento',
  templateUrl: './tipo-documento.component.html',
  styleUrls: ['./tipo-documento.component.scss']
})
export class TipoDocumentoComponent implements OnInit, OnDestroy {

  // permisos locales
  eliminarPermiso = 'eliminar_documento';
  consultarPermiso = 'consultar_documento';
  editarPermiso = 'editar_documento';
  reportePermiso = 'reporte_documento';
  permisos = JSON.parse(localStorage.getItem('permisos'));

  banderaDatos ;

  tipo$: Subscription = new Subscription();

  constructor(private router: Router,
              private servicio: TipoDocumentoService,
              public dialog: MatDialog,
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
    this.tipo$ =  this.servicio.getPaginated(size, current).subscribe((res: any) =>
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
    this.tipo$ =  this.servicio.getFiltered(size, current, nombre).subscribe((res: any) =>
    {
     this.dataSource = res.data; console.log(res);
     this.length = res.total;
    });
  }

  ver(tipo: TipoDocumento): void {
    if (this.verificarPermisos(this.consultarPermiso)) {
      this.dialog.open(ModalComponent, {width: '40vw', data:  tipo });
    }
  }

  cargar(data): void {
    switch (data.tipoAccion) {
      case 'ver':
        this.ver(data.informacion);
        break;
      case 'editar':
        this.router.navigate(['/sistema/tipo_documento/form/' + data.identificador]);
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
          `Debes deshabilitar el tipo de documento antes de eliminarlo`,
          'error'
        );
      }
    }
  }

  confirmarEliminacion(result, id: number): void {
    if (result.value) {
      this.servicio.delete(id).subscribe(
        async () => {
          await Swal.fire(
            'Eliminado ',
            `El tipo de documento ha sido eliminado`,
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
    if (this.verificarPermisos(this.editarPermiso)) {
      const data = {estado: 'HABILITADO'};
      this.servicio.changeState(data, id).subscribe(res => {
        console.log(res);
        this.currentPage = 1;
        this.cargarTabla(this.pageSize, this.currentPage); }, err => console.log(err));
    }
  }

  desabilitarDocumento(id: number): void {
    if (this.verificarPermisos(this.editarPermiso)) {
      const data = {estado: 'DESHABILITADO'};
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
      this.dialog.open(ReporteDetallesComponent, {maxWidth:  '60vw', maxHeight: '90vh'});
    }
  }

  verificarPermisos(permiso): boolean {
    return (this.permisos.includes(permiso)) ? true : false;
  }

  ngOnDestroy(): void {
    this.tipo$.unsubscribe();
  }

}
