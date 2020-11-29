import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConstantesService } from 'src/app/config/constantes.service';
import { CentroFormacion } from 'src/app/shared/models/centro_formacion.model';

declare let L;
const latitude = -17.783026;
const longitude = -63.181208;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements OnInit {

  // variables para mapa
 mymap;
 marker;
 flagmap = false;
 BanderaBoton = false;
 latitudActual;
 longitudActual;

  constructor(public dialogRef: MatDialogRef<MapaComponent>,
              @Inject(MAT_DIALOG_DATA) public data: CentroFormacion,
              private url: ConstantesService) { }


    onNoClick(): void {
    this.dialogRef.close();
    }

    ngOnInit(): void {
      this.showMap();
      this.getPosition();
      this.agregarMarcador();
     // this.calcularDistancia();
      console.log(this.data);
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
  L.marker([this.data?.latitud || latitude, this.data?.longitud || longitude],{title: 'ARDILLA'}).addTo(this.mymap).bindTooltip('Centro <br>' + this.data.nombre).openTooltip();
}

agregarUbicacion(longitud, latitud): void {
  L.marker([latitud, longitud]).addTo(this.mymap).bindTooltip('Ubicacion Actual').openTooltip();
}

getPosition(): void {

  if (navigator.geolocation){
    const success = function (position: any){
        const latitud = position.coords.latitude ;
        const longitud = position.coords.longitude ;
    }
    navigator.geolocation.getCurrentPosition((success: any) => {
      console.log(success);
      this.latitudActual = success.coords.latitude;
      this.longitudActual = success.coords.longitude;
      this.agregarUbicacion(this.longitudActual, this.latitudActual);
      });
    }
}

calcularDistancia(): void {

  L.Routing.control({
    waypoints: [
      L.latLng(this.latitudActual, this.longitudActual),
      L.latLng(this.data.latitud, this.data.longitud),
    /*     L.latLng(this.latitudActual, this.longitudActual),
        L.latLng(this.data.latitud, this.data.longitud) */
    ],
    language: 'es'
}).addTo(this.mymap);

}
}
