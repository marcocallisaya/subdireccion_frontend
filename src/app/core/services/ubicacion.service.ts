import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Ubicacion, ListaUbicacion} from '../../shared/models/ubicacion.model';
import {ConstantesService} from '../../config/constantes.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {

  constructor(
    private http: HttpClient,
    private urls: ConstantesService,
  ) { }

   uri = this.urls.URL;
   url = 'ubicacion';

   getPaginated(perPage: number, currentPage: number): Observable <ListaUbicacion> {

    return this.http.get<ListaUbicacion>(this.uri + this.url + '?per_page=' + perPage + '&page=' + currentPage);

   }

   get(): Observable <Ubicacion[]> {

    return this.http.get<Ubicacion[]>(this.uri + this.url);

   }

   getFiltered(perPage: number, currentPage: number, nombre: string): Observable <ListaUbicacion> {

    return this.http.get<ListaUbicacion>(this.uri + this.url +
                                              '?per_page=' + perPage +
                                               '&page=' + currentPage +
                                               '&consulta=' + nombre);

   }

   getWithState(estado): Observable <Ubicacion[]> {

    return this.http.get<Ubicacion[]>(this.uri + this.url + '?estado=' + estado);

   }

   send(body: Ubicacion): Observable <Ubicacion> {

     return this.http.post<Ubicacion>(this.uri + this.url, body);

   }

   getOne(id: number): Observable <Ubicacion> {

    return this.http.get<Ubicacion>(this.uri + this.url + '/' + id);

   }

   update(body: Ubicacion, id: number): Observable <Ubicacion> {

    return this.http.put<Ubicacion>(this.uri + this.url + '/' + id , body);

  }

  changeState(body: any, id: number): Observable <any> {

    return this.http.put<any>(this.uri + this.url + '/' + id , body);

  }

  delete(id: number): Observable <Ubicacion> {

  return this.http.delete<Ubicacion>(this.uri + this.url + '/' + id );

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
