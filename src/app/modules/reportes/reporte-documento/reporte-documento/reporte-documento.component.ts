import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DocumentoService } from 'src/app/core/services/documento.service';
import { SolicitanteService } from 'src/app/core/services/solicitante.service';
import { TipoDocumentoService } from 'src/app/core/services/tipo-documento.service';
import { TramiteService } from 'src/app/core/services/tramite.service';
import { UbicacionService } from 'src/app/core/services/ubicacion.service';
import { Solicitante } from 'src/app/shared/models/solicitante.model';
import { TipoDocumento } from 'src/app/shared/models/tipo_documento.model';
import { Tramite } from 'src/app/shared/models/tramite.model';
import { Ubicacion } from 'src/app/shared/models/ubicacion.model';

@Component({
  selector: 'app-reporte-documento',
  templateUrl: './reporte-documento.component.html',
  styleUrls: ['./reporte-documento.component.scss']
})
export class ReporteDocumentoComponent implements OnInit {

  BanderaDatos: boolean;
  BanderaVista: boolean;
  tipos: TipoDocumento[];
  ubicaciones: Ubicacion[];
  tramites: Tramite[];
  solicitantes: Solicitante[];
  documentos;
  myForm: FormGroup; // formulario reactivo

  estado = ['HABILITADO', 'DESAHABILITADO'];

  constructor(private tipo: TipoDocumentoService,
              private servicio: DocumentoService,
              private ubicacion: UbicacionService,
              private tramite: TramiteService,
              private solicitante: SolicitanteService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.BanderaDatos = true;
    this.cargarDatosAdicionales();
    this.cargarFormulario();
  }

  generatePDF(): void {
/*     this.BanderaVista = false;
    const data = {data: this.centros, estado: this.myForm.get('estado').value,
                  tipo: this.myForm.get('tipo').value,
                  turno: this.myForm.get('turno').value,
                  distrito: this.myForm.get('distrito').value };
    this.servicio.generateReportPdf(data).subscribe(res => {
      console.log(res);
      this.onNoClick();
      this.BanderaDatos = true;
      const fileURL = URL.createObjectURL(res);
      window.open(fileURL, '_blank');
    }, err => console.log(err)); */
  }

  cargarDatosAdicionales(): void {
    this.tipo.get().subscribe(res => this.tipos = res);
    this.ubicacion.get().subscribe(res => this.ubicaciones = res);
    this.tramite.get().subscribe(res => this.tramites = res);
    this.solicitante.get().subscribe(res => this.solicitantes = res);
  }

  cargarFormulario(): void {
    this.myForm = this.fb.group({
      tipo:  [''],
      ubicacion:  [''],
      tramite: [''],
      solicitante: [''],
      fecha_inicial:  [''],
      fecha_final: [''],
      estante: ['']
    });
  }


  mostrarReporte(): void {
/*     const estado = this.myForm.get('estado').value;
    const distrito = this.myForm.get('distrito').value;
    const tipo = this.myForm.get('tipo').value;
    const turno = this.myForm.get('turno').value;
    this.servicio.getWithState(estado, distrito, tipo, turno).subscribe(res => {
      this.centros = res; console.log(res);
      this.BanderaDatos = false;
      this.BanderaVista = true; }, err => {
        console.log(err);
      }); */
  }

  atras(): void {
    this.BanderaDatos = true;
    this.BanderaVista = false;
  }

  onNoClick(): void {
    this.BanderaDatos = true;
    this.BanderaVista = false;
  }
}
