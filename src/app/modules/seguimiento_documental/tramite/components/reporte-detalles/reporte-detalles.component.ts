import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TramiteService } from 'src/app/core/services/tramite.service';
import { Tramite } from 'src/app/shared/models/tramite.model';

@Component({
  selector: 'app-reporte-detalles',
  templateUrl: './reporte-detalles.component.html',
  styleUrls: ['./reporte-detalles.component.scss']
})
export class ReporteDetallesComponent implements OnInit {

  BanderaDatos: boolean;
  BanderaVista: boolean;
  tramites: Tramite[];
  myForm: FormGroup; // formulario reactivo
  estados = ['SOLICITUD', 'DERIVACION', 'DEVOLUCION', 'EVALUACION'];

  constructor(public dialogRef: MatDialogRef<ReporteDetallesComponent>,
              private servicio: TramiteService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.BanderaDatos = true;
    this.cargarFormulario();
  }

  generatePDF(): void {
    this.BanderaVista = false;
    const data = {data: this.tramites, estado: this.myForm.get('estado').value, fechaInicial: this.myForm.get('fecha_inicial').value, fechaFinal: this.myForm.get('fecha_final').value };
    this.servicio.generateReportPdf(data).subscribe(res => {
      console.log(res);
      this.onNoClick();
      this.BanderaDatos = true;
      const fileURL = URL.createObjectURL(res);
      window.open(fileURL, '_blank');
    }, err => console.log(err));
  }

  cargarFormulario(): void {
    this.myForm = this.fb.group({
      estado: [''],
      fecha_inicial: [this.obtenerFechaActual()],
      fecha_final: [this.obtenerFechaActual()]
    });
  }

  obtenerFechaActual(): string {
    let f = new Date();
    console.log(f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate() );
    return f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate();
  }

  mostrarReporte(): void {
    const estado = this.myForm.get('estado').value;
    const fechaInicial = this.myForm.get('fecha_inicial').value;
    const fechaFinal = this.myForm.get('fecha_final').value;
    this.servicio.getWithState(estado, fechaInicial, fechaFinal).subscribe((res: any) => {
      console.log(res);
      this.tramites = res.data;
      this.BanderaDatos = false;
      this.BanderaVista = true; }, err => {
        console.log(err);
       });
  }

  atras(): void {
    this.BanderaDatos = true;
    this.BanderaVista = false;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
