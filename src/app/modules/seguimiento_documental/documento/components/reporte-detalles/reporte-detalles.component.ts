import { Location } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DocumentoService } from 'src/app/core/services/documento.service';
import { TipoDocumentoService } from 'src/app/core/services/tipo-documento.service';
import { Documento } from 'src/app/shared/models/documento.model';
import { TipoDocumento } from 'src/app/shared/models/tipo_documento.model';

@Component({
  selector: 'app-reporte-detalles',
  templateUrl: './reporte-detalles.component.html',
  styleUrls: ['./reporte-detalles.component.scss']
})
export class ReporteDetallesComponent implements OnInit {

  BanderaDatos: boolean;
  BanderaVista: boolean;
  documentos: Documento[];
  myForm: FormGroup; // formulario reactivo
  estados = ['HABILITADO', 'DESHABILITADO'];
  tipos: TipoDocumento[];
  tipoString = '';

  constructor(public dialogRef: MatDialogRef<ReporteDetallesComponent>,
              private servicio: DocumentoService,
              private tipo: TipoDocumentoService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.BanderaDatos = true;
    this.cargarDatosAdicionales();
    this.cargarFormulario();
  }

  generatePDF(): void {
    this.BanderaVista = false;
    const data = {data: this.documentos, estado: this.myForm.get('estado').value,
                                         tipo: this.myForm.get('tipo').value };
    this.servicio.generateReportPdf(data).subscribe(res => {
      console.log(res);
      this.onNoClick();
      this.BanderaDatos = true;
      const fileURL = URL.createObjectURL(res);
      window.open(fileURL, '_blank');
    }, err => console.log(err));
  }

  cargarDatosAdicionales(): void {
    this.tipo.get().subscribe(res => this.tipos = res);
  }

  cargarFormulario(): void {
    this.myForm = this.fb.group({
      estado: [''],
      tipo: ['']
    });
  }

  mostrarReporte(tipoS): void {
    const estado = this.myForm.get('estado').value;
    const tipo = this.myForm.get('tipo').value;
    this.tipoString = tipoS;
    this.servicio.getWithState(estado, tipo).subscribe(res => {
      this.documentos = res;
      this.BanderaDatos = false;
      this.BanderaVista = true; }, err => {
        console.log(err); });
  }

  atras(): void {
      this.BanderaDatos = true;
      this.BanderaVista = false;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
