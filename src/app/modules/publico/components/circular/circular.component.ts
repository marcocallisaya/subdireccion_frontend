import { Component, OnInit } from '@angular/core';
import { CircularService } from 'src/app/core/services/circular.service';
import { Circular } from 'src/app/shared/models/circular.model';

@Component({
  selector: 'app-circular',
  templateUrl: './circular.component.html',
  styleUrls: ['./circular.component.scss']
})
export class CircularComponent implements OnInit {


  circulares: Circular[];

  BanderaDatos ;

  constructor(private servicio: CircularService) { }

  ngOnInit(): void {
    this.cargarDatos();
  }
  cargarDatos(): void {
    this.servicio.getPublicated('PUBLICADO').subscribe(res => {
      this.circulares = res;
      console.log(res);
      this.BanderaDatos = true;
    });
  }


}
