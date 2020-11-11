import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Documento } from 'src/app/shared/models/documento.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef<ModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Documento) { }


  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    console.log(this.data);
  }

}
