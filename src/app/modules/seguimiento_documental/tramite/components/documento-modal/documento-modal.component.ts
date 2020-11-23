import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-documento-modal',
  templateUrl: './documento-modal.component.html',
  styleUrls: ['./documento-modal.component.scss']
})
export class DocumentoModalComponent implements OnInit {

  BanderaDatos: boolean;

  constructor(public dialogRef: MatDialogRef<DocumentoModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }


  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.BanderaDatos = this.verExistencia(this.data);
    console.log(this.data);
  }

  verExistencia(data: any): boolean {
    return (data.documentos.length === 0) ? false : true;
  }

}
