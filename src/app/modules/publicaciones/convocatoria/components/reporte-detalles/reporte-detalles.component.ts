import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ConvocatoriaService } from 'src/app/core/services/convocatoria.service';
import { FuncionarioService } from 'src/app/core/services/funcionario.service';
import { Convocatoria } from 'src/app/shared/models/convocatoria.model';

@Component({
  selector: 'app-reporte-detalles',
  templateUrl: './reporte-detalles.component.html',
  styleUrls: ['./reporte-detalles.component.scss']
})
export class ReporteDetallesComponent implements OnInit {

  BanderaDatos: boolean;
  BanderaVista: boolean;
  convocatorias: Convocatoria[];
  myForm: FormGroup; // formulario reactivo
  estados = ['HABILITADO', 'DESHABILITADO'];
  funcionarios;

  constructor(public dialogRef: MatDialogRef<ReporteDetallesComponent>,
              private servicio: ConvocatoriaService,
              private funcionario: FuncionarioService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.cargarDatosAdicionales();
    this.BanderaDatos = true;
    this.cargarFormulario();
  }

  generatePDF(): void {
    this.BanderaVista = false;
    const data = {data: this.convocatorias, estado: this.myForm.get('estado').value, funcionario: this.myForm.get('funcionario').value };
    this.servicio.generateReportPdf(data).subscribe(res => {
      console.log(res);
      this.onNoClick();
      this.BanderaDatos = true;
      const fileURL = URL.createObjectURL(res);
      window.open(fileURL, '_blank');
    }, err => console.log(err));
  }

  cargarDatosAdicionales(): void {
    this.funcionario.get().subscribe(res => this.funcionarios = res);
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
      this.convocatorias = res;
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
