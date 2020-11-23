import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DocumentoService } from 'src/app/core/services/documento.service';
import { TipoDocumentoService } from 'src/app/core/services/tipo-documento.service';
import { Documento } from 'src/app/shared/models/documento.model';
import { TipoDocumento } from 'src/app/shared/models/tipo_documento.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reporte-referencia',
  templateUrl: './reporte-referencia.component.html',
  styleUrls: ['./reporte-referencia.component.scss']
})
export class ReporteReferenciaComponent implements OnInit {

  BanderaDatos: boolean;
  BanderaVista: boolean;
  documentos: Documento[];
  tipos: TipoDocumento[];
  myForm: FormGroup; // formulario reactivo

  estado = ['HABILITADO', 'DESAHABILITADO'];

  constructor(public dialogRef: MatDialogRef<ReporteReferenciaComponent>,
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
    const data = {data: this.documentos,
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

  cargarDatosAdicionales(): void {
    this.tipo.get().subscribe(res => this.tipos = res);
  }

  cargarFormulario(): void {
    this.myForm = this.fb.group({
      fechaInicial: ['', Validators.required],
      fechaFinal: ['', Validators.required],
      estado:  [''],
      tipoDocumento:  [''],
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
   
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
