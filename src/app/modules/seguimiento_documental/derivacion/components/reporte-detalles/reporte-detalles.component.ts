import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DerivacionService } from 'src/app/core/services/derivacion.service';
import { FuncionarioService } from 'src/app/core/services/funcionario.service';
import { Derivacion } from 'src/app/shared/models/derivacion.model';
import { Funcionario } from 'src/app/shared/models/funcionario.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reporte-detalles',
  templateUrl: './reporte-detalles.component.html',
  styleUrls: ['./reporte-detalles.component.scss']
})
export class ReporteDetallesComponent implements OnInit {

  BanderaDatos: boolean;
  BanderaVista: boolean;
  derivaciones: Derivacion[];
  myForm: FormGroup;
  funcionarios: Funcionario[];


  constructor(public dialogRef: MatDialogRef<ReporteDetallesComponent>,
              private servicio: DerivacionService,
              private fb: FormBuilder,
              private funcionario: FuncionarioService) { }

  ngOnInit(): void {
    this.cargarDatosAdicionales();
    this.cargarFormulario();
    this.BanderaDatos = true;
  }

  cargarDatosAdicionales(): void {
    this.funcionario.get().subscribe(res => this.funcionarios = res);
  }

  generatePDF(): void {
    this.BanderaVista = false;
    const data = {data: this.derivaciones,  fechaInicial: this.myForm.get('fecha_inicial').value, fechaFinal: this.myForm.get('fecha_final').value};
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
      funcionario: [''],
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
    const funcionario = this.myForm.get('funcionario').value;
    const fechaInicial = this.myForm.get('fecha_inicial').value;
    const fechaFinal = this.myForm.get('fecha_final').value;
    this.servicio.getWithState(funcionario, fechaInicial, fechaFinal).subscribe((res: any) => {
      console.log(res);
      this.derivaciones = res.data;

      this.BanderaVista = true;
      this.BanderaDatos = false; }, err => {
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
