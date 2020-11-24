import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CargaImagenService } from 'src/app/core/services/subir-archivo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-publicacion-modal',
  templateUrl: './publicacion-modal.component.html',
  styleUrls: ['./publicacion-modal.component.scss']
})
export class PublicacionModalComponent implements OnInit {

  public respuestaImagenEnviada;
  public resultadoCarga;
  BanderaDatos = true;
  uri = 'instructivo';
  constructor(private enviandoImagen: CargaImagenService,
              public dialogRef: MatDialogRef<PublicacionModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any){}

  ngOnInit(): void {
    console.log(this.data);
  }

  public cargandoImagen(files: FileList): any{
  this.BanderaDatos = false;

  this.enviandoImagen.postFileImagen(files[0], this.data, this.uri).subscribe(

    response => {
      this.BanderaDatos = true;
      Swal.fire(
        'Felicidades',
        'El instructivo ha sido publicado con exito',
        'success'
      );
      this.onNoClick();
      console.log(response);
    },
    error => {
      console.log(error);
    }

  );

}

onNoClick(): void {
  this.dialogRef.close();
}

}
