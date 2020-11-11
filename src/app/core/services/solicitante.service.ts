import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantesService } from 'src/app/config/constantes.service';
import {Solicitante, ListaSolicitante} from '../../shared/models/solicitante.model';

@Injectable({
  providedIn: 'root'
})
export class SolicitanteService {

  constructor(
    private http: HttpClient,
    private urls: ConstantesService,
  ) { }

   uri = this.urls.URL;
   url = 'solicitante';

   getPaginated(perPage: number, currentPage: number): Observable <ListaSolicitante> {

    return this.http.get<ListaSolicitante>(this.uri + this.url + '?per_page=' + perPage + '&page=' + currentPage);

   }

   get(): Observable <Solicitante[]> {

    return this.http.get<Solicitante[]>(this.uri + this.url);

   }

   send(body: Solicitante): Observable <Solicitante> {

     return this.http.post<Solicitante>(this.uri + this.url, body);

   }

   getOne(id: number): Observable <Solicitante> {

    return this.http.get<Solicitante>(this.uri + this.url + '/' + id);

   }

   update(body: Solicitante, id: number): Observable <Solicitante> {

    return this.http.put<Solicitante>(this.uri + this.url + '/' + id , body);

  }

  delete(id: number): Observable <Solicitante> {

  return this.http.delete<Solicitante>(this.uri + this.url + '/' + id );

  }
}
