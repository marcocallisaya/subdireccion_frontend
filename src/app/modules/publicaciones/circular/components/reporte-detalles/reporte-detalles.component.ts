import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CircularService } from 'src/app/core/services/circular.service';
import { FuncionarioService } from 'src/app/core/services/funcionario.service';
import { Circular } from 'src/app/shared/models/circular.model';

@Component({
  selector: 'app-reporte-detalles',
  templateUrl: './reporte-detalles.component.html',
  styleUrls: ['./reporte-detalles.component.scss']
})
export class ReporteDetallesComponent implements OnInit {

  BanderaDatos: boolean;
  BanderaVista: boolean;
  circulares: Circular[];
  myForm: FormGroup; // formulario reactivo
  estados = ['HABILITADO', 'DESHABILITADO'];
  funcionarios;

  constructor(public dialogRef: MatDialogRef<ReporteDetallesComponent>,
              private servicio: CircularService,
              private funcionario: FuncionarioService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.cargarDatosAdicionales();
    this.BanderaDatos = true;
    this.cargarFormulario();
  }

  cargarDatosAdicionales(): void {
    this.funcionario.get().subscribe(res => this.funcionarios = res);
  }

  generatePDF(): void {
    this.BanderaVista = false;
    const data = {data: this.circulares, estado: this.myForm.get('estado').value, funcionario: this.myForm.get('funcionario').value };
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
      funcionario: ['']
    });
  }

  mostrarReporte(): void {
    const estado = this.myForm.get('estado').value;
    const funcionario = this.myForm.get('funcionario').value;
    this.servicio.getWithState(estado, funcionario).subscribe(res => {
      this.circulares = res;
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
