import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-evaluacion-modal',
  templateUrl: './evaluacion-modal.component.html',
  styleUrls: ['./evaluacion-modal.component.scss']
})
export class EvaluacionModalComponent implements OnInit {

  BanderaDatos: boolean;

  constructor(public dialogRef: MatDialogRef<EvaluacionModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }


  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.BanderaDatos = this.verExistencia(this.data);
    console.log(this.data);
  }

  verExistencia(data: any): boolean {
    return (data.evaluacion != null) ? true : false;
  }

}
