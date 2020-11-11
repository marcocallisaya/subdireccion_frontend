import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantesService } from 'src/app/config/constantes.service';
import {Derivacion, ListaDerivacion} from 'src/app/shared/models/derivacion.model';

@Injectable({
  providedIn: 'root'
})
export class DerivacionService {

  constructor(
    private http: HttpClient,
    private urls: ConstantesService,
  ) { }

   uri = this.urls.URL;
   url = 'derivacion';

   getPaginated(perPage: number, currentPage: number): Observable <ListaDerivacion> {

    return this.http.get<ListaDerivacion>(this.uri + this.url + '?per_page=' + perPage + '&page=' + currentPage);

   }

   get(): Observable <Derivacion[]> {

    return this.http.get<Derivacion[]>(this.uri + this.url);

   }

   send(body: Derivacion): Observable <Derivacion> {

     return this.http.post<Derivacion>(this.uri + this.url, body);

   }

   getOne(id: number): Observable <Derivacion> {

    return this.http.get<Derivacion>(this.uri + this.url + '/' + id);

   }

   update(body: Derivacion, id: number): Observable <Derivacion> {

    return this.http.put<Derivacion>(this.uri + this.url + '/' + id , body);

  }

  delete(id: number): Observable <Derivacion> {

  return this.http.delete<Derivacion>(this.uri + this.url + '/' + id );

  }
}
