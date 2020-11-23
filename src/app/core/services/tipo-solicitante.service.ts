import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

   getFiltered(perPage: number, currentPage: number, nombre: string): Observable <ListaTipoSolicitante> {

    return this.http.get<ListaTipoSolicitante>(this.uri + this.url +
                                              '?per_page=' + perPage +
                                               '&page=' + currentPage +
                                               '&consulta=' + nombre);

   }

   getWithState(estado): Observable <TipoSolicitante[]> {

    return this.http.get<TipoSolicitante[]>(this.uri + this.url + '?estado=' + estado);

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

  changeState(body: any, id: number): Observable <any> {

    return this.http.put<any>(this.uri + this.url + '/' + id , body);

  }

  delete(id: number): Observable <TipoSolicitante> {

  return this.http.delete<TipoSolicitante>(this.uri + this.url + '/' + id );

  }

  generateReportPdf( body): any {
    return this.http.post(this.uri + this.url + '/reporte' , body , {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/pdf'
      },
      responseType: 'blob', observe: 'response'
    }).pipe(
      map((res: any) => {
        return new Blob([res.body], { type: 'application/pdf' });
      })
    );
  }
}
