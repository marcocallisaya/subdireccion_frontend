import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantesService } from '../../config/constantes.service';
import {TipoDocumento} from '../../shared/models/tipo_documento.model';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {

  constructor(
    private http: HttpClient,
    private urls: ConstantesService,
  ) { }

   uri = this.urls.URL;
   url = 'tipo_documento';

   get(): Observable <any> {
     return this.http.get<any>(this.uri + this.url);
   }

   send(body: TipoDocumento): Observable <TipoDocumento> {

     return this.http.post<TipoDocumento>(this.uri + this.url, body);
   }

   getOne(id: number): Observable <TipoDocumento> {

    return this.http.get<TipoDocumento>(this.uri + this.url + '/' + id);
   }

   update(body: TipoDocumento, id: number): Observable <TipoDocumento> {

    return this.http.put<TipoDocumento>(this.uri + this.url + '/' + id , body);
  }

  delete(id: number): Observable <TipoDocumento> {

  return this.http.delete<TipoDocumento>(this.uri + this.url + '/' + id );
  }
}
