import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConstantesService } from 'src/app/config/constantes.service';
import { CentroFormacionService } from 'src/app/core/services/centro-formacion.service';
import { CentroFormacion } from 'src/app/shared/models/centro_formacion.model';
import Swal from 'sweetalert2';

declare let L;
let latitude = -17.783026;
let longitude = -63.181208;
@Component({
  selector: 'app-mapa-modal',
  templateUrl: './mapa-modal.component.html',
  styleUrls: ['./mapa-modal.component.scss']
})
export class MapaModalComponent implements OnInit, OnDestroy {

 // variables para mapa
 mymap;
 marker;
 flagmap = false;
 BanderaBoton = false;

  constructor(public dialogRef: MatDialogRef<MapaModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: CentroFormacion,
              private url: ConstantesService,
              private servicio: CentroFormacionService,
              private router: Router) { }


onNoClick(): void {
this.dialogRef.close();
}

ngOnInit(): void {
  this.showMap();
  this.getPosition();
  this.agregarMarcador();
  console.log(this.data);
}

actualizar(): void {
  const data = {latitud : latitude, longitud: longitude};
  console.log(data);
  this.servicio.update(data, this.data.id).subscribe(res => {
    Swal.fire(
      'Felicidades',
      'Se ha actualizado Exitosamente',
      'success'
    );
    this.onNoClick();
    this.router.navigate(['/sistema/centro_formacion']);
  }, error => {
     console.log(error);
    });
}

  editar(): void {
    this.BanderaBoton = true;
  }

showMap(): void {
  this.mymap = L.map('mapid').setView([this.data?.latitud || latitude, this.data?.longitud || longitude], 17);
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + this.url.mapKey, {
  maxZoom: 18,
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: this.url.mapKey
}).addTo(this.mymap);


}

agregarMarcador(): void {
  L.marker([this.data?.latitud || latitude, this.data?.longitud || longitude]).addTo(this.mymap);
}

getPosition(): void {

  function onMapClick(e): void  {
    const { lat, lng } = e.target.getCenter();
    console.log(lat + '/' + lng);
    latitude = lat;
    longitude = lng;
    console.log(latitude + '/' + longitude);
    }

  this.mymap.on('movestart', onMapClick);


}

ngOnDestroy(): void {
   latitude = -17.783026;
   longitude = -63.181208;
}

}
