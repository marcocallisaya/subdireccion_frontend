import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocumentoService } from 'src/app/core/services/documento.service';
import { ReporteService } from 'src/app/core/services/reporte.service';
import { Solicitante } from 'src/app/shared/models/solicitante.model';
import { TipoDocumento } from 'src/app/shared/models/tipo_documento.model';
import { Tramite } from 'src/app/shared/models/tramite.model';
import { Ubicacion } from 'src/app/shared/models/ubicacion.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reporte-documento',
  templateUrl: './reporte-documento.component.html',
  styleUrls: ['./reporte-documento.component.scss']
})
export class ReporteDocumentoComponent implements OnInit {

  contenido;
  BanderaDatos: boolean;
  BanderaVista: boolean;
  tipos; tipo;
  estantes; estante;
  tramites; tramite;
  solicitantes; solicitante;
  funcionarios; funcionario;
  documentos;
  todo;
  myForm: FormGroup; // formulario reactivo


  constructor(private fb: FormBuilder, private servicio: DocumentoService, private reporte: ReporteService) { }

  ngOnInit(): void {
    this.BanderaDatos = true;
    this.cargarFormulario();
  }

  generatePDF(): void {
    this.BanderaVista = false;
    const data = {data: this.todo,
                  fechaInicial: this.myForm.get('fecha_inicial').value,
                  fechaFinal: this.myForm.get('fecha_final').value,
                  };
    this.reporte.generateReportDocumentPdf(data).subscribe(res => {
      console.log(res);
      this.onNoClick();
      this.BanderaDatos = true;
      const fileURL = URL.createObjectURL(res);
      window.open(fileURL, '_blank');
    }, err => console.log(err));
  }


  cargarFormulario(): void {
    this.myForm = this.fb.group({
      fecha_inicial:  ['', Validators.required],
      fecha_final: ['', Validators.required]
    });
  }


  mostrarReporte(): void {
    const fechaInicial = this.myForm.get('fecha_inicial').value;
    const fechaFinal = this.myForm.get('fecha_final').value;
    this.servicio.getAmongDates(fechaInicial, fechaFinal).subscribe((res: any) => {
      console.log(res);
      this.todo = res;
      // registrando los tipos
      this.tipos = res.tipo.tipos;
      this.tipo = res.tipo.tipo;
      // registrando los solicitante
      this.solicitantes = res.solicitante.solicitantes;
      this.solicitante = res.solicitante.solicitante;
      // registrando los funcionarios
      this.funcionarios = res.funcionario.funcionarios;
      this.funcionario = res.funcionario.funcionario;
      // registrando al estante
      this.estantes = res.estante.estantes;
      this.estante = res.estante.estante;
      // registro de tramites
      this.tramites = res.tramite.tramites;
      this.tramite = res.tramite.tramite;
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
    this.BanderaDatos = true;
    this.BanderaVista = false;
  }
}
