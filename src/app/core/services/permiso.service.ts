import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConstantesService } from '../../config/constantes.service';
import {Permiso, ListaPermiso} from '../../shared/models/permiso.model';

@Injectable({
  providedIn: 'root'
})
export class PermisoService {

  constructor(
    private http: HttpClient,
    private urls: ConstantesService,
  ) { }

   uri = this.urls.URL;
   url = 'permiso';

   getPaginated(perPage: number, currentPage: number): Observable <ListaPermiso> {

    return this.http.get<ListaPermiso>(this.uri + this.url + '?per_page=' + perPage + '&page=' + currentPage);

   }

   get(): Observable <Permiso[]> {

    return this.http.get<Permiso[]>(this.uri + this.url);

   }

   getFiltered(perPage: number, currentPage: number, nombre: string): Observable <ListaPermiso> {

    return this.http.get<ListaPermiso>(this.uri + this.url +
                                              '?per_page=' + perPage +
                                               '&page=' + currentPage +
                                               '&consulta=' + nombre);

   }

   getAmongDates(fechaInicial, fechaFinal): Observable <Permiso[]> {

    return this.http.get<Permiso[]>(this.uri + this.url + '?fechaInicial=' + fechaInicial + '&fechaFinal=' + fechaFinal);

   }

   send(body: Permiso): Observable <Permiso> {

     return this.http.post<Permiso>(this.uri + this.url, body);

   }

   getOne(id: number): Observable <Permiso> {

    return this.http.get<Permiso>(this.uri + this.url + '/' + id);

   }

   update(body: Permiso, id: number): Observable <Permiso> {

    return this.http.put<Permiso>(this.uri + this.url + '/' + id , body);

  }

  changeState(body: any, id: number): Observable <any> {

    return this.http.put<any>(this.uri + this.url + '/' + id , body);

  }

  delete(id: number): Observable <Permiso> {

  return this.http.delete<Permiso>(this.uri + this.url + '/' + id );

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
