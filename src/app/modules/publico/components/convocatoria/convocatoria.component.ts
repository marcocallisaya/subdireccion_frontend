import { Component, OnInit } from '@angular/core';
import { ConvocatoriaService } from 'src/app/core/services/convocatoria.service';
import { Convocatoria } from 'src/app/shared/models/convocatoria.model';

@Component({
  selector: 'app-convocatoria',
  templateUrl: './convocatoria.component.html',
  styleUrls: ['./convocatoria.component.scss']
})
export class ConvocatoriaComponent implements OnInit {

  convocatorias: Convocatoria[];

  BanderaDatos ;

  constructor(private servicio: ConvocatoriaService) { }

  ngOnInit(): void {
    this.cargarDatos();
  }
  cargarDatos(): void {
    this.servicio.getPublicated('PUBLICADO').subscribe(res => {
      this.convocatorias = res;
      console.log(res);
      this.BanderaDatos = true;
    });
  }


}
