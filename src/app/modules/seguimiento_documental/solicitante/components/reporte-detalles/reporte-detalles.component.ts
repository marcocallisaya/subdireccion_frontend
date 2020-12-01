import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SolicitanteService } from 'src/app/core/services/solicitante.service';
import { TipoSolicitanteService } from 'src/app/core/services/tipo-solicitante.service';
import { Solicitante } from 'src/app/shared/models/solicitante.model';
import { TipoSolicitante } from 'src/app/shared/models/tipo_solicitante.model';

@Component({
  selector: 'app-reporte-detalles',
  templateUrl: './reporte-detalles.component.html',
  styleUrls: ['./reporte-detalles.component.scss']
})
export class ReporteDetallesComponent implements OnInit {

  BanderaDatos: boolean;
  BanderaVista: boolean;
  solicitantes: Solicitante[];
  myForm: FormGroup; // formulario reactivo
  estados = ['HABILITADO', 'DESHABILITADO'];
  tipos: TipoSolicitante[];

  constructor(public dialogRef: MatDialogRef<ReporteDetallesComponent>,
              private servicio: SolicitanteService,
              private tipo: TipoSolicitanteService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.cargarDatosAdicionales();
    this.BanderaDatos = true;
    this.cargarFormulario();
  }

  cargarDatosAdicionales(): void {
    this.tipo.get().subscribe(res => {
      this.tipos = res;
    });
  }

  generatePDF(): void {
    this.BanderaVista = false;
    const data = {data: this.solicitantes, estado: this.myForm.get('estado').value , tipo: this.myForm.get('tipo').value};
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
      tipo: ['']
    });
  }

  mostrarReporte(): void {
    console.log(this.myForm.value);
    const estado = this.myForm.get('estado').value;
    const tipo = this.myForm.get('tipo').value;
    this.servicio.getWithState(estado, tipo).subscribe(res => {
      this.solicitantes = res;
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
