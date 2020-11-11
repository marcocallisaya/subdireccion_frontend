import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
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

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.scss']
})
export class SolicitudComponent implements OnInit, OnDestroy {

  solicitud$: Subscription = new Subscription();

  constructor(private router: Router, private servicio: SolicitudService, public dialog: MatDialog) { }

  // lista de atributos del modelo para la tabla
  displayedColumns: string[] = ['id'];

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
  }

  cargarTabla(size: number, current: number): void {
  this.solicitud$ =  this.servicio.getPaginated(size, current).subscribe((res: any) =>
    {
     this.dataSource = res.data; console.log(res);
     this.length = res.total;
     this.BanderaDatos = true;
    });
  }


  // ver modelo
  ver(solicitud: Solicitud): void {
    this.dialog.open(ModalComponent, {width: '40vw', data:  solicitud });
  }

  verSolicitante(solicitante: Solicitante): void {
    this.dialog.open(SolicitanteModalComponent, {width: '40vw', data:  solicitante });
  }

  verCentro(centro: CentroFormacion): void {
    this.dialog.open(CentroFormacionModalComponent, {width: '40vw', data:  centro });
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


  ngOnDestroy(): void {
    this.solicitud$.unsubscribe();
  }

}
