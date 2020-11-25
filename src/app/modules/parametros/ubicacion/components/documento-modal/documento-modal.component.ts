import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UbicacionService } from 'src/app/core/services/ubicacion.service';
import { Documento } from 'src/app/shared/models/documento.model';

@Component({
  selector: 'app-documento-modal',
  templateUrl: './documento-modal.component.html',
  styleUrls: ['./documento-modal.component.scss']
})
export class DocumentoModalComponent implements OnInit {

  documentos: Documento[];
  BanderaDatos: boolean;
  BanderaError: boolean;
  constructor(public dialogRef: MatDialogRef<DocumentoModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Documento[]) { }


onNoClick(): void {
this.dialogRef.close();
}

ngOnInit(): void {
 this.cargarDatos();
}

cargarDatos(): void {
  this.documentos = this.data;
  this.BanderaError = this.verExistencia();
  this.BanderaDatos = true;
  console.log(this.data);
}

verExistencia(): boolean {
  return (this.documentos.length === 0) ? false : true;
}

}
