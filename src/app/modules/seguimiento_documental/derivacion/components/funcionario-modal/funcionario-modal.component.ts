import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Funcionario } from 'src/app/shared/models/funcionario.model';

@Component({
  selector: 'app-funcionario-modal',
  templateUrl: './funcionario-modal.component.html',
  styleUrls: ['./funcionario-modal.component.scss']
})
export class FuncionarioModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<FuncionarioModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Funcionario) { }


onNoClick(): void {
this.dialogRef.close();
}

ngOnInit(): void {
console.log(this.data);
}
}
