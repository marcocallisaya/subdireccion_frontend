import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantesService } from 'src/app/config/constantes.service';
import {Circular, ListaCircular} from '../../shared/models/circular.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CircularService {

  constructor(
    private http: HttpClient,
    private urls: ConstantesService,
  ) { }

   uri = this.urls.URL;
   url = 'circular';

   getPaginated(perPage: number, currentPage: number): Observable <ListaCircular> {

    return this.http.get<ListaCircular>(this.uri + this.url + '?per_page=' + perPage + '&page=' + currentPage);

   }

   get(): Observable <Circular[]> {

    return this.http.get<Circular[]>(this.uri + this.url);

   }

   getFiltered(perPage: number, currentPage: number, nombre: string): Observable <ListaCircular> {

    return this.http.get<ListaCircular>(this.uri + this.url +
                                              '?per_page=' + perPage +
                                               '&page=' + currentPage +
                                               '&consulta=' + nombre);

   }

   getWithState(estado): Observable <Circular[]> {

    return this.http.get<Circular[]>(this.uri + this.url + '?estado=' + estado);

   }

   send(body: Circular): Observable <Circular> {

     return this.http.post<Circular>(this.uri + this.url, body);

   }

   getOne(id: number): Observable <Circular> {

    return this.http.get<Circular>(this.uri + this.url + '/' + id);

   }

   update(body: Circular, id: number): Observable <Circular> {

    return this.http.put<Circular>(this.uri + this.url + '/' + id , body);

  }

  changeState(body: any, id: number): Observable <any> {

    return this.http.put<any>(this.uri + this.url + '/' + id , body);

  }

  delete(id: number): Observable <Circular> {

  return this.http.delete<Circular>(this.uri + this.url + '/' + id );

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
