import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {DevolucionService} from 'src/app/core/services/devolucion.service';
import { Devolucion } from 'src/app/shared/models/devolucion.model';
import { Tramite } from 'src/app/shared/models/tramite.model';
import { TramiteModalComponent } from '../../../solicitud/components/tramite-modal/tramite-modal.component';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-devolucion',
  templateUrl: './devolucion.component.html',
  styleUrls: ['./devolucion.component.scss']
})
export class DevolucionComponent implements OnInit, OnDestroy {

  evaluacion$: Subscription = new Subscription();

  constructor(private router: Router, private servicio: DevolucionService, public dialog: MatDialog) { }

  // lista de atributos del modelo para la tabla
  displayedColumns: string[] = ['recomendacion'];

  // objeto con los atributos de las opciones de la tabla
  opciones = [{nombre: 'ver', boton: 'accent', icono: 'fas fa-eye'},
              {nombre: 'editar', boton: 'primary', icono: 'fas fa-pen'},
              {nombre: 'tramite', boton: 'warn', icono: 'fas fa-file-alt'}];


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
  }

  cargarTabla(size: number, current: number): void {
  this.evaluacion$ =  this.servicio.getPaginated(size, current).subscribe((res: any) =>
    {
     this.dataSource = res.data; console.log(res);
     this.length = res.total;
     this.BanderaDatos = true;
    });
  }


  // ver modelo
  ver(devolucion: Devolucion): void {
    this.dialog.open(ModalComponent, {width: '40vw', data:  devolucion });
  }

  verTramite(tramite: Tramite): void {
   this.dialog.open(TramiteModalComponent, {width: '40vw', data:  tramite });
  }

  // evento de paginacion
  pagination(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.cargarTabla(this.pageSize, this.currentPage);
  }



  cargar(data): void {
    switch (data.tipoAccion) {
      case 'ver':
        this.ver(data.informacion);
        break;
      case 'editar':
        this.router.navigate(['/sistema/devolucion/form/' + data.identificador]);
        break;
      default:
        this.verTramite(data.informacion.tramite);
    }
  }


  ngOnDestroy(): void {
    this.evaluacion$.unsubscribe();
  }

}
