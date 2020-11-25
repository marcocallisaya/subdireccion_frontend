import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CentroFormacion } from 'src/app/shared/models/centro_formacion.model';

@Component({
  selector: 'app-centro-modal',
  templateUrl: './centro-modal.component.html',
  styleUrls: ['./centro-modal.component.scss']
})
export class CentroModalComponent implements OnInit {

  centros: CentroFormacion[];
  BanderaDatos: boolean;
  BanderaError: boolean;
  constructor(public dialogRef: MatDialogRef<CentroModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: CentroFormacion[]) { }


onNoClick(): void {
this.dialogRef.close();
}

ngOnInit(): void {
  this.cargarDatos();
  console.log(this.data);
}

cargarDatos(): void {
    this.centros = this.data;
    this.BanderaError = this.verExistencia();
    this.BanderaDatos = true;
}

verExistencia(): boolean {
  return (this.centros.length === 0) ? false : true;
}

}
