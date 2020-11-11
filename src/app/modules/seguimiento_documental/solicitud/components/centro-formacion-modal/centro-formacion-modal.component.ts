import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CentroFormacion } from 'src/app/shared/models/centro_formacion.model';

@Component({
  selector: 'app-centro-formacion-modal',
  templateUrl: './centro-formacion-modal.component.html',
  styleUrls: ['./centro-formacion-modal.component.scss']
})
export class CentroFormacionModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CentroFormacionModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: CentroFormacion) { }


onNoClick(): void {
this.dialogRef.close();
}

ngOnInit(): void {
console.log(this.data);
}


}
