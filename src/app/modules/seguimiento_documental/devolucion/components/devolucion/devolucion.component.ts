import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {DevolucionService} from 'src/app/core/services/devolucion.service';
import { Devolucion } from 'src/app/shared/models/devolucion.model';
import { Tramite } from 'src/app/shared/models/tramite.model';
import Swal from 'sweetalert2';
import { TramiteModalComponent } from '../../../solicitud/components/tramite-modal/tramite-modal.component';
import { ModalComponent } from '../modal/modal.component';
import { ReporteDetallesComponent } from '../reporte-detalles/reporte-detalles.component';

@Component({
  selector: 'app-devolucion',
  templateUrl: './devolucion.component.html',
  styleUrls: ['./devolucion.component.scss']
})
export class DevolucionComponent implements OnInit, OnDestroy {

  // permisos locales
  consultarPermiso = 'consultar_devolucion';
  reportePermiso = 'reporte_devolucion';
  permisos = JSON.parse(localStorage.getItem('permisos'));

  banderaDatos: string ;

  devolucion$: Subscription = new Subscription();

  constructor(private router: Router,
              private servicio: DevolucionService,
              public dialog: MatDialog,
              private paginator: MatPaginatorIntl) { }

   // lista de atributos del modelo para la tabla
   displayedColumns: string[] = ['recomendacion', 'ingreso'];

   // objeto con los atributos de las opciones de la tabla
   opciones = [{nombre: 'ver', boton: 'accent', icono: 'fas fa-eye'},
               {nombre: 'editar', boton: 'primary', icono: 'fas fa-pen'},
               {nombre: 'tramite', boton: 'accent', icono: 'fas fa-file-alt'},
               {nombre: 'anular', boton: 'warn', icono: 'fas fa-times-circle'}];


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
    this.devolucion$ =  this.servicio.getPaginated(size, current).subscribe((res: any) =>
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
    this.devolucion$ =  this.servicio.getFiltered(size, current, nombre).subscribe((res: any) =>
    {
     this.dataSource = res.data; console.log(res);
     this.length = res.meta?.pagination.total;
    });
  }

  // ver modelo
  ver(devolucion: Devolucion): void {
    if (this.verificarPermisos(this.consultarPermiso)) {
      this.dialog.open(ModalComponent, {width: '40vw', data:  devolucion });
    }
  }

  verTramite(tramite: Tramite): void {
    if (this.verificarPermisos(this.consultarPermiso)) {
      this.dialog.open(TramiteModalComponent, {width: '40vw', data:  tramite });
    }
  }

  cargar(data): void {
    switch (data.tipoAccion) {
      case 'ver':
        this.ver(data.informacion);
        break;
      case 'editar':
        this.router.navigate(['/sistema/devolucion/form/' + data.identificador]);
        break;
      case 'anular':
        this.eliminar(data.informacion);
        break;
      default:
        this.verTramite(data.informacion.tramite);
    }
  }

  eliminar(data: any): void {
    console.log(data);
        Swal.fire({
          title: 'Estas Seguro de anular la devolucion',
          text: 'Una vez anulado no se puede recuperar',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText: 'Cancelar',
          confirmButtonText: 'Si, eliminalo!'
        }).then((result) => {
          this.confirmarEliminacion(result, data.id);
        });
      
    }
  

  confirmarEliminacion(result, id: number): void {
    if (result.value) {
      this.servicio.delete(id).subscribe(
        res => {
          Swal.fire(
            'Eliminado ',
            `La devolucion ha sido anulada`,
            'error'
          );
          this.cargarTabla(this.pageSize, this.currentPage);
          }, err => {
            console.log(err);
          }
      );
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
    this.devolucion$.unsubscribe();
  }

}
