import { Component, OnInit } from '@angular/core';
import { InstructivoService } from 'src/app/core/services/instructivo.service';
import { Instructivo } from 'src/app/shared/models/instructivo.model';

@Component({
  selector: 'app-instructivo',
  templateUrl: './instructivo.component.html',
  styleUrls: ['./instructivo.component.scss']
})
export class InstructivoComponent implements OnInit {

  instructivos: Instructivo[];

  BanderaDatos ;

  constructor(private servicio: InstructivoService) { }

  ngOnInit(): void {
    this.cargarDatos();
  }
  cargarDatos(): void {
    this.servicio.getPublicated('PUBLICADO').subscribe(res => {
      this.instructivos = res;
      console.log(res);
      this.BanderaDatos = true;
    });
  }


}
