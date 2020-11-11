import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Solicitante } from 'src/app/shared/models/solicitante.model';

@Component({
  selector: 'app-solicitante-modal',
  templateUrl: './solicitante-modal.component.html',
  styleUrls: ['./solicitante-modal.component.scss']
})
export class SolicitanteModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SolicitanteModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Solicitante) { }


onNoClick(): void {
this.dialogRef.close();
}

ngOnInit(): void {
console.log(this.data);
}

}
