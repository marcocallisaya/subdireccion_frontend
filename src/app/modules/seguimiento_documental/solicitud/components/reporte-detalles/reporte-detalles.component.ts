import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SolicitudService } from 'src/app/core/services/solicitud.service';
import { Solicitud } from 'src/app/shared/models/solicitud.model';

@Component({
  selector: 'app-reporte-detalles',
  templateUrl: './reporte-detalles.component.html',
  styleUrls: ['./reporte-detalles.component.scss']
})
export class ReporteDetallesComponent implements OnInit {

  BanderaDatos: boolean;
  BanderaVista: boolean;
  solicitudes: Solicitud[];


  constructor(public dialogRef: MatDialogRef<ReporteDetallesComponent>,
              private servicio: SolicitudService) { }

  ngOnInit(): void {
    this.BanderaDatos = false;
    this.mostrarReporte();
  }

  generatePDF(): void {
    this.BanderaVista = false;
    this.BanderaDatos = true;
    const data = {data: this.solicitudes};
    this.servicio.generateReportPdf(data).subscribe(res => {
      console.log(res);
      this.onNoClick();
      const fileURL = URL.createObjectURL(res);
      window.open(fileURL, '_blank');
    }, err => console.log(err));
  }


  mostrarReporte(): void {
    this.servicio.get().subscribe(res => {
      this.solicitudes = res;
      this.BanderaVista = true; }, err => {
        console.log(err);
       });
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
}
