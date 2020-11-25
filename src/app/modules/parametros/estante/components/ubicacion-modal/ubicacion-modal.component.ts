import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EstanteService } from 'src/app/core/services/estante.service';
import { Ubicacion } from 'src/app/shared/models/ubicacion.model';

@Component({
  selector: 'app-ubicacion-modal',
  templateUrl: './ubicacion-modal.component.html',
  styleUrls: ['./ubicacion-modal.component.scss']
})
export class UbicacionModalComponent implements OnInit {

  ubicaciones: Ubicacion[];
  BanderaDatos: boolean;
  BanderaError: boolean;
  constructor(public dialogRef: MatDialogRef<UbicacionModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Ubicacion[]) { }


onNoClick(): void {
this.dialogRef.close();
}

ngOnInit(): void {
  this.cargarDatos();
  console.log(this.data);
}

cargarDatos(): void {
    this.ubicaciones = this.data;
    this.BanderaError = this.verExistencia();
    this.BanderaDatos = true;
}

verExistencia(): boolean {
  return (this.ubicaciones.length === 0) ? false : true;
}
}
