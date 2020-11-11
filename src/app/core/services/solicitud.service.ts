import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantesService } from 'src/app/config/constantes.service';
import {Solicitud, ListaSolicitud} from 'src/app/shared/models/solicitud.model';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  constructor(
    private http: HttpClient,
    private urls: ConstantesService,
  ) { }

   uri = this.urls.URL;
   url = 'solicitud';

   getPaginated(perPage: number, currentPage: number): Observable <ListaSolicitud> {

    return this.http.get<ListaSolicitud>(this.uri + this.url + '?per_page=' + perPage + '&page=' + currentPage);

   }

   get(): Observable <Solicitud[]> {

    return this.http.get<Solicitud[]>(this.uri + this.url);

   }

   send(body: Solicitud): Observable <Solicitud> {

     return this.http.post<Solicitud>(this.uri + this.url, body);

   }

   getOne(id: number): Observable <Solicitud> {

    return this.http.get<Solicitud>(this.uri + this.url + '/' + id);

   }

   update(body: Solicitud, id: number): Observable <Solicitud> {

    return this.http.put<Solicitud>(this.uri + this.url + '/' + id , body);

  }

  delete(id: number): Observable <Solicitud> {

  return this.http.delete<Solicitud>(this.uri + this.url + '/' + id );

  }
}
