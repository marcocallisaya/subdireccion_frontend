import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantesService } from 'src/app/config/constantes.service';
import { Distrito, ListaDistrito } from 'src/app/shared/models/distrito.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DistritoService {

  constructor(
    private http: HttpClient,
    private urls: ConstantesService,
  ) { }

   uri = this.urls.URL;
   url = 'distrito';

   getPaginated(perPage: number, currentPage: number): Observable <ListaDistrito> {

    return this.http.get<ListaDistrito>(this.uri + this.url + '?per_page=' + perPage + '&page=' + currentPage);

   }

   get(): Observable <Distrito[]> {

    return this.http.get<Distrito[]>(this.uri + this.url);

   }

   getFiltered(perPage: number, currentPage: number, nombre: string): Observable <ListaDistrito> {

    return this.http.get<ListaDistrito>(this.uri + this.url +
                                              '?per_page=' + perPage +
                                               '&page=' + currentPage +
                                               '&consulta=' + nombre);

   }

   getWithState(estado): Observable <Distrito[]> {

    return this.http.get<Distrito[]>(this.uri + this.url + '?estado=' + estado);

   }

   send(body: Distrito): Observable <Distrito> {

     return this.http.post<Distrito>(this.uri + this.url, body);

   }

   getOne(id: number): Observable <Distrito> {

    return this.http.get<Distrito>(this.uri + this.url + '/' + id);

   }

   update(body: Distrito, id: number): Observable <Distrito> {

    return this.http.put<Distrito>(this.uri + this.url + '/' + id , body);

  }

  changeState(body: any, id: number): Observable <any> {

    return this.http.put<any>(this.uri + this.url + '/' + id , body);

  }

  delete(id: number): Observable <Distrito> {

  return this.http.delete<Distrito>(this.uri + this.url + '/' + id );

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
