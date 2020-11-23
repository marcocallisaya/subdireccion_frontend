import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConstantesService } from 'src/app/config/constantes.service';
import {Evaluacion, ListaEvaluacion} from 'src/app/shared/models/evaluacion.model';

@Injectable({
  providedIn: 'root'
})
export class EvaluacionService {

  constructor(
    private http: HttpClient,
    private urls: ConstantesService,
  ) { }

   uri = this.urls.URL;
   url = 'evaluacion';

   getPaginated(perPage: number, currentPage: number): Observable <ListaEvaluacion> {

    return this.http.get<ListaEvaluacion>(this.uri + this.url + '?per_page=' + perPage + '&page=' + currentPage);

   }

   get(): Observable <Evaluacion[]> {

    return this.http.get<Evaluacion[]>(this.uri + this.url);

   }

   getFiltered(perPage: number, currentPage: number, nombre: string): Observable <ListaEvaluacion> {

    return this.http.get<ListaEvaluacion>(this.uri + this.url +
                                              '?per_page=' + perPage +
                                               '&page=' + currentPage +
                                               '&consulta=' + nombre);

   }

   getWithState(estado): Observable <Evaluacion[]> {

    return this.http.get<Evaluacion[]>(this.uri + this.url + '?estado=' + estado) ;

   }

   send(body: Evaluacion): Observable <Evaluacion> {

     return this.http.post<Evaluacion>(this.uri + this.url, body);

   }

   getOne(id: number): Observable <Evaluacion> {

    return this.http.get<Evaluacion>(this.uri + this.url + '/' + id);

   }

   update(body: Evaluacion, id: number): Observable <Evaluacion> {

    return this.http.put<Evaluacion>(this.uri + this.url + '/' + id , body);

  }

  delete(id: number): Observable <Evaluacion> {

  return this.http.delete<Evaluacion>(this.uri + this.url + '/' + id );

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
