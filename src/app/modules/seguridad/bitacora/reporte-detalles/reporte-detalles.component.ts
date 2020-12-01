import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BitacoraService } from 'src/app/core/services/bitacora.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { Bitacora } from 'src/app/shared/models/bitacora.model';
import { Usuario } from 'src/app/shared/models/usuario.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reporte-detalles',
  templateUrl: './reporte-detalles.component.html',
  styleUrls: ['./reporte-detalles.component.scss']
})
export class ReporteDetallesComponent implements OnInit {

  BanderaDatos: boolean;
  BanderaVista: boolean;
  bitacoras: Bitacora[];
  myForm: FormGroup; // formulario reactivo
  usuarios: Usuario[];

  constructor(public dialogRef: MatDialogRef<ReporteDetallesComponent>,
              private servicio: BitacoraService,
              private fb: FormBuilder,
              private usuario: UsuarioService) { }

  ngOnInit(): void {
    this.cargarDatosAdicionales();
    this.BanderaDatos = true;
    this.cargarFormulario();
  }

  cargarDatosAdicionales(): void {
    this.usuario.get().subscribe((res: any) => this.usuarios = res.data);
  }

  generatePDF(): void {
    this.BanderaVista = false;
    const data = {data: this.bitacoras, fechaInicial: this.myForm.get('fecha_inicial').value,
                                        fechaFinal: this.myForm.get('fecha_final').value,
                                        usuario: this.myForm.get('usuario').value,  };
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
      fecha_inicial: ['', Validators.required],
      fecha_final: ['', Validators.required],
      usuario: ['']
    });
  }

  mostrarReporte(): void {
    const fechaInicial = this.myForm.get('fecha_inicial').value;
    const fechaFinal = this.myForm.get('fecha_final').value;
    const usuario = this.myForm.get('usuario').value;
    this.servicio.getAmongDates(fechaInicial, fechaFinal, usuario).subscribe((res: any) => {
      this.bitacoras = res;
      console.log(res);
      this.BanderaDatos = false;
      this.BanderaVista = true; }, err => {
        console.log(err);
        Swal.fire(
          'Error',
          err.error.errors.fechaFinal[0],
          'error'
        );
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
