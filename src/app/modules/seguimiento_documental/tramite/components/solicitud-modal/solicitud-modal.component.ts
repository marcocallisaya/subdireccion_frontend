import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-solicitud-modal',
  templateUrl: './solicitud-modal.component.html',
  styleUrls: ['./solicitud-modal.component.scss']
})
export class SolicitudModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SolicitudModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }


onNoClick(): void {
this.dialogRef.close();
}

ngOnInit(): void {
console.log(this.data);
}
}
