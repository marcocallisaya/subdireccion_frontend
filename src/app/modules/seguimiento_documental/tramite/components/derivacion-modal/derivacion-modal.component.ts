import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-derivacion-modal',
  templateUrl: './derivacion-modal.component.html',
  styleUrls: ['./derivacion-modal.component.scss']
})
export class DerivacionModalComponent implements OnInit {

  BanderaDatos;

  constructor(public dialogRef: MatDialogRef<DerivacionModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

onNoClick(): void {
this.dialogRef.close();
}

ngOnInit(): void { 
this.BanderaDatos = this.verExistencia(this.data);
console.log(this.data);
}

 verExistencia(data: any): boolean {
  return (data.derivacion != null) ? true : false;
}

}
