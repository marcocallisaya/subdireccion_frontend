import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConstantesService } from '../../config/constantes.service';
import {Bitacora, ListaBitacora} from '../../shared/models/bitacora.model';

@Injectable({
  providedIn: 'root'
})
export class BitacoraService {

  constructor(
    private http: HttpClient,
    private urls: ConstantesService,
  ) { }

   uri = this.urls.URL;
   url = 'bitacora';

   getPaginated(perPage: number, currentPage: number): Observable <ListaBitacora> {

    return this.http.get<ListaBitacora>(this.uri + this.url + '?per_page=' + perPage + '&page=' + currentPage);

   }

   get(): Observable <Bitacora[]> {

    return this.http.get<Bitacora[]>(this.uri + this.url);

   }

   getFiltered(perPage: number, currentPage: number, nombre: string): Observable <ListaBitacora> {

    return this.http.get<ListaBitacora>(this.uri + this.url +
                                              '?per_page=' + perPage +
                                               '&page=' + currentPage +
                                               '&consulta=' + nombre);

   }

   getAmongDates(fechaInicial, fechaFinal, usuario): Observable <Bitacora[]> {

    return this.http.get<Bitacora[]>(this.uri + this.url + '?fechaInicial=' + fechaInicial +
                                   '&fechaFinal=' + fechaFinal + '&usuario=' + usuario);

   }

   send(body: Bitacora): Observable <Bitacora> {

     return this.http.post<Bitacora>(this.uri + this.url, body);

   }

   getOne(id: number): Observable <Bitacora> {

    return this.http.get<Bitacora>(this.uri + this.url + '/' + id);

   }

   update(body: Bitacora, id: number): Observable <Bitacora> {

    return this.http.put<Bitacora>(this.uri + this.url + '/' + id , body);

  }

  changeState(body: any, id: number): Observable <any> {

    return this.http.put<any>(this.uri + this.url + '/' + id , body);

  }

  delete(id: number): Observable <Bitacora> {

  return this.http.delete<Bitacora>(this.uri + this.url + '/' + id );

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
