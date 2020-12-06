import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CentroFormacionService } from 'src/app/core/services/centro-formacion.service';
import { DistritoService } from 'src/app/core/services/distrito.service';
import { CentroFormacion } from 'src/app/shared/models/centro_formacion.model';
import { Distrito } from 'src/app/shared/models/distrito.model';
import { CarreraComponent } from '../carrera/carrera.component';
import { MapaComponent } from '../mapa/mapa.component';

@Component({
  selector: 'app-cee',
  templateUrl: './cee.component.html',
  styleUrls: ['./cee.component.scss']
})
export class CeeComponent implements OnInit {

  distritos: Distrito[];
  centros: CentroFormacion[];
  turnos = ['MAÑANA', 'TARDE', 'NOCHE'];
  BanderaDatos = false;
  distritoBandera = '';
  turnoBandera = '';
  linkUrlImagen = 'https://i1.wp.com/www.musicapopular.cult.cu/wp-content/uploads/2017/12/imagen-no-disponible.png?fit=600%2C450';
  link = 'http://localhost:8000/storage/public/';
  tipo = 'CEE';
  spiner = false;

  constructor(private distrito: DistritoService,
              private centro: CentroFormacionService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.cargarDatosAdicionales();
  }
  cargarDatosAdicionales(): void {
    this.distrito.get().subscribe(res => this.distritos = res);
  }

  cargarDatosBusqueda(nombre, sie, distrito, turno): void {
    this.spiner = true;
    console.log(nombre);
    console.log(sie);
    console.log(distrito);
    console.log(turno);
    this.centro.getQuery(nombre, sie, turno, distrito, this.tipo).subscribe(res => {
      this.centros = res;
      console.log(res);
      this.spiner = false;
      this.BanderaDatos = true;});
  }

  verMapa(centro: CentroFormacion): void {
    this.dialog.open(MapaComponent, {width: '80vw', height: '93vh' , data:  centro });
  }

 verCarreras(centro: CentroFormacion): void {
  this.dialog.open(CarreraComponent, {width: '40vw', maxHeight: '80vh', data:  centro });
 }

 verificarImagen(url): string {
  if (url === this.linkUrlImagen) {
    return url;
  }
  else {
    return this.link + url ;
  }
 }

}
