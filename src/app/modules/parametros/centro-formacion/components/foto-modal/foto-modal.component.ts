import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CentroFormacionService } from 'src/app/core/services/centro-formacion.service';
import { CargaImagenService } from 'src/app/core/services/subir-archivo.service';
import { CentroFormacion } from 'src/app/shared/models/centro_formacion.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-foto-modal',
  templateUrl: './foto-modal.component.html',
  styleUrls: ['./foto-modal.component.scss']
})
export class FotoModalComponent implements OnInit {

  public respuestaImagenEnviada;
  public resultadoCarga;
  BanderaDatos = true;
  uri ;
  codigo;
  link = 'http://localhost:8000/storage/';
  defaultPhotoUrl = 'https://i1.wp.com/www.musicapopular.cult.cu/wp-content/uploads/2017/12/imagen-no-disponible.png?fit=600%2C450';
  constructor(public dialogRef: MatDialogRef<FotoModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: CentroFormacion,
              private enviandoImagen: CargaImagenService,
              private servicio: CentroFormacionService) { }


onNoClick(): void {
this.dialogRef.close();
}

ngOnInit(): void {
  this.codigo = this.data.id;
  this.verificarUrl(this.data);
  console.log(this.data);
}

editar(): void {
  console.log('aqi');
}

verificarUrl(centro): void {
  if (centro.url === null) {
    this.uri = this.defaultPhotoUrl;
  } else {
    this.uri = this.link + centro.url;
  }
}

public cargandoImagen(files: FileList): any{
  this.BanderaDatos = false;

  this.enviandoImagen.postImagen(files[0], this.data.id).subscribe(

    response => {
      this.BanderaDatos = true;
      Swal.fire(
        'Felicidades',
        'La imagen ha sido actualizada con exito',
        'success'
      );
      this.uri = this.link + response.data.url;
      console.log(this.uri);
      console.log(response);
    },
    error => {
      console.log(error);
    }

  );

}

}
