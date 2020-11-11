import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-devolucion-modal',
  templateUrl: './devolucion-modal.component.html',
  styleUrls: ['./devolucion-modal.component.scss']
})
export class DevolucionModalComponent implements OnInit {

  BanderaDatos: boolean;

  constructor(public dialogRef: MatDialogRef<DevolucionModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }


  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    console.log(this.data);
    this.BanderaDatos = this.verExistencia(this.data);
  }

  verExistencia(data: any): boolean {
    return (data.devolucion != null) ? true : false;
  }
}
