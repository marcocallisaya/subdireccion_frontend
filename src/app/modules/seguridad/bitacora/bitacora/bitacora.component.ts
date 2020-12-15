import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BitacoraService } from 'src/app/core/services/bitacora.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { Bitacora } from 'src/app/shared/models/bitacora.model';
import { Usuario } from 'src/app/shared/models/usuario.model';
import Swal from 'sweetalert2';
import { ModalComponent } from '../modal/modal.component';
import { ReporteDetallesComponent } from '../reporte-detalles/reporte-detalles.component';

@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styleUrls: ['./bitacora.component.scss']
})
export class BitacoraComponent implements OnInit, OnDestroy {

  // permisos locales
  consultarPermiso = 'consultar_bitacora';
  reportePermiso = 'reporte_bitacora';
  permisos = JSON.parse(localStorage.getItem('permisos'));
  myForm: FormGroup; // formulario reactivo
  banderaNombre ;
  usuarios: Usuario[];

  bitacora$: Subscription = new Subscription();

  constructor(private router: Router,
              private servicio: BitacoraService,
              public dialog: MatDialog,
              private fb: FormBuilder,
              private usuario: UsuarioService,
              private paginator: MatPaginatorIntl) { }

  // lista de atributos del modelo para la tabla
  displayedColumns: string[] = ['usuario', 'actividad', 'fecha', 'hora'];

  // objeto con los atributos de las opciones de la tabla
  opciones = [{nombre: 'ver', boton: 'accent', icono: 'fas fa-eye'}];


  dataSource; // fuente de datos para la tabla

  BanderaDatos = false; // bandera para la carga de datos

  // variables para la paginacion
  length = 100;
  pageSize = 5;
  currentPage = 1;
  pageSizeOptions: number[] = [5, 10, 20];
  pageEvent: PageEvent;

  ngOnInit(): void {
    this.cargarDatosAdicionales();
    this.cargarFormulario();
    // this.BanderaDatos = true;
   // this.cargarTabla(this.pageSize, this.currentPage);
    this.cambiarIdiomaPaginacion();
  }

  cargarFormulario(): void {
    this.myForm = this.fb.group({
      fecha_inicial: [this.obtenerFechaActual(), Validators.required],
      fecha_final: [this.obtenerFechaActual(), Validators.required],
      usuario: ['']
    });
  }

  obtenerFechaActual(): string {
    let f = new Date();
    console.log(f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate() );
    return f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate();
  }


  cargarDatosAdicionales(): void {
    this.usuario.get().subscribe((res: any) => this.usuarios = res.data);
  }

  cargarTabla(size: number, current: number): void {
    this.bitacora$ =  this.servicio.getPaginated(size, current).subscribe((res: any) =>
      {
       this.dataSource = res.data; console.log(res);
       this.length = res.total;
       this.BanderaDatos = true;
      });
    }

  cargarDatosBusqueda(): void {
    this.pageSize = 5;
    this.currentPage = 1;
      this.cargarTablaFiltrada(this.pageSize, this.currentPage);
  }

 

  cargarTablaFiltrada(size: number, current: number): void {
    const usuario = this.myForm.get('usuario').value;
    const fechaInicial = this.myForm.get('fecha_inicial').value;
    const fechaFinal = this.myForm.get('fecha_final').value;
    this.bitacora$ =  this.servicio.getAmongDatesPaginated(fechaInicial, fechaFinal, usuario, this.pageSize, this.currentPage).subscribe((res: any) =>
    {
     this.dataSource = res.data; 
     console.log(res);
     this.BanderaDatos = true;
     this.length = res.total;
    }, err => {
      Swal.fire(
        'Error',
        err.error.errors.fechaFinal[0],
        'error'
      );
    });
  }

  ver(bitacora: Bitacora): void {
    if (this.verificarPermisos(this.consultarPermiso)) {
      this.dialog.open(ModalComponent, {width: '40vw', data:  bitacora });
    }
  }

  cargar(data): void {
    switch (data.tipoAccion) {
      case 'ver':
        this.ver(data.informacion);
        break;
      default:
        console.log(data);
    }
  }

   // evento de paginacion
   pagination(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.cargarTablaFiltrada(this.pageSize, this.currentPage);
  }


  cambiarIdiomaPaginacion(): void {
    this.paginator.itemsPerPageLabel = 'Registros por página';
    this.paginator.previousPageLabel = 'Pagina Anterior';
    this.paginator.nextPageLabel = 'Pagina Siguiente';
  }

  abrirReporteDetalles(): void  {
    if (this.verificarPermisos(this.reportePermiso)) {
      this.dialog.open(ReporteDetallesComponent, {width:  '60vw', maxHeight: '90vh'});
    }
  }

  verificarPermisos(permiso): boolean {
    return (this.permisos.includes(permiso)) ? true : false;
  }

  ngOnDestroy(): void {
    this.bitacora$.unsubscribe();
  }

}
