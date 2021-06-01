import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DevolucionService } from 'src/app/core/services/devolucion.service';
import { Devolucion } from 'src/app/shared/models/devolucion.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reporte-detalles',
  templateUrl: './reporte-detalles.component.html',
  styleUrls: ['./reporte-detalles.component.scss']
})
export class ReporteDetallesComponent implements OnInit {

  BanderaDatos: boolean;
  BanderaVista: boolean;
  devoluciones: Devolucion[];
  myForm: FormGroup; // formulario reactivo
  estados = ['EN ESPERA', 'APROBADO', 'RECHAZADO'];

  constructor(public dialogRef: MatDialogRef<ReporteDetallesComponent>,
              private servicio: DevolucionService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.BanderaDatos = true;
    this.cargarFormulario();
  }

  generatePDF(): void {
    this.BanderaVista = false;
    const data = {data: this.devoluciones, estado: this.myForm.get('estado').value, fechaInicial: this.myForm.get('fecha_inicial').value, fechaFinal: this.myForm.get('fecha_final').value };
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
    let f = new Date(); let d ; let m ; let y = f.getFullYear(); 
    
    if (f.getDate()<10) { d = "0" + f.getDate();} else {d = f.getDate();}

    if (f.getMonth()<10) {m = "0" + (f.getMonth() + 1); } else {m = (f.getMonth() + 1);}

    let date = y + "-" + m + "-" + d;

    return  date;
  }

  mostrarReporte(): void {
    const estado = this.myForm.get('estado').value;
    const fechaInicial = this.myForm.get('fecha_inicial').value;
    const fechaFinal = this.myForm.get('fecha_final').value;
    this.servicio.getWithState(estado, fechaInicial, fechaFinal).subscribe((res: any) => {
      console.log(res);
      this.devoluciones = res.data;
      this.BanderaDatos = false;
      this.BanderaVista = true; }, err => {
        console.log(err);
        Swal.fire( 'Error',
        err.error.errors.fechaFinal[0],
        'error');
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
