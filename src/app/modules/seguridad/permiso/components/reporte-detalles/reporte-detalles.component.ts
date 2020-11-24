import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PermisoService } from 'src/app/core/services/permiso.service';
import { Permiso } from 'src/app/shared/models/permiso.model';

@Component({
  selector: 'app-reporte-detalles',
  templateUrl: './reporte-detalles.component.html',
  styleUrls: ['./reporte-detalles.component.scss']
})
export class ReporteDetallesComponent implements OnInit {

  BanderaDatos: boolean;
  BanderaVista: boolean;
  permisos: Permiso[];


  constructor(public dialogRef: MatDialogRef<ReporteDetallesComponent>,
              private servicio: PermisoService) { }

  ngOnInit(): void {
    this.BanderaVista = true;
    this.servicio.get().subscribe(res => this.permisos = res);
  }

  generatePDF(): void {
    this.BanderaVista = false;
    const data = {data: this.permisos};
    this.servicio.generateReportPdf(data).subscribe(res => {
      console.log(res);
      this.onNoClick();
      this.BanderaDatos = true;
      const fileURL = URL.createObjectURL(res);
      window.open(fileURL, '_blank');
    }, err => console.log(err));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
