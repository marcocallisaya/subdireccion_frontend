import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ReporteService } from 'src/app/core/services/reporte.service';
import { TramiteService } from 'src/app/core/services/tramite.service';
import { Tramite } from 'src/app/shared/models/tramite.model';
import Swal from 'sweetalert2';
import { TramiteIndividualComponent } from '../tramite-individual/tramite-individual.component';

@Component({
  selector: 'app-reporte-tramite',
  templateUrl: './reporte-tramite.component.html',
  styleUrls: ['./reporte-tramite.component.scss']
})
export class ReporteTramiteComponent implements OnInit {

  BanderaBoton = false;
  BanderaDatos: boolean;
  BanderaVista: boolean;
  tipos; tipo;
  solicitantes; solicitante;
  funcionarios; funcionario;
  lista;
  documentos;
  todo;
  myForm: FormGroup; // formulario reactivo
  tramites: Tramite[];
  tramite;

  constructor(private fb: FormBuilder, private reporte: ReporteService, private servicio: TramiteService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.cargarTramites();
    this.BanderaDatos = true;
    this.cargarFormulario();
  }

  cargarTramites(): void {
    this.servicio.get().subscribe((res: any) => {this.tramites = res.data; console.log(res);});
  }

  generatePDF(): void {
    this.BanderaVista = false;
    const data = {data: this.todo,
                  fechaInicial: this.myForm.get('fecha_inicial').value,
                  fechaFinal: this.myForm.get('fecha_final').value,
                  };
    this.reporte.generateReportTramitePdf(data).subscribe(res => {
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
      // lista de tramites segun estados
      this.lista = res.lista;
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

  changeState(item): void {
    this.tramite = item;
    this.BanderaBoton = true;
  }

  atras(): void {
    this.BanderaDatos = true;
    this.BanderaVista = false;
  }

  onNoClick(): void {
    this.BanderaDatos = true;
    this.BanderaVista = false;
  }

  abrir(): void {
    this.dialog.open(TramiteIndividualComponent, {maxWidth:  '60vw', maxHeight: '90vh', data: this.tramite});
  }

}
