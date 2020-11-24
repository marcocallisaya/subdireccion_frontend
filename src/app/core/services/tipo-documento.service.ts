import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConstantesService } from '../../config/constantes.service';
import {TipoDocumento, ListaTipoDocumento} from '../../shared/models/tipo_documento.model';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {

  constructor(
    private http: HttpClient,
    private urls: ConstantesService,
  ) { }

   uri = this.urls.URL;
   url = 'tipo_documento';

   getPaginated(perPage: number, currentPage: number): Observable <ListaTipoDocumento> {

    return this.http.get<ListaTipoDocumento>(this.uri + this.url + '?per_page=' + perPage + '&page=' + currentPage);

   }

   get(): Observable <TipoDocumento[]> {

    return this.http.get<TipoDocumento[]>(this.uri + this.url);

   }

   getFiltered(perPage: number, currentPage: number, nombre: string): Observable <ListaTipoDocumento> {

    return this.http.get<ListaTipoDocumento>(this.uri + this.url +
                                              '?per_page=' + perPage +
                                               '&page=' + currentPage +
                                               '&consulta=' + nombre);

   }

   getWithState(estado): Observable <TipoDocumento[]> {

    return this.http.get<TipoDocumento[]>(this.uri + this.url + '?estado=' + estado);

   }

   send(body: TipoDocumento): Observable <TipoDocumento> {

     return this.http.post<TipoDocumento>(this.uri + this.url, body);

   }

   getOne(id: number): Observable <TipoDocumento> {

    return this.http.get<TipoDocumento>(this.uri + this.url + '/' + id);

   }

   update(body: TipoDocumento, id: number): Observable <TipoDocumento> {

    return this.http.put<TipoDocumento>(this.uri + this.url + '/' + id , body);

  }

  changeState(body: any, id: number): Observable <any> {

    return this.http.put<any>(this.uri + this.url + '/' + id , body);

  }

  delete(id: number): Observable <TipoDocumento> {

  return this.http.delete<TipoDocumento>(this.uri + this.url + '/' + id );

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
