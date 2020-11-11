import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantesService } from 'src/app/config/constantes.service';
import {TipoSolicitante, ListaTipoSolicitante} from '../../shared/models/tipo_solicitante.model';


@Injectable({
  providedIn: 'root'
})
export class TipoSolicitanteService {

  constructor(
    private http: HttpClient,
    private urls: ConstantesService,
  ) { }

   uri = this.urls.URL;
   url = 'tipo_solicitante';

   getPaginated(perPage: number, currentPage: number): Observable <ListaTipoSolicitante> {

    return this.http.get<ListaTipoSolicitante>(this.uri + this.url + '?per_page=' + perPage + '&page=' + currentPage);

   }

   get(): Observable <TipoSolicitante[]> {

    return this.http.get<TipoSolicitante[]>(this.uri + this.url);

   }

   send(body: TipoSolicitante): Observable <TipoSolicitante> {

     return this.http.post<TipoSolicitante>(this.uri + this.url, body);

   }

   getOne(id: number): Observable <TipoSolicitante> {

    return this.http.get<TipoSolicitante>(this.uri + this.url + '/' + id);

   }

   update(body: TipoSolicitante, id: number): Observable <TipoSolicitante> {

    return this.http.put<TipoSolicitante>(this.uri + this.url + '/' + id , body);

  }

  delete(id: number): Observable <TipoSolicitante> {

  return this.http.delete<TipoSolicitante>(this.uri + this.url + '/' + id );

  }
}
