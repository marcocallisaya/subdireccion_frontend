import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {CircularService} from 'src/app/core/services/circular.service';
import { FuncionarioModalComponent } from 'src/app/modules/seguimiento_documental/derivacion/components/funcionario-modal/funcionario-modal.component';
import { Circular } from 'src/app/shared/models/circular.model';
import { Funcionario } from 'src/app/shared/models/funcionario.model';
import Swal from 'sweetalert2';
import { ModalComponent } from '../modal/modal.component';
import { PublicacionModalComponent } from '../publicacion-modal/publicacion-modal.component';
import { ReporteDetallesComponent } from '../reporte-detalles/reporte-detalles.component';

@Component({
  selector: 'app-circular',
  templateUrl: './circular.component.html',
  styleUrls: ['./circular.component.scss']
})
export class CircularComponent implements OnInit, OnDestroy {

  banderaDatos ;

  circular$: Subscription = new Subscription();


  constructor(private router: Router,
              private servicio: CircularService,
              public dialog: MatDialog,
              private paginator: MatPaginatorIntl) { }

  // lista de atributos del modelo para la tabla
  displayedColumns: string[] = ['codigo', 'referencia', 'estado'];

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
    this.circular$ =  this.servicio.getPaginated(size, current).subscribe((res: any) =>
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
    this.circular$ =  this.servicio.getFiltered(size, current, nombre).subscribe((res: any) =>
    {
     this.dataSource = res.data; console.log(res);
     this.length = res.total;
    });
  }

  ver(circular: Circular): void {
    this.dialog.open(ModalComponent, {maxWidth: '50vw', data:  circular });
  }

  cargar(data): void {
    switch (data.tipoAccion) {
      case 'ver':
        this.ver(data.informacion);
        break;
      case 'editar':
        this.router.navigate(['/sistema/circular/form/' + data.identificador]);
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
        this.publicar(data.identificador);
        break;
      default:
        this.desabilitarDocumento(data.identificador);
    }
  }


  eliminar(data: any): void {
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
        `Debes deshabilitar la circular antes de eliminarla`,
        'error'
      );
    }
  }

  confirmarEliminacion(result, id: number): void {
    if (result.value) {
      this.servicio.delete(id).subscribe(
        async () => {
          await Swal.fire(
            'Eliminado ',
            `La circular ha sido eliminado`,
            'error'
          );
          this.cargarTabla(this.pageSize, this.currentPage);
          }
      );
    }
  }

  habilitarDocumento(id: number): void {
    const data = {estado: 'HABILITADO'};
    this.servicio.changeState(data, id).subscribe(res => {
      console.log(res);
      this.currentPage = 1;
      this.cargarTabla(this.pageSize, this.currentPage); }, err => console.log(err));

  }

  desabilitarDocumento(id: number): void {
    const data = {estado: 'DESHABILITADO'};
    this.servicio.changeState(data, id).subscribe(res => {
      console.log(res);
      this.currentPage = 1;
      this.cargarTabla(this.pageSize, this.currentPage); }, err => console.log(err));
  }

  verificarEstado(estado: string): boolean {
    return (estado === 'HABILITADO') ? true : false ;
  }

  verFuncionario(funcionario: Funcionario): void {
    this.dialog.open(FuncionarioModalComponent, {width: '40vw', data:  funcionario });
  }

  publicar(id): void {
    const dialogRef = this.dialog.open(PublicacionModalComponent, {width: '40vw', data:  id });
    dialogRef.afterClosed().subscribe(result => {
     this.cargarTabla(5, 1);
    });
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
    this.dialog.open(ReporteDetallesComponent, {maxWidth:  '60vw', maxHeight: '90vh'});
  }

  ngOnDestroy(): void {
    this.circular$.unsubscribe();
  }
}
