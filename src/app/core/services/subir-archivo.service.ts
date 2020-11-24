import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConstantesService } from 'src/app/config/constantes.service';

@Injectable({
  providedIn: 'root'
})
export class CargaImagenService {

  public urlServidor = 'http://localhost:8000/api/circular/1/pdf';



  constructor(private http: HttpClient, private urls: ConstantesService) { }

  uri = this.urls.URL;
  // url = 'circular';

  public postFileImagen(imagenParaSubir: File, id: number, url: string): any {

    const uri = this.uri + url + '/' + id + '/pdf';
    const formData = new FormData();
    formData.append('pdf', imagenParaSubir, imagenParaSubir.name);
    return this.http.post(uri, formData);

  }
}
