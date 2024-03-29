import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {InstructivoService} from 'src/app/core/services/instructivo.service';
import { FuncionarioModalComponent } from 'src/app/modules/seguimiento_documental/derivacion/components/funcionario-modal/funcionario-modal.component';
import { Funcionario } from 'src/app/shared/models/funcionario.model';
import { Instructivo } from 'src/app/shared/models/instructivo.model';
import Swal from 'sweetalert2';
import { ModalComponent } from '../modal/modal.component';
import { PublicacionModalComponent } from '../publicacion-modal/publicacion-modal.component';
import { ReporteDetallesComponent } from '../reporte-detalles/reporte-detalles.component';

@Component({
  selector: 'app-instructivo',
  templateUrl: './instructivo.component.html',
  styleUrls: ['./instructivo.component.scss']
})
export class InstructivoComponent implements OnInit, OnDestroy {

  // permisos locales
  eliminarPermiso = 'eliminar_instructivo';
  consultarPermiso = 'consultar_instructivo';
  editarPermiso = 'editar_instructivo';
  reportePermiso = 'reporte_instructivo';
  publicarPermiso = 'publicar_instructivo';
  permisos = JSON.parse(localStorage.getItem('permisos'));

  banderaDatos ;

  instructivo$: Subscription = new Subscription();


  constructor(private router: Router,
              private servicio: InstructivoService,
              public dialog: MatDialog,
              private paginator: MatPaginatorIntl) { }

  // lista de atributos del modelo para la tabla
  displayedColumns: string[] = ['destinatario', 'referencia', 'estado'];

  // objeto con los atributos de las opciones de la tabla
  opciones = [{nombre: 'ver', boton: 'accent', icono: 'fas fa-eye'},
              {nombre: 'editar', boton: 'primary', icono: 'fas fa-pen'},
              {nombre: 'habilitar', boton: 'accent', icono: 'fas fa-lock-open'},
              {nombre: 'desabilitar', boton: 'primary', icono: 'fas fa-lock'},
              {nombre: 'funcionario', boton: 'warn', icono: 'fas fa-user-alt'},
              {nombre: 'publicar', boton: 'primary', icono: 'fas fa-file-upload'},
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
    this.instructivo$ =  this.servicio.getPaginated(size, current).subscribe((res: any) =>
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
    this.instructivo$ =  this.servicio.getFiltered(size, current, nombre).subscribe((res: any) =>
    {
     this.dataSource = res.data; console.log(res);
     this.length = res.total;
    });
  }

  ver(instructivo: Instructivo): void {
    if (this.verificarPermisos(this.consultarPermiso)) {
      this.dialog.open(ModalComponent, {maxWidth: '50vw', data:  instructivo });
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
          this.router.navigate(['/sistema/instructivo/form/' + data.identificador]);
        }
        break;
      case 'eliminar':
        this.eliminar(data);
        break;
      case 'habilitar':
        this.habilitarDocumento(data.identificador);
        break;
      case 'funcionario':
        this.verFuncionario(data.informacion.funcionario);
        break;
      case 'publicar':
        const esta = this.verificarEstado(data.informacion.estado);
        if (esta) {
        this.publicar(data.identificador); }
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
          `Debes deshabilitar el instructivo antes de eliminarlo`,
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
            `El instructivo ha sido eliminado`,
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

  verFuncionario(funcionario: Funcionario): void {
    if (this.verificarPermisos(this.consultarPermiso)) {
      this.dialog.open(FuncionarioModalComponent, {width: '40vw', data:  funcionario });
    }
  }

  publicar(id): void {
    if (this.verificarPermisos(this.publicarPermiso)) {
      const dialogRef = this.dialog.open(PublicacionModalComponent, {width: '40vw', data:  id });
      dialogRef.afterClosed().subscribe(result => {
       this.cargarTabla(5, 1);
      });
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
    this.instructivo$.unsubscribe();
  }

}
