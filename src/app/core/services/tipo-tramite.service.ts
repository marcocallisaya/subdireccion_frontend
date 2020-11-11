import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantesService } from 'src/app/config/constantes.service';
import { ListaTipoTramite, TipoTramite } from '../../shared/models/tipo_tramite.model';

@Injectable({
  providedIn: 'root'
})
export class TipoTramiteService {

  constructor(
    private http: HttpClient,
    private urls: ConstantesService,
  ) { }

   uri = this.urls.URL;
   url = 'tipo_tramite';

   getPaginated(perPage: number, currentPage: number): Observable <ListaTipoTramite> {

    return this.http.get<ListaTipoTramite>(this.uri + this.url + '?per_page=' + perPage + '&page=' + currentPage);

   }

   get(): Observable <TipoTramite[]> {

    return this.http.get<TipoTramite[]>(this.uri + this.url);

   }

   send(body: TipoTramite): Observable <TipoTramite> {

     return this.http.post<TipoTramite>(this.uri + this.url, body);

   }

   getOne(id: number): Observable <TipoTramite> {

    return this.http.get<TipoTramite>(this.uri + this.url + '/' + id);

   }

   update(body: TipoTramite, id: number): Observable <TipoTramite> {

    return this.http.put<TipoTramite>(this.uri + this.url + '/' + id , body);

  }

  delete(id: number): Observable <TipoTramite> {

  return this.http.delete<TipoTramite>(this.uri + this.url + '/' + id );

  }
}
