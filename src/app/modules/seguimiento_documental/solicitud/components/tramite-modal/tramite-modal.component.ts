import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tramite } from 'src/app/shared/models/tramite.model';

@Component({
  selector: 'app-tramite-modal',
  templateUrl: './tramite-modal.component.html',
  styleUrls: ['./tramite-modal.component.scss']
})
export class TramiteModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<TramiteModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Tramite) { }


onNoClick(): void {
this.dialogRef.close();
}

ngOnInit(): void {
console.log(this.data);
}

}
