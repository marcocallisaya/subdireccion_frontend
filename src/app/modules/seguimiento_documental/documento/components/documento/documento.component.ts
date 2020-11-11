import { Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent} from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import {DocumentoService} from '../../../../../core/services/documento.service';
import {Documento} from '../../../../../shared/models/documento.model';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-documento',
  templateUrl: './documento.component.html',
  styleUrls: ['./documento.component.scss']
})
export class DocumentoComponent implements OnInit, OnDestroy{

  documento$: Subscription = new Subscription();

  constructor(private router: Router, private servicio: DocumentoService, public dialog: MatDialog) { }

  // lista de atributos del modelo para la tabla
  displayedColumns: string[] = ['nombre', 'codigo', 'descripcion'];

  // objeto con los atributos de las opciones de la tabla
  opciones = [{nombre: 'ver', boton: 'accent', icono: 'fas fa-eye'},
              {nombre: 'editar', boton: 'primary', icono: 'fas fa-pen'},
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
  }

  cargarTabla(size: number, current: number): void {
  this.documento$ =  this.servicio.getPaginated(size, current).subscribe((res: any) =>
    {
     this.dataSource = res.data; console.log(res);
     this.length = res.total;
     this.BanderaDatos = true;
    });
  }


  // ver modelo
  ver(documento: Documento): void {
    this.dialog.open(ModalComponent, {width: '40vw', data:  documento });
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
        this.router.navigate(['/sistema/documento/form/' + data.identificador]);
        break;
      default:
        this.eliminar(data.identificador);
        console.log('Eliminado', data.identificador);
    }
  }

  eliminar(id: number): void {
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
        this.confirmarEliminacion(result, id);
      });
  }

  confirmarEliminacion(result, id: number): void {
    if (result.value) {
      this.servicio.delete(id).subscribe(
        async () => {
          await Swal.fire(
            'Eliminado ',
            `El documento ha sido eliminado`,
            'success'
          );
          this.cargarTabla(this.pageSize, this.currentPage);
          }
      );
    }
  }

  ngOnDestroy(): void {
    this.documento$.unsubscribe();
  }
}




