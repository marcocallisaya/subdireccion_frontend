import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SolicitudService } from 'src/app/core/services/solicitud.service';
import { CentroFormacionModalComponent } from '../centro-formacion-modal/centro-formacion-modal.component';
import { CentroFormacion } from 'src/app/shared/models/centro_formacion.model';
import { Solicitante } from 'src/app/shared/models/solicitante.model';
import { Solicitud } from 'src/app/shared/models/solicitud.model';
import { Tramite } from 'src/app/shared/models/tramite.model';
import { ModalComponent } from '../modal/modal.component';
import {SolicitanteModalComponent} from '../solicitante-modal/solicitante-modal.component';
import {TramiteModalComponent} from '../tramite-modal/tramite-modal.component';
import {ReporteDetallesComponent} from '../reporte-detalles/reporte-detalles.component';
import { SolicitanteService } from 'src/app/core/services/solicitante.service';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.scss']
})
export class SolicitudComponent implements OnInit, OnDestroy {

  // permisos locales
  consultarPermiso = 'consultar_documento';
  reportePermiso = 'reporte_documento';
  permisos = JSON.parse(localStorage.getItem('permisos'));

  tipo$: Subscription = new Subscription();

  solicitantes: Solicitante[];

  nameLiteral = '' ; filteredProducts ; codigo;

  constructor(private router: Router,
              private servicio: SolicitudService,
              private solicitante: SolicitanteService,
              public dialog: MatDialog,
              private paginator: MatPaginatorIntl) { }

  // lista de atributos del modelo para la tabla
  displayedColumns: string[] = ['referencia'];

  // objeto con los atributos de las opciones de la tabla
  opciones = [{nombre: 'ver', boton: 'accent', icono: 'fas fa-eye'},
              {nombre: 'editar', boton: 'primary', icono: 'fas fa-pen'},
              {nombre: 'solicitante', boton: 'warn', icono: 'fas fa-user-alt'},
              {nombre: 'centro', boton: 'accent', icono: 'fas fa-school'},
              {nombre: 'tramite', boton: 'primary', icono: 'fas fa-file-alt'}];


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
    this.cargarDatosAdicionales();
    this.cambiarIdiomaPaginacion();
  }

  cargarTabla(size: number, current: number): void {
    this.tipo$ =  this.servicio.getPaginated(size, current).subscribe((res: any) =>
      {
       this.dataSource = res.data; console.log(res);
       this.length = res.meta?.pagination.total;
       this.BanderaDatos = true;
      });
    }

    cargarDatosAdicionales(): void {
      this.solicitante.get().subscribe(res => this.solicitantes = res);
    }

  cargarDatosBusqueda(): void {
      this.verificarTipoTabla(this.nameLiteral);
  }


  cargarTablaFiltrada(size: number, current: number, nombre: number): void {
    this.tipo$ =  this.servicio.getFiltered(size, current, nombre).subscribe((res: any) =>
    {
     this.dataSource = res.data; console.log(res);
     this.length = res.meta.pagination.total;
    });
  }

  ver(solicitud: Solicitud): void {
    if (this.verificarPermisos(this.consultarPermiso)) {
      this.dialog.open(ModalComponent, {width: '40vw', data:  solicitud });
    }
  }

  verSolicitante(solicitante: Solicitante): void {
    if (this.verificarPermisos(this.consultarPermiso)) {
      this.dialog.open(SolicitanteModalComponent, {width: '40vw', data:  solicitante });
    }
  }

  verCentro(centro: CentroFormacion): void {
    if (this.verificarPermisos(this.consultarPermiso)) {
      this.dialog.open(CentroFormacionModalComponent, {width: '40vw', data:  centro });
    }
  }

  verTramite(tramite: Tramite): void {
    if (this.verificarPermisos(this.consultarPermiso)) {
      this.dialog.open(TramiteModalComponent, {width: '40vw', data:  tramite });
    }
  }

  imprimir(name): void {
    console.log(name);
    console.log(this.solicitantes);
    this.filteredProducts = this.filterData(name);
    console.log( this.filteredProducts);
  }

  selectOpt(solicitante: Solicitante): void {
    console.log(solicitante);
    this.nameLiteral = solicitante.nombre + ' ' + solicitante.apellido;
    this.codigo = solicitante.id;
    console.log(this.nameLiteral);
  }

  filterData(name): any {
    return  this.solicitantes.filter((item) => item.nombre.toLowerCase().includes(name.toLowerCase()));
  }

  cargar(data): void {
    switch (data.tipoAccion) {
      case 'ver':
        this.ver(data.informacion);
        break;
      case 'editar':
        this.router.navigate(['/sistema/solicitud/form/' + data.identificador]);
        break;
      case 'solicitante':
          this.verSolicitante(data.informacion.solicitante);
          break;
      case 'centro':
          this.verCentro(data.informacion.centro_formacion);
          break;
      default:
          this.verTramite(data.informacion.tramite);
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
      console.log('vacio');
    }
    else {
      this.cargarTablaFiltrada(this.pageSize, this.currentPage, this.codigo);
      console.log('codigo, ' + this.codigo);
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
