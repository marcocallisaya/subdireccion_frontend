import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantesService } from 'src/app/config/constantes.service';
import {Convocatoria, ListaConvocatoria} from '../../shared/models/convocatoria.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConvocatoriaService {

  constructor(
    private http: HttpClient,
    private urls: ConstantesService,
  ) { }

   uri = this.urls.URL;
   url = 'convocatoria';

   getPaginated(perPage: number, currentPage: number): Observable <ListaConvocatoria> {

    return this.http.get<ListaConvocatoria>(this.uri + this.url + '?per_page=' + perPage + '&page=' + currentPage);

   }

   get(): Observable <Convocatoria[]> {

    return this.http.get<Convocatoria[]>(this.uri + this.url);

   }

   getFiltered(perPage: number, currentPage: number, nombre: string): Observable <ListaConvocatoria> {

    return this.http.get<ListaConvocatoria>(this.uri + this.url +
                                              '?per_page=' + perPage +
                                               '&page=' + currentPage +
                                               '&consulta=' + nombre);

   }

   getWithState(estado): Observable <Convocatoria[]> {

    return this.http.get<Convocatoria[]>(this.uri + this.url + '?estado=' + estado);

   }

   send(body: Convocatoria): Observable <Convocatoria> {

     return this.http.post<Convocatoria>(this.uri + this.url, body);

   }

   getOne(id: number): Observable <Convocatoria> {

    return this.http.get<Convocatoria>(this.uri + this.url + '/' + id);

   }

   update(body: Convocatoria, id: number): Observable <Convocatoria> {

    return this.http.put<Convocatoria>(this.uri + this.url + '/' + id , body);

  }

  changeState(body: any, id: number): Observable <any> {

    return this.http.put<any>(this.uri + this.url + '/' + id , body);

  }

  delete(id: number): Observable <Convocatoria> {

  return this.http.delete<Convocatoria>(this.uri + this.url + '/' + id );

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
