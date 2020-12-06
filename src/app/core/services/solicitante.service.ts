import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantesService } from 'src/app/config/constantes.service';
import { Tramite } from 'src/app/shared/models/tramite.model';
import {Solicitante, ListaSolicitante} from '../../shared/models/solicitante.model';
import { map } from 'rxjs/operators';

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

   getFiltered(perPage: number, currentPage: number, nombre: string, tipo: string): Observable <ListaSolicitante> {

    return this.http.get<ListaSolicitante>(this.uri + this.url +
                                              '?per_page=' + perPage +
                                               '&page=' + currentPage +
                                               '&consulta=' + nombre +
                                               '&tipo=' + tipo);

   }

   getWithState(estado, tipo): Observable <Solicitante[]> {

    return this.http.get<Solicitante[]>(this.uri + this.url + '?estado=' + estado
                                                            + '&tipo=' + tipo);

   }

   getTramites(id: number): Observable <Tramite[]> {

    return this.http.get<Tramite[]>(this.uri + this.url + '/' + id + '/tramites');

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

  changeState(body: any, id: number): Observable <any> {

    return this.http.put<any>(this.uri + this.url + '/' + id , body);

  }

  delete(id: number): Observable <Solicitante> {

  return this.http.delete<Solicitante>(this.uri + this.url + '/' + id );

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
