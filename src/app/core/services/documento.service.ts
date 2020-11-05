import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantesService } from 'src/app/config/constantes.service';
import {Documento} from '../../shared/models/documento.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {

  constructor(
    private http: HttpClient,
    private urls: ConstantesService,
  ) { }

   uri = this.urls.URL;
   url = 'documento';

   get(): Observable<any> {
     return this.http.get<any>(this.uri + this.url);
   }

   send(body: Documento): Observable <Documento> {

     return this.http.post<Documento>(this.uri + this.url, body);
   }

   getOne(id: number): Observable <Documento> {

    return this.http.get<Documento>(this.uri + this.url + '/' + id);
   }

   update(body: Documento, id: number): Observable <Documento> {

    return this.http.put<Documento>(this.uri + this.url + '/' + id , body);
  }

  delete(id: number): Observable <Documento> {

  return this.http.delete<Documento>(this.uri + this.url + '/' + id );
  }

}
