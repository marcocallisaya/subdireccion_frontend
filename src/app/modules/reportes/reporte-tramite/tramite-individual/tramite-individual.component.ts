import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReporteService } from 'src/app/core/services/reporte.service';

@Component({
  selector: 'app-tramite-individual',
  templateUrl: './tramite-individual.component.html',
  styleUrls: ['./tramite-individual.component.scss']
})
export class TramiteIndividualComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<TramiteIndividualComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private reporte: ReporteService) { }

    onNoClick(): void {
      this.dialogRef.close();
      }

      ngOnInit(): void {
      console.log(this.data);
      }

    generatePDF(): void {
      const data = {data: this.data};
      this.reporte.generateReportIndividualTramitePdf(data).subscribe(res => {
        console.log(res);
        this.onNoClick();
        const fileURL = URL.createObjectURL(res);
        window.open(fileURL, '_blank');
      }, err => console.log(err));
    }
}
