import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { RolService } from 'src/app/core/services/rol.service';
import { Rol } from 'src/app/shared/models/rol.model';

@Component({
  selector: 'app-reporte-detalles',
  templateUrl: './reporte-detalles.component.html',
  styleUrls: ['./reporte-detalles.component.scss']
})
export class ReporteDetallesComponent implements OnInit {

  BanderaDatos: boolean;
  BanderaVista: boolean;
  roles: Rol[];
  myForm: FormGroup; // formulario reactivo
  estados = ['HABILITADO', 'DESHABILITADO'];

  constructor(public dialogRef: MatDialogRef<ReporteDetallesComponent>,
              private servicio: RolService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.BanderaDatos = true;
    this.cargarFormulario();
  }

  generatePDF(): void {
    this.BanderaVista = false;
    const data = {data: this.roles, estado: this.myForm.get('estado').value };
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
      estado: ['']
    });
  }

  mostrarReporte(): void {
    const estado = this.myForm.get('estado').value;
    this.servicio.getWithState(estado).subscribe(res => {
      this.roles = res;
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
