import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Tramite, ListaTramite} from '../../shared/models/tramite.model';
import {ConstantesService} from '../../config/constantes.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TramiteService {

  constructor(
    private http: HttpClient,
    private urls: ConstantesService,
  ) { }

   uri = this.urls.URL;
   url = 'tramite';


   getPaginated(perPage: number, currentPage: number): Observable <ListaTramite> {

    return this.http.get<ListaTramite>(this.uri + this.url + '?per_page=' + perPage + '&page=' + currentPage);

   }

   get(): Observable <any> {
     return this.http.get<any>(this.uri + this.url);
   }

   getOnly(tipo: string): Observable <any> {
    return this.http.get<any>(this.uri + this.url + '?tipo=' + tipo);
  }

   getFiltered(perPage: number, currentPage: number, nombre: string, tipo: string): Observable <ListaTramite> {

    return this.http.get<ListaTramite>(this.uri + this.url +
                                              '?per_page=' + perPage +
                                               '&page=' + currentPage +
                                               '&consulta=' + nombre + 
                                               '&tipo=' + tipo);

   }

   getWithState(estado, fechaInicial, fechaFinal): Observable <Tramite[]> {

    return this.http.get<Tramite[]>(this.uri + this.url + '?estado=' + estado + '&fechaInicio=' + fechaInicial + '&fechaFinal=' + fechaFinal);

   }

   getWithQuery(tipo = '', consulta = '', estado_tramite: string, fechaInicial, fechaFinal): Observable <Tramite[]> {

    return this.http.get<Tramite[]>(this.uri + this.url + '?tipo=' + tipo + '&pregunta=' + consulta + '&estado_tramite=' + estado_tramite + '&fechaInicial=' + fechaInicial + '&fechaFinal=' + fechaFinal);

   }

    getWithQueryII(tipo = '', consulta = '', fechaInicial, fechaFinal): Observable <Tramite[]> {
     const estado = '';
    return this.http.get<Tramite[]>(this.uri + this.url + '?tipo=' + tipo + '&preguntaII=' + consulta + '&estado_tramite=' + estado + '&fechaInicial=' + fechaInicial + '&fechaFinal=' + fechaFinal);

   }

   getAmongDates(fechaInicial, fechaFinal): Observable <Tramite[]> {

    return this.http.get<Tramite[]>(this.uri + this.url + '?fechaInicial=' + fechaInicial + '&fechaFinal=' + fechaFinal);

   }

   send(body: Tramite): Observable <Tramite> {

     return this.http.post<Tramite>(this.uri + this.url, body);
   }

   getOne(id: number): Observable <Tramite> {

    return this.http.get<Tramite>(this.uri + this.url + '/' + id);
   }

   update(body: Tramite, id: number): Observable <Tramite> {

    return this.http.put<Tramite>(this.uri + this.url + '/' + id , body);
  }

  delete(id: number): Observable <Tramite> {

  return this.http.delete<Tramite>(this.uri + this.url + '/' + id );
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
