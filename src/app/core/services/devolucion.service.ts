import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantesService } from 'src/app/config/constantes.service';
import {Devolucion, ListaDevolucion} from 'src/app/shared/models/devolucion.model';

@Injectable({
  providedIn: 'root'
})
export class DevolucionService {

  constructor(
    private http: HttpClient,
    private urls: ConstantesService,
  ) { }

   uri = this.urls.URL;
   url = 'devolucion';

   getPaginated(perPage: number, currentPage: number): Observable <ListaDevolucion> {

    return this.http.get<ListaDevolucion>(this.uri + this.url + '?per_page=' + perPage + '&page=' + currentPage);

   }

   get(): Observable <Devolucion[]> {

    return this.http.get<Devolucion[]>(this.uri + this.url);

   }

   send(body: Devolucion): Observable <Devolucion> {

     return this.http.post<Devolucion>(this.uri + this.url, body);

   }

   getOne(id: number): Observable <Devolucion> {

    return this.http.get<Devolucion>(this.uri + this.url + '/' + id);

   }

   update(body: Devolucion, id: number): Observable <Devolucion> {

    return this.http.put<Devolucion>(this.uri + this.url + '/' + id , body);

  }

  delete(id: number): Observable <Devolucion> {

  return this.http.delete<Devolucion>(this.uri + this.url + '/' + id );

  }
}
