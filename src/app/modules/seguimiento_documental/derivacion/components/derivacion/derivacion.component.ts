import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {DerivacionService} from 'src/app/core/services/derivacion.service';
import { FuncionarioService } from 'src/app/core/services/funcionario.service';
import { Derivacion } from 'src/app/shared/models/derivacion.model';
import { Funcionario } from 'src/app/shared/models/funcionario.model';
import { Tramite } from 'src/app/shared/models/tramite.model';
import { TramiteModalComponent } from '../../../solicitud/components/tramite-modal/tramite-modal.component';
import { FuncionarioModalComponent } from '../funcionario-modal/funcionario-modal.component';
import { ModalComponent } from '../modal/modal.component';
import {ReporteDetallesComponent} from '../reporte-detalles/reporte-detalles.component';

@Component({
  selector: 'app-derivacion',
  templateUrl: './derivacion.component.html',
  styleUrls: ['./derivacion.component.scss']
})
export class DerivacionComponent implements OnInit, OnDestroy {

  BanderaNombre;;

  tipo$: Subscription = new Subscription();

  funcionarios: Funcionario[];

  nameLiteral = '' ; filteredProducts ; codigo;

  constructor(private router: Router,
              private servicio: DerivacionService,
              private funcionario: FuncionarioService,
              public dialog: MatDialog,
              private paginator: MatPaginatorIntl) { }

  // lista de atributos del modelo para la tabla
  displayedColumns: string[] = ['id'];

  // objeto con los atributos de las opciones de la tabla
  opciones = [{nombre: 'ver', boton: 'accent', icono: 'fas fa-eye'},
              {nombre: 'editar', boton: 'primary', icono: 'fas fa-pen'},
              {nombre: 'funcionario', boton: 'warn', icono: 'fas fa-user-alt'},
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
       this.length = res.total;
       this.BanderaDatos = true;
      });
    }

    cargarDatosAdicionales(): void {
      this.funcionario.get().subscribe(res => this.funcionarios = res);
    }

  cargarDatosBusqueda(nombre): void {
      this.comprobarBuscadorVacio(nombre);
      this.verificarTipoTabla(this.nameLiteral);
      this.BanderaNombre = nombre;
  }

  comprobarBuscadorVacio(nombre: string): void {
    if (this.BanderaNombre !== nombre) {
      this.pageSize = 5;
      this.currentPage =  1;
    }
  }

  cargarTablaFiltrada(size: number, current: number, nombre: number): void {
    this.tipo$ =  this.servicio.getFiltered(size, current, nombre).subscribe((res: any) =>
    {
     this.dataSource = res.data; console.log(res);
     this.length = res.total;
    });
  }

   // ver modelo
   ver(derivacion: Derivacion): void {
    this.dialog.open(ModalComponent, {width: '40vw', data:  derivacion });
  }

  verFuncionario(funcionario: Funcionario): void {
    this.dialog.open(FuncionarioModalComponent, {width: '40vw', data:  funcionario });
  }

  verTramite(tramite: Tramite): void {
    this.dialog.open(TramiteModalComponent, {width: '40vw', data:  tramite });
  }

  imprimir(name): void {
    console.log(name);
    console.log(this.funcionarios);
    this.filteredProducts = this.filterData(name);
    console.log( this.filteredProducts);
  }

  selectOpt(solicitante: Funcionario): void {
    console.log(solicitante);
    this.nameLiteral = solicitante.nombre + ' ' + solicitante.apellido;
    this.codigo = solicitante.id;
    console.log(this.nameLiteral);
  }

  filterData(name): any {
    return  this.funcionarios.filter((item) => item.nombre.toLowerCase().includes(name.toLowerCase()));
  }

  cargar(data): void {
    switch (data.tipoAccion) {
      case 'ver':
        this.ver(data.informacion);
        break;
      case 'editar':
        this.router.navigate(['/sistema/derivacion/form/' + data.identificador]);
        break;
      case 'funcionario':
        this.verFuncionario(data.informacion.funcionario);
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
    this.dialog.open(ReporteDetallesComponent, {width:  '60vw', maxHeight: '90vh'});
  }

  ngOnDestroy(): void {
    this.tipo$.unsubscribe();
  }

}
