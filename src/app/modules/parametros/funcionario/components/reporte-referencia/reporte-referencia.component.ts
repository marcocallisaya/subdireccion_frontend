import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FuncionarioService } from 'src/app/core/services/funcionario.service';
import { Funcionario } from 'src/app/shared/models/funcionario.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reporte-referencia',
  templateUrl: './reporte-referencia.component.html',
  styleUrls: ['./reporte-referencia.component.scss']
})
export class ReporteReferenciaComponent implements OnInit {

  BanderaDatos: boolean;
  BanderaVista: boolean;
  funcionarios: Funcionario[];
  myForm: FormGroup; // formulario reactivo

  estado = ['HABILITADO', 'DESAHABILITADO'];

  cargos = ['SUBDIRECTOR/A', 'TECNICO/A', 'SECRETARIO/A'];

  constructor(public dialogRef: MatDialogRef<ReporteReferenciaComponent>,
              private servicio: FuncionarioService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.BanderaDatos = true;
    this.cargarFormulario();
  }

  generatePDF(): void {
    this.BanderaVista = false;
    const data = {data: this.funcionarios,
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

  cargarFormulario(): void {
    this.myForm = this.fb.group({
      fechaInicial: ['', Validators.required],
      fechaFinal: ['', Validators.required],
      estado:  [''],
      cargo:  ['']
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
    const cargo = this.myForm.get('cargo').value;
    console.log(estado);
    console.log(cargo);
    this.servicio.getAmongReferences(inicio, final, estado, cargo).subscribe(res => {
      this.funcionarios = res; console.log(res);
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
