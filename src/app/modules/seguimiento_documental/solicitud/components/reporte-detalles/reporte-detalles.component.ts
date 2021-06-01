import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CentroFormacionService } from 'src/app/core/services/centro-formacion.service';
import { SolicitanteService } from 'src/app/core/services/solicitante.service';
import { SolicitudService } from 'src/app/core/services/solicitud.service';
import { CentroFormacion } from 'src/app/shared/models/centro_formacion.model';
import { Solicitante } from 'src/app/shared/models/solicitante.model';
import { Solicitud } from 'src/app/shared/models/solicitud.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reporte-detalles',
  templateUrl: './reporte-detalles.component.html',
  styleUrls: ['./reporte-detalles.component.scss']
})
export class ReporteDetallesComponent implements OnInit {

  BanderaDatos: boolean;
  BanderaVista: boolean;
  solicitudes: Solicitud[];
  myForm: FormGroup;
  solicitantes: Solicitante[];
  centros: CentroFormacion[];


  constructor(public dialogRef: MatDialogRef<ReporteDetallesComponent>,
              private servicio: SolicitudService,
              private fb: FormBuilder,
              private solicitante: SolicitanteService,
              private centro: CentroFormacionService) { }

  ngOnInit(): void {
    this.cargarDatosAdicionales();
    this.cargarFormulario();
    this.BanderaDatos = true;
  }

  cargarDatosAdicionales(): void {
    this.solicitante.get().subscribe(res => this.solicitantes = res);
    this.centro.get().subscribe(res => this.centros = res);
  }

  generatePDF(): void {
    this.BanderaVista = false;
    const data = {data: this.solicitudes, fechaInicial: this.myForm.get('fecha_inicial').value, fechaFinal: this.myForm.get('fecha_final').value};
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
      solicitante: [''],
      centro: [''],
      fecha_inicial:[this.obtenerFechaActual()],
      fecha_final:[this.obtenerFechaActual()]
    });
  }

  obtenerFechaActual(): string {
    let f = new Date(); let d ; let m ; let y = f.getFullYear(); 
    
    if (f.getDate()<10) { d = "0" + f.getDate();} else {d = f.getDate();}

    if (f.getMonth()<10) {m = "0" + (f.getMonth() + 1); } else {m = (f.getMonth() + 1);}

    let date = y + "-" + m + "-" + d;

    return  date;
  }


  mostrarReporte(): void {
    const solicitante = this.myForm.get('solicitante').value;
    const centro = this.myForm.get('centro').value;
    const fechaInicial = this.myForm.get('fecha_inicial').value;
    const fechaFinal = this.myForm.get('fecha_final').value;
    this.servicio.getWithState(solicitante, centro, fechaInicial, fechaFinal).subscribe((res: any) => {
      this.solicitudes = res.data;
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
