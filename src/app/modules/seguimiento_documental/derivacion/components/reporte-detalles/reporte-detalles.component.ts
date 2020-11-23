import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DerivacionService } from 'src/app/core/services/derivacion.service';
import { Derivacion } from 'src/app/shared/models/derivacion.model';

@Component({
  selector: 'app-reporte-detalles',
  templateUrl: './reporte-detalles.component.html',
  styleUrls: ['./reporte-detalles.component.scss']
})
export class ReporteDetallesComponent implements OnInit {

  BanderaDatos: boolean;
  BanderaVista: boolean;
  derivaciones: Derivacion[];


  constructor(public dialogRef: MatDialogRef<ReporteDetallesComponent>,
              private servicio: DerivacionService) { }

  ngOnInit(): void {
    this.BanderaDatos = false;
    this.mostrarReporte();
  }

  generatePDF(): void {
    this.BanderaVista = false;
    this.BanderaDatos = true;
    const data = {data: this.derivaciones};
    this.servicio.generateReportPdf(data).subscribe(res => {
      console.log(res);
      this.onNoClick();
      const fileURL = URL.createObjectURL(res);
      window.open(fileURL, '_blank');
    }, err => console.log(err));
  }


  mostrarReporte(): void {
    this.servicio.get().subscribe(res => {
      this.derivaciones = res;
      this.BanderaVista = true; }, err => {
        console.log(err);
       });
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

}
