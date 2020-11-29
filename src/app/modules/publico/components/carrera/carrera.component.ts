import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Carrera } from 'src/app/shared/models/carrera.model';

@Component({
  selector: 'app-carrera',
  templateUrl: './carrera.component.html',
  styleUrls: ['./carrera.component.scss']
})
export class CarreraComponent implements OnInit {

  BanderaBoton = false;

  BanderaDatos: boolean;

  carreras: Carrera[];
  
  constructor(public dialogRef: MatDialogRef<CarreraComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.carreras = this.data.carreras;
    this.BanderaDatos = this.verExistencia(this.data.carreras);
  }



  verExistencia(data: any): boolean {
    return (data.length === 0) ? false : true;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }



}
