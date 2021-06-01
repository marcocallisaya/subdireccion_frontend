import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConstantesService } from 'src/app/config/constantes.service';
import {Documento, ListaDocumento} from '../../shared/models/documento.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {

  constructor(
    private http: HttpClient,
    private urls: ConstantesService,
  ) { }

   uri = this.urls.URL;
   url = 'documento';

   getPaginated(perPage: number, currentPage: number): Observable <ListaDocumento> {

    return this.http.get<ListaDocumento>(this.uri + this.url + '?per_page=' + perPage + '&page=' + currentPage);

   }

   get(): Observable <Documento[]> {

    return this.http.get<Documento[]>(this.uri + this.url);

   }

   getWithState(estado, tipo): Observable <Documento[]> {

    return this.http.get<Documento[]>(this.uri + this.url + '?estado=' + estado + '&tipo=' + tipo);

   }

   getAmongDates(fechaInicial, fechaFinal): Observable <Documento[]> {

    return this.http.get<Documento[]>(this.uri + this.url + '?fechaInicial=' + fechaInicial + '&fechaFinal=' + fechaFinal);

   }

   getFiltered(perPage: number, currentPage: number, nombre: string, tipo: string): Observable <ListaDocumento> {

    return this.http.get<ListaDocumento>(this.uri + this.url +
                                              '?per_page=' + perPage +
                                               '&page=' + currentPage +
                                               '&consulta=' + nombre +
                                               '&tipo=' + tipo);
    }

   send(body: Documento): Observable <Documento> {

     return this.http.post<Documento>(this.uri + this.url, body);

   }

   getOne(id: number): Observable <Documento> {

    return this.http.get<Documento>(this.uri + this.url + '/' + id);

   }

   update(body: Documento, id: number): Observable <Documento> {

    return this.http.put<Documento>(this.uri + this.url + '/' + id , body);

  }

  changeState(body: any, id: number): Observable <any> {

    return this.http.put<any>(this.uri + this.url + '/' + id , body);

  }

  delete(id: number): Observable <Documento> {

  return this.http.delete<Documento>(this.uri + this.url + '/' + id );

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
