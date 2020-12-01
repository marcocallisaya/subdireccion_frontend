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

  turnos = ['MAÑANA', 'TARDE', 'NOCHE'];

  tipos = ['CEA', 'CEE', 'CEP'];

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
    const data = {data: this.centros, estado: this.myForm.get('estado').value,
                  tipo: this.myForm.get('tipo').value,
                  turno: this.myForm.get('turno').value,
                  distrito: this.myForm.get('distrito').value };
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
      estado:  [''],
      distrito:  [''],
      tipo: [''],
      turno: ['']
    });
  }


  mostrarReporte(): void {
    const estado = this.myForm.get('estado').value;
    const distrito = this.myForm.get('distrito').value;
    const tipo = this.myForm.get('tipo').value;
    const turno = this.myForm.get('turno').value;
    this.servicio.getWithState(estado, distrito, tipo, turno).subscribe(res => {
      this.centros = res; console.log(res);
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
