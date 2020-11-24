import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SolicitanteService } from 'src/app/core/services/solicitante.service';
import { Tramite } from 'src/app/shared/models/tramite.model';

@Component({
  selector: 'app-tramite-modal',
  templateUrl: './tramite-modal.component.html',
  styleUrls: ['./tramite-modal.component.scss']
})
export class TramiteModalComponent implements OnInit {

  tramites: Tramite[];
  BanderaDatos: boolean;
  BanderaError: boolean;

  constructor(public dialogRef: MatDialogRef<TramiteModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: number,
              private servicio: SolicitanteService) { }


  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    console.log(this.data);
    this.cargarTramites(this.data);
  }

  cargarTramites(id: number): void {
    this.servicio.getTramites(id).subscribe((res: any) => {
      this.tramites = res.data;
      console.log(res);
      this.BanderaError = this.verExistencia();
      this.BanderaDatos = true;});
  }

  verExistencia(): boolean {
    return (this.tramites.length === 0) ? false : true;
  }
}
