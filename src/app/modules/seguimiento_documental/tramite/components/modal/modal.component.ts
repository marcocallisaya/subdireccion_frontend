import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tramite } from 'src/app/shared/models/tramite.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  titulo;
  dias: number;
  constructor(public dialogRef: MatDialogRef<ModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Tramite) { }


  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    console.log(this.data);
  }

  colorEstado(fechaInicial, fechaLimite): string {
    const fechaI = new Date(fechaInicial);
    const fechaII = new Date(fechaLimite);

    const resta = fechaII.getTime() - fechaI.getTime();

    const dias = Math.round(resta / (1000 * 60 * 60 * 24)) ;
    this.dias = dias;
    this.tituloEstado(dias);
    if (dias < 0) {
      return 'badge-info';
    }else if (dias <= 3) {
      return 'badge-danger';
    } else if (dias <= 7) {
      return 'badge-warning';
    } else {
      return 'badge-success';
    }
  }

  tituloEstado(dias): void {
    if (dias < 0) {
      this.titulo = 'TERMINADO';
    }else if (dias <= 3) {
      this.titulo = 'ATRASADO';
    } else if (dias <= 7) {
      this.titulo = 'NO OLVIDAR';
    } else {
      this.titulo = 'A TIEMPO';
    }
  }

  controlarDias(dias): number {
    return dias >= 0 ? dias : 0;
  }
}
