import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CentroFormacionService } from 'src/app/core/services/centro-formacion.service';
import { DistritoService } from 'src/app/core/services/distrito.service';
import { CentroFormacion } from 'src/app/shared/models/centro_formacion.model';
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
  centros: CentroFormacion[];
  distritos: Distrito[];
  myForm: FormGroup; // formulario reactivo

  estado = ['HABILITADO', 'DESAHABILITADO'];

  constructor(public dialogRef: MatDialogRef<ReporteDetallesComponent>,
              private servicio: CentroFormacionService,
              private distrito: DistritoService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.BanderaDatos = true;
    this.cargarDatosAdicionales();
    this.cargarFormulario();
  }

  generatePDF(): void {
    this.BanderaVista = false;
    const data = {data: this.centros,
                  fechaInicial: this.myForm.get('fechaInicial').value,
                  fechaFinal: this.myForm.get('fechaFinal').value,
                  estado: this.myForm.get('estado').value};
    this.servicio.generateReportPdf(data).subscribe(res => {
      console.log(res);
      this.onNoClick();
      this.BanderaDatos = true;
      const fileURL = URL.createObjectURL(res);
      window.open(fileURL, '_blank');
    }, err => console.log(err));
  }

  cargarDatosAdicionales(): void {
    this.distrito.get().subscribe(res => this.distritos = res);
  }

  cargarFormulario(): void {
    this.myForm = this.fb.group({
      fechaInicial: ['', Validators.required],
      fechaFinal: ['', Validators.required],
      estado:  [''],
      distrito:  [''],
    });
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

  mostrarReporte(): void {
    const inicio = this.myForm.get('fechaInicial').value;
    const final = this.myForm.get('fechaFinal').value;
    const estado = this.myForm.get('estado').value;
    const distrito = this.myForm.get('distrito').value;
    console.log(estado);
    console.log(distrito);
    this.servicio.getAmongReferences(inicio, final, estado, distrito).subscribe(res => {
      this.centros = res; console.log(res);
      this.BanderaDatos = false;
      this.BanderaVista = true; }, err => {
        console.log(err);
        const errores =  this.tratarErrores(err.error.errors);
        this.mostrarError(errores);
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
