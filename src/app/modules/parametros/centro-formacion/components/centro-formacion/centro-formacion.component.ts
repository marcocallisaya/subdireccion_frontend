import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CentroFormacionService } from 'src/app/core/services/centro-formacion.service';
import { Carrera } from 'src/app/shared/models/carrera.model';
import { CentroFormacion } from 'src/app/shared/models/centro_formacion.model';
import Swal from 'sweetalert2';
import { CarreraModalComponent } from '../carrera-modal/carrera-modal.component';
import { FotoModalComponent } from '../foto-modal/foto-modal.component';
import { MapaModalComponent } from '../mapa-modal/mapa-modal.component';
import { ModalComponent } from '../modal/modal.component';
import { ReporteDetallesComponent } from '../reporte-detalles/reporte-detalles.component';

@Component({
  selector: 'app-centro-formacion',
  templateUrl: './centro-formacion.component.html',
  styleUrls: ['./centro-formacion.component.scss']
})
export class CentroFormacionComponent implements OnInit, OnDestroy {

  banderaDatos ;

  centro$: Subscription = new Subscription();

  constructor(private router: Router,
              private servicio: CentroFormacionService,
              public dialog: MatDialog,
              private paginator: MatPaginatorIntl) { }

  // lista de atributos del modelo para la tabla
  displayedColumns: string[] = ['nombre', 'sie', 'estado'];

  // objeto con los atributos de las opciones de la tabla
  opciones = [{nombre: 'ver', boton: 'accent', icono: 'fas fa-eye'},
              {nombre: 'editar', boton: 'primary', icono: 'fas fa-pen'},
              {nombre: 'habilitar', boton: 'accent', icono: 'fas fa-lock-open'},
              {nombre: 'desabilitar', boton: 'primary', icono: 'fas fa-lock'},
              {nombre: 'mapa', boton: 'accent', icono: 'fas fa-map-marked-alt'},
              {nombre: 'foto', boton: 'primary', icono: 'fas fa-image'},
              {nombre: 'carreras', boton: 'accent', icono: 'fas fa-university'},
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
    this.centro$ =  this.servicio.getPaginated(size, current).subscribe((res: any) =>
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
    this.centro$ =  this.servicio.getFiltered(size, current, nombre).subscribe((res: any) =>
    {
     this.dataSource = res.data; console.log(res);
     this.length = res.total;
    });
  }

  ver(centro: CentroFormacion): void {
    this.dialog.open(ModalComponent, {width: '40vw', data:  centro });
  }

  verMapa(centro: CentroFormacion): void {
    const dialogRef = this.dialog.open(MapaModalComponent, {width: '80vw', height: '93vh',  data:  centro });
    dialogRef.afterClosed().subscribe(result => {
      this.cargarTabla(5, 1);
     });
  }

  verFoto(centro: CentroFormacion): void {
    const dialogRef = this.dialog.open(FotoModalComponent, {width: '40vw', height: '80vh', data:  centro });
    dialogRef.afterClosed().subscribe(result => {
      this.cargarTabla(5, 1);
     });
  }

  verCarreras(centro: CentroFormacion): void {
    const dialogRef = this.dialog.open(CarreraModalComponent, {width: '40vw', maxHeight: '80vh', data:  centro });
    dialogRef.afterClosed().subscribe(result => {
      this.cargarTabla(5, 1);
     });
  }


  cargar(data): void {
    switch (data.tipoAccion) {
      case 'ver':
        this.ver(data.informacion);
        break;
      case 'editar':
        this.router.navigate(['/sistema/centro_formacion/form/' + data.identificador]);
        break;
      case 'eliminar':
        this.eliminar(data);
        break;
      case 'habilitar':
        this.habilitarDocumento(data.identificador);
        break;
      case 'mapa':
        this.verMapa(data.informacion);
        break;
      case 'foto':
        this.verFoto(data.informacion);
        break;
      case 'carreras':
        this.verCarreras(data.informacion);
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
        `Debes deshabilitar el centro antes de eliminarlo`,
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
            `El centro ha sido eliminado`,
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

/*   abrirReporteReferencia(): void  {
    this.dialog.open(ReporteReferenciaComponent, {maxWidth:  '60vw', maxHeight: '90vh'});
  } */

  ngOnDestroy(): void {
    this.centro$.unsubscribe();
  }

}
