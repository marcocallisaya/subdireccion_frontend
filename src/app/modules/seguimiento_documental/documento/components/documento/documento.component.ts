import { Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
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

  @ViewChild(MatPaginator) paginator: MatPaginator;

  documento$: Subscription = new Subscription();

  constructor(private router: Router, private servicio: DocumentoService, public dialog: MatDialog) { }

  // lista de atributos del modelo para la tabla
  displayedColumns: string[] = ['nombre', 'codigo', 'descripcion'];

  // objeto con los atributos de las opciones de la tabla
  opciones = [{nombre: 'ver', boton: 'accent', icono: 'fas fa-eye'},
              {nombre: 'editar', boton: 'primary', icono: 'fas fa-pen'},
              {nombre: 'eliminar', boton: 'warn', icono: 'fas fa-trash-alt'},
              {nombre: 'estante', boton: 'primary', icono: 'fas fa-book-open'}];


  dataSource; // fuente de datos para la tabla

  length; // tamaño de la respuesta

  BanderaDatos: boolean; // bandera para la carga de datos

  ngOnInit(): void {
    this.cargarTabla();
  }

  cargarTabla(): void {
  this.documento$ =  this.servicio.get().subscribe((res: any) =>
    {this.llenarTabla(res.data); this.length = res.data.length; this.BanderaDatos = true; });
  }

  // llenar tabla tipo mat-table
  llenarTabla(data): void {
    this.dataSource = new MatTableDataSource<Documento>(data);
    this.dataSource.paginator = this.paginator;
  }

  // ver modelo
  ver(element: Documento): void {

    this.dialog.open(ModalComponent, {width: '40vw', data:  element });

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
          this.cargarTabla();
          }
      );
    }
  }

  ngOnDestroy(): void {
    this.documento$.unsubscribe();
  }
}




