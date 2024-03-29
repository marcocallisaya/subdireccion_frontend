import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EstanteService } from 'src/app/core/services/estante.service';
import { UbicacionService } from 'src/app/core/services/ubicacion.service';
import { Estante } from 'src/app/shared/models/estante.model';
import { Ubicacion } from 'src/app/shared/models/ubicacion.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reporte-detalles',
  templateUrl: './reporte-detalles.component.html',
  styleUrls: ['./reporte-detalles.component.scss']
})
export class ReporteDetallesComponent implements OnInit {

  BanderaDatos: boolean;
  BanderaVista: boolean;
  ubicaciones: Ubicacion[];
  myForm: FormGroup; // formulario reactivo
  estados = ['HABILITADO', 'DESHABILITADO'];
  estadosDisponibilidad = ['DISPONIBLE', 'NO DISPONIBLE'];
  estantes: Estante[];

  constructor(public dialogRef: MatDialogRef<ReporteDetallesComponent>,
              private servicio: UbicacionService,
              private estante: EstanteService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.cargarDatosAdicionales();
    this.BanderaDatos = true;
    this.cargarFormulario();
  }

  cargarDatosAdicionales(): void {
    this.estante.get().subscribe(res => this.estantes = res);
  }

  generatePDF(): void {
    this.BanderaVista = false;
    const data = {data: this.ubicaciones, estado: this.myForm.get('estado').value ,
                 disponibilidad: this.myForm.get('disponibilidad').value,
                 estante: this.myForm.get('estante').value };
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
      disponibilidad: [''],
      estante: ['']
    });
  }

  mostrarReporte(): void {
    const estado = this.myForm.get('estado').value;
    const disponibilidad = this.myForm.get('disponibilidad').value;
    const estante = this.myForm.get('estante').value;
    this.servicio.getWithState(estado, disponibilidad, estante).subscribe(res => {
      this.ubicaciones = res;
      console.log(res);
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
