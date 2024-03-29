import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FuncionarioService } from 'src/app/core/services/funcionario.service';
import { InstructivoService } from 'src/app/core/services/instructivo.service';
import { Instructivo } from 'src/app/shared/models/instructivo.model';

@Component({
  selector: 'app-reporte-detalles',
  templateUrl: './reporte-detalles.component.html',
  styleUrls: ['./reporte-detalles.component.scss']
})
export class ReporteDetallesComponent implements OnInit {

 
  BanderaDatos: boolean;
  BanderaVista: boolean;
  instructivos: Instructivo[];
  myForm: FormGroup; // formulario reactivo
  estados = ['HABILITADO', 'DESHABILITADO'];
  funcinarios;

  constructor(public dialogRef: MatDialogRef<ReporteDetallesComponent>,
              private servicio: InstructivoService,
              private funcionario: FuncionarioService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.cargarDatosAdicionales();
    this.BanderaDatos = true;
    this.cargarFormulario();
  }

  generatePDF(): void {
    this.BanderaVista = false;
    const data = {data: this.instructivos, estado: this.myForm.get('estado').value, funcionario:  this.myForm.get('funcionario').value};
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

  cargarDatosAdicionales(): void {
    this.funcionario.get().subscribe(res => this.funcinarios = res);
  }

  mostrarReporte(): void {
    const estado = this.myForm.get('estado').value;
    const funcionario = this.myForm.get('funcionario').value;
    this.servicio.getWithState(estado, funcionario).subscribe(res => {
      this.instructivos = res;
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
