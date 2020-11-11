import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantesService } from 'src/app/config/constantes.service';
import {Documento, ListaDocumento} from '../../shared/models/documento.model';

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

   getPaginated(perPage: number, currentPage: number): Observable <ListaDocumento> {

    return this.http.get<ListaDocumento>(this.uri + this.url + '?per_page=' + perPage + '&page=' + currentPage);

   }

   get(): Observable <Documento[]> {

    return this.http.get<Documento[]>(this.uri + this.url);

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
