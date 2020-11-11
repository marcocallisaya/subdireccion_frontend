import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantesService } from 'src/app/config/constantes.service';
import {CentroFormacion, ListaCentroFormacion} from 'src/app/shared/models/centro_formacion.model';

@Injectable({
  providedIn: 'root'
})
export class CentroFormacionService {

  constructor(
    private http: HttpClient,
    private urls: ConstantesService,
  ) { }

   uri = this.urls.URL;
   url = 'centro_formacion';

   getPaginated(perPage: number, currentPage: number): Observable <ListaCentroFormacion> {

    return this.http.get<ListaCentroFormacion>(this.uri + this.url + '?per_page=' + perPage + '&page=' + currentPage);

   }

   get(): Observable <CentroFormacion[]> {

    return this.http.get<CentroFormacion[]>(this.uri + this.url);

   }

   send(body: CentroFormacion): Observable <CentroFormacion> {

     return this.http.post<CentroFormacion>(this.uri + this.url, body);

   }

   getOne(id: number): Observable <CentroFormacion> {

    return this.http.get<CentroFormacion>(this.uri + this.url + '/' + id);

   }

   update(body: CentroFormacion, id: number): Observable <CentroFormacion> {

    return this.http.put<CentroFormacion>(this.uri + this.url + '/' + id , body);

  }

  delete(id: number): Observable <CentroFormacion> {

  return this.http.delete<CentroFormacion>(this.uri + this.url + '/' + id );

  }
}
