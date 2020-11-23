import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DistritoService } from 'src/app/core/services/distrito.service';
import { Distrito } from 'src/app/shared/models/distrito.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reporte-detalles',
  templateUrl: './reporte-detalles.component.html',
  styleUrls: ['./reporte-detalles.component.scss']
})
export class ReporteDetallesComponent implements OnInit {

  BanderaDatos: boolean;
  BanderaVista: boolean;
  distritos: Distrito[];
  myForm: FormGroup; // formulario reactivo

  constructor(public dialogRef: MatDialogRef<ReporteDetallesComponent>,
              private servicio: DistritoService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.BanderaDatos = true;
    this.cargarFormulario();
  }

  generatePDF(): void {
    this.BanderaVista = false;
    const data = {data: this.distritos, fechaInicial: this.myForm.get('fechaInicial').value,
                                         fechaFinal: this.myForm.get('fechaFinal').value };
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
      fechaInicial: ['', Validators.required],
      fechaFinal: ['', Validators.required]
    });
  }

  mostrarReporte(): void {
    const inicio = this.myForm.get('fechaInicial').value;
    const final = this.myForm.get('fechaFinal').value;
    this.servicio.getAmongDates(inicio, final).subscribe(res => {
      this.distritos = res;
      this.BanderaDatos = false;
      this.BanderaVista = true; }, err => {
        console.log(err);
        const errores =  this.tratarErrores(err.error.errors);
        this.mostrarError(errores); });
  }

  tratarErrores(errores): string {
    let datos = '';
    if (errores.fechaFinal !=  null) {
      const error = '<div>' + errores.fechaFinal[0] + '</div> <br>';
      datos = datos.concat(error);
    }
    return datos;
  }

  mostrarError(errores): void {
    console.log(errores);
    Swal.fire({
      icon: 'error',
      title: 'Error...',
      html: errores
    });
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

}
